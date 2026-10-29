"""Voice-cloning TTS demo: zero-shot XTTS-v2.

Endpoint /synthesize (called from demos.html):
    inputs:  text, reference voice (file path), language code
    output:  synthesized audio (24 kHz WAV)

XTTS-v2 is released under the Coqui Public Model License (non-commercial). Read it at
https://coqui.ai/cpml and, if you accept it, add the Space variable COQUI_TOS_AGREED=1.
"""
import os

if os.environ.get("COQUI_TOS_AGREED") != "1":
    raise RuntimeError("Set the Space variable COQUI_TOS_AGREED=1 after accepting the CPML (https://coqui.ai/cpml).")

import gradio as gr
import numpy as np
import torch
from TTS.api import TTS

try:  # ZeroGPU hardware; a no-op elsewhere
    import spaces

    gpu = spaces.GPU(duration=60)
except ImportError:
    gpu = lambda fn: fn

MAX_CHARS = 300
LANGUAGES = ["tr", "en", "de", "fr", "es", "it", "pt", "pl", "ru", "nl", "cs", "ar", "zh-cn", "ja", "hu", "ko", "hi"]

device = "cuda" if torch.cuda.is_available() else "cpu"
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)


@gpu
def synthesize(text, reference, language):
    text = (text or "").strip()
    if not text:
        raise gr.Error("Please enter some text.")
    if len(text) > MAX_CHARS:
        raise gr.Error(f"Text must be at most {MAX_CHARS} characters.")
    if not reference:
        raise gr.Error("A reference recording is required.")
    if language not in LANGUAGES:
        raise gr.Error(f"Unsupported language: {language}")
    wav = np.asarray(tts.tts(text=text, speaker_wav=reference, language=language), dtype=np.float32)
    sr = tts.synthesizer.output_sample_rate
    return sr, (np.clip(wav, -1, 1) * 32767).astype(np.int16)


demo = gr.Interface(
    fn=synthesize,
    inputs=[
        gr.Textbox(label="Text", max_length=MAX_CHARS),
        gr.Audio(type="filepath", label="Reference voice (6–20 s)"),
        gr.Dropdown(LANGUAGES, value="tr", label="Language"),
    ],
    outputs=gr.Audio(type="numpy", format="wav", label="Synthesized"),
    title="Voice-cloning TTS (XTTS-v2)",
    description="Zero-shot voice cloning. Only use voices you own or have permission to use.",
    api_name="synthesize",
    flagging_mode="never",
)

if __name__ == "__main__":
    demo.queue(max_size=10).launch(ssr_mode=False)

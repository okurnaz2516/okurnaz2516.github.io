"""Voice conversion demo: kNN-VC (WavLM features + nearest-neighbour matching + HiFi-GAN).

Endpoint /convert (called from demos.html):
    inputs:  source speech, target voice (file paths)
    output:  converted audio (16 kHz WAV)
"""
import gradio as gr
import numpy as np
import torch
import torchaudio

SR = 16000
MIN_SECONDS = 1
MAX_SOURCE_SECONDS = 30
MAX_TARGET_SECONDS = 120
TOPK = 4

knn_vc = torch.hub.load(
    "bshall/knn-vc", "knn_vc", prematched=True, trust_repo=True, pretrained=True, device="cpu"
)


def load(path, max_seconds):
    wav, sr = torchaudio.load(path)
    wav = wav.mean(dim=0, keepdim=True)
    if sr != SR:
        wav = torchaudio.functional.resample(wav, sr, SR)
    if wav.shape[1] < SR * MIN_SECONDS:
        raise gr.Error(f"Recordings must be at least {MIN_SECONDS} s long.")
    return wav[:, : SR * max_seconds]


@torch.inference_mode()
def convert(source, target):
    if not source or not target:
        raise gr.Error("Both recordings are required.")
    query = knn_vc.get_features(load(source, MAX_SOURCE_SECONDS))
    matching_set = knn_vc.get_matching_set([load(target, MAX_TARGET_SECONDS)])
    out = knn_vc.match(query, matching_set, topk=TOPK)
    return SR, (out.clamp(-1, 1).numpy() * 32767).astype(np.int16)


demo = gr.Interface(
    fn=convert,
    inputs=[
        gr.Audio(type="filepath", label="Source speech (what is said)"),
        gr.Audio(type="filepath", label="Target voice (who says it)"),
    ],
    outputs=gr.Audio(type="numpy", format="wav", label="Converted"),
    title="Voice conversion (kNN-VC)",
    description="Any-to-any voice conversion with kNN-VC. Only use recordings you own or have permission to use.",
    api_name="convert",
    flagging_mode="never",
)

if __name__ == "__main__":
    demo.queue(max_size=10).launch(ssr_mode=False)

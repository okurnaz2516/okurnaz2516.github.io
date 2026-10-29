"""Speaker verification demo: ECAPA-TDNN embeddings + cosine similarity.

Endpoint /verify (called from demos.html):
    inputs:  enrollment audio, test audio (file paths)
    output:  {"score": float, "threshold": float, "same": bool}
"""
import gradio as gr
import torch
import torch.nn.functional as F
import torchaudio
from speechbrain.inference.speaker import EncoderClassifier

SR = 16000
MIN_SECONDS = 1
MAX_SECONDS = 30
THRESHOLD = 0.25  # cosine-similarity decision threshold; tune on your own data if needed

encoder = EncoderClassifier.from_hparams(
    source="speechbrain/spkrec-ecapa-voxceleb",
    savedir="pretrained/ecapa",
    run_opts={"device": "cpu"},
)
encoder.eval()


def load(path):
    wav, sr = torchaudio.load(path)
    wav = wav.mean(dim=0, keepdim=True)
    if sr != SR:
        wav = torchaudio.functional.resample(wav, sr, SR)
    if wav.shape[1] < SR * MIN_SECONDS:
        raise gr.Error(f"Recordings must be at least {MIN_SECONDS} s long.")
    return wav[:, : SR * MAX_SECONDS]


@torch.inference_mode()
def embed(path):
    return F.normalize(encoder.encode_batch(load(path)).squeeze(), dim=0)


def verify(enroll, test):
    if not enroll or not test:
        raise gr.Error("Both recordings are required.")
    score = float(torch.dot(embed(enroll), embed(test)))
    return {"score": round(score, 4), "threshold": THRESHOLD, "same": score >= THRESHOLD}


demo = gr.Interface(
    fn=verify,
    inputs=[
        gr.Audio(type="filepath", label="Enrollment recording"),
        gr.Audio(type="filepath", label="Test recording"),
    ],
    outputs=gr.JSON(label="Result"),
    title="Speaker verification (ECAPA-TDNN)",
    description="Cosine similarity between ECAPA-TDNN speaker embeddings of two recordings.",
    api_name="verify",
    flagging_mode="never",
)

if __name__ == "__main__":
    demo.queue(max_size=20).launch(ssr_mode=False)

"""Smoke-test the deployed Spaces with the same endpoints demos.html uses.

    pip install gradio_client
    python spaces/test_spaces.py USER/speaker-verification USER/voice-conversion USER/voice-cloning-tts a.wav b.wav
"""
import sys

from gradio_client import Client, handle_file

verification, conversion, cloning, wav_a, wav_b = sys.argv[1:6]

print("verify:", Client(verification).predict(handle_file(wav_a), handle_file(wav_b), api_name="/verify"))
print("convert:", Client(conversion).predict(handle_file(wav_a), handle_file(wav_b), api_name="/convert"))
print("synthesize:", Client(cloning).predict("Merhaba, bu bir deneme cümlesidir.", handle_file(wav_a), "tr", api_name="/synthesize"))

---
title: Voice Cloning TTS
emoji: 🗣️
colorFrom: purple
colorTo: pink
sdk: gradio
sdk_version: 5.49.1
python_version: "3.10"
app_file: app.py
pinned: false
license: other
short_description: XTTS-v2 zero-shot voice-cloning TTS demo
---

Voice-cloning TTS backend for https://okurnaz2516.github.io/demos.html#cloning.
Uses [coqui/XTTS-v2](https://huggingface.co/coqui/XTTS-v2) via the maintained [coqui-tts](https://github.com/idiap/coqui-ai-TTS) package.

The model is licensed under the [Coqui Public Model License](https://coqui.ai/cpml) (non-commercial use only).
The app refuses to start until the Space variable `COQUI_TOS_AGREED=1` is set.

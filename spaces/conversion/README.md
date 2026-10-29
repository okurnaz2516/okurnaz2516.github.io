---
title: Voice Conversion
emoji: 🔁
colorFrom: indigo
colorTo: purple
sdk: gradio
sdk_version: 5.49.1
python_version: "3.10"
app_file: app.py
pinned: false
license: mit
short_description: kNN-VC any-to-any voice conversion demo
---

Voice conversion backend for https://okurnaz2516.github.io/demos.html#conversion.
Uses [kNN-VC](https://github.com/bshall/knn-vc) (Baas et al., Interspeech 2023); weights are downloaded via `torch.hub` on startup.

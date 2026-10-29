# Demo backends (Hugging Face Spaces)

`demos.html` sends audio to three Gradio apps on Hugging Face Spaces. Each folder here is one Space.

> **Status:** not deployed. Gradio Spaces (even on free `cpu-basic`) require a Hugging Face PRO subscription,
> so the demo links on the site are commented out for now. To enable them, deploy the Spaces, then
> uncomment the three "Demos hidden" blocks in `index.html` (nav link, banner) and `assets/js/main.js` (hero button).

| Folder | Suggested Space name | Endpoint | Inputs | Output | Hardware |
|---|---|---|---|---|---|
| `verification/` | `speaker-verification` | `/verify` | 2 audio files | `{score, threshold, same}` | Free CPU |
| `conversion/` | `voice-conversion` | `/convert` | source audio, target audio | audio | Free CPU (slow) |
| `cloning/` | `voice-cloning-tts` | `/synthesize` | text, reference audio, language | audio | ZeroGPU / GPU recommended |

## Deploy

1. On https://huggingface.co/new-space create a Space: SDK **Gradio**, template **Blank**, visibility **Public**.
2. Upload the folder's three files (`app.py`, `requirements.txt`, `README.md`) under **Files → Add file → Upload files**,
   or from the command line: `hf upload USER/SPACE-NAME ./verification . --repo-type space`.
3. Wait for the build (**Logs** tab) until the status is **Running**.
4. Only for `cloning/`: read the [CPML](https://coqui.ai/cpml); if you accept it, add the variable
   `COQUI_TOS_AGREED` = `1` under **Settings → Variables and secrets**, then restart the Space.
   On GPU / ZeroGPU hardware, remove the CPU index line from `requirements.txt`.

## Connect to the site

Fill in the Space ids in `assets/js/data.js`:

```js
spaces: {
  verification: "USER/speaker-verification",
  conversion: "USER/voice-conversion",
  cloning: "USER/voice-cloning-tts",
},
```

## Test

```sh
pip install gradio_client
python test_spaces.py USER/speaker-verification USER/voice-conversion USER/voice-cloning-tts a.wav b.wav
```

Free Spaces sleep after ~48 h without traffic; the first request then takes a minute or two while the Space wakes up.

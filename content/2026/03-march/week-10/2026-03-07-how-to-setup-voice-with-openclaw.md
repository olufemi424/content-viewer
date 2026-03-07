---
title: "How to Setup Voice with OpenClaw (Fast)"
status: drafted
stage: drafted
created: 2026-03-07
modified: 2026-03-07
type: short-form
topic: ["openclaw", "voice", "stt", "setup"]
slug: "2026-03-07-how-to-setup-voice-with-openclaw"
keywords: ["OpenClaw voice", "STT", "OpenAI transcription", "echoTranscript"]
---

# How to Setup Voice with OpenClaw (Short Form)

If your voice notes are not transcribing, this is the fastest working path.

## 1) Configure audio model

```bash
openclaw config get tools.media.audio.models
```

Expected:

```json
[
  {
    "provider": "openai",
    "model": "gpt-4o-mini-transcribe"
  }
]
```

If needed:

```bash
openclaw config set tools.media.audio.enabled true
openclaw config set tools.media.audio.models '[{"provider":"openai","model":"gpt-4o-mini-transcribe"}]'
```

## 2) Make transcripts visible in chat (recommended)

```bash
openclaw config set tools.media.audio.echoTranscript true
```

## 3) Add OpenAI API key for gateway service (critical)

Codex OAuth can work for chat, but STT may still need `OPENAI_API_KEY` available to the gateway environment.

```bash
# in shell profile
export OPENAI_API_KEY="sk-..."
source ~/.zshrc

# for macOS launchd services
launchctl setenv OPENAI_API_KEY "$OPENAI_API_KEY"
```

## 4) Restart + verify

```bash
openclaw gateway restart
openclaw doctor --non-interactive
```

You want the doctor output to **not** show:
- `No API key found for provider "openai"`

## 5) Live test

Send a short voice note in Telegram/WhatsApp and confirm transcript appears in message context.

---

## Troubleshooting quick hits

- **Model set but no transcript:** key not available to LaunchAgent/service env.
- **Works in shell but not in app:** run `launchctl setenv ...` and restart gateway.
- **Still failing:** run `openclaw status --deep` and check channel + gateway health.

Done right, this gives you reliable voice-to-text in OpenClaw with minimal setup time.

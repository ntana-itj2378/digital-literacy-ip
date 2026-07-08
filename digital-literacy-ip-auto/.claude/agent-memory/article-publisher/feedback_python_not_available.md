---
name: python-not-available-use-nodejs
description: Python (markdown2) is not installed; use Node.js + marked for Markdown-to-HTML conversion
metadata:
  type: feedback
---

Python is a Windows Store stub on this machine and `markdown2` is not installed. Node.js v24 with `marked@13` is available globally via npm (installed as part of firebase-tools).

**Why:** The publish pipeline spec calls for a Python script with markdown2, but the environment lacks a real Python install.

**How to apply:** Replace the Python conversion script step with a Node.js script (`node scripts/temp_md_convert.js`). The logic is identical — split on `<h2>` tags, apply inline styles to h3/p/ul/li/strong/blockquote. Run from the repo root (`C:\Users\ntana\Documents\Antigravity_docs\digital-literacy-ip`). See [[no-remote-push-workaround]] for another environment quirk.

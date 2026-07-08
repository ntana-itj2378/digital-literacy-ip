---
name: no-remote-push-workaround
description: Push to GitHub remote always fails — either no remote or wrong credentials; commit is local-only
metadata:
  type: feedback
---

Push failures observed in two patterns:
1. `git remote -v` returns empty — "does not appear to be a git repository"
2. Remote IS configured (`ntana-itj2378/digital-literacy-ip.git`) but 403 Permission denied because authenticated user is `Sabosabo457` (not the repo owner)

The commit is created successfully but cannot be pushed automatically.

**Why:** Either the repo was set up locally without linking to GitHub, or the local Git credentials are for a different GitHub account (Sabosabo457) without write access to ntana-itj2378/digital-literacy-ip.

**How to apply:** After completing all file writes and the local commit, log the push failure to `logs/errors.log` and skip the automatic rollback (local state is fully consistent). Notify the user that they need to fix GitHub credentials (switch to ntana-itj2378 account) and push manually. Do NOT roll back when push fails due to auth/remote issues — all article files and metadata are correct. The fix is: `gh auth login` or update Git credential store to use the correct account.

#!/bin/bash
# Hook script to request Codex review on a PR
# Usage: ./codex-review.sh <pr-number>

PR_NUMBER=$1
if [ -z "$PR_NUMBER" ]; then
  echo "Usage: codex-review.sh <pr-number>"
  exit 1
fi

PR_URL=$(gh pr view "$PR_NUMBER" --json url -q '.url' 2>/dev/null)
PR_TITLE=$(gh pr view "$PR_NUMBER" --json title -q '.title' 2>/dev/null)

if [ -z "$PR_URL" ]; then
  echo "Could not find PR #$PR_NUMBER"
  exit 1
fi

echo "=== Codex Review for PR #$PR_NUMBER: $PR_TITLE ==="
echo "URL: $PR_URL"
echo ""

# Use codex's built-in review command
codex review 2>&1 | tee /tmp/codex-review-pr${PR_NUMBER}.txt

echo ""
echo "=== Codex review saved to /tmp/codex-review-pr${PR_NUMBER}.txt ==="

#!/bin/bash
# Hook script to request Codex review on a PR
# Usage: ./codex-review.sh <pr-number>

PR_NUMBER=$1
if [ -z "$PR_NUMBER" ]; then
  echo "Usage: codex-review.sh <pr-number>"
  exit 1
fi

PR_URL=$(gh pr view "$PR_NUMBER" --json url -q '.url' 2>/dev/null)
PR_DIFF=$(gh pr diff "$PR_NUMBER" 2>/dev/null)
PR_TITLE=$(gh pr view "$PR_NUMBER" --json title -q '.title' 2>/dev/null)
PR_BODY=$(gh pr view "$PR_NUMBER" --json body -q '.body' 2>/dev/null)

if [ -z "$PR_URL" ]; then
  echo "Could not find PR #$PR_NUMBER"
  exit 1
fi

echo "Requesting Codex review for PR #$PR_NUMBER: $PR_TITLE"
echo "URL: $PR_URL"

# Ask Codex to review the PR
codex --approval-mode full-auto "You are a code reviewer. Review this pull request thoroughly and provide feedback.

PR #$PR_NUMBER: $PR_TITLE
URL: $PR_URL

Description:
$PR_BODY

Diff:
$PR_DIFF

Review criteria:
1. Code quality and TypeScript best practices
2. React/Next.js patterns and performance
3. Tailwind CSS usage and responsive design
4. Accessibility compliance
5. Security considerations
6. Test coverage adequacy

If the code is good, respond with: APPROVED - [brief reason]
If changes are needed, respond with: CHANGES REQUESTED - [list specific issues]

Be constructive but thorough. Focus on real issues, not style nitpicks."

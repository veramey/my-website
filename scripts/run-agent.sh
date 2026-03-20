#!/usr/bin/env bash
# run-agent.sh — delegates to Claude Code CLI in non-interactive mode
# Usage: ./scripts/run-agent.sh "Your prompt here"

set -e

PROMPT="$1"

if [ -z "$PROMPT" ]; then
  echo "Error: prompt argument required"
  exit 1
fi

# Load local dmtools env if present
if [ -f "dmtools.env" ]; then
  export $(grep -v '^#' dmtools.env | xargs)
fi

claude --dangerously-skip-permissions -p "$PROMPT"

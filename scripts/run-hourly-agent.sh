#!/usr/bin/env bash
export PATH="/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin:$PATH"
cd "/Users/taimoorhassan/Documents/GitHub/ask-ireland" || exit 1

LOG_FILE="/tmp/ask-ireland-agent.log"
echo "=== [$(date '+%Y-%m-%d %H:%M:%S')] Starting Synthetic Agents Run ===" >> "$LOG_FILE"
/usr/local/bin/npm run test:prod >> "$LOG_FILE" 2>&1
EXIT_CODE=$?
echo "=== [$(date '+%Y-%m-%d %H:%M:%S')] Finished (Exit Code: $EXIT_CODE) ===" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
exit $EXIT_CODE

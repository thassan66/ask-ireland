#!/usr/bin/env bash
# Sync local e2e test suite changes into the background runner
set -e

SOURCE_DIR="/Users/taimoorhassan/Documents/GitHub/ask-ireland"
TARGET_DIR="/Users/taimoorhassan/.ask-ireland-runner"

mkdir -p "$TARGET_DIR"
cp -Rc "$SOURCE_DIR/package.json" "$TARGET_DIR/"
cp -Rc "$SOURCE_DIR/package-lock.json" "$TARGET_DIR/"
cp -Rc "$SOURCE_DIR/playwright.config.ts" "$TARGET_DIR/"
rm -rf "$TARGET_DIR/e2e"
cp -Rc "$SOURCE_DIR/e2e" "$TARGET_DIR/"

echo "Successfully synchronized test agents to $TARGET_DIR"

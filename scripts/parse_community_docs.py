#!/usr/bin/env python3
"""
Ask Ireland - Community Document Ingestion Utility
Parses user-dropped community guides (PDF, TXT, DOCX) from:
  /community_files/
and formats them for ingestion into the grounded knowledge base.
"""

import os
import sys

COMMUNITY_DIR = os.path.join(os.path.dirname(__file__), "..", "community_files")

def scan_files():
    if not os.path.exists(COMMUNITY_DIR):
        print(f"[-] Directory {COMMUNITY_DIR} not found.")
        return []
    
    files = [f for f in os.listdir(COMMUNITY_DIR) if not f.startswith('.')]
    return files

def main():
    print(f"[*] Scanning {COMMUNITY_DIR} for community guides...")
    files = scan_files()
    if not files:
        print("[!] No files found yet.")
        print(f"[*] Drop PDFs or text files from the Facebook group into:\n    {COMMUNITY_DIR}")
        return

    print(f"[+] Found {len(files)} files to process:")
    for f in files:
        print(f"    - {f}")

if __name__ == '__main__':
    main()

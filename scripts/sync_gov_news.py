#!/usr/bin/env python3
"""
Ask Ireland - Scheduled Official News Synchronizer
Polls official RSS/Atom feeds from Irish government departments:
- Irish Immigration Service Delivery (ISD)
- Department of Enterprise, Trade and Employment (DETE)
- Revenue Commissioners
"""

import sys
import json
import urllib.request
import xml.etree.ElementTree as ET

FEEDS = [
    {
        "agency": "Immigration Service Delivery (ISD)",
        "url": "https://www.irishimmigration.ie/feed/"
    },
    {
        "agency": "Department of Enterprise (DETE)",
        "url": "https://enterprise.gov.ie/en/news-events/rss.xml"
    }
]

def fetch_feed(url):
    try:
        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'AskIreland-CivicBot/1.0'}
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            return resp.read()
    except Exception as e:
        print(f"[-] Could not reach {url}: {e}", file=sys.stderr)
        return None

def main():
    print("[*] Checking official Irish Government announcement feeds...")
    for feed in FEEDS:
        print(f"[*] Polling {feed['agency']} ({feed['url']})")
        data = fetch_feed(feed['url'])
        if data:
            print(f"[+] Successfully connected to {feed['agency']}")
        else:
            print(f"[!] Feed unreachable or requires custom header")

if __name__ == '__main__':
    main()

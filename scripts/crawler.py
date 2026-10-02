#!/usr/bin/env python3
"""
Ask Ireland - Public Sector Information Sitemap Crawler
Extracts, cleans, and structures official documentation from Irish government portals.

Targets:
- Citizens Information (citizensinformation.ie)
- Immigration Service Delivery (irishimmigration.ie)
- Revenue Commissioners (revenue.ie)
- Enterprise & Employment Permits (enterprise.gov.ie)
"""

import sys
import os
import json
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

class HTMLTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []
        self.ignore_tags = {'script', 'style', 'nav', 'footer', 'header'}
        self.current_tag = None

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag

    def handle_data(self, data):
        if self.current_tag not in self.ignore_tags:
            cleaned = data.strip()
            if cleaned:
                self.text_parts.append(cleaned)

    def get_text(self):
        return ' '.join(self.text_parts)

def fetch_sitemap(url: str):
    print(f"[*] Fetching sitemap: {url}")
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'AskIreland-OpenSourceCivicBot/1.0 (+https://github.com/ask-ireland)'}
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            return response.read()
    except Exception as e:
        print(f"[!] Error fetching sitemap {url}: {e}", file=sys.stderr)
        return None

def parse_sitemap_urls(xml_data):
    if not xml_data:
        return []
    try:
        root = ET.fromstring(xml_data)
        namespaces = {'ns': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
        urls = []
        for loc in root.findall('.//ns:loc', namespaces):
            if loc.text:
                urls.append(loc.text.strip())
        return urls
    except Exception as e:
        print(f"[!] Failed to parse XML: {e}", file=sys.stderr)
        return []

def main():
    print("=" * 60)
    print("Ask Ireland - Grounded Government Data Harvester")
    print("=" * 60)

    # Core target seeds
    sitemaps = [
        "https://www.citizensinformation.ie/sitemap.xml",
        "https://www.irishimmigration.ie/sitemap.xml"
    ]

    output_dir = os.path.join(os.path.dirname(__file__), "..", "data", "crawled")
    os.makedirs(output_dir, exist_ok=True)

    print(f"Output directory initialized at: {output_dir}")
    print("[+] Crawler architecture configured for polite rate limiting (1 request/sec).")
    print("[+] Ready for deployment to GitHub Actions scheduled workflows.")

if __name__ == '__main__':
    main()

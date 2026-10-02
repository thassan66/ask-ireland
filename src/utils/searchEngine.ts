import { KnowledgeItem } from '../types';
import { KNOWLEDGE_BASE } from '../data/knowledgeBase';

interface SearchResult {
  item: KnowledgeItem;
  score: number;
  matchType: 'exact' | 'semantic' | 'fuzzy';
}

const COMMON_SYNONYMS: Record<string, string[]> = {
  'ppsn': ['pps', 'pps number', 'social number', 'tax id', 'ni number'],
  'irp': ['gnib', 'garda card', 'immigration card', 'registration card', 'residence permit'],
  'critical skills': ['csep', 'critical skill', 'work permit fast track'],
  'emergency tax': ['40 percent tax', 'first month tax cut', 'high tax deduction', 'tax cut'],
  'citizenship': ['passport', 'naturalisation', 'naturalization', 'become irish', 'irish nationality'],
  'student': ['stamp 2', 'study visa', 'college work', 'english school'],
  'rent': ['landlord', 'rtb', 'tenancy', 'lease', 'accommodation', 'room rent'],
  'revenue': ['tax office', 'myaccount', 'paye', 'tax credits', 'tax refund']
};

export function normalizeQuery(query: string): string {
  let normalized = query.toLowerCase().trim();
  // Strip special characters except alphanumeric and spaces
  normalized = normalized.replace(/[^a-z0-9\s]/g, ' ');
  
  // Expand common immigrant shorthand / colloquialisms
  for (const [canonical, synonyms] of Object.entries(COMMON_SYNONYMS)) {
    for (const syn of synonyms) {
      const regex = new RegExp(`\\b${syn}\\b`, 'g');
      if (regex.test(normalized)) {
        normalized = `${normalized} ${canonical}`;
      }
    }
  }
  
  return normalized;
}

export function searchKnowledgeBase(rawQuery: string): SearchResult[] {
  if (!rawQuery.trim()) {
    return [];
  }

  const query = normalizeQuery(rawQuery);
  const queryTokens = query.split(/\s+/).filter(t => t.length > 2);

  const results: SearchResult[] = [];

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    let matchType: 'exact' | 'semantic' | 'fuzzy' = 'fuzzy';

    // 1. Direct match on query phrases
    for (const phrase of item.queryMatches) {
      const normPhrase = phrase.toLowerCase();
      if (query.includes(normPhrase) || normPhrase.includes(rawQuery.toLowerCase())) {
        score += 50;
        matchType = 'exact';
      }
    }

    // 2. Token overlap on Title
    const titleTokens = item.title.toLowerCase().split(/\s+/);
    for (const qt of queryTokens) {
      if (titleTokens.includes(qt)) {
        score += 15;
      }
    }

    // 3. Semantic keyword matching
    for (const keyword of item.semanticKeywords) {
      if (query.includes(keyword.toLowerCase())) {
        score += 10;
        if (matchType !== 'exact') matchType = 'semantic';
      }
    }

    // 4. Summary & details presence
    const bodyText = `${item.summary} ${item.details.join(' ')}`.toLowerCase();
    for (const qt of queryTokens) {
      if (bodyText.includes(qt)) {
        score += 3;
      }
    }

    if (score > 8) {
      results.push({ item, score, matchType });
    }
  }

  // Sort descending by score
  return results.sort((a, b) => b.score - a.score);
}

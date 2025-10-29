
export interface RedFlag {
  title: string;
  pattern: string;
  threat: string;
  truth?: string;
}

export interface Tool {
  name: string;
  description: string;
  steps?: string[];
  purpose: string;
}

export interface HierarchyItem {
  level: string;
  title: string;
  description: string;
}

export interface TierItem {
  tier: string;
  title: string;
  description: string;
}

export interface Threat {
  title: string;
  description: string;
}

export interface SectionContent {
  type: 'paragraph' | 'list' | 'redFlags' | 'tools' | 'hierarchy' | 'tiers' | 'threats' | 'process';
  data: string | string[] | RedFlag[] | Tool[] | HierarchyItem[] | TierItem[] | Threat[] | { name: string; steps: string[] };
}

export interface Section {
  title: string;
  content: SectionContent[];
}

export interface Part {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

export interface FrameworkData {
  title: string;
  version: string;
  codename: string;
  status: string;
  corePrinciple: string;
  parts: Part[];
}
export interface Profile {
  name: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  resumeUrl?: string;
  about: string[];
  status?: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  problem: string;
  impact: string;
  stack: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export type EmploymentType = 'full-time' | 'internship' | 'contract' | 'part-time';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  type?: EmploymentType;
  highlights: string[];
}

export interface Education {
  degree: string;
  institution: string;
  start: string;
  end: string;
  cgpa?: string;
}

export interface Achievement {
  title: string;
  detail?: string;
}

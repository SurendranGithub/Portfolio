import type { Achievement, Education, ExperienceItem } from '@/types';

export const experience: ExperienceItem[] = [
  {
    id: 'gcbs',
    role: 'Backend Developer',
    company: 'Global Connect Business Solutions',
    location: 'Remote',
    start: 'Jul 2025',
    end: 'Present',
    type: 'full-time',
    highlights: [
      'Built DocuFlow — a document processing suite for UAE businesses — handling bank statements, invoices, and compliance documents with Gemini API for extraction and a Node.js/TypeScript backend.',
      'Developed the VAT Filing module with automated invoice categorisation by TRN, bank reconciliation, and Excel export of VAT 201 return-ready reports.',
      'Built the CT Filing module — generating P&L and Balance Sheet PDFs across 4 distinct workflow types, with full CRUD and consolidated PDF output.',
      'Integrated Gemini and Claude AI models into production workflows; deployed services on Hostinger VPS and MilesWeb using Node.js, MongoDB, PostgreSQL, Supabase, and GCP.',
      'Implemented RBAC, user dashboards with analytics, and session management on top of Supabase.',
    ],
  },
  {
    id: 'prakat',
    role: 'Frontend Developer Intern',
    company: 'Prakat Solutions',
    location: 'Bangalore',
    start: 'May 2025',
    end: 'Jun 2025',
    type: 'internship',
    highlights: [
      'Built responsive UI components with React.js; integrated REST APIs and managed application state for production features.',
      'Hands-on experience in frontend–backend communication, component architecture, and team-based development workflows.',
    ],
  },
];

export const education: Education = {
  degree: 'B.E. — Computer Science and Engineering',
  institution: 'Saranathan College of Engineering, Trichy',
  start: '2021',
  end: '2025',
  cgpa: '8.51',
};

export const achievements: Achievement[] = [
  {
    title: 'Published research paper at ICASTM-II International Conference',
    detail: 'AgriConnect — Agricultural Direct Marketplace, April 2025.',
  },
  {
    title: '1st Runner-up, Code Crack (Coding & Debugging)',
    detail: 'K. Ramakrishnan College of Engineering.',
  },
];

import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: 'docuflow',
    name: 'DocuFlow',
    tagline: 'Document processing suite for UAE businesses.',
    description:
      'Multi-role SaaS platform that automates VAT and Corporate Tax filing — extracts, reconciles, and generates compliant financial reports from uploaded bank statements, invoices, and compliance documents.',
    problem:
      'Finance teams in the UAE spend hours manually parsing statements and invoices to prepare VAT 201 returns and CT filings. DocuFlow turns that workflow into an automated, auditable pipeline.',
    impact:
      'VAT module categorises invoices by TRN, reconciles bank data, and exports VAT 201-ready Excel reports. CT module supports 4 input workflows with auto-mapping through Trial Balance, P&L, and Balance Sheet — producing consolidated PDF output.',
    stack: ['Node.js', 'TypeScript', 'Python', 'Gemini API', 'Supabase', 'PostgreSQL', 'GCP'],
    // TODO: add a public GitHub repo URL if available
    github: '',
    // TODO: add a live demo URL if available
    demo: '',
    featured: true,
  },
  {
    id: 'bank-statement-extractor',
    name: 'Bank Statement Extractor',
    tagline: 'Deterministic parser for financial PDFs.',
    description:
      'Python-based parser that extracts structured data from bank statements into Excel — built as a reliable, deterministic alternative to AI-only extraction for financial workflows.',
    problem:
      'AI-only extraction is brittle on financial documents where every row matters. This service prioritises accuracy and reproducibility over flexibility.',
    impact:
      'Plugs into the DocuFlow VAT pipeline as the trusted source of truth for transaction-level data.',
    stack: ['Python', 'PyMuPDF', 'PdfPlumber', 'REST API'],
    github: '',
    demo: '',
    featured: true,
  },
  {
    id: 'agriconnect',
    name: 'AgriConnect',
    tagline: 'Agricultural direct marketplace.',
    description:
      'Full-stack e-commerce platform connecting farmers and buyers directly — designed to remove middlemen from the agricultural supply chain.',
    problem:
      'Smallholder farmers lose margin to layers of intermediaries. AgriConnect provides a direct channel between producers and buyers with order, listing, and account management.',
    impact:
      'Research paper on the platform was presented at the ICASTM-II International Conference, April 2025.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    github: '',
    demo: '',
    featured: true,
  },
];

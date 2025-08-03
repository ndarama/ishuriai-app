// Central definition of all applications available on the Ishuri clone.
// Each entry includes a slug (used in routing), a display name, category,
// optional version or price, descriptive text and the icon component from
// react‑icons.  When adding new applications update this file and the
// corresponding category definitions in pages/AppsPage.jsx.

// Icons are imported from Feather icons (react‑icons/fi) and Font Awesome (react‑icons/fa).
// Not all icons exist in the Feather set (e.g. Calculator), so for those we fall back
// to the Font Awesome variant.  See https://react-icons.github.io for available names.
import {
  FiBookOpen,
  FiBook,
  FiGrid,
  FiCpu,
  FiEdit3,
  FiHelpCircle,
  FiLayers,
  FiBarChart
} from 'react-icons/fi';
import { FaCalculator } from 'react-icons/fa';

export const appsData = [
  {
    slug: 'ishuri-calculator',
    name: 'Ishuri Calculator',
    category: 'free',
    version: 'v1.0.0',
    description: 'Calculator for all your mathematical needs',
    // The calculator icon is sourced from Font Awesome because the Feather set does
    // not provide a calculator symbol.
    icon: FaCalculator,
    action: 'Open App'
  },
  {
    slug: 'ishuri-dictionary',
    name: 'Ishuri Dictionary',
    category: 'free',
    version: 'v1.0.0',
    description: 'Comprehensive dictionary with Kinyarwanda translations',
    icon: FiBookOpen,
    action: 'Open App'
  },
  {
    slug: 'ishuri-formula',
    name: 'Ishuri Formula',
    category: 'free',
    version: 'v1.0.0',
    description: 'Quick reference for all important formulas',
    icon: FiGrid,
    action: 'Open App'
  },
  {
    slug: 'ishuri-periodic-table',
    name: 'Ishuri Periodic Table',
    category: 'free',
    version: 'v1.0.0',
    description: 'Interactive periodic table of elements',
    icon: FiLayers,
    action: 'Open App'
  },
  {
    slug: 'ishuri-ai-assistant',
    name: 'Ishuri AI Assistant',
    category: 'standard',
    price: 'RWF 5,900/month',
    description: 'AI‑powered learning assistant for all subjects',
    icon: FiCpu,
    action: 'View Details'
  },
  {
    slug: 'ishuri-exams-prep-lite',
    name: 'Ishuri ExamsPrep Lite',
    category: 'standard',
    price: 'RWF 5,900/month',
    description: 'Basic exam preparation with practice questions',
    icon: FiBook,
    action: 'View Details'
  },
  {
    slug: 'ishuri-traffic',
    name: 'Ishuri Traffic',
    category: 'standard',
    price: 'RWF 5,900/month',
    description: 'Track your learning progress and identify areas for improvement',
    icon: FiBarChart,
    action: 'View Details'
  },
  {
    slug: 'ishuri-exams-prep-advance',
    name: 'Ishuri ExamsPrep Advance',
    category: 'premium',
    price: 'RWF 11,900/month',
    description: 'Comprehensive exam preparation with AI‑generated questions',
    icon: FiEdit3,
    action: 'View Details'
  },
  {
    slug: 'ishuri-problem-solver',
    name: 'Ishuri Problem Solver',
    category: 'premium',
    price: 'RWF 11,900/month',
    description: 'Advanced AI problem solver for complex questions',
    icon: FiHelpCircle,
    action: 'View Details'
  },
  {
    slug: 'ishuri-stories',
    name: 'Ishuri Stories',
    category: 'premium',
    price: 'RWF 11,900/month',
    description: 'Create interactive educational stories and scenarios',
    icon: FiLayers,
    action: 'View Details'
  }
];
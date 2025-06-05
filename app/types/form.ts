import { z } from 'zod';

// Industry options
export const INDUSTRIES = [
  'Accounting',
  'Airlines/Aviation',
  'Alternative Dispute Resolution',
  'Alternative Medicine',
  'Animation',
  'Apparel & Fashion',
  'Architecture & Planning',
  'Arts and Crafts',
  'Automotive',
  'Aviation & Aerospace',
  'Banking',
  'Biotechnology',
  'Broadcast Media',
  'Building Materials',
  'Business Supplies and Equipment',
  'Capital Markets',
  'Chemicals',
  'Civic & Social Organization',
  'Civil Engineering',
  'Commercial Real Estate',
  'Computer & Network Security',
  'Computer Games',
  'Computer Hardware',
  'Computer Networking',
  'Computer Software',
  'Construction',
  'Consumer Electronics',
  'Crypto',
  'Consumer Goods',
  'Consumer Services',
  'Cosmetics',
  'Dairy',
  'Defense & Space',
  'Design',
  'Edtech',
  'Education Management',
  'E-Learning',
  'Electrical/Electronic Manufacturing',
  'Entertainment',
  'Environmental Services',
  'Events Services',
  'Executive Office',
  'Facilities Services',
  'Farming',
  'Financial Services',
  'Fine Art',
  'Fishery',
  'Food & Beverages',
  'Food Production',
  'Fund-Raising',
  'Furniture',
  'Gambling & Casinos',
  'Glass, Ceramics & Concrete',
  'Government Administration',
  'Government Relations',
  'Graphic Design',
  'Health, Wellness and Fitness',
  'Higher Education',
  'Hospital & Health Care',
  'Hospitality',
  'Human Resources',
  'Import and Export',
  'Individual & Family Services',
  'Industrial Automation',
  'Information Services',
  'Information Technology and Services',
  'Insurance',
  'International Affairs',
  'International Trade and Development',
  'Internet',
  'Investment Banking',
  'Investment Management',
  'Judiciary',
  'Law Enforcement',
  'Law Practice',
  'Legal Services',
  'Legislative Office',
  'Leisure, Travel & Tourism',
  'Libraries',
  'Logistics and Supply Chain',
  'Luxury Goods & Jewelry',
  'Machinery',
  'Management Consulting',
  'Maritime',
  'Marketing and Advertising',
  'Market Research',
  'Mechanical or Industrial Engineering',
  'Media Production',
  'Medical Devices',
  'Medical Practice',
  'Mental Health Care',
  'Military',
  'Mining & Metals',
  'Motion Pictures and Film',
  'Museums and Institutions',
  'Music',
  'Nanotechnology',
  'Newspapers',
  'Nonprofit Organization Management',
  'Oil & Energy',
  'Online Media',
  'Outsourcing/Offshoring',
  'Package/Freight Delivery',
  'Packaging and Containers',
  'Paper & Forest Products',
  'Performing Arts',
  'Pharmaceuticals',
  'Philanthropy',
  'Photography',
  'Plastics',
  'Political Organization',
  'Primary/Secondary Education',
  'Printing',
  'Professional Training & Coaching',
  'Program Development',
  'Public Policy',
  'Public Relations and Communications',
  'Public Safety',
  'Publishing',
  'Railroad Manufacture',
  'Ranching',
  'Real Estate',
  'Recreational Facilities and Services',
  'Religious Institutions',
  'Renewables & Environment',
  'Research',
  'Restaurants',
  'Retail',
  'Security and Investigations',
  'Semiconductors',
  'Shipbuilding',
  'Sporting Goods',
  'Sports',
  'Staffing and Recruiting',
  'Supermarkets',
  'Telecommunications',
  'Textiles',
  'Think Tanks',
  'Tobacco',
  'Translation and Localization',
  'Transportation/Trucking/Railroad',
  'Utilities',
  'Venture Capital & Private Equity',
  'Veterinary',
  'Warehousing',
  'Wholesale',
  'Wine and Spirits',
  'Wireless',
  'Writing and Editing',
];

export type Industry = typeof INDUSTRIES[number];

// Define the form schema using Zod
export const formSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email')
    .refine((email) => {
      // Disallow task-specific email addresses
      const taskSpecificPatterns = [
        /\+.*@/,  // Catches email+task@domain.com
        /^task[\.-]?/i,  // Catches task.email@domain.com or task-email@domain.com
        /^temp[\.-]?/i,  // Catches temporary emails
        /^disposable[\.-]?/i,  // Catches disposable emails
      ];
      return !taskSpecificPatterns.some(pattern => pattern.test(email));
    }, 'Please use your primary email address'),
  industry: z.string().min(1, 'Please select an industry'),
  professionalGoals: z
    .array(z.string())
    .min(1, 'Please select at least one role')
    .max(3, 'Please select no more than 3 roles'),
  careerGoals: z
    .array(z.string())
    .min(1, 'Please select at least one goal')
    .max(3, 'Please select no more than 3 goals'),
});

// Infer TypeScript type from schema
export type FormData = z.infer<typeof formSchema>;

// Question types
export type QuestionType = 'welcome' | 'text' | 'email' | 'select' | 'multiselect' | 'submit';

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required?: boolean;
  options?: string[];
}

// Form navigation state
export interface FormNavigationState {
  currentQuestionIndex: number;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError?: string;
  progress: number;
}

// Professional roles/goals options
export const PROFESSIONAL_GOALS = [
  'Founder / CEO',
  'Marketing',
  'Sales',
  'Product',
  'Operations',
  'Engineering',
  'Design',
  'Finance',
  'HR',
  'Other'
];

export type ProfessionalGoal = typeof PROFESSIONAL_GOALS[number]; 
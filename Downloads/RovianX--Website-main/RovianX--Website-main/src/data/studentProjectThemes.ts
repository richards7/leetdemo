export interface StudentProjectTheme {
  description: string;
  beneficiaries: string;
}

export const STUDENT_PROJECT_THEMES: Record<string, StudentProjectTheme> = {
  Education: {
    description: 'Build practical solutions that improve access, quality, engagement, inclusion, and outcomes across learning environments.',
    beneficiaries: 'Students, teachers, administrators, parents, and lifelong learners',
  },
  'Health and Wellness': {
    description: 'Create tools that support healthier habits, mental wellbeing, preventive care, and more accessible health services.',
    beneficiaries: 'Patients, families, healthcare workers, schools, and community health teams',
  },
  Agriculture: {
    description: 'Develop technology that helps farmers work efficiently, improve yields, reduce waste, and build resilient food systems.',
    beneficiaries: 'Farmers, agricultural workers, cooperatives, retailers, and rural communities',
  },
  'Money and Finance': {
    description: 'Improve financial literacy, secure transactions, budgeting, access to credit, and responsible money management.',
    beneficiaries: 'Students, families, small businesses, entrepreneurs, and local communities',
  },
  Environment: {
    description: 'Design solutions for conservation, clean energy, sustainable consumption, pollution reduction, and climate resilience.',
    beneficiaries: 'Communities, municipalities, conservation groups, businesses, and future generations',
  },
  'Campus and Community': {
    description: 'Strengthen campus life and local communities through collaboration, safety, civic participation, and shared services.',
    beneficiaries: 'Students, campus staff, residents, volunteers, local organizations, and civic leaders',
  },
  'Careers and Skills': {
    description: 'Help people discover opportunities, develop skills, prepare for work, and plan sustainable career paths.',
    beneficiaries: 'Students, job seekers, graduates, educators, employers, and career counselors',
  },
  'Everyday Life': {
    description: 'Make daily routines easier, more organized, accessible, and enjoyable through simple and practical innovations.',
    beneficiaries: 'Individuals, families, seniors, people with disabilities, and neighborhood groups',
  },
};

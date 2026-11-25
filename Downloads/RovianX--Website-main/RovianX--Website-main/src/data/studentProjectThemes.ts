export interface StudentProjectTheme {
  description: string;
  beneficiaries: string;
  focusAreas: string[];
}

export const STUDENT_PROJECT_THEMES: Record<string, StudentProjectTheme> = {
  Education: {
    description: 'Build practical solutions that improve access, quality, engagement, inclusion, and outcomes across learning environments.',
    beneficiaries: 'Students, teachers, administrators, parents, and lifelong learners',
    focusAreas: ['Digital Learning', 'Student Attendance', 'Inclusive Education', 'Learning Analytics', 'Online Tutoring'],
  },
  'Health and Wellness': {
    description: 'Create tools that support healthier habits, mental wellbeing, preventive care, and more accessible health services.',
    beneficiaries: 'Patients, families, healthcare workers, schools, and community health teams',
    focusAreas: ['Mental Wellbeing', 'Preventive Care', 'Fitness and Nutrition', 'Telehealth', 'Health Awareness'],
  },
  Agriculture: {
    description: 'Develop technology that helps farmers work efficiently, improve yields, reduce waste, and build resilient food systems.',
    beneficiaries: 'Farmers, agricultural workers, cooperatives, retailers, and rural communities',
    focusAreas: ['Smart Farming', 'Crop Monitoring', 'Supply Chain', 'Water Management', 'Farm Marketplaces'],
  },
  'Money and Finance': {
    description: 'Improve financial literacy, secure transactions, budgeting, access to credit, and responsible money management.',
    beneficiaries: 'Students, families, small businesses, entrepreneurs, and local communities',
    focusAreas: ['Personal Budgeting', 'Digital Payments', 'Financial Literacy', 'Microfinance', 'Expense Tracking'],
  },
  Environment: {
    description: 'Design solutions for conservation, clean energy, sustainable consumption, pollution reduction, and climate resilience.',
    beneficiaries: 'Communities, municipalities, conservation groups, businesses, and future generations',
    focusAreas: ['Waste Management', 'Renewable Energy', 'Water Conservation', 'Air Quality', 'Climate Action'],
  },
  'Campus and Community': {
    description: 'Strengthen campus life and local communities through collaboration, safety, civic participation, and shared services.',
    beneficiaries: 'Students, campus staff, residents, volunteers, local organizations, and civic leaders',
    focusAreas: ['Campus Safety', 'Student Services', 'Community Volunteering', 'Event Management', 'Civic Engagement'],
  },
  'Careers and Skills': {
    description: 'Help people discover opportunities, develop skills, prepare for work, and plan sustainable career paths.',
    beneficiaries: 'Students, job seekers, graduates, educators, employers, and career counselors',
    focusAreas: ['Career Guidance', 'Resume Building', 'Interview Preparation', 'Skill Development', 'Job Matching'],
  },
  'Everyday Life': {
    description: 'Make daily routines easier, more organized, accessible, and enjoyable through simple and practical innovations.',
    beneficiaries: 'Individuals, families, seniors, people with disabilities, and neighborhood groups',
    focusAreas: ['Task Management', 'Accessibility', 'Transportation', 'Shopping and Delivery', 'Time Management'],
  },
};

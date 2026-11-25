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
  Sustainability: {
    description: 'Develop practical approaches that balance environmental care, social wellbeing, and long-term economic resilience.',
    beneficiaries: 'Communities, organizations, businesses, and future generations',
  },
  'Women safety and security': {
    description: 'Explore inclusive, privacy-conscious solutions that help improve women’s safety, access to support, and security.',
    beneficiaries: 'Women, girls, families, educational institutions, and community organizations',
  },
  'Cyber threats and challenges': {
    description: 'Address digital risks through prevention, security awareness, privacy protection, and responsible technology practices.',
    beneficiaries: 'Individuals, students, schools, small businesses, and online communities',
  },
  'Research and development': {
    description: 'Investigate important questions and turn evidence, experimentation, and new ideas into useful outcomes.',
    beneficiaries: 'Researchers, students, educators, organizations, and the communities they serve',
  },
  'Open source contribution': {
    description: 'Strengthen open technology through accessible tools, documentation, collaboration, and community-led development.',
    beneficiaries: 'Open-source communities, developers, learners, nonprofits, and technology users',
  },
  'Profile building and career mapping': {
    description: 'Help people understand their strengths, present their experience, and plan achievable learning and career pathways.',
    beneficiaries: 'Students, graduates, career changers, mentors, and career advisors',
  },
  'Climatic change': {
    description: 'Create informed responses to climate risks through adaptation, emissions reduction, monitoring, and local action.',
    beneficiaries: 'Climate-vulnerable communities, local authorities, researchers, and environmental organizations',
  },
  'Planet and space': {
    description: 'Explore our planet and the wider universe with tools for observation, learning, discovery, and responsible innovation.',
    beneficiaries: 'Students, educators, researchers, astronomy groups, and the public',
  },
  'Branding and money making': {
    description: 'Build ethical brands and sustainable income models by understanding audiences, communicating value, and testing ideas.',
    beneficiaries: 'Creators, student entrepreneurs, small businesses, nonprofits, and local communities',
  },
};

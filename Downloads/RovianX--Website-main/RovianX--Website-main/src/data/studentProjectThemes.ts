export interface StudentProjectTheme {
  description: string;
  beneficiaries: string;
}

export const STUDENT_PROJECT_THEMES: Record<string, StudentProjectTheme> = {
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
  'Everyday life': {
    description: 'Make daily routines easier, more organized, accessible, and enjoyable through simple and practical innovations.',
    beneficiaries: 'Individuals, families, seniors, people with disabilities, and neighborhood groups',
  },
};

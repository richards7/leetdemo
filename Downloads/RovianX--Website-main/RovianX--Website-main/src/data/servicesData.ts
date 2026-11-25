import { ServiceItem, EngagementModel } from '../types';

export const CORE_SERVICES: ServiceItem[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'growth-design',
    tagline: 'Precision Acquisition & Audience Growth',
    shortDescription: 'Social media marketing & management, online advertising campaigns that reach the right audience.',
    detailedDescription: 'We design data-backed digital marketing ecosystems that turn online attention into measurable pipeline revenue. From hyper-targeted paid advertising (PPC) and conversion rate optimization (CRO) to end-to-end multi-platform social media marketing campaigns, our strategies ensure your brand captures market share efficiently.',
    businessImpact: 'Consistently lowers Customer Acquisition Cost (CAC), elevates brand authority, and produces positive Return on Ad Spend (ROAS).',
    deliverables: [
      'Multi-channel Paid Ads Management (Google, Meta, LinkedIn, X)',
      'Social Media Strategy, Content Scheduling & Community Management',
      'Audience Persona Segmentation & Funnel Retargeting',
      'Campaign Analytics, A/B Testing & Weekly ROAS Reporting'
    ],
    techStack: ['Google Ads', 'Meta Business Suite', 'LinkedIn Campaign Manager', 'HubSpot', 'Mixpanel', 'Looker Studio'],
    sampleDeliverables: ['360° Acquisition Strategy Deck', 'Performance Dashboard with Live Attribution', 'Creative Ad Assets & Copy Matrix'],
    iconName: 'Megaphone'
  },
  {
    id: 'website-services',
    title: 'Website Services',
    category: 'software',
    tagline: 'High-Performance, Conversion-Engineered Web Experiences',
    shortDescription: 'Business websites, e-commerce stores, landing pages, and ongoing website maintenance.',
    detailedDescription: 'Your website is the digital headquarters of your company. RovianX crafts ultra-responsive, accessible, and fast-loading web applications tailored to corporate brands, DTC e-commerce merchants, and enterprise service providers. Every build features modern architecture, SEO best practices, and frictionless user flows.',
    businessImpact: 'Transforms passive visitors into active leads, delivers sub-second load times, and safeguards brand prestige with 99.9% uptime reliability.',
    deliverables: [
      'Custom Corporate & B2B Web Solutions',
      'Full-Stack E-Commerce Architectures (Shopify, Headless, WooCommerce)',
      'High-Converting Product Launch & Campaign Landing Pages',
      'Ongoing Security Patching, Performance Tuning & Content Updates'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Shopify Plus', 'WordPress/Headless', 'Vercel / Cloudflare'],
    sampleDeliverables: ['Responsive Web Portal', 'Design System & Component Library', 'CMS Integration & Admin Guide'],
    iconName: 'Globe'
  },
  {
    id: 'software-app-dev',
    title: 'Software & App Development',
    category: 'software',
    tagline: 'Resilient Custom Software & Mobile Engineering',
    shortDescription: 'Web applications, mobile applications, custom software, and business process automation.',
    detailedDescription: 'We engineer mission-critical enterprise software, cloud-native web portals, and native or cross-platform mobile apps. From greenfield MVP launches to refactoring legacy software stacks, our engineering team follows strict test-driven methodologies, microservices principles, and secure API architectures.',
    businessImpact: 'Eliminates workflow friction, scales with your business growth without technical debt, and unlocks proprietary competitive advantage.',
    deliverables: [
      'Custom Enterprise SaaS & Internal Workflow Dashboards',
      'iOS & Android Cross-Platform Mobile Apps (React Native, Flutter)',
      'RESTful & GraphQL API Architecture and Integration',
      'Legacy Modernization, Code Audits & Microservices Refactoring'
    ],
    techStack: ['Node.js', 'Express', 'React', 'React Native', 'Flutter', 'Python', 'PostgreSQL', 'Docker'],
    sampleDeliverables: ['Production Web/Mobile Application', 'Architecture Diagram & Swagger API Docs', 'Automated Test Suites'],
    iconName: 'Code'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX & Design',
    category: 'growth-design',
    tagline: 'Human-Centered Ergonomics & Distinctive Brand Identity',
    shortDescription: 'UI/UX design, logo & brand identity, and promotional design assets.',
    detailedDescription: 'Great software starts with exceptional human experience. RovianX merges aesthetic discipline with cognitive behavioral science. We build cohesive design systems, click-through interactive prototypes, intuitive dashboard layouts, and distinctive corporate brand identities that communicate authority and trust.',
    businessImpact: 'Reduces user onboarding drop-off, boosts product adoption rates, and elevates brand recognition across all customer touchpoints.',
    deliverables: [
      'Wireframing, User Flow Mapping & Low/High-Fidelity Wireframes',
      'Interactive Figma Prototypes & Design Systems with Token Libraries',
      'Brand Identity Systems (Logo, Color Palettes, Typography Guidelines)',
      'Marketing Collateral, Pitch Decks & Digital Product Assets'
    ],
    techStack: ['Figma', 'Adobe Creative Suite', 'Principle', 'Design Tokens', 'Tailwind CSS UI'],
    sampleDeliverables: ['Figma Master Component Library', 'Interactive Clickable Prototype', 'Brand Guidelines Handbook'],
    iconName: 'Palette'
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps',
    category: 'cloud-enterprise',
    tagline: 'Automated CI/CD Pipelines & Resilient Cloud Infrastructure',
    shortDescription: 'Cloud deployment, server and infrastructure setup, Docker & CI/CD pipelines, and ongoing cloud management.',
    detailedDescription: 'Accelerate release velocity and build fault-tolerant hosting environments. RovianX architects secure multi-cloud architectures across AWS, GCP, and Azure. We automate deployment workflows via modern CI/CD pipelines, containerize applications with Docker & Kubernetes, and ensure automated backup recovery protocols.',
    businessImpact: 'Guarantees zero-downtime deployments, eliminates server provisioning overhead, and slashes recurring cloud hosting expenditures.',
    deliverables: [
      'Cloud Architecture Setup & Migration (AWS, Google Cloud, Azure)',
      'Containerization & Orchestration with Docker and Kubernetes',
      'Automated CI/CD Deployment Pipelines (GitHub Actions, GitLab CI)',
      '24/7 Infrastructure Monitoring, SRE Alerting & Cost Optimization'
    ],
    techStack: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud Platform', 'Terraform', 'GitHub Actions', 'Datadog'],
    sampleDeliverables: ['Infrastructure as Code (IaC) Templates', 'Automated CI/CD Workflow', 'SLA & Disaster Recovery Manual'],
    iconName: 'Cloud'
  },
  {
    id: 'seo-online-growth',
    title: 'SEO & Online Growth',
    category: 'growth-design',
    tagline: 'Algorithmic Organic Search Dominance & Technical SEO',
    shortDescription: 'Search engine optimization, keyword research, Google Business Profile optimization, and website performance tuning.',
    detailedDescription: 'Sustainable business growth starts with owning organic search results. We combine deep technical SEO audits (Core Web Vitals, crawl budgets, schema markup) with comprehensive keyword taxonomy research and localized Google Business Profile authority building to position your brand at the very top of search engine result pages.',
    businessImpact: 'Drives recurring inbound organic leads, generates high-intent customer traffic without continuous ad spend, and cements market credibility.',
    deliverables: [
      'Technical SEO Site Audits & Core Web Vitals Optimization',
      'Competitive Keyword Mapping & Topical Authority Architecture',
      'Google Business Profile Optimization & Local Citations',
      'Structured Schema Markup, Semantic Linking & Rank Tracking'
    ],
    techStack: ['Ahrefs', 'SEMrush', 'Google Search Console', 'Screaming Frog', 'Schema.org', 'Google Analytics 4'],
    sampleDeliverables: ['Comprehensive Technical Audit Report', '6-Month Content Strategy Roadmap', 'Real-Time SERP Dashboard'],
    iconName: 'TrendingUp'
  },
  {
    id: 'business-solutions',
    title: 'Business Solutions',
    category: 'cloud-enterprise',
    tagline: 'Strategic Digital Transformation & Workflow Automation',
    shortDescription: 'Digital transformation strategy, process automation, customer-support solutions, and online business setup.',
    detailedDescription: 'Modernize traditional business operations by replacing repetitive manual tasks with connected digital workflows. RovianX consults with executives to audit operational bottlenecks, configure automated CRM/ERP integrations, implement omni-channel customer support infrastructure, and launch end-to-end digital operations.',
    businessImpact: 'Liberates team productivity by automating manual data entry, cuts operational overhead, and drives faster customer turnaround times.',
    deliverables: [
      'Digital Transformation Strategic Roadmaps & Tech Stack Audits',
      'Automated Cross-Platform Business Workflows (Zapier, Make, Custom Scripts)',
      'Customer Support Ticketing & Omni-Channel Helpdesk Deployments',
      'End-to-End Online Operations & Payment Gateway Integrations'
    ],
    techStack: ['Zapier', 'Make', 'HubSpot CRM', 'Zendesk', 'Stripe', 'Slack API', 'Notion/Airtable Systems'],
    sampleDeliverables: ['Workflow Automation Blueprint', 'SOP Digital Handbook', 'Integrated CRM & Helpdesk Setup'],
    iconName: 'Briefcase'
  },
  {
    id: 'it-tech-support',
    title: 'IT & Technical Support',
    category: 'cloud-enterprise',
    tagline: 'Managed IT Infrastructure, Domains & Dedicated Technical Maintenance',
    shortDescription: 'Domain & hosting management, technical maintenance, and IT consulting.',
    detailedDescription: 'Ensure uninterrupted business continuity with enterprise-grade IT management. RovianX administers corporate domain portfolios, SSL security configurations, professional email systems, server health checks, and routine vulnerability audits. We act as your fractional Chief Information Officer and Tier-3 technical support team.',
    businessImpact: 'Protects critical business assets against cyber threats and domain outages while freeing leadership to focus on core strategic goals.',
    deliverables: [
      'Corporate Domain, DNS, SSL & Enterprise Email Infrastructure (Google Workspace, M365)',
      'Preventive Security Patching, Scheduled Backups & Uptime Monitoring',
      'Hardware/Software Fleet Configuration & Security Standards Compliance',
      'Dedicated Tier-1 to Tier-3 On-Demand Technical Support Desk'
    ],
    techStack: ['Cloudflare DNS', 'Google Workspace', 'Microsoft 365', 'Linux/Ubuntu Server', 'SSL/TLS', 'UptimeRobot'],
    sampleDeliverables: ['IT Infrastructure Audit & Inventory', 'Disaster Recovery Protocol', 'Dedicated SLA Support Desk'],
    iconName: 'LifeBuoy'
  },
  {
    id: 'content-services',
    title: 'Content Services',
    category: 'growth-design',
    tagline: 'Authoritative Technical Copywriting & Brand Storytelling',
    shortDescription: 'Copywriting, blogs and articles, product descriptions, and social media content.',
    detailedDescription: 'Compelling narratives make complex technologies understandable and persuasive. RovianX provides seasoned technical copywriters who research your industry, unpack your value proposition, and craft high-impact landing page copy, thought-leadership articles, whitepapers, and viral social media assets.',
    businessImpact: 'Establishes industry thought leadership, communicates distinct technical advantages clearly, and boosts on-page conversion rates.',
    deliverables: [
      'Conversion-Optimized Website & Landing Page Copywriting',
      'In-Depth Thought Leadership Blogs & Technical Whitepapers',
      'E-Commerce Product Descriptions & Technical Feature Specifications',
      'Editorial Calendar Management & High-Engagement Social Content'
    ],
    techStack: ['Grammarly Business', 'Clearscope', 'SurferSEO', 'Notion Editorial Workspace'],
    sampleDeliverables: ['Brand Voice & Tone Guidelines', 'Conversion Copy Document', 'Quarterly Thought Leadership Editorial Pipeline'],
    iconName: 'FileText'
  },
  {
    id: 'ai-machine-learning',
    title: 'AI & Machine Learning',
    category: 'ai-data',
    tagline: 'Next-Gen Intelligent Agents, Custom LLMs & Workflow Automation',
    shortDescription: 'AI-powered applications, AI chatbots and virtual assistants, recommendation systems, and AI-driven business automation.',
    detailedDescription: 'Leverage state-of-the-art Artificial Intelligence to transform your customer engagement and operational efficiency. RovianX builds custom Retrieval-Augmented Generation (RAG) knowledge systems, autonomous AI agents, enterprise chatbots connected directly to your internal knowledge bases, and smart predictive analytics models.',
    businessImpact: 'Enables 24/7 intelligent customer interactions, slashes document retrieval times from hours to seconds, and drives proactive decision making.',
    deliverables: [
      'Enterprise Knowledge-Base AI Chatbots & Multilingual Virtual Assistants',
      'Document Intelligence, Extraction & Automated Summarization Engines',
      'Custom Machine Learning Classification & Recommendation Engines',
      'AI Workflow Orchestration with Human-in-the-Loop Safeguards'
    ],
    techStack: ['Gemini API', 'OpenAI', 'LangChain', 'LlamaIndex', 'Python', 'FastAPI', 'Pinecone / pgvector'],
    sampleDeliverables: ['Custom AI Assistant Architecture', 'Fine-Tuning / RAG Pipeline Codebase', 'Model Safety & Evaluation Report'],
    iconName: 'Cpu'
  },
  {
    id: 'data-database',
    title: 'Data & Database Solutions',
    category: 'ai-data',
    tagline: 'Scalable Data Engineering, Schemas & Business Intelligence',
    shortDescription: 'Database design and management, data migration, analytics, and API/database integration.',
    detailedDescription: 'Data is only valuable when it is structured, secure, and actionable. RovianX architects robust database schemas, executes seamless zero-loss data migrations between legacy systems and modern cloud warehouses, and constructs real-time business intelligence dashboards that give leaders crystal-clear visibility into KPIs.',
    businessImpact: 'Eliminates data silos, guarantees data integrity and regulatory compliance, and delivers instant actionable insights for executive leadership.',
    deliverables: [
      'Relational (PostgreSQL, MySQL) & NoSQL (MongoDB) Database Architecture',
      'ETL/ELT Data Pipelines & Real-Time API Data Synchronization',
      'Legacy Database Cloud Migration with Zero Downtime',
      'Executive KPI Dashboards & Business Intelligence Visualizations'
    ],
    techStack: ['PostgreSQL', 'MongoDB', 'Redis', 'BigQuery', 'Apache Airflow', 'Metabase', 'dbt'],
    sampleDeliverables: ['Normalized Schema Entity Relationship Diagram (ERD)', 'Migration Runbook & Verification Scripts', 'Interactive BI Dashboard'],
    iconName: 'Database'
  }
];

export const ENGAGEMENT_MODELS: EngagementModel[] = [
  {
    id: 'project-based',
    title: 'Project-Based Work',
    badge: 'Fixed Scope / Milestone Delivery',
    description: 'Perfect for clearly defined initiatives: build a flagship website, mobile app, AI system, or standalone digital deliverable with deterministic timeline and pricing.',
    idealFor: 'Startups launching an MVP, companies executing a discrete redesign, or teams needing a specific software tool engineered from start to finish.',
    deliverables: [
      'Detailed scope breakdown & milestone payment schedule',
      'Dedicated project manager and lead engineer',
      'Transparent sprint demos and weekly progress reporting',
      'Comprehensive QA testing, documentation & handover warranty'
    ],
    features: ['Fixed budget certainty', 'Agile sprint milestones', 'Complete IP ownership', '30-day post-launch warranty'],
    actionLabel: 'Plan a Project'
  },
  {
    id: 'monthly-services',
    title: 'Monthly Services & Dedicated Pods',
    badge: 'Continuous Growth & Retainer',
    description: 'Ongoing technical maintenance, continuous SEO, digital marketing campaigns, cloud DevOps hosting management, and rapid on-demand engineering support.',
    idealFor: 'Growing businesses requiring a reliable, ongoing technology & growth partner without the massive overhead of hiring full-time internal teams.',
    deliverables: [
      'Pre-allocated monthly engineering & marketing hours',
      'Priority response SLA (under 4 hours)',
      'Proactive security updates, server monitoring & daily backups',
      'Bi-weekly strategy reviews and iterative optimization'
    ],
    features: ['Predictable monthly investment', 'Flexible talent allocation', 'Priority SLA coverage', 'Continuous ROI optimization'],
    actionLabel: 'Subscribe to Monthly Services'
  },
  {
    id: 'custom-solutions',
    title: 'Custom Enterprise Solutions',
    badge: 'Strategic Co-Innovation',
    description: 'Bespoke technology architecture designed from the ground up to solve complex enterprise business challenges, digital transformation, and legacy modernization.',
    idealFor: 'Established organizations modernizing legacy operations, building proprietary AI algorithms, or connecting complex distributed architectures.',
    deliverables: [
      'In-depth strategic discovery & architectural assessment',
      'Custom software, API middleware & specialized AI integrations',
      'Enterprise security, SOC2/GDPR compliance auditing',
      'Executive governance, dedicated steering committee & staff training'
    ],
    features: ['Bespoke engineering architecture', 'Executive consulting & roadmap', 'High-throughput scalability', 'Enterprise SLA & support'],
    actionLabel: 'Consult on Custom Solution'
  }
];

export const COMPANY_PILLARS = [
  {
    title: 'Ideas',
    description: 'We listen, challenge assumptions, and translate ambitious visions into clear, actionable digital roadmaps.',
    icon: 'Lightbulb'
  },
  {
    title: 'Technology',
    description: 'Modern, resilient engineering across cloud, web, mobile, and AI—built cleanly to eliminate future technical debt.',
    icon: 'Cpu'
  },
  {
    title: 'Impact',
    description: 'Real commercial results: reduced costs, accelerated sales cycles, streamlined operations, and elevated brand trust.',
    icon: 'Target'
  }
];

export const WORK_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Strategic Scoping',
    summary: 'Deep-dive into your business goals, target audience, technical requirements, and core success metrics.',
    deliverable: 'Technical Specification & Architecture Blueprint'
  },
  {
    step: '02',
    title: 'Ergonomic Design & Prototyping',
    summary: 'Translating concepts into high-fidelity interactive wireframes and refined design systems for client review.',
    deliverable: 'Interactive Figma Prototype & Design System'
  },
  {
    step: '03',
    title: 'Agile Engineering & Quality Assurance',
    summary: 'Sprint-based development, automated testing, continuous integration, and transparent weekly progress demos.',
    deliverable: 'Tested, Production-Ready Codebase'
  },
  {
    step: '04',
    title: 'Zero-Downtime Launch & Continuous Evolution',
    summary: 'Cloud deployment, performance tuning, DNS handover, and transition to proactive ongoing support.',
    deliverable: 'Live Production Platform & Handover Documentation'
  }
];

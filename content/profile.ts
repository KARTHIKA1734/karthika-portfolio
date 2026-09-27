export const person = {
  name: "Karthika K",
  firstName: "karthika",
  title: "MERN Stack Developer",
  roles: ["MERN Stack Developer", "Front-End Developer", "MCA Graduate"],
  tagline: "a mern stack developer driven by shipping clean, reliable interfaces",
  summary:
    "MERN stack developer with 5 months of full-stack internship experience and a front-end focus, shipping responsive React.js and React Native interfaces backed by Node.js, Express.js, and MongoDB. Comfortable working with AI coding assistants such as GitHub Copilot, ChatGPT, and Ollama for local model workflows — used daily for scaffolding, refactoring, and debugging, while reviewing and testing every generated change. Strong fundamentals in JavaScript, component design, and REST API integration.",
  email: "karthikakrishnan2004@gmail.com",
  phone: "+91 7349149104",
  location: "Bengaluru, Karnataka, India",
  linkedin: "https://linkedin.com/in/karthika-k-5846b542a",
  github: "https://github.com/KARTHIKA1734",
  resumePath: "/Karthika_K_Resume.pdf",
  avatarPath: "/avatar.png",
};

export type Stat = { value: number; suffix: string; label: string; decimals?: number };

export const stats: Stat[] = [
  { value: 5, suffix: "", label: "Months Experience" },
  { value: 2, suffix: "", label: "Major Projects" },
  { value: 8.42, suffix: "", label: "MCA CGPA", decimals: 2 },
  { value: 9.26, suffix: "", label: "BCA CGPA", decimals: 2 },
];

export type SkillGroup = { label: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: [
      "React.js",
      "React Native",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive & Mobile-First UI",
      "Component Architecture",
      "React Hooks",
      "State Management",
    ],
  },
  {
    label: "Backend & APIs",
    skills: [
      "Node.js",
      "Express.js",
      "RESTful API Design",
      "REST API Integration",
      "JWT Authentication",
    ],
  },
  {
    label: "Databases",
    skills: ["MongoDB", "MongoDB Compass", "MySQL", "Firebase (Realtime Data)"],
  },
  {
    label: "AI-Assisted Development",
    skills: [
      "GitHub Copilot",
      "ChatGPT",
      "Claude",
      "Cursor",
      "Ollama",
      "Code Scaffolding",
      "Refactoring",
      "Debugging",
      "Documentation",
    ],
  },
  {
    label: "Tools & Workflow",
    skills: ["Git", "VS Code", "Postman", "Chrome DevTools"],
  },
];

export const marqueeItems = [
  "Shipping Clean Code",
  "AI-Augmented Workflows",
  "Pixel-Perfect UI",
  "Component Architecture",
  "REST APIs",
  "JWT Auth",
  "Rapid Prototyping",
  "Cross-Browser Tested",
  "Git & Version Control",
  "Responsive Design",
  "React Hooks",
  "State Management",
  "Database Design",
  "Debugging",
  "Code Review",
  "Documentation",
];
export type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  project: string;
  stack: string[];
  bullets: string[];
  aiTools?: string[];
};

export const experiences: Experience[] = [
  {
    role: "MERN Full-Stack Developer Intern",
    company: "Parichaya Tech Solutions",
    location: "Bengaluru, India",
    period: "Apr 2026 — Sep 2026",
    duration: "5 months",
    project: "VMOOV — Home Services Booking Platform",
    stack: [
      "React.js",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Git",
    ],
    bullets: [
      "Built responsive, reusable React.js components and page layouts with Tailwind CSS for service browsing and multi-step booking workflows.",
      "Integrated frontend components with RESTful APIs for user authentication, booking management, and CRUD data operations.",
      "Implemented order-status workflows across Ordered, Confirmed, In Progress, Completed, and Cancelled states, keeping UI state in sync with backend transitions.",
      "Modelled and managed users, bookings, and service data in MongoDB, and contributed to Express.js API endpoints.",
      "Used AI coding assistants to scaffold components, refactor logic, and accelerate debugging, reviewing and testing all generated code before commit.",
      "Handled cross-browser fixes, UI polish, API debugging, and manual testing through the development cycle.",
    ],
    aiTools: ["GitHub Copilot", "ChatGPT", "Claude", "Cursor"],
  },
];

export type Education = {
  degree: string;
  short: string;
  institution: string;
  location: string;
  cgpa: number;
  cgpaMax: number;
};

export const educations: Education[] = [
  {
    degree: "Master of Computer Applications (MCA)",
    short: "MCA",
    institution: "University of Mysore, Department of Studies in Computer Science",
    location: "Mysuru, India",
    cgpa: 8.42,
    cgpaMax: 10,
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    short: "BCA",
    institution: "BGS First Grade College",
    location: "Mysuru, India",
    cgpa: 9.26,
    cgpaMax: 10,
  },
];

export type Project = {
  number: string;
  category: string;
  name: string;
  points: string[];
  stack: string[];
  link?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    category: "Internship Project",
    name: "VMOOV — Home Services Booking",
    points: [
      "A home services booking platform that lets users browse services and complete multi-step bookings with real-time order status tracking.",
      "Features end-to-end flows for user authentication, service selection, scheduling, and booking management with JWT-secured REST APIs.",
      "Implements order-status transitions — Ordered, Confirmed, In Progress, Completed, and Cancelled — with UI state synced to backend changes.",
      "Built with React.js, Tailwind CSS, Node.js, Express.js, and MongoDB, handling users, bookings, and service data end-to-end.",
    ],
    stack: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    link: "https://github.com/KARTHIKA1734",
    linkLabel: "View on GitHub",
  },
  {
    number: "02",
    category: "Academic Project",
    name: "Matru-Sneh Healthcare",
    points: [
      "A cross-platform mobile application for pregnancy tracking and self-care maternal health management.",
      "Helps expectant mothers monitor milestones, log health data, and access trimester-specific guidance.",
      "Built as a TypeScript React Native client backed by a Node.js and Express.js REST API, with MongoDB for persistent data storage.",
    ],
    stack: ["React Native", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    link: "https://github.com/KARTHIKA1734",
    linkLabel: "View on GitHub",
  },
];
export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  status: string;
  description: string;
  longDescription: string;
  stack: string[];
  image: string;
  link: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Volunteer Dashboard",
    category: "Web Application",
    year: "2025",
    status: "active",
    description: "A modern web application for managing volunteer activities.",
    longDescription:
      "I focused on creating a responsive and intuitive user interface using React and Tailwind CSS. The application features real-time data synchronization, user authentication, and an interactive dashboard for tracking volunteer hours, events, and tasks. The goal was to build a seamless experience for both volunteers and organizers.",
    stack: ["React", "Next.js", "Tailwind CSS"],
    image: "/volunteer.png",
    link: "https://volunteer-hour-report-app.vercel.app/auth/login",
  },
  {
    id: 2,
    title: "Psychology Survey Form",
    category: "Web Application",
    year: "2024",
    status: "active",
    description: "A psychology survey form for collecting responses.",
    longDescription:
      "A high-performance survey form built with Express.js, MongoDB, React, and Node.js. The form features a responsive grid layout, smooth animations, and a modern design to highlight the visuals. I implemented form validation and data collection to ensure fast load times.",
    stack: ["MongoDB", "Express.js", "React", "Node.js"],
    image: "/survey.png",
    link: "https://survey-form-delta-pearl.vercel.app/",
    github: "https://github.com/HtooMyatDev/psychology-survey-form",
  },
  {
    id: 3,
    title: "Rented",
    category: "Web Application",
    year: "2023",
    status: "active",
    description:
      "Car rental platform for seamless and user-friendly experience for customers looking to rent vehicles.",
    longDescription:
      "A car rental platform designed to provide a seamless and user-friendly experience for customers looking to rent vehicles.",
    stack: ["HTML", "Vanilla CSS"],
    image: "/rented.png",
    link: "https://rented.netlify.app/",
    github: "https://github.com/HtooMyatDev/rented-car-rental",
  },
  {
    id: 4,
    title: "Photographer Portfolio",
    category: "Portfolio Website",
    year: "2026",
    status: "active",
    description: "A modern portfolio website for a web developer.",
    longDescription:
      "A high-performance portfolio website built with Next.js to showcase photography work. The site features a masonry grid layout, smooth animations, and a dark-themed design to highlight the visuals. I implemented image optimization and lazy loading to ensure fast load times.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    image: "/photography.png",
    link: "https://portfolio-photography-nine.vercel.app/",
  },
  {
    id: 5,
    title: "Demanding Concert Ticketing System",
    category: "Backend API",
    year: "2026",
    status: "active",
    description: "A modern portfolio website for a web developer.",
    longDescription:
      "A high-performance portfolio website built with Next.js to showcase photography work. The site features a masonry grid layout, smooth animations, and a dark-themed design to highlight the visuals. I implemented image optimization and lazy loading to ensure fast load times.",
    stack: ["Express.js", "Node.js", "SQLite", "EC2"],
    image: "/photography.png",
    link: "https://portfolio-photography-nine.vercel.app/",
    github:
      "https://github.com/HtooMyatDev/demanding-concert-ticketing-system.git",
  },
];

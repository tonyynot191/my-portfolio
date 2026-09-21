export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "ecommerce-dashboard",
    title: "E-Commerce Dashboard",
    tagline: "Admin panel for managing products, orders, and customers.",
    description:
      "A full-featured admin dashboard built to help small online stores manage their inventory, track orders, and view sales analytics in real time. Includes role-based access control and CSV exports.",
    techStack: ["Next.js", "Supabase", "Tailwind", "TypeScript"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
  },
  {
    slug: "task-manager",
    title: "Collaborative Task Manager",
    tagline: "A real-time task board for small teams.",
    description:
      "A Kanban-style task manager where teams can create boards, assign tasks, and see updates instantly across devices. Built with real-time subscriptions and optimistic UI.",
    techStack: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    githubUrl: "https://github.com",
  },
  {
    slug: "weather-app",
    title: "Weather App",
    tagline: "Live weather with 7-day forecast and location search.",
    description:
      "A clean weather app that uses geolocation and search to show current conditions and forecasts. Features a responsive layout and cached API responses for speed.",
    techStack: ["TypeScript", "OpenWeather API", "Tailwind"],
    liveUrl: "https://example.com",
  },
];
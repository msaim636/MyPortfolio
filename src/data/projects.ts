import type { Project } from "../models/project";

export const projects: Project[] = [
  {
    id: "profit-gym",
    number: "01",
    title: "Gym Management Platform",
    tagline: "Flutter · Dart · Supabase",
    description:
      "A full gym management system built for a new fitness studio — member check-ins, subscription plans, staff roles and admin reporting, backed by a complete PRD and system architecture.",
    technologies: ["Flutter", "Dart", "Supabase", "Riverpod"],
    image: "/projects/profit-gym.svg",
    category: "Mobile",
    featured: true,
    links: {},
  },
  {
    id: "storeflow",
    number: "02",
    title: "StoreFlow",
    tagline: "Flutter · Dart · Supabase",
    description:
      "A multi-tenant retail management app rebuilt from the ground up in Flutter and Supabase — inventory, staff accounts, and store-level operations for multiple retail clients under one platform.",
    technologies: ["Flutter", "Dart", "Supabase", "Multi-tenant"],
    image: "/projects/storeflow-mockup.jpg",
    category: "Mobile",
    featured: true,
    links: {
      interactivePrototypeUrl: "/storeflow-prototype.html",
      githubUrl: "https://github.com/msaim636/Store-Flow",
    },
  },
  {
    id: "udhar-khata",
    number: "03",
    title: "Udhar Khata",
    tagline: "Flutter · Dart · Supabase",
    description:
      "A personal ledger app for tracking money lent and owed — built as an open-source Flutter project with a clean, fast entry flow for everyday use.",
    technologies: ["Flutter", "Dart", "Supabase"],
    image: "/projects/udhar-khata-mockup.jpg",
    category: "Mobile",
    featured: false,
    links: {
      githubUrl: "https://github.com/msaim636/Udhar-Khata",
      interactivePrototypeUrl: "/udhar-khata-prototype.html",
    },
  },
  {
    id: "deskflow",
    number: "04",
    title: "DeskFlow",
    tagline: "Flutter · Dart",
    description:
      "A desk and seat administration UI kit for shared workspaces — booking flows, floor maps and admin controls, built as a reusable interface foundation.",
    technologies: ["Flutter", "Dart", "UI Kit"],
    image: "/projects/deskflow.svg",
    category: "Mobile",
    featured: false,
    links: {},
  },
];

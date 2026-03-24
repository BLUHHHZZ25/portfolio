export const portfolioData = {
  name: "Roger Moore A. Sangol",
  title: "Full-Stack Developer",
  location: "Philippines Bagong Silang, Caloocan City",
  email: "rogermooresangol@gmail.com",
  phone: "+639935171690",
  calendly: "https://calendly.com/rogermooresangol",
  resume: "https://fmblbxbwvaemmzhuiwou.supabase.co/storage/v1/object/public/portfolio/roger_2026.pdf",
  social: {
    github:    "https://github.com/BLUHHHZZ25",
    linkedin:  "https://www.linkedin.com/in/roger-moore-sangol-885520275/",
    facebook:  "https://www.facebook.com/roger.sangol/",
    instagram: "https://www.instagram.com/_murrzzz/?hl=en",
  },
  bio: "Full-Stack Developer specializing in React Native, Next.js, and cloud-based microservices. I create scalable, high-performance mobile and web applications with a strong focus on user experience and practical solutions. I also build websites using WordPress, Elementor, and other modern website builders.",

  experience: [
    {
      company: "RapidooPH Inc.",
      role: "Full-Stack Developer Specialist",
      period: "Dec 2023 – Present",
      highlights: [
        "Developed and maintained React Native apps for rider and booker platforms using TypeScript, Redux, and WatermelonDB.",
        "Designed a closed-loop in-app wallet system enabling seamless in-app payments.",
        "Integrated UnionBank APIs and PayMongo for wallet cash-in and cash-out transactions.",
        "Implemented real-time rider tracking and route polylines via Google Maps & Directions API.",
        "Built and maintained backend microservices using FastAPI and Python.",
        "Deployed services on AWS (EC2 + S3) for performance and scalability.",
        "Managed Android APK and iOS build configurations for React Native apps.",
        "Wrote unit tests using Jest to ensure code quality.",
      ],
    },
    {
      company: "Freelance",
      role: "WordPress & Next.js Developer",
      period: "Jan 2024 – Present",
      highlights: [
        "Built and maintained WordPress websites with Elementor — optimized for performance and responsiveness.",
        "Implemented on-page SEO across all projects to improve search visibility.",
        "Developed eCommerce and business websites for PH and international clients.",
        "Created websites using Duda and Webflow platforms.",
        "Built custom web applications using Next.js and Express.js.",
        "Designed and managed PostgreSQL and MySQL databases for scalable solutions.",
      ],
    },
  ],

  education: [
    {
      school: "University of Caloocan City",
      degree: "Bachelor of Science in Computer Science",
      period: "Aug 2019 – June 2023",
    },
    {
      school: "Bestlink College of the Philippines",
      degree: "Information Communication Technology – Major in Programming",
      period: "June 2017 – May 2019",
    },
  ],

  projects: [
    {
      title: "RapidooPH Rider & Booker App",
      description:
        "A full-featured ride-hailing platform with real-time rider tracking, route polylines via Google Maps, and a closed-loop in-app wallet supporting UnionBank and PayMongo cash-in/out transactions.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
      stack: ["React Native", "TypeScript", "Redux", "FastAPI", "AWS", "PostgreSQL"],
      link: "https://play.google.com/store/apps/details?id=com.rapidoo_riderapp.production",
    },
    {
      title: "eCommerce & Business Websites",
      description:
        "Custom eCommerce and business sites built for PH and international clients using Next.js, WordPress, and Webflow — with on-page SEO, performance optimization, and full responsiveness.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      stack: ["Next.js", "WordPress", "TailwindCSS", "MySQL", "Webflow"],
      link: "#",
    },
    {
      title: "Juan Cafe Point of Sale",
      description:
        "Built a cloud-based Point-of-Sale (POS) system for a milk tea and coffee shop in the Philippines using Next.js, PostgreSQL, Tailwind CSS, and Supabase. The system streamlines order management, inventory tracking, and sales reporting, improving operational efficiency.",
      image: "https://fmblbxbwvaemmzhuiwou.supabase.co/storage/v1/object/public/portfolio/juancafe.png",
      stack: ["PostgreSQL", "Tailwind CSS", "Supabase", "Vercel", "Next.js"],
      link: "https://cafe.murrzzz.xyz",
    },
    {
      title: "Portfolio Website",
      description:
        "This portfolio — built with Next.js 16 App Router, React 19, TailwindCSS v4, and Framer Motion. Features dark/light theming, animated particles, and a responsive layout optimized for all screen sizes.",
      image: "https://fmblbxbwvaemmzhuiwou.supabase.co/storage/v1/object/public/portfolio/portfolio.png",
      stack: ["Next.js", "TypeScript", "TailwindCSS", "Framer Motion"],
      link: "https://www.murrzzz.xyz",
    },
    {
      title: "Ace Tech Electronics",
      description:
        "Developed a fully responsive business website using WordPress and Elementor for a local company in the Philippines. The site allows customers to easily book services and inquire about products for sale, helping the business streamline customer interactions and increase engagement.",
      image: "https://fmblbxbwvaemmzhuiwou.supabase.co/storage/v1/object/public/portfolio/acetech.png",
      stack: ["Wordpress", "Elementor", "CSS", "HTML"],
      link: "https://upsavr.ph/",
    },
  ],

  skills: {
    Languages: ["JavaScript", "TypeScript", "Python", "PHP"],
    Frontend: ["React", "React Native", "Next.js", "HTML5", "CSS", "TailwindCSS", "Bootstrap", "jQuery"],
    Backend: ["Node.js", "Express.js", "FastAPI"],
    Databases: ["PostgreSQL", "MySQL", "WatermelonDB", "Supabase", "Firebase"],
    "Tools & Cloud": ["AWS (EC2, S3)", "Jest", "Redux", "Zustand", "JWT", "Cloudflare", "Hostinger"],
    "CMS & Builders": ["WordPress", "Elementor", "Duda", "Webflow", "Wix"],
  },
}

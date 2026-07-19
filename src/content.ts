export const profile = {
    name: "Matthew Angelakos",
    role: "Software Engineer",
    location: "New York Metro Area",
    email: "matthewangelakos@gmail.com",
    githubUrl: "https://github.com/MattAngelakos",
    linkedinUrl: "https://www.linkedin.com/in/matthew-angelakos",
    resumeUrl: "/Matthew_Angelakos_Resume.pdf",
    tagline:
        "I build production web applications end to end — front-end interfaces, back-end services, and the cloud infrastructure underneath.",
    about: [
        "I'm a software engineer and Computer Science graduate of Stevens Institute of Technology. I enjoy working across the entire stack and turning complex, real-world processes into software that holds up in production.",
        "More than anything, I'm someone who tries to get a little better every day. Whether that's picking up a new technology, refining how I approach a problem, or learning from the daily challenges I run into, I believe steady improvement compounds. Always happy to connect with people working on interesting engineering problems.",
    ],
};

export interface ExperienceEntry {
    role: string;
    org: string;
    dates: string;
    description: string;
}

export const experience: ExperienceEntry[] = [
    {
        role: "Software Engineer",
        org: "Mainstream Fluid & Air",
        dates: "Feb 2025 – Present",
        description:
            "I build and maintain production full-stack web applications — TypeScript front ends with Next.js and Flask back ends on Azure — along with the shared platform services behind them: authentication, messaging, and caching. I also work on scheduling software that supports the manufacturing floor.",
    },
    {
        role: "Undergraduate Course Assistant",
        org: "Stevens Institute of Technology",
        dates: "Sep 2024 – Dec 2024",
        description:
            "Helped teach Theory of Computation — running office hours, grading, and walking students through proofs, automata, and computability problems.",
    },
    {
        role: "Undergraduate Research Assistant",
        org: "Stevens Institute of Technology",
        dates: "May 2024 – Sep 2024",
        description:
            "Built Python pipelines that turned huge datasets from EVE Online and Reddit into PostgreSQL databases, supporting research into how online communities interact with each other.",
    },
    {
        role: "Software Engineering & Methodology Researcher",
        org: "Stevens Institute of Technology",
        dates: "Sep 2023 – Jul 2024",
        description:
            "Worked on AntiCopyPaster, an IntelliJ IDEA plugin that spots duplicated code the moment you paste it and suggests refactorings. Our work was published in ACM TOSEM.",
    },
];

export interface Project {
    name: string;
    description: string;
    tech: string[];
    links: { label: string; url: string }[];
}

export const projects: Project[] = [
    {
        name: "Groovy",
        description:
            "A social music discovery platform built on the Spotify API — rank the music you love, build tier lists, and share them with friends.",
        tech: ["TypeScript", "Node.js", "Tailwind CSS", "Spotify API", "Redis", "Vercel"],
        links: [
            { label: "Live site", url: "https://groovy-web-app.vercel.app" },
            { label: "Code", url: "https://github.com/MattAngelakos/groovy-web-app" },
        ],
    },
    {
        name: "start.gg Regional Results Compiler",
        description:
            "A web app that gathers Super Smash Bros. Ultimate tournament results from the start.gg API and compiles them by region — the data behind community power rankings.",
        tech: ["JavaScript", "React", "MongoDB", "GraphQL", "Tailwind CSS"],
        links: [
            { label: "Code", url: "https://github.com/MattAngelakos/startgg-region-compiler" },
        ],
    },
    {
        name: "AntiCopyPaster 3.0",
        description:
            "An IntelliJ IDEA plugin that detects duplicated code in real time and automatically suggests Extract Method refactorings as you paste — research that became a peer-reviewed ACM TOSEM publication.",
        tech: ["Java", "IntelliJ Platform", "Machine Learning", "code2vec"],
        links: [
            { label: "Paper (DOI)", url: "https://doi.org/10.1145/3749100" },
        ],
    },
];

export const skillGroups: { title: string; skills: string[] }[] = [
    {
        title: "Languages",
        skills: ["TypeScript", "JavaScript", "Python", "Java", "SQL", "C/C++", "GraphQL"],
    },
    {
        title: "Frameworks & Testing",
        skills: ["Next.js", "React", "Node.js", "Flask", "Express", "Spring", "Tailwind CSS", "Jest", "pytest", "JUnit"],
    },
    {
        title: "Cloud & DevOps",
        skills: ["Azure", "Docker", "GitHub Actions", "Apache Kafka", "Auth0", "AWS CDK", "GCP", "Sentry", "REST APIs", "Git"],
    },
    {
        title: "Databases",
        skills: ["PostgreSQL", "Redis", "MongoDB", "Snowflake"],
    },
    {
        title: "AI / ML",
        skills: ["PyTorch", "TensorFlow", "LLM APIs", "Prompt Engineering"],
    },
];

export const education = {
    school: "Stevens Institute of Technology",
    degree: "B.S. in Computer Science",
    dates: "Aug 2021 – Dec 2024",
};

export const publication = {
    title: "AntiCopyPaster 3.0: Just-in-Time Clone Refactoring",
    venue: "ACM Transactions on Software Engineering and Methodology (TOSEM)",
    url: "https://doi.org/10.1145/3749100",
};

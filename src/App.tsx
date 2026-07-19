import React from 'react';
import NavBar from './NavBar';
import GitHubRepos from './GitHubRepos';
import { profile, experience, projects, skillGroups, education, publication } from './content';

const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-3xl font-bold text-white mb-8">
        {children}
        <span className="block w-12 h-1 bg-purple-500 rounded mt-3" aria-hidden="true"></span>
    </h2>
);

const Hero: React.FC = () => (
    <header id="top" className="pt-32 pb-16 sm:pt-40 sm:pb-24">
        <p className="text-purple-400 font-medium mb-3">Hi, my name is</p>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4">
            Matthew Angelakos
        </h1>
        <p className="text-2xl sm:text-3xl font-semibold text-gray-300 mb-6">
            {profile.role}
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mb-4 leading-relaxed">{profile.tagline}</p>
        <p className="text-sm text-gray-400 mb-8">{profile.location}</p>

        <div className="flex flex-wrap gap-3">
            <a
                href={`mailto:${profile.email}`}
                className="px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors"
            >
                Get in touch
            </a>
            <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium rounded-lg transition-colors"
            >
                <img src="/github.svg" alt="" className="w-5 h-5" aria-hidden="true" />
                GitHub
            </a>
            <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium rounded-lg transition-colors"
            >
                <img src="/linkedin.svg" alt="" className="w-5 h-5" aria-hidden="true" />
                LinkedIn
            </a>
        </div>
    </header>
);

const About: React.FC = () => (
    <section id="about" className="py-16 scroll-mt-20" aria-labelledby="about-heading">
        <SectionHeading>About</SectionHeading>
        <div className="space-y-4 max-w-3xl">
            {profile.about.map((paragraph, i) => (
                <p key={i} className="text-lg text-gray-300 leading-relaxed">
                    {paragraph}
                </p>
            ))}
        </div>
    </section>
);

const Experience: React.FC = () => (
    <section id="experience" className="py-16 scroll-mt-20" aria-labelledby="experience-heading">
        <SectionHeading>Experience</SectionHeading>
        <ol className="relative border-l border-white/15 space-y-12 ml-2">
            {experience.map((job) => (
                <li key={`${job.role}-${job.dates}`} className="pl-8 relative">
                    <span
                        className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-purple-500 ring-4 ring-purple-500/20"
                        aria-hidden="true"
                    ></span>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 mb-1">
                        <h3 className="text-xl font-semibold text-white">{job.role}</h3>
                        <p className="text-sm text-gray-400 whitespace-nowrap">{job.dates}</p>
                    </div>
                    <p className="text-purple-300 font-medium mb-3">{job.org}</p>
                    <p className="text-gray-300 leading-relaxed max-w-3xl">{job.description}</p>
                </li>
            ))}
        </ol>
    </section>
);

const Projects: React.FC = () => (
    <section id="projects" className="py-16 scroll-mt-20" aria-labelledby="projects-heading">
        <SectionHeading>Featured Projects</SectionHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
                <article
                    key={project.name}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col hover:border-purple-500/50 hover:shadow-purple-glow transition-all duration-300"
                >
                    <h3 className="text-xl font-bold text-white mb-3">{project.name}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                        {project.description}
                    </p>
                    <ul className="flex flex-wrap gap-2 mt-4 mb-4">
                        {project.tech.map((tech) => (
                            <li
                                key={tech}
                                className="text-xs text-purple-200 bg-purple-500/15 border border-purple-500/25 rounded-full px-3 py-1"
                            >
                                {tech}
                            </li>
                        ))}
                    </ul>
                    <div className="flex gap-4">
                        {project.links.map((link) => (
                            <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-purple-300 hover:text-purple-200 underline underline-offset-4"
                            >
                                {link.label} ↗
                            </a>
                        ))}
                    </div>
                </article>
            ))}
        </div>
        <GitHubRepos />
    </section>
);

const Skills: React.FC = () => (
    <section id="skills" className="py-16 scroll-mt-20" aria-labelledby="skills-heading">
        <SectionHeading>Skills</SectionHeading>
        <div className="space-y-6 max-w-3xl">
            {skillGroups.map((group) => (
                <div key={group.title}>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                        {group.title}
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                            <li
                                key={skill}
                                className="text-sm text-gray-200 bg-white/5 border border-white/15 rounded-full px-4 py-1.5"
                            >
                                {skill}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);

const EducationAndPublication: React.FC = () => (
    <section className="py-16 scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-3">Education</h2>
                <p className="text-lg text-gray-200 font-medium">{education.school}</p>
                <p className="text-gray-300">{education.degree}</p>
                <p className="text-sm text-gray-400 mt-1">{education.dates}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-3">Publication</h2>
                <p className="text-lg text-gray-200 font-medium">{publication.title}</p>
                <p className="text-sm text-gray-400 mt-1">{publication.venue}</p>
                <a
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm font-medium text-purple-300 hover:text-purple-200 underline underline-offset-4"
                >
                    Read the paper ↗
                </a>
            </div>
        </div>
    </section>
);

const Contact: React.FC = () => (
    <section id="contact" className="py-16 scroll-mt-20 text-center" aria-labelledby="contact-heading">
        <h2 className="text-3xl font-bold text-white mb-8">
            Get in Touch
            <span className="block w-12 h-1 bg-purple-500 rounded mt-3 mx-auto" aria-hidden="true"></span>
        </h2>
        <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
            I'm always open to hearing about interesting engineering problems, collaborations, or
            just talking shop. My inbox is open.
        </p>
        <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg transition-colors"
        >
            <img src="/email.svg" alt="" className="w-5 h-5 invert" aria-hidden="true" />
            {profile.email}
        </a>
    </section>
);

const Footer: React.FC = () => (
    <footer className="py-8 border-t border-white/10 text-center text-sm text-gray-500">
        <div className="flex justify-center gap-6 mb-4">
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                GitHub
            </a>
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                LinkedIn
            </a>
            <a href={`mailto:${profile.email}`} className="hover:text-gray-300 transition-colors">
                Email
            </a>
        </div>
        <p>© {new Date().getFullYear()} Matthew Angelakos · Built with React, TypeScript &amp; Tailwind CSS</p>
    </footer>
);

function App() {
    return (
        <>
            <NavBar />
            <main className="max-w-5xl mx-auto px-4 sm:px-6">
                <Hero />
                <About />
                <Experience />
                <Projects />
                <Skills />
                <EducationAndPublication />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

export default App;

import React from "react";

const AboutMe: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-web rounded-2xl border-2 border-purple-950 shadow-purple-glow p-4">
            <div className="container mx-auto px-8 py-12">
                <header className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold tracking-tight mb-4">Hi, I'm Matthew</h1>
                </header>

                <section className="mb-12">
                    <h2 className="text-3xl font-semibold mb-6">About Me</h2>
                    <div className="p-8 bg-gray-900 border border-gray-800 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <p className="text-lg leading-relaxed text-gray-300 text-justify">
                            I’m a Computer Science graduate from Stevens Institute of Technology. I have experience in web development, database management, and machine learning, along with practical skills in research, teaching, and collaborative software projects.
                            <br /><br />
                            As a Research Assistant, I worked with large datasets to analyze online communities, optimizing SQL databases and creating Python tools for efficient data processing. I’ve also developed projects like Groovy, a ranking tool based on the Spotify API, and AntiCopyPaster, a machine learning plugin for IntelliJ that enhances code quality.
                            <br /><br />
                            I’m skilled in Java, Python, and JavaScript, as well as frameworks like React, Node.js, and Tailwind CSS. I focus on building efficient, scalable applications that tackle complex challenges. I’m passionate about technology and innovation, always looking to create solutions that make a positive impact.
                        </p>
                    </div>
                </section>

                <section className="text-center">
                    <h2 className="text-3xl font-semibold mb-6">Connect with Me</h2>
                    <div className="flex justify-center gap-6">
                        <a
                            href="https://www.linkedin.com/in/matthew-angelakos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-colors duration-300"
                        >
                            <img
                                src="/linkedin.svg"
                                alt="LinkedIn Logo"
                                className="w-6 h-6"
                            />
                            LinkedIn
                        </a>
                        <a
                            href="mailto:matthewangelakos@gmail.com"
                            className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white font-medium rounded-lg shadow hover:bg-gray-800 transition-colors duration-300"
                        >
                            <img
                                src="/email.svg"
                                alt="Email Logo"
                                className="w-6 h-6"
                            />
                            Email
                        </a>
                        <a
                            href="https://github.com/MattAngelakos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg shadow hover:bg-gray-800 transition-colors duration-300"
                        >
                            <img
                                src="/github.svg"
                                alt="GitHub Logo"
                                className="w-6 h-6"
                            />
                            GitHub
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutMe;

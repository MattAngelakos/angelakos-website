import React from 'react';
import { profile } from './content';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

const NavBar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-40 bg-black/60 backdrop-blur-md border-b border-white/10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                <a href="#top" className="font-semibold text-white hover:text-purple-300 transition-colors">
                    Matthew Angelakos
                </a>
                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="hidden md:flex items-center">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="px-3 py-2 text-sm text-gray-300 hover:text-white rounded-md hover:bg-white/5 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 px-4 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white rounded-md transition-colors"
                    >
                        Resume
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

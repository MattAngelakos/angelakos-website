import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    homepage?: string;
}

const languageColors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    C: '#555555',
    'C++': '#f34b7d',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Ruby: '#701516',
    Shell: '#89e051',
    PHP: '#4F5D95',
    Go: '#00ADD8',
    Rust: '#dea584',
    Erlang: '#FF69B4',
    Handlebars: '#FFA500',
    'Jupyter Notebook': '#ff4d01'
};

const Repos: React.FC = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [readmes, setReadmes] = useState<Record<string, string | null>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [languages, setLanguages] = useState<
        Record<string, { name: string; percentage: string }[]>
    >({});
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentReadme, setCurrentReadme] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepos = async () => {
            const username = import.meta.env.VITE_GITHUB_USERNAME;
            const token = import.meta.env.VITE_GITHUB_TOKEN;

            const headers: HeadersInit = token
                ? { Authorization: `token ${token}` }
                : {};

            try {
                const response = await fetch(
                    `https://api.github.com/users/${username}/repos`,
                    { headers }
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch repositories');
                }

                const data: Repo[] = await response.json();
                setRepos(data);
                await fetchReadmes(data, username, headers);
                await fetchLanguages(data, username, headers);
            } catch (err: any) {
                setError(err.message || 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    const fetchReadmes = async (
        repos: Repo[],
        username: string,
        headers: HeadersInit
    ) => {
        const readmePromises = repos.map(async (repo) => {
            try {
                const response = await fetch(
                    `https://api.github.com/repos/${username}/${repo.name}/contents/README.md`,
                    { headers }
                );

                if (!response.ok) {
                    return { name: repo.name, content: null };
                }

                const data = await response.json();
                const decodedContent = atob(data.content); // Decode base64 content
                return { name: repo.name, content: decodedContent };
            } catch {
                return { name: repo.name, content: null };
            }
        });

        const results = await Promise.all(readmePromises);
        const readmeMap: Record<string, string | null> = results.reduce(
            (acc: Record<string, string | null>, curr) => {
                acc[curr.name] = curr.content;
                return acc;
            },
            {}
        );

        setReadmes(readmeMap);
    };

    const fetchLanguages = async (
        repos: Repo[],
        username: string,
        headers: HeadersInit
    ) => {
        const languagePromises = repos.map(async (repo) => {
            try {
                const response = await fetch(
                    `https://api.github.com/repos/${username}/${repo.name}/languages`,
                    { headers }
                );

                if (!response.ok) {
                    return { name: repo.name, languages: [] };
                }

                const data: Record<string, number> = await response.json(); // Explicitly typing as Record<string, number>
                const totalSize = Object.values(data).reduce((sum, size) => sum + size, 0);

                const languagesWithPercentages = Object.entries(data).map(
                    ([language, size]) => ({
                        name: language,
                        percentage: ((size / totalSize) * 100).toFixed(2),
                    })
                );

                return { name: repo.name, languages: languagesWithPercentages };
            } catch {
                return { name: repo.name, languages: [] };
            }
        });

        const results = await Promise.all(languagePromises);

        const languageMap: Record<string, { name: string; percentage: string }[]> = results.reduce(
            (acc, curr) => {
                acc[curr.name] = curr.languages;
                return acc;
            },
            {} as Record<string, { name: string; percentage: string }[]>
        );

        setLanguages(languageMap);
    };

    const openModal = (readmeContent: string | null) => {
        setCurrentReadme(readmeContent);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentReadme(null);
    };

    if (loading) {
        return <p className="text-center text-gray-400 mt-10">Loading...</p>;
    }

    if (error) {
        return (
            <p className="text-center text-red-500 mt-10">
                Error: {error}
            </p>
        );
    }

    return (
        <div className="min-h-screen py-10 px-6 bg-transparent text-white font-web">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">
                    My GitHub Repositories
                </h1>
                <ul className="grid grid-cols-1 gap-6">
                    {repos.map((repo) => (
                        <li
                            key={repo.id}
                            className="bg-black border border-gray-700 rounded-lg p-6 flex flex-col h-full transition-shadow duration-300 shadow-purple-glow"
                        >
                            <h2 className="text-xl font-bold mb-4">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline text-purple-400"
                                >
                                    {repo.name}
                                </a>
                            </h2>
                            <div className="flex flex-col justify-between flex-grow">
                                <p className="text-gray-300 mb-4">
                                    {repo.description || 'No description available.'}
                                </p>
                                {languages[repo.name]?.length ? (
                                    <div className="flex-grow flex flex-col items-center justify-center">
                                        <p className="text-gray-400 text-lg mb-2">Languages:</p>
                                        <ul className="flex flex-wrap gap-2 justify-center items-center">
                                            {languages[repo.name].map((lang) => (
                                                <li key={lang.name} className="flex items-center gap-2">
                                                    <span
                                                        className="inline-block w-3 h-3 rounded-full"
                                                        style={{
                                                            backgroundColor: languageColors[lang.name] || '#ccc',
                                                        }}
                                                    ></span>
                                                    <span className="text-gray-300">
                                                        {lang.name}: {lang.percentage}%
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="flex-grow flex items-center justify-center">
                                        <p className="text-gray-400 text-sm">No language data available.</p>
                                    </div>
                                )}
                            </div>
                            {(repo.homepage || readmes[repo.name]) && (
                                <div className="mt-4 flex justify-center items-center gap-x-4">
                                    {repo.homepage && (
                                        <button
                                            onClick={() =>
                                                window.open(repo.homepage, '_blank', 'noopener noreferrer')
                                            }
                                            className="text-sm text-gray-400 hover:text-gray-200"
                                        >
                                            Deployment
                                        </button>
                                    )}
                                    {readmes[repo.name] && (
                                        <button
                                            className="text-sm text-gray-400 hover:text-gray-200"
                                            onClick={() => openModal(readmes[repo.name])}
                                        >
                                            View README
                                        </button>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="relative bg-gray-900 p-6 rounded-lg max-w-4xl w-full border-4 border-purple-400 shadow-xl">
                        <button
                            className="absolute top-2 right-2 text-sm text-gray-100 bg-purple-500 hover:bg-purple-600 rounded-md p-2 shadow-lg transition-all font-sans"
                            onClick={closeModal}
                        >
                            X
                        </button>
                        <div className="overflow-auto max-h-[80vh] text-pretty text-justify mt-6">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {currentReadme || ''}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Repos;

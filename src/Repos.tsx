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

const Repos: React.FC = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [readmes, setReadmes] = useState<Record<string, string | null>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [languages, setLanguages] = useState<
        Record<string, { name: string; percentage: string }[]>
    >({});

    const [error, setError] = useState<string | null>(null);

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

        // Fix: Add type for `languageMap`
        const languageMap: Record<string, { name: string; percentage: string }[]> = results.reduce(
            (acc, curr) => {
                acc[curr.name] = curr.languages;
                return acc;
            },
            {} as Record<string, { name: string; percentage: string }[]>
        );

        setLanguages(languageMap);
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
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                    {repos.map((repo) => (
                        <li
                            key={repo.id}
                            className="bg-opacity-80 bg-black rounded-lg shadow-lg p-6 flex flex-col justify-between border border-gray-700 hover:shadow-xl transition-shadow duration-300"
                        >
                            <div>
                                <h2 className="text-xl font-bold">
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline text-purple-400"
                                    >
                                        {repo.name}
                                    </a>
                                </h2>
                                {repo.description && (
                                    <p className="text-gray-300 mt-2">{repo.description}</p>
                                )}
                            </div>
                            {languages[repo.name]?.length ? (
                                <div className="mt-2">
                                    <p className="text-gray-400 text-sm">
                                        Languages:
                                    </p>
                                    <ul className="text-gray-400 text-sm ml-4 list-disc">
                                        {languages[repo.name]?.map((lang) => (
                                            <li key={lang.name}>
                                                {lang.name}: {lang.percentage}%
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : null}

                            <div className="mt-4">
                                {repo.homepage && (
                                    <a
                                        href={repo.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-sm text-purple-400 hover:underline"
                                    >
                                        Deployment
                                    </a>
                                )}
                                {readmes[repo.name] && (
                                    <details className="mt-4">
                                        <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-200">
                                            README
                                        </summary>
                                        <div className="bg-gray-800 bg-opacity-70 p-4 rounded-md mt-2 overflow-auto text-sm text-gray-300">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {readmes[repo.name] || ''}
                                            </ReactMarkdown>
                                        </div>
                                    </details>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Repos;

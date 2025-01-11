import React, { useEffect, useState } from 'react';

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

    if (loading) {
        return <p className="text-center text-gray-600 mt-10">Loading...</p>;
    }

    if (error) {
        return (
            <p className="text-center text-red-600 mt-10">
                Error: {error}
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    My GitHub Repositories
                </h1>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repos.map((repo) => (
                        <li
                            key={repo.id}
                            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        <span className="inline-block overflow-hidden border-r-4 border-black animate-typing">
                                            {repo.name}
                                        </span>
                                    </a>
                                </h2>
                                {repo.description && (
                                    <p className="text-gray-600 mt-2">{repo.description}</p>
                                )}
                            </div>
                            <div className="mt-4">
                                {repo.homepage && (
                                    <a
                                        href={repo.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block text-sm text-blue-600 hover:underline"
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {readmes[repo.name] && (
                                    <details className="mt-4">
                                        <summary className="text-sm text-gray-700 cursor-pointer hover:text-gray-900">
                                            README
                                        </summary>
                                        <pre className="bg-gray-100 p-4 rounded-md mt-2 overflow-auto text-sm text-gray-700">
                                            {readmes[repo.name]}
                                        </pre>
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
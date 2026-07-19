import React, { useCallback, useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const GITHUB_USER = 'MattAngelakos';

interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    homepage?: string | null;
    language: string | null;
    stargazers_count: number;
    pushed_at: string;
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
    'Jupyter Notebook': '#ff4d01',
};

// GitHub returns README content as base64; decode it as UTF-8.
const decodeBase64Utf8 = (base64: string): string => {
    const bytes = Uint8Array.from(atob(base64.replace(/\n/g, '')), (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
};

const GitHubRepos: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const [repos, setRepos] = useState<Repo[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [readmeCache, setReadmeCache] = useState<Record<string, string | null>>({});
    const [openRepo, setOpenRepo] = useState<string | null>(null);
    const [readmeLoading, setReadmeLoading] = useState(false);

    const loadRepos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`
            );
            if (!response.ok) {
                throw new Error(
                    response.status === 403
                        ? 'GitHub rate limit reached — try again in a bit.'
                        : 'Failed to fetch repositories.'
                );
            }
            setRepos(await response.json());
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const toggle = () => {
        const next = !expanded;
        setExpanded(next);
        if (next && repos === null && !loading) {
            void loadRepos();
        }
    };

    const openReadme = async (repoName: string) => {
        setOpenRepo(repoName);
        if (repoName in readmeCache) return;
        setReadmeLoading(true);
        try {
            const response = await fetch(
                `https://api.github.com/repos/${GITHUB_USER}/${repoName}/contents/README.md`
            );
            if (!response.ok) {
                setReadmeCache((prev) => ({ ...prev, [repoName]: null }));
                return;
            }
            const data = await response.json();
            setReadmeCache((prev) => ({ ...prev, [repoName]: decodeBase64Utf8(data.content) }));
        } catch {
            setReadmeCache((prev) => ({ ...prev, [repoName]: null }));
        } finally {
            setReadmeLoading(false);
        }
    };

    const closeModal = useCallback(() => setOpenRepo(null), []);

    useEffect(() => {
        if (!openRepo) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [openRepo, closeModal]);

    const currentReadme = openRepo ? readmeCache[openRepo] : undefined;

    return (
        <div className="mt-12">
            <button
                onClick={toggle}
                aria-expanded={expanded}
                className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium rounded-lg transition-colors"
            >
                <img src="/github.svg" alt="" className="w-5 h-5" aria-hidden="true" />
                {expanded ? 'Hide my GitHub repositories' : 'Browse all my GitHub repositories'}
                <span aria-hidden="true" className="text-purple-300">{expanded ? '▴' : '▾'}</span>
            </button>

            {expanded && (
                <div className="mt-6">
                    {loading && <p className="text-gray-400">Loading repositories…</p>}
                    {error && (
                        <p className="text-red-400">
                            {error}{' '}
                            <a
                                href={`https://github.com/${GITHUB_USER}?tab=repositories`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-300 underline underline-offset-4"
                            >
                                View them on GitHub instead.
                            </a>
                        </p>
                    )}
                    {repos && (
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {repos.map((repo) => (
                                <li
                                    key={repo.id}
                                    className="bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col hover:border-purple-500/50 transition-colors"
                                >
                                    <div className="flex items-baseline justify-between gap-3 mb-2">
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-purple-300 hover:text-purple-200 hover:underline underline-offset-4 break-all"
                                        >
                                            {repo.name}
                                        </a>
                                        {repo.language && (
                                            <span className="flex items-center gap-1.5 text-xs text-gray-400 whitespace-nowrap">
                                                <span
                                                    className="inline-block w-2.5 h-2.5 rounded-full"
                                                    style={{ backgroundColor: languageColors[repo.language] || '#ccc' }}
                                                    aria-hidden="true"
                                                ></span>
                                                {repo.language}
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed flex-grow">
                                        {repo.description || 'No description available.'}
                                    </p>
                                    <div className="flex gap-4 mt-3 text-sm">
                                        {repo.homepage && (
                                            <a
                                                href={repo.homepage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-purple-300 hover:text-purple-200 underline underline-offset-4"
                                            >
                                                Live site ↗
                                            </a>
                                        )}
                                        <button
                                            onClick={() => void openReadme(repo.name)}
                                            className="text-gray-400 hover:text-gray-200 underline underline-offset-4"
                                        >
                                            View README
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {openRepo && (
                <div
                    className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`README for ${openRepo}`}
                >
                    <div
                        className="relative bg-gray-900 rounded-xl max-w-3xl w-full border border-purple-500/40 shadow-purple-glow"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                            <h3 className="font-semibold text-white">{openRepo} — README</h3>
                            <button
                                className="text-sm text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-md px-3 py-1.5 transition-colors"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                        <div className="overflow-auto max-h-[75vh] px-6 py-5 markdown-body">
                            {readmeLoading && currentReadme === undefined ? (
                                <p className="text-gray-400">Loading README…</p>
                            ) : currentReadme ? (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentReadme}</ReactMarkdown>
                            ) : (
                                <p className="text-gray-400">No README found for this repository.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GitHubRepos;

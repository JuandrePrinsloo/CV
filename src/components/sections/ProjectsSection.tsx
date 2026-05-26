import { ExternalLink, Github, Folder, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    owner: { login: string; avatar_url: string };
    // GitHub-specific metadata used when filtering/sorting
    archived?: boolean;
    fork?: boolean;
    updated_at?: string;
}

const ProjectsSection = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                setLoading(true);
                const res = await fetch('https://api.github.com/users/JuandrePrinsloo/repos?sort=updated&per_page=20');
                if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
                const data = (await res.json()) as Repo[];
                // Optionally filter out forks and archived repos to show only active work
                const filtered = data.filter((r) => !r.archived && !r.fork).sort((a, b) => {
                    const ta = a.updated_at ? new Date(a.updated_at).getTime() : 0;
                    const tb = b.updated_at ? new Date(b.updated_at).getTime() : 0;
                    return tb - ta;
                });
                setRepos(filtered);
            } catch (e) {
                console.error('Failed to fetch repos', e);
                setError('Failed to load projects from GitHub.');
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, []);

    if (loading) {
        return (
            <section className="min-h-[calc(100vh-140px)] p-6 md:p-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
                        <Folder className="w-5 h-5 text-primary" />
                        <h2 className="text-2xl font-mono font-semibold">Projects</h2>
                        <span className="text-ide-comment text-sm font-mono">// Featured work</span>
                    </div>
                    <p className="text-center text-muted-foreground">Loading projects...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="min-h-[calc(100vh-140px)] p-6 md:p-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
                        <Folder className="w-5 h-5 text-primary" />
                        <h2 className="text-2xl font-mono font-semibold">Projects</h2>
                        <span className="text-ide-comment text-sm font-mono">// Featured work</span>
                    </div>
                    <p className="text-center text-destructive">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-[calc(100vh-140px)] p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
                    <Folder className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-mono font-semibold">Projects</h2>
                    <span className="text-ide-comment text-sm font-mono">// Featured work</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {repos.map((repo, index) => (
                        <div
                            key={repo.id}
                            className="ide-panel group animate-fade-in-up"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-ide-gutter">
                                <div className="flex items-center gap-2">
                                    <ChevronRight className="w-4 h-4 text-primary" />
                                    <span className="font-mono text-sm font-medium">{repo.name}</span>
                                </div>
                                <span className="text-xs font-mono px-2 py-0.5 rounded bg-ide-info/10 text-ide-info">Updated</span>
                            </div>

                            <div className="p-4 flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-1/3 h-40 md:h-auto flex-shrink-0 relative rounded-md overflow-hidden bg-ide-gutter">
                                    <img
                                        src={repo.owner?.avatar_url}
                                        alt={`${repo.name} cover`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.src = repo.owner?.avatar_url || '/juandre-prinsloo.jpg';
                                        }}
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground mb-2">
                                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                                {repo.name}
                                            </a>
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                            {repo.description || 'No description available.'}
                                        </p>
                                    </div>

                                    <div className="mt-2 text-xs sm:text-sm text-muted-foreground flex items-center justify-between">
                                        <div>
                                            <span className="font-semibold text-primary">Language:</span>
                                            <span className="ml-1">{repo.language || 'Not detected'}</span>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <a href={repo.html_url} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                                                <Github className="w-4 h-4" />
                                                <span className="font-mono">Source</span>
                                            </a>
                                            <a href={repo.html_url} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-4 h-4" />
                                                <span className="font-mono">Open on GitHub</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* More Projects card (keeps design consistent) */}
                    <div className="ide-panel flex items-center justify-center p-6">
                        <div className="text-center">
                            <Folder className="w-12 h-12 text-primary mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">More Projects Coming Soon</h3>
                            <p className="text-muted-foreground text-sm">I&apos;m always working on new and exciting things. Check back later for more awesome projects!</p>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-8 animate-fade-in-up animate-delay-500">
                    <a
                        href="https://github.com/JuandrePrinsloo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded font-mono text-sm hover:opacity-90 transition-all duration-200 hover:translate-y-[-2px] glow-primary"
                    >
                        <Github className="w-4 h-4" />
                        View All Projects on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;

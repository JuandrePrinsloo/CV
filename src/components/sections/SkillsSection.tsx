import { Code2, Database, Wrench, Globe } from "lucide-react";

// Updated skill categories to match requested work skills and percentages
const skillCategories = [
    {
        id: "frontend",
        title: "Frontend",
        icon: Code2,
        skills: [
            { name: "HTML", level: 90 },
            { name: "CSS / SCSS", level: 85 },
            { name: "JavaScript / TypeScript", level: 85 },
            { name: "ReactJs", level: 80 },
            { name: "VueJs", level: 70 },
            { name: "NuxtJs / NextJs", level: 75 },
            { name: "Blazor / Razor pages", level: 85 },
        ],
    },
    {
        id: "backend",
        title: "Backend",
        icon: Database,
        skills: [
            { name: "C#", level: 85 },
            { name: ".NET Core", level: 90 },
            { name: "MySQL", level: 80 },
            { name: "SQL", level: 80 },
            { name: "MariaDB", level: 80 },
            { name: "MongoDB", level: 80 },
        ],
    }/*,
    {
        id: "devops",
        title: "DevOps",
        icon: Cloud,
        skills: [
            // Docker moved to Tools per request; keep other DevOps skills here if needed
        ],
    }*/,
    {
        id: "tools",
        title: "Tools",
        icon: Wrench,
        skills: [
            { name: "Git", level: 95 },
            { name: "VS Code", level: 90 },
            { name: "Docker", level: 75 },
            { name: "JetBrains Rider", level: 90 },
            // Added DBeaver as a database management tool
            { name: "DBeaver", level: 85 },
        ],
    },
    {
        id: "languages",
        title: "Languages",
        icon: Globe,
        skills: [
            { name: "English", level: 100 },
            { name: "Afrikaans", level: 100 },
        ],
    },
];

const SkillsSection = () => {
    return (
        <section className="min-h-[calc(100vh-140px)] p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
                    <Code2 className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-mono font-semibold">Skills</h2>
                    <span className="text-ide-comment text-sm font-mono">// Technical proficiency</span>
                </div>

                {/* JSON-style code block */}
                <div className="ide-panel p-6 mb-8 animate-fade-in-up animate-delay-100">
                    <div className="font-mono text-sm">
                        <span className="text-ide-comment">// skills.json</span>
                        <br />
                        <span className="text-primary">{"{"}</span>
                        <br />
                        <span className="pl-4 text-foreground">"developer"</span>
                        <span className="text-muted-foreground">:</span>{" "}
                        <span className="text-ide-string">"Full Stack"</span>
                        <span className="text-muted-foreground">,</span>
                        <br />
                        <span className="pl-4 text-foreground">"years_experience"</span>
                        <span className="text-muted-foreground">:</span>{" "}
                        <span className="text-accent">6</span>
                        <span className="text-muted-foreground">,</span>
                        <br />
                        <span className="pl-4 text-foreground">"learning"</span>
                        <span className="text-muted-foreground">:</span>{" "}
                        <span className="text-ide-keyword">true</span>
                        <br />
                        <span className="text-primary">{"}"}</span>
                    </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {skillCategories.map((category, categoryIndex) => (
                        <div
                            key={category.id}
                            className="ide-panel animate-fade-in-up"
                            style={{ animationDelay: `${(categoryIndex + 1) * 100}ms` }}
                        >
                            {/* Category Header */}
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-ide-gutter">
                                <category.icon className="w-4 h-4 text-primary" />
                                <h3 className="font-mono font-medium">{category.title}</h3>
                            </div>

                            {/* Skills List */}
                            <div className="p-4 space-y-4">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-1.5">
                                            <span className="font-mono text-sm text-foreground">{skill.name}</span>
                                            <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                                                style={{
                                                    width: `${skill.level}%`,
                                                    animationDelay: `${(categoryIndex * 4 + skillIndex) * 100}ms`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Additional Skills */}
                <div className="mt-8 animate-fade-in-up animate-delay-500">
                    <h3 className="font-mono text-sm text-muted-foreground mb-4">
                        <span className="text-ide-comment">// Also familiar with:</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "Redux", "Jest", "Redis", "MongoDB", "REST APIs", "OAuth", "JWT"
                        ].map((skill) => (
                            <span
                                key={skill}
                                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded font-mono text-sm hover:bg-muted transition-colors cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;

import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const AboutSection = () => {
    const [displayedText, setDisplayedText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const fullText = "Software Engineer";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(interval);
            }
        }, 80);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <section className="flex-1 flex">
            {/* Line Numbers Column */}
            <div className="hidden md:flex flex-col pt-4 px-4 text-ide-line-number font-mono text-sm select-none border-r border-border/30">
                {Array.from({ length: 50 }, (_, i) => (
                    <span key={i} className="leading-7 text-right w-6">{i + 1}</span>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 pt-4 px-6 md:px-12 lg:px-16 pb-6 md:pb-12 lg:pb-16 overflow-auto">
                {/* Hero Title */}
                <div className="mb-12 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
                        Full Stack<br />
                        <span className="text-primary">{displayedText}</span>
                        {showCursor && <span className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 animate-pulse" />}
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                        In my tenure of over five years at Realm Digital, I have made substantial contributions to various projects. This experience has allowed me to deepen my knowledge of coding practices and refine my skills. My hands-on involvement in these projects has given me the opportunity to develop practical solutions and innovate for a diverse range of technical challenges.
                    </p>
                </div>

                {/* Stats/Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 animate-fade-in-up animate-delay-200">
                    <div className="ide-panel p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary">6+</div>
                        <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                    <div className="ide-panel p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary">7+</div>
                        <div className="text-sm text-muted-foreground">Projects Delivered</div>
                    </div>
                    <div className="ide-panel p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary">6+</div>
                        <div className="text-sm text-muted-foreground">Happy Clients</div>
                    </div>
                    <div className="ide-panel p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-primary">100%</div>
                        <div className="text-sm text-muted-foreground">Code Quality</div>
                    </div>
                </div>

                {/* Code Block - Passions */}
                <div className="animate-fade-in-up animate-delay-300">
                    <div className="font-mono text-ide-comment text-sm mb-4">
                        {"// What drives me"}
                    </div>
                    <div className="ide-panel p-6">
                        <div className="font-mono text-sm leading-7">
                            <div>
                                <span className="text-ide-keyword">const</span>{" "}
                                <span className="text-foreground">passions</span>{" "}
                                <span className="text-ide-keyword">=</span>{" "}
                                <span className="text-primary">[</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-ide-string">"Clean Architecture"</span>
                                <span className="text-muted-foreground">,</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-ide-string">"User Experience"</span>
                                <span className="text-muted-foreground">,</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-ide-string">"Problem Solving"</span>
                                <span className="text-muted-foreground">,</span>
                            </div>
                            <div className="pl-4">
                                <span className="text-ide-string">"Continuous Learning"</span>
                            </div>
                            <div>
                                <span className="text-primary">]</span>
                                <span className="text-muted-foreground">;</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-4 mt-12 animate-fade-in-up animate-delay-400">
                    <a
                        href={import.meta.env.VITE_GITHUB_URL || "https://github.com/JuandrePrinsloo"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-secondary/50 text-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">GitHub</span>
                    </a>
                    <a
                        href={import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/juandre-prinsloo-135172182/"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-secondary/50 text-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                        <Linkedin className="w-4 h-4" />
                        <span className="text-sm">LinkedIn</span>
                    </a>
                    <a
                        href="mailto:juandreprinsloo@gmail.com"
                        className="flex items-center gap-2 px-4 py-2 bg-secondary/50 text-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">Email</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

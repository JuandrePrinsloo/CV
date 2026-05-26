import { Menu, X } from "lucide-react";
import { useState } from "react";

interface IDEHeaderProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const tabs = [
    { id: "about", label: "About.tsx", icon: "📄" },
    { id: "projects", label: "Projects.tsx", icon: "📁" },
    { id: "experience", label: "Experience.tsx", icon: "💼" },
    { id: "skills", label: "Skills.json", icon: "⚡" },
    { id: "contact", label: "Contact.tsx", icon: "📧" },
];

const IDEHeader = ({ activeTab, onTabChange }: IDEHeaderProps) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 relative bg-background">
            {/* Title Bar (mobile-only bottom border) */}
            <div className="flex items-center justify-between px-4 py-0 bg-ide-gutter border-b border-border sm:border-b-0">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="sm:hidden p-1 hover:bg-muted rounded transition-colors"
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Tabs */}
            <div className="hidden sm:flex overflow-x-auto ide-scrollbar bg-background border-b border-border lg:pl-72 xl:pl-80 ide-tabs-no-left-border">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`ide-tab whitespace-nowrap ${activeTab === tab.id ? "ide-tab-active" : ""}`}
                    >
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                        <X className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 hover:bg-muted rounded transition-all" />
                    </button>
                ))}
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <nav className="sm:hidden bg-card border-b border-border animate-fade-in-up">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                onTabChange(tab.id);
                                setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left font-mono text-sm transition-colors ${
                                activeTab === tab.id
                                    ? "bg-ide-active-tab text-primary border-l-2 border-primary"
                                    : "hover:bg-muted text-muted-foreground"
                            }`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>
            )}
        </header>
    );
};

export default IDEHeader;

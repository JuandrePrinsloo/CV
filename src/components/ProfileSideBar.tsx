import { Github, Linkedin, Mail, MapPin, Download, Briefcase, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
// @ts-ignore
import profileImage from "@/assets/images/juandre-prinsloo.jpg";
// @ts-ignore
import cvPDF from "@/assets/PDFs/Juandre_Prinsloo_CV.pdf";

interface ProfileSidebarProps {
    className?: string;
    onTabChange?: (tab: string) => void;
}

const ProfileSidebar = ({ className, onTabChange }: ProfileSidebarProps) => {
    return (
        <aside className={`flex flex-col w-72 xl:w-80 border-r border-border/50 p-6 bg-secondary/20 overflow-y-auto z-50 ${className}`}>
            {/* Profile Image */}
            <div className="mb-6">
                <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full aspect-[3/4] object-cover rounded-lg ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                />
            </div>

            {/* Name & Role */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">Juandré Prinsloo</h2>
                <p className="text-primary font-medium">Full Stack Developer</p>
            </div>

            {/* Quick Info */}
            <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4 text-primary" />
                    <span>6+ years of experience</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Cape Town, SA</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4 text-primary" />
                    <span>English, Afrikaans</span>
                </div>
                <a href="mailto:juandreprinsloo@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                    <span>Juandreprinsloo@gmail.com</span>
                </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mb-2">
                <a 
                    href={import.meta.env.VITE_GITHUB_URL || "https://github.com/JuandrePrinsloo"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary/50 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                    <Github className="w-4 h-4" />
                </a>
                <a 
                    href={import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/juandre-prinsloo-135172182/"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-secondary/50 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                    <Linkedin className="w-4 h-4" />
                </a>
                <a 
                    href="mailto:juandreprinsloo@gmail.com"
                    className="p-2 bg-secondary/50 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                    <Mail className="w-4 h-4" />
                </a>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2 mt-4">
                <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={() => {
                        const link = document.createElement("a");
                        link.href = cvPDF;
                        link.download = "Juandre_Prinsloo_CV.pdf";
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }}
                >
                    <Download className="w-4 h-4" />
                    Download CV
                </Button>
               {/* <Button variant="outline" className="w-full justify-start gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule a call
                </Button>*/}
                <Button 
                    className="w-full"
                    onClick={() => onTabChange?.("contact")}
                >
                    Work with me
                </Button>
            </div>
        </aside>
    );
};

export default ProfileSidebar;

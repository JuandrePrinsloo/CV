import { Download, Github, Linkedin, Mail, Briefcase, MapPin, Globe } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
// @ts-ignore
import profileImage from "@/assets/images/juandre-prinsloo.jpg";
// @ts-ignore
import cvPDF from "@/assets/PDFs/Juandre_Prinsloo_CV.pdf";

interface MobileProfileCardProps {
    onTabChange?: (tab: string) => void;
}

const MobileProfileCard = ({ onTabChange }: MobileProfileCardProps) => {
    return (
        <div className="lg:hidden mb-8 animate-fade-in-up">
            <div className="ide-panel p-6">
                <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-20 h-20 ring-2 ring-primary/30 rounded-lg overflow-hidden">
                        {/* ensure the image is cropped (object-cover) and centered on mobile */}
                        <AvatarImage src={profileImage} alt="Juandré Prinsloo" className="object-cover object-center" />
                        <AvatarFallback className="text-xl font-semibold bg-primary/20 text-primary rounded-lg">JP</AvatarFallback>
                    </Avatar>
                    <div>
                        <h2 className="text-lg font-semibold text-foreground">Juandré Prinsloo</h2>
                        <p className="text-primary text-sm">Full Stack Developer</p>
                        <p className="text-muted-foreground text-sm mt-1">Cape Town, SA</p>
                    </div>
                </div>

                {/* Short about (same as desktop) */}
                <p className="text-sm text-muted-foreground mb-4">
                    In my tenure of over five years at Realm Digital, I have made substantial contributions to various projects. This experience has allowed me to deepen my knowledge of coding practices and refine my skills.
                </p>

                <div className="space-y-3 mb-4">
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
                        <span>juandreprinsloo@gmail.com</span>
                    </a>
                </div>

                <div className="flex flex-wrap gap-3 items-center">
                    <Button 
                        size="sm" 
                        variant="outline" 
                        className="gap-2"
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
                    <Button size="sm" onClick={() => onTabChange?.("contact")}>Work with me</Button>
                    <div className="flex gap-2 ml-auto">
                        <a href={import.meta.env.VITE_GITHUB_URL || "https://github.com/JuandrePrinsloo"} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary/50 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href={import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/juandre-prinsloo-135172182/"} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary/50 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <a href="mailto:juandreprinsloo@gmail.com" className="p-2 bg-secondary/50 rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
                            <Mail className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileProfileCard;

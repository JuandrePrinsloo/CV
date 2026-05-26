import { GitBranch, CheckCircle, Wifi, Cpu } from "lucide-react";

const IDEStatusBar = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-1 text-xs font-mono bg-primary text-primary-foreground">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>main</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>No errors</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5" />
                    <span>Online</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>TypeScript</span>
                </div>
                <span className="hidden sm:inline">UTF-8</span>
                <span>LF</span>
            </div>
        </footer>
    );
};

export default IDEStatusBar;

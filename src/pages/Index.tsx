import { useState } from "react";
import IDEHeader from "@/components/IDEHeader";
import IDEStatusBar from "@/components/IDEStatusBar";
import ProfileSidebar from "@/components/ProfileSideBar.tsx";
import MobileProfileCard from "@/components/MobileProfileCard";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("about");

  const renderSection = () => {
    switch (activeTab) {
      case "about":
        return <AboutSection />;
      case "projects":
        return <ProjectsSection />;
      case "experience":
        return <ExperienceSection />;
      case "skills":
        return <SkillsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <AboutSection />;
    }
  };

  return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <IDEHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex flex-1 overflow-hidden">
          {/* Static Profile Sidebar - Desktop */}
          <ProfileSidebar className="hidden lg:flex h-screen fixed left-0 top-0 w-72 xl:w-80" onTabChange={setActiveTab} />

          {/* Main Content */}
          <main className="flex-1 pb-10 ide-scrollbar overflow-auto lg:ml-72 xl:ml-80">
            {/* Mobile Profile Card - only show on mobile when the about tab is active */}
            {activeTab === "about" && (
              <div className="lg:hidden p-4">
                <MobileProfileCard onTabChange={setActiveTab} />
              </div>
            )}

            {renderSection()}
          </main>
        </div>

        <IDEStatusBar />
      </div>
  );
};

export default Index;

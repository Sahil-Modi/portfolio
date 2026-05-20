import NotebookShell from "../components/NotebookShell";
import HeroNotebook from "../components/HeroNotebook";
import AboutNotebook from "../components/AboutNotebook";
import ProjectsNotebook from "../components/ProjectsNotebook";
import SocialProofNotebook from "../components/SocialProofNotebook";
import ResumeNotebook from "../components/ResumeNotebook";
import ContactNotebook from "../components/ContactNotebook";
import FooterNotebook from "../components/FooterNotebook";
import JupyterLoader from "../components/JupyterLoader";
import { NotebookProvider } from "../context/NotebookContext";

export default function Home() {
  return (
    <NotebookProvider>
      <JupyterLoader duration={2000} />
      <NotebookShell notebookTitle="Sahil_Modi_Portfolio">
        <div className="max-w-7xl mx-auto">
          <HeroNotebook />
          <AboutNotebook />
          <ProjectsNotebook />
          <SocialProofNotebook />
          <ResumeNotebook />
          <ContactNotebook />
        </div>
        <FooterNotebook />
      </NotebookShell>
    </NotebookProvider>
  );
}

import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-[#0a0f1a] overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-hidden pt-16">
        <Outlet />
      </main>
      <footer className="shrink-0 w-full text-center py-3 text-xs text-muted border-t border-border bg-[#0a0f1a] z-10">
        <p>Built for Hacker News readers &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default MainLayout;

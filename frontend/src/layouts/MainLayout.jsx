import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <Outlet />
      </main>
      <footer className="w-full text-center py-6 text-sm text-muted border-t border-border mt-auto bg-[#0a0f1a]">
        <p>Built for Hacker News readers &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default MainLayout;

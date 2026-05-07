import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

/**
 * MainLayout — wraps all pages with Navbar + content area.
 * Single Responsibility: only layout structure, no business logic.
 * Uses <Outlet /> so child routes render inside this layout.
 */
const MainLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

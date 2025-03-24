
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, X, Users, User, MessageSquare } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const NavLink: React.FC<{ to: string; icon: React.ReactNode; children: React.ReactNode }> = ({ 
    to, 
    icon, 
    children 
  }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
          isActive 
            ? 'bg-primary/10 text-primary font-medium' 
            : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
        }`}
      >
        {icon}
        <span>{children}</span>
      </Link>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-subtle shadow-subtle' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-semibold tracking-tight">LearningCanvas</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/associate" icon={<User size={18} />}>
            Associate Dashboard
          </NavLink>
          <NavLink to="/manager" icon={<Users size={18} />}>
            Manager Dashboard
          </NavLink>
          <NavLink to="/ai-assistant" icon={<MessageSquare size={18} />}>
            AI Assistant
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-elevation-2 animate-fade-in">
          <div className="container mx-auto px-4 py-3 space-y-1">
            <NavLink to="/associate" icon={<User size={18} />}>
              Associate Dashboard
            </NavLink>
            <NavLink to="/manager" icon={<Users size={18} />}>
              Manager Dashboard
            </NavLink>
            <NavLink to="/ai-assistant" icon={<MessageSquare size={18} />}>
              AI Assistant
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

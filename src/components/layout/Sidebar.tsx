
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  User, 
  MessageSquare, 
  BookOpen, 
  Award, 
  BarChart, 
  Settings 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  
  const navItems = [
    { 
      title: 'Associate Dashboard', 
      path: '/associate', 
      icon: <User size={20} /> 
    },
    { 
      title: 'Manager Dashboard', 
      path: '/manager', 
      icon: <Users size={20} /> 
    },
    { 
      title: 'AI Assistant', 
      path: '/ai-assistant', 
      icon: <MessageSquare size={20} /> 
    },
    { 
      title: 'Learning Resources', 
      path: '#', 
      icon: <BookOpen size={20} /> 
    },
    { 
      title: 'Certifications', 
      path: '#', 
      icon: <Award size={20} /> 
    },
    { 
      title: 'Analytics', 
      path: '#', 
      icon: <BarChart size={20} /> 
    }
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 bottom-0 z-40
        ${isOpen ? 'w-64' : 'w-[70px]'}
        bg-sidebar transition-all duration-300 ease-in-out 
        border-r border-sidebar-border shadow-subtle
        pt-16 overflow-hidden`}
    >
      <div className="h-full flex flex-col justify-between">
        <nav className="px-2 mt-6">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.title}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center rounded-md px-3 py-2.5 
                      transition-all duration-200 group
                      ${isActive 
                        ? 'text-white bg-sidebar-primary' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }
                    `}
                  >
                    <span className="flex-shrink-0 mr-3">{item.icon}</span>
                    <span className={`whitespace-nowrap transition-opacity duration-300
                      ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-3 mt-auto">
          <Link
            to="#"
            className="flex items-center text-sidebar-foreground hover:text-sidebar-primary transition-colors duration-200"
          >
            <Settings size={20} />
            <span 
              className={`ml-3 whitespace-nowrap transition-opacity duration-300
                ${isOpen ? 'opacity-100' : 'opacity-0'}`}
            >
              Settings
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

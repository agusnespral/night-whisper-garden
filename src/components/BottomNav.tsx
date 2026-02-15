import { Moon, Sun, BookOpen, Info } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { path: '/night', icon: Moon, label: 'Noche' },
  { path: '/morning', icon: Sun, label: 'Mañana' },
  { path: '/archive', icon: BookOpen, label: 'Escenas' },
  { path: '/about', icon: Info, label: 'Sobre' },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border z-50">
      <div className="max-w-sm mx-auto flex items-center justify-around py-3 px-4">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1 transition-colors duration-500 ${
                active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-[10px] tracking-wider">{label}</span>
              {active && (
                <motion.div
                  className="w-1 h-1 rounded-full bg-primary"
                  layoutId="nav-dot"
                  transition={{ duration: 0.3 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;

import { LayoutDashboard, FolderTree, Users, LogOut, Package, MessageSquare, RefreshCw } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const menuItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Categories', url: '/admin/categories', icon: FolderTree },
  { title: 'Products', url: '/admin/products', icon: Package },
  { title: 'Inquiries', url: '/admin/inquiries', icon: MessageSquare },
  { title: 'Users', url: '/admin/users', icon: Users },
];

export function AdminSidebar() {
  const { user, logout } = useAuth();
  const { refreshData, isLoading } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-card border-r min-h-screen flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{user?.name}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
          onClick={() => refreshData()}
          disabled={isLoading}
          title="Refresh Data"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === '/admin'}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all group"
            activeClassName="bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground shadow-sm"
          >
            <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </aside>
  );
}

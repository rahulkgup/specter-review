import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  FileText, 
  Library, 
  Shield, 
  BarChart3, 
  Settings,
  Upload,
  Download,
  Save
} from "lucide-react";

const TopNavigation = () => {
  const navItems = [
    { label: "Documents", icon: FileText, active: true, href: "/" },
    { label: "Library", icon: Library, href: "#" },
    { label: "Deep Scan", icon: Shield, href: "/deep-scan" },
    { label: "Reports", icon: BarChart3, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
  ];

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Logo and Navigation */}
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">LegalReview</h1>
        </div>
        
        <nav className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "default" : "ghost"}
              size="sm"
              className="flex items-center space-x-2"
              asChild
            >
              <a href={item.href}>
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </a>
            </Button>
          ))}
        </nav>
      </div>

      {/* Actions and User */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="default" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
        
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="bg-quality-good text-white">
            Ready to Export
          </Badge>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;
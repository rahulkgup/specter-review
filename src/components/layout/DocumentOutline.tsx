import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { useState } from "react";

const DocumentOutline = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["1", "2"])
  );

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const documentStructure = [
    {
      id: "1",
      title: "Project Overview & Scope",
      level: 1,
      status: "complete",
      changes: 3,
      children: [
        { id: "1.1", title: "Statement of Work", level: 2, status: "complete" },
        { id: "1.2", title: "Deliverables", level: 2, status: "warning", changes: 2 },
        { id: "1.3", title: "Timeline", level: 2, status: "complete" },
      ]
    },
    {
      id: "2", 
      title: "Terms & Conditions",
      level: 1,
      status: "warning",
      changes: 7,
      children: [
        { id: "2.1", title: "Payment Terms", level: 2, status: "pending", changes: 3 },
        { id: "2.2", title: "Intellectual Property", level: 2, status: "complete" },
        { id: "2.3", title: "Data Protection", level: 2, status: "warning", changes: 4 },
      ]
    },
    {
      id: "3",
      title: "Risk & Compliance",
      level: 1,
      status: "complete",
      children: [
        { id: "3.1", title: "Liability Clauses", level: 2, status: "complete" },
        { id: "3.2", title: "Insurance Requirements", level: 2, status: "complete" },
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="w-4 h-4 text-quality-excellent" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-quality-warning" />;
      case "pending":
        return <Clock className="w-4 h-4 text-quality-critical" />;
      default:
        return <FileText className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="w-80 bg-panel border-r border-panel-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-panel-border bg-panel-header">
        <h2 className="text-sm font-semibold text-foreground mb-3">Document Outline</h2>
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search sections..." 
              className="pl-9 h-8 bg-background"
            />
          </div>
          <Button variant="outline" size="sm" className="w-full justify-start h-8">
            <Filter className="w-4 h-4 mr-2" />
            Filter Changes
          </Button>
        </div>
      </div>

      {/* Outline Content */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {documentStructure.map((section) => (
            <div key={section.id}>
              {/* Section Header */}
              <div 
                className="flex items-center justify-between p-2 rounded-md hover:bg-hover cursor-pointer group"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center space-x-2 flex-1">
                  {expandedSections.has(section.id) ? 
                    <ChevronDown className="w-4 h-4 text-muted-foreground" /> :
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  }
                  {getStatusIcon(section.status)}
                  <span className="text-sm font-medium text-foreground truncate">
                    {section.title}
                  </span>
                </div>
                {section.changes && (
                  <Badge variant="outline" className="ml-2 h-5 text-xs bg-quality-warning text-white">
                    {section.changes}
                  </Badge>
                )}
              </div>

              {/* Children */}
              {expandedSections.has(section.id) && section.children && (
                <div className="ml-6 space-y-1">
                  {section.children.map((child) => (
                    <div 
                      key={child.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-hover cursor-pointer group pl-4"
                    >
                      <div className="flex items-center space-x-2 flex-1">
                        {getStatusIcon(child.status)}
                        <span className="text-sm text-foreground truncate">
                          {child.title}
                        </span>
                      </div>
                      {child.changes && (
                        <Badge variant="outline" className="h-5 text-xs bg-quality-warning text-white">
                          {child.changes}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Summary */}
      <div className="p-4 border-t border-panel-border bg-panel-header">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="text-center">
            <div className="text-quality-excellent font-semibold">12</div>
            <div className="text-muted-foreground">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-quality-warning font-semibold">3</div>
            <div className="text-muted-foreground">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentOutline;
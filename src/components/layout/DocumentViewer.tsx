import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, 
  Plus, 
  Minus,
  RotateCcw,
  Highlighter
} from "lucide-react";

const DocumentViewer = () => {
  const documentContent = [
    {
      id: "section-1",
      title: "1. Statement of Work",
      content: [
        {
          type: "paragraph",
          text: "This Statement of Work (\"SOW\") sets forth the terms and conditions under which Contractor will provide services to Client for the development and implementation of a comprehensive digital transformation platform.",
        },
        {
          type: "change",
          action: "addition",
          text: "The platform shall include AI-powered analytics capabilities and real-time data processing features as specified in Appendix A.",
          comment: "Added per client requirements - aligns with industry standards"
        },
        {
          type: "paragraph", 
          text: "The project scope includes system architecture, development, testing, deployment, and initial training for Client personnel."
        }
      ]
    },
    {
      id: "section-2",
      title: "2. Deliverables and Timeline",
      content: [
        {
          type: "paragraph",
          text: "Contractor shall deliver the following items according to the timeline specified below:"
        },
        {
          type: "list",
          items: [
            "Technical Requirements Document (Week 2)",
            "System Architecture Blueprint (Week 4)",
            {
              type: "change",
              action: "modification",
              original: "MVP Development (Week 12)",
              revised: "MVP Development with enhanced security features (Week 14)",
              comment: "Timeline adjusted for additional security requirements"
            },
            "User Training Materials (Week 16)",
            "Final Deployment (Week 18)"
          ]
        }
      ]
    },
    {
      id: "section-3", 
      title: "3. Payment Terms",
      content: [
        {
          type: "paragraph",
          text: "Client agrees to pay Contractor according to the following schedule:"
        },
        {
          type: "change",
          action: "removal",
          text: "50% upon execution of this agreement, 50% upon final delivery.",
          comment: "Replaced with milestone-based payment structure"
        },
        {
          type: "change",
          action: "addition", 
          text: "Payment shall be made in four equal installments of 25% each, due upon completion of the following milestones: (1) Technical Requirements approval, (2) Architecture Blueprint approval, (3) MVP delivery, and (4) Final deployment and training completion.",
          comment: "Milestone-based payments reduce risk and align with deliverables"
        }
      ]
    }
  ];

  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case "paragraph":
        return (
          <p key={index} className="text-foreground leading-relaxed mb-4">
            {item.text}
          </p>
        );
      
      case "change":
        if (item.action === "addition") {
          return (
            <div key={index} className="relative mb-4">
              <div className="change-addition p-3 rounded-md">
                <p className="text-foreground leading-relaxed">
                  {item.text}
                </p>
                {item.comment && (
                  <div className="mt-2 flex items-start space-x-2">
                    <MessageCircle className="w-4 h-4 text-quality-good mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground italic">
                      {item.comment}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -right-2 top-2">
                <Badge className="bg-quality-good text-white text-xs">
                  <Plus className="w-3 h-3 mr-1" />
                  Added
                </Badge>
              </div>
            </div>
          );
        }
        
        if (item.action === "removal") {
          return (
            <div key={index} className="relative mb-4">
              <div className="change-removal p-3 rounded-md">
                <p className="text-foreground leading-relaxed">
                  {item.text}
                </p>
                {item.comment && (
                  <div className="mt-2 flex items-start space-x-2">
                    <MessageCircle className="w-4 h-4 text-quality-critical mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground italic">
                      {item.comment}
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute -right-2 top-2">
                <Badge className="bg-quality-critical text-white text-xs">
                  <Minus className="w-3 h-3 mr-1" />
                  Removed
                </Badge>
              </div>
            </div>
          );
        }
        
        if (item.action === "modification") {
          return (
            <div key={index} className="mb-4 space-y-2">
              <div className="change-removal p-3 rounded-md">
                <p className="text-foreground leading-relaxed">
                  {item.original}
                </p>
              </div>
              <div className="change-addition p-3 rounded-md">
                <p className="text-foreground leading-relaxed">
                  {item.revised}
                </p>
                {item.comment && (
                  <div className="mt-2 flex items-start space-x-2">
                    <MessageCircle className="w-4 h-4 text-quality-good mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-muted-foreground italic">
                      {item.comment}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        }
        break;
        
      case "list":
        return (
          <ul key={index} className="list-disc list-inside space-y-2 mb-4 ml-4">
            {item.items.map((listItem: any, listIndex: number) => {
              if (typeof listItem === "string") {
                return (
                  <li key={listIndex} className="text-foreground">
                    {listItem}
                  </li>
                );
              } else if (listItem.type === "change") {
                return (
                  <li key={listIndex} className="space-y-2">
                    {listItem.action === "modification" && (
                      <>
                        <div className="change-removal text-foreground">
                          {listItem.original}
                        </div>
                        <div className="change-addition text-foreground">
                          {listItem.revised}
                        </div>
                      </>
                    )}
                  </li>
                );
              }
            })}
          </ul>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-document border-x border-document-border flex flex-col">
      {/* Document Header */}
      <div className="p-4 border-b border-document-border bg-card flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Digital_Transformation_SOW_v2.3.docx
          </h2>
          <p className="text-sm text-muted-foreground">
            Last modified: 2 hours ago • 47 tracked changes
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            View Original
          </Button>
          <Button variant="outline" size="sm">
            <Highlighter className="w-4 h-4 mr-2" />
            Highlight Issues
          </Button>
        </div>
      </div>

      {/* Document Content */}
      <ScrollArea className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {documentContent.map((section) => (
            <section key={section.id} className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.content.map((item, index) => renderContent(item, index))}
              </div>
            </section>
          ))}
        </div>
      </ScrollArea>

      {/* Document Footer */}
      <div className="p-4 border-t border-document-border bg-muted/50">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Page 1 of 12 • 3,247 words</span>
          <span>47 changes • 12 comments</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
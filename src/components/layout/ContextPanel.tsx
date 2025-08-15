import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Lightbulb, 
  Target, 
  BookOpen, 
  Users,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Eye,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

const ContextPanel = () => {
  const suggestions = [
    {
      id: "1",
      type: "critical",
      title: "Payment Terms Risk",
      description: "Current payment structure creates cash flow risk. Consider milestone-based payments.",
      evidence: ["Industry standard: 25% milestones", "Similar contracts: 4-phase structure"],
      confidence: 0.89
    },
    {
      id: "2", 
      type: "improvement",
      title: "Add Force Majeure Clause",
      description: "Missing standard force majeure protection for both parties.",
      evidence: ["Required by company policy", "Legal precedent: COVID-19 impacts"],
      confidence: 0.95
    },
    {
      id: "3",
      type: "clarification",
      title: "Ambiguous Delivery Terms",
      description: "Section 2.3 uses vague language: 'reasonable quality standards'",
      evidence: ["Ambiguity score: 3.2/1k words", "Missing acceptance criteria"],
      confidence: 0.76
    }
  ];

  const qualityMetrics = [
    { label: "Overall Quality", value: 87, target: 85, status: "excellent" },
    { label: "Standardization", value: 78, target: 80, status: "warning" },
    { label: "Completeness", value: 92, target: 90, status: "excellent" },
    { label: "Ambiguity Score", value: 2.1, target: 2.0, status: "warning", unit: "/1k words" }
  ];

  const evidenceItems = [
    {
      clause: "Data Protection Clause 4.2",
      source: "GDPR_Template_v3.1",
      similarity: 0.94,
      keywords: ["personal data", "processing", "lawful basis"],
      rationale: "High similarity to approved GDPR template with proven compliance record"
    },
    {
      clause: "Liability Limitation 7.1", 
      source: "Standard_Terms_Library",
      similarity: 0.87,
      keywords: ["limitation", "consequential damages", "aggregate liability"],
      rationale: "Standard limitation clause balancing risk allocation between parties"
    }
  ];

  const raciData = [
    { deliverable: "Technical Requirements", responsible: "Tech Lead", accountable: "PM", consulted: "Legal", informed: "Stakeholders" },
    { deliverable: "System Architecture", responsible: "Architect", accountable: "PM", consulted: "Security", informed: "Tech Lead" },
    { deliverable: "MVP Development", responsible: "Dev Team", accountable: "Tech Lead", consulted: "QA", informed: "PM" }
  ];

  return (
    <div className="w-96 bg-panel border-l border-panel-border flex flex-col h-full">
      <div className="p-4 border-b border-panel-border bg-panel-header">
        <h2 className="text-sm font-semibold text-foreground">Context Panel</h2>
      </div>

      <Tabs defaultValue="suggestions" className="flex-1 flex flex-col">
        <div className="px-4 pt-2">
          <TabsList className="grid w-full grid-cols-4 h-8">
            <TabsTrigger value="suggestions" className="text-xs">Suggestions</TabsTrigger>
            <TabsTrigger value="quality" className="text-xs">Quality</TabsTrigger>
            <TabsTrigger value="evidence" className="text-xs">Evidence</TabsTrigger>
            <TabsTrigger value="raci" className="text-xs">RACI</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="suggestions" className="h-full m-0">
            <ScrollArea className="h-full px-4 pb-4">
              <div className="space-y-3">
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="p-3">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {suggestion.type === "critical" && (
                            <AlertTriangle className="w-4 h-4 text-quality-critical flex-shrink-0" />
                          )}
                          {suggestion.type === "improvement" && (
                            <Lightbulb className="w-4 h-4 text-quality-good flex-shrink-0" />
                          )}
                          {suggestion.type === "clarification" && (
                            <Eye className="w-4 h-4 text-quality-warning flex-shrink-0" />
                          )}
                          <span className="text-sm font-medium text-foreground">
                            {suggestion.title}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(suggestion.confidence * 100)}%
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {suggestion.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-foreground">Evidence:</div>
                        <ul className="space-y-1">
                          {suggestion.evidence.map((item, index) => (
                            <li key={index} className="text-xs text-muted-foreground flex items-center space-x-2">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs flex-1">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs flex-1">
                          <ThumbsDown className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" variant="ghost" className="h-7 text-xs">
                          <MessageSquare className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="quality" className="h-full m-0">
            <ScrollArea className="h-full px-4 pb-4">
              <div className="space-y-4">
                {qualityMetrics.map((metric, index) => (
                  <Card key={index} className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {metric.label}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-foreground">
                            {metric.value}{metric.unit || '%'}
                          </span>
                          {metric.status === "excellent" && (
                            <CheckCircle2 className="w-4 h-4 text-quality-excellent" />
                          )}
                          {metric.status === "warning" && (
                            <AlertTriangle className="w-4 h-4 text-quality-warning" />
                          )}
                        </div>
                      </div>
                      <Progress 
                        value={metric.unit ? (metric.target / metric.value) * 100 : metric.value} 
                        className="h-2"
                      />
                      <div className="text-xs text-muted-foreground">
                        Target: {metric.target}{metric.unit || '%'}
                      </div>
                    </div>
                  </Card>
                ))}
                
                <Card className="p-3">
                  <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4" />
                      <span>Quality Trend</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="text-xs text-muted-foreground">
                      +5% improvement from last review
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="evidence" className="h-full m-0">
            <ScrollArea className="h-full px-4 pb-4">
              <div className="space-y-3">
                {evidenceItems.map((item, index) => (
                  <Card key={index} className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">
                          {item.clause}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {Math.round(item.similarity * 100)}% match
                        </Badge>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Source: {item.source}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-foreground">Keywords:</div>
                        <div className="flex flex-wrap gap-1">
                          {item.keywords.map((keyword, kIndex) => (
                            <Badge key={kIndex} variant="secondary" className="text-xs h-5">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.rationale}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="raci" className="h-full m-0">
            <ScrollArea className="h-full px-4 pb-4">
              <div className="space-y-3">
                {raciData.map((item, index) => (
                  <Card key={index} className="p-3">
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">
                        {item.deliverable}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="font-medium text-foreground">R:</span>
                          <span className="text-muted-foreground ml-1">{item.responsible}</span>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">A:</span>
                          <span className="text-muted-foreground ml-1">{item.accountable}</span>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">C:</span>
                          <span className="text-muted-foreground ml-1">{item.consulted}</span>
                        </div>
                        <div>
                          <span className="font-medium text-foreground">I:</span>
                          <span className="text-muted-foreground ml-1">{item.informed}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ContextPanel;
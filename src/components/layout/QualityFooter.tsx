import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Lock,
  Unlock
} from "lucide-react";

const QualityFooter = () => {
  const metrics = [
    {
      label: "Quality Score",
      value: 87,
      target: 85,
      status: "excellent",
      icon: Target
    },
    {
      label: "Ambiguity",
      value: 2.1,
      target: 2.0,
      status: "warning", 
      icon: AlertTriangle,
      unit: "/1k words"
    },
    {
      label: "Standardization",
      value: 78,
      target: 80,
      status: "warning",
      icon: TrendingUp,
      unit: "%"
    },
    {
      label: "High-Impact Edits",
      value: 3,
      status: "info",
      icon: CheckCircle2
    }
  ];

  const exportGateStatus = {
    passed: true,
    score: 87,
    threshold: 85
  };

  return (
    <footer className="h-16 bg-card border-t border-border flex items-center justify-between px-6">
      {/* Quality Metrics */}
      <div className="flex items-center space-x-6">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <metric.icon className={`w-4 h-4 ${
                metric.status === "excellent" ? "text-quality-excellent" :
                metric.status === "warning" ? "text-quality-warning" :
                metric.status === "info" ? "text-info" :
                "text-muted-foreground"
              }`} />
              <span className="text-sm font-medium text-foreground">
                {metric.label}:
              </span>
              <span className={`text-sm font-semibold ${
                metric.status === "excellent" ? "text-quality-excellent" :
                metric.status === "warning" ? "text-quality-warning" :
                "text-foreground"
              }`}>
                {metric.value}{metric.unit || (metric.target ? "%" : "")}
              </span>
            </div>
            
            {metric.target && (
              <div className="flex items-center space-x-2">
                <Progress 
                  value={metric.unit === "/1k words" ? 
                    Math.max(0, 100 - ((metric.value / metric.target) * 100)) :
                    (metric.value / metric.target) * 100
                  }
                  className="w-16 h-2"
                />
                <span className="text-xs text-muted-foreground">
                  {metric.target}{metric.unit || "%"}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Export Gate Status */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {exportGateStatus.passed ? (
            <Unlock className="w-4 h-4 text-quality-excellent" />
          ) : (
            <Lock className="w-4 h-4 text-quality-critical" />
          )}
          <span className="text-sm font-medium text-foreground">
            Export Gate:
          </span>
          <Badge 
            variant={exportGateStatus.passed ? "default" : "destructive"}
            className={exportGateStatus.passed ? "bg-quality-excellent" : ""}
          >
            {exportGateStatus.passed ? "Ready" : "Blocked"}
          </Badge>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {exportGateStatus.score}% / {exportGateStatus.threshold}% required
        </div>
        
        {!exportGateStatus.passed && (
          <Button variant="outline" size="sm" className="h-8">
            Override Required
          </Button>
        )}
      </div>
    </footer>
  );
};

export default QualityFooter;
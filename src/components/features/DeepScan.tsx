import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Upload, 
  Scan, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText,
  Shield,
  Clock,
  DollarSign,
  Users,
  Gavel,
  Download
} from "lucide-react";

interface ScanResult {
  id: string;
  category: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  location: string;
  suggestion?: string;
  confidence: number;
}

const DeepScan = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const [scanConfig, setScanConfig] = useState({
    riskAnalysis: true,
    complianceCheck: true,
    financialTerms: true,
    legalClauses: true,
    dataPrivacy: true,
    ipRights: true,
    terminationClauses: true,
    liabilityTerms: true
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const startDeepScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate scanning process
    const intervals = [0, 15, 35, 55, 75, 90, 100];
    for (let i = 0; i < intervals.length; i++) {
      setTimeout(() => {
        setScanProgress(intervals[i]);
        if (intervals[i] === 100) {
          setIsScanning(false);
          // Mock results
          setScanResults([
            {
              id: "1",
              category: "Risk Analysis",
              severity: "critical",
              title: "Unlimited Liability Exposure",
              description: "Contract contains unlimited liability clause without caps",
              location: "Section 8.2",
              suggestion: "Add liability cap of $1M or project value",
              confidence: 95
            },
            {
              id: "2", 
              category: "Compliance",
              severity: "high",
              title: "Missing GDPR Compliance Clause",
              description: "No data protection clauses found for EU operations",
              location: "Data Processing Section",
              suggestion: "Add GDPR compliance and data transfer clauses",
              confidence: 88
            },
            {
              id: "3",
              category: "Financial Terms",
              severity: "medium", 
              title: "Payment Terms Favor Vendor",
              description: "Net 15 payment terms with 2% late fees",
              location: "Section 4.1",
              suggestion: "Negotiate to Net 30 with reduced penalties",
              confidence: 76
            },
            {
              id: "4",
              category: "Legal Clauses",
              severity: "high",
              title: "Broad Indemnification Scope",
              description: "Customer indemnifies vendor for all claims including negligence",
              location: "Section 9.1",
              suggestion: "Limit indemnification to specific scenarios",
              confidence: 92
            }
          ]);
        }
      }, i * 1000);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "destructive";
      case "high": return "destructive"; 
      case "medium": return "default";
      case "low": return "secondary";
      default: return "default";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": 
      case "high": 
        return <XCircle className="w-4 h-4" />;
      case "medium": 
        return <AlertTriangle className="w-4 h-4" />;
      case "low": 
        return <CheckCircle className="w-4 h-4" />;
      default: 
        return <Eye className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "risk analysis": return <Shield className="w-4 h-4" />;
      case "compliance": return <Gavel className="w-4 h-4" />;
      case "financial terms": return <DollarSign className="w-4 h-4" />;
      case "legal clauses": return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Deep Contract Scan</h1>
          <p className="text-muted-foreground">
            AI-powered comprehensive analysis of contract risks, compliance, and optimization opportunities
          </p>
        </div>
        <Button variant="outline" disabled={!scanResults.length}>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload & Config */}
        <div className="lg:col-span-1 space-y-6">
          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2" />
                Upload Contracts
              </CardTitle>
              <CardDescription>
                Upload PDF, DOCX, or TXT files for analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label 
                  htmlFor="file-upload"
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors block"
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                </label>
                
                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="text-sm truncate">{file.name}</span>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setFiles(files.filter((_, i) => i !== index))}
                        >
                          <XCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Scan Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>Scan Configuration</CardTitle>
              <CardDescription>
                Select analysis areas to focus on
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(scanConfig).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox 
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) => 
                        setScanConfig(prev => ({ ...prev, [key]: !!checked }))
                      }
                    />
                    <label htmlFor={key} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <Button 
                onClick={startDeepScan}
                disabled={files.length === 0 || isScanning}
                className="w-full"
              >
                <Scan className="w-4 h-4 mr-2" />
                {isScanning ? "Scanning..." : "Start Deep Scan"}
              </Button>
              
              {isScanning && (
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing contracts...</span>
                    <span>{scanProgress}%</span>
                  </div>
                  <Progress value={scanProgress} />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          {scanResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Scan Results
                  <Badge variant="outline">
                    {scanResults.length} issues found
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Comprehensive analysis results with AI-powered recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList>
                    <TabsTrigger value="all">All Issues</TabsTrigger>
                    <TabsTrigger value="critical">Critical</TabsTrigger>
                    <TabsTrigger value="high">High Risk</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="all" className="mt-4">
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-4">
                        {scanResults.map((result) => (
                          <Card key={result.id} className="border-l-4 border-l-destructive">
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                  <div className="flex items-center space-x-2">
                                    {getCategoryIcon(result.category)}
                                    {getSeverityIcon(result.severity)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h4 className="font-medium">{result.title}</h4>
                                      <Badge variant={getSeverityColor(result.severity)} className="text-xs">
                                        {result.severity.toUpperCase()}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {result.description}
                                    </p>
                                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                      <span>📍 {result.location}</span>
                                      <span>🎯 {result.confidence}% confidence</span>
                                      <span>📂 {result.category}</span>
                                    </div>
                                    {result.suggestion && (
                                      <Alert className="mt-3">
                                        <AlertDescription className="text-xs">
                                          <strong>Recommendation:</strong> {result.suggestion}
                                        </AlertDescription>
                                      </Alert>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="critical" className="mt-4">
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-4">
                        {scanResults.filter(r => r.severity === "critical").map((result) => (
                          <Card key={result.id} className="border-l-4 border-l-destructive">
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                  <div className="flex items-center space-x-2">
                                    {getCategoryIcon(result.category)}
                                    {getSeverityIcon(result.severity)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h4 className="font-medium">{result.title}</h4>
                                      <Badge variant="destructive" className="text-xs">
                                        CRITICAL
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {result.description}
                                    </p>
                                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                      <span>📍 {result.location}</span>
                                      <span>🎯 {result.confidence}% confidence</span>
                                    </div>
                                    {result.suggestion && (
                                      <Alert className="mt-3">
                                        <AlertDescription className="text-xs">
                                          <strong>Urgent Action Required:</strong> {result.suggestion}
                                        </AlertDescription>
                                      </Alert>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="high" className="mt-4">
                    <ScrollArea className="h-[600px]">
                      <div className="space-y-4">
                        {scanResults.filter(r => r.severity === "high").map((result) => (
                          <Card key={result.id} className="border-l-4 border-l-orange-500">
                            <CardContent className="pt-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                  <div className="flex items-center space-x-2">
                                    {getCategoryIcon(result.category)}
                                    {getSeverityIcon(result.severity)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h4 className="font-medium">{result.title}</h4>
                                      <Badge variant="destructive" className="text-xs">
                                        HIGH RISK
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {result.description}
                                    </p>
                                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                      <span>📍 {result.location}</span>
                                      <span>🎯 {result.confidence}% confidence</span>
                                    </div>
                                    {result.suggestion && (
                                      <Alert className="mt-3">
                                        <AlertDescription className="text-xs">
                                          <strong>Recommendation:</strong> {result.suggestion}
                                        </AlertDescription>
                                      </Alert>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="summary" className="mt-4">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center space-x-2">
                            <XCircle className="w-5 h-5 text-destructive" />
                            <div>
                              <p className="text-2xl font-bold">
                                {scanResults.filter(r => r.severity === "critical" || r.severity === "high").length}
                              </p>
                              <p className="text-xs text-muted-foreground">High-Priority Issues</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-4">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-orange-500" />
                            <div>
                              <p className="text-2xl font-bold">87%</p>
                              <p className="text-xs text-muted-foreground">Analysis Confidence</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Key Recommendations:</strong>
                        <ul className="mt-2 list-disc list-inside text-sm space-y-1">
                          <li>Address unlimited liability exposure immediately</li>
                          <li>Add GDPR compliance clauses for EU operations</li>
                          <li>Negotiate more favorable payment terms</li>
                          <li>Limit indemnification scope to reduce risk</li>
                        </ul>
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
          
          {!isScanning && scanResults.length === 0 && files.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Scan className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Ready to Scan</h3>
                  <p className="text-muted-foreground mb-4">
                    Click "Start Deep Scan" to begin AI-powered contract analysis
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {!isScanning && scanResults.length === 0 && files.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No Contracts Uploaded</h3>
                  <p className="text-muted-foreground">
                    Upload contract files to begin deep scanning and analysis
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeepScan;
import TopNavigation from "./TopNavigation";
import DocumentOutline from "./DocumentOutline";
import DocumentViewer from "./DocumentViewer";
import ContextPanel from "./ContextPanel";
import QualityFooter from "./QualityFooter";

const ContractReviewLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Top Navigation */}
      <TopNavigation />
      
      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Document Outline */}
        <DocumentOutline />
        
        {/* Center - Document Viewer */}
        <DocumentViewer />
        
        {/* Right Sidebar - Context Panel */}
        <ContextPanel />
      </div>
      
      {/* Bottom - Quality Metrics Footer */}
      <QualityFooter />
    </div>
  );
};

export default ContractReviewLayout;
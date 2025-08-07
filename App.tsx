import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { 
  BarChart3, 
  Brain, 
  LayoutDashboard, 
  Plus,
  Settings,
  HelpCircle,
  ArrowLeft
} from "lucide-react";

import { Dashboard } from "./components/Dashboard";
import { ComplaintForm } from "./components/ComplaintForm";
import { ComplaintAnalysis } from "./components/ComplaintAnalysis";
import { Analytics } from "./components/Analytics";
import { DomainSelector } from "./components/DomainSelector";
import { getCurrentDomain, type DomainConfig } from "./components/DomainConfig";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedDomain, setSelectedDomain] = useState<DomainConfig | null>(null);
  const [showDomainSelector, setShowDomainSelector] = useState(false);

  useEffect(() => {
    const domain = getCurrentDomain();
    const savedDomain = localStorage.getItem('selectedDomain');
    
    if (!savedDomain) {
      setShowDomainSelector(true);
    } else {
      setSelectedDomain(domain);
    }
  }, []);

  const handleDomainSelected = (domain: DomainConfig) => {
    setSelectedDomain(domain);
    setShowDomainSelector(false);
  };

  const handleChangeDomain = () => {
    setShowDomainSelector(true);
  };

  if (showDomainSelector) {
    return <DomainSelector onDomainSelected={handleDomainSelected} />;
  }

  if (!selectedDomain) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Complaint Analyzer AI</h1>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{selectedDomain.icon}</span>
                  <p className="text-sm text-muted-foreground">
                    {selectedDomain.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:inline-flex ">
                AI Powered
              </Badge>
              <Button size="sm" variant="outline" onClick={handleChangeDomain}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Change Domain</span>
                <span className="sm:hidden">Change</span>
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 ">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-fit grid-cols-4 lg:w-full lg:grid-cols-4 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="inline sm:hidden">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="submit" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="inline sm:hidden">Submit</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="inline sm:hidden">Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="inline sm:hidden">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                {selectedDomain.name} Dashboard
              </h2>
              <p className="text-muted-foreground">
                Overview of all complaints and their AI-powered analysis status for your institution
              </p>
            </div>
            <Dashboard />
          </TabsContent>

          <TabsContent value="submit" className="space-y-6">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-semibold mb-2">Submit a Complaint</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI system will automatically analyze your complaint, categorize it based on {selectedDomain.name.toLowerCase()} standards, 
                determine the priority level, and route it to the appropriate department for quick resolution.
              </p>
            </div>
            <ComplaintForm />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Detailed AI Analysis</h2>
              <p className="text-muted-foreground">
                In-depth analysis of a college complaint with AI-generated insights and recommended actions
              </p>
            </div>
            <ComplaintAnalysis complaintId="C001" />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Analytics & Insights</h2>
              <p className="text-muted-foreground">
                Comprehensive analytics powered by AI to identify patterns, trends, and improvement opportunities 
                specific to {selectedDomain.name.toLowerCase()}s
              </p>
            </div>
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>

      {/* Help Section */}
      <div className="fixed bottom-4 right-4">
        <Button size="sm" variant="outline" className="rounded-full shadow-lg">
          <HelpCircle className="h-4 w-4 mr-2" />
          Help
        </Button>
      </div>

      {/* Footer with domain info */}
      <div className="border-t bg-muted/30 py-4 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Current Domain:</span>
              <Badge variant="outline" className="flex items-center gap-1">
                {selectedDomain.icon} {selectedDomain.name}
              </Badge>
            </div>
            <div>
              Perfect for your college project demonstration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
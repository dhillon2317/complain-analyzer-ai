import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import { CheckCircle, Send, Info } from "lucide-react";
import { getCurrentDomain } from "./DomainConfig";

export function ComplaintForm() {
  const domain = getCurrentDomain();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    department: "",
    urgency: "",
    contactInfo: "",
    userType: ""
  });

  // College-specific user types
  const userTypes = [
    "Student",
    "Faculty/Staff", 
    "Parent/Guardian",
    "Visitor",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call and AI processing
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          title: "",
          description: "",
          category: "",
          department: "",
          urgency: "",
          contactInfo: "",
          userType: ""
        });
      }, 3000);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Complaint Submitted Successfully!</h3>
          <p className="text-muted-foreground mb-4">
            Your complaint has been received and is being processed by our AI system. 
            It will be automatically routed to the appropriate department.
          </p>
          <Alert>
            <AlertDescription>
              <strong>Complaint ID: C{Date.now().toString().slice(-3)}</strong>
              <br />
              <strong>Department:</strong> {formData.department || "Auto-assigned"}
              <br />
              <strong>Expected Response:</strong> Based on {formData.urgency} priority level
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{domain.icon}</span>
          <div>
            <CardTitle>Submit a College Complaint</CardTitle>
            <CardDescription>
              Our AI system will analyze your complaint and route it to the appropriate department for quick resolution
            </CardDescription>
          </div>
        </div>
        
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <strong>Common Issues:</strong> Fees & scholarships, infrastructure problems (fans, lights), 
            parking, WiFi, canteen, hostel facilities, and academic services.
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>I am a</Label>
              <Select 
                value={formData.userType} 
                onValueChange={(value) => handleInputChange("userType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {userTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Contact Information</Label>
              <Input
                id="contact"
                placeholder="Email or phone number"
                value={formData.contactInfo}
                onChange={(e) => handleInputChange("contactInfo", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Complaint Title</Label>
            <Input
              id="title"
              placeholder="Brief description (e.g., 'Fan not working in Lecture Hall 3')"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Detailed Description</Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about the issue:
• What exactly is the problem?
• When did it start?
• Where is it located (building, room number)?
• How is it affecting you or others?
• Any previous attempts to resolve it?"
              className="min-h-32"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select complaint category" />
                </SelectTrigger>
                <SelectContent>
                  {domain.categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Relevant Department (Optional)</Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => handleInputChange("department", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="AI will auto-assign if not selected" />
                </SelectTrigger>
                <SelectContent>
                  {domain.departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* <div className="space-y-2">
            <Label>Priority Level</Label>
            <Select 
              value={formData.urgency} 
              onValueChange={(value) => handleInputChange("urgency", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="How urgent is this issue?" />
              </SelectTrigger>
              <SelectContent>
                {domain.urgencyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    <div>
                      <div className="font-medium">{level.label}</div>
                      <div className="text-xs text-muted-foreground">{level.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div> */}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing with AI...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Complaint
              </>
            )}
          </Button>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Your complaint will be analyzed by AI and automatically routed to the most appropriate department
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
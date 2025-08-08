import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { AlertTriangle, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { getCurrentDomain } from "./DomainConfig";
import React from "react";

interface ComplaintStats {
  total: number;
  pending: number;
  resolved: number;
  critical: number;
}

export function Dashboard() {
  const domain = getCurrentDomain();
  
  // Mock data - in real implementation, this would come from API/Supabase
  const stats: ComplaintStats = {
    total: 89,
    pending: 15,
    resolved: 74,
    critical: 4
  };

  // College-specific complaint data
  const recentComplaints = [
    {
      id: "C001",
      title: "Ceiling fan not working in Lecture Hall 3",
      category: "Infrastructure/Facilities",
      severity: "Medium",
      aiConfidence: 94,
      department: "Maintenance & Facilities",
      timeAgo: "2 hours ago",
      status: "Pending",
      submittedBy: "Student"
    },
    {
      id: "C002", 
      title: "WiFi connectivity issues in Computer Lab",
      category: "IT & Technical Support",
      severity: "High",
      aiConfidence: 91,
      department: "IT Department",
      timeAgo: "4 hours ago",
      status: "In Progress",
      submittedBy: "Faculty"
    },
    {
      id: "C003",
      title: "Delay in scholarship disbursement",
      category: "Fee & Financial Issues",
      severity: "High",
      aiConfidence: 97,
      department: "Finance Office",
      timeAgo: "6 hours ago",
      status: "Under Review",
      submittedBy: "Student"
    },
    {
      id: "C004",
      title: "Insufficient parking space for students",
      category: "Parking & Transportation",
      severity: "Medium",
      aiConfidence: 88,
      department: "Transport Office",
      timeAgo: "1 day ago",
      status: "Resolved",
      submittedBy: "Student"
    },
    {
      id: "C005",
      title: "Poor food quality in main canteen",
      category: "Food Services/Canteen",
      severity: "Medium",
      aiConfidence: 92,
      department: "Food Services",
      timeAgo: "1 day ago",
      status: "In Progress",
      submittedBy: "Student"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "destructive";
      case "High": return "destructive";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Under Review": return "bg-purple-100 text-purple-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Domain Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{domain.icon}</div>
            <div>
              <h3 className="font-semibold">{domain.name}</h3>
              <p className="text-sm text-muted-foreground">{domain.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.critical}</div>
            <p className="text-xs text-muted-foreground">Immediate action needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round((stats.resolved / stats.total) * 100)}%
            </div>
            <Progress value={(stats.resolved / stats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle>Recent College Complaints & AI Analysis</CardTitle>
          <CardDescription>
            Latest student and faculty complaints with AI-powered categorization and priority assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentComplaints.map((complaint) => (
              <div
                key={complaint.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg space-y-2 md:space-y-0 hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline">{complaint.id}</Badge>
                    <Badge variant={getSeverityColor(complaint.severity)}>
                      {complaint.severity}
                    </Badge>
                    <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {complaint.submittedBy}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium">{complaint.title}</h4>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Category: {complaint.category}</span>
                    <span>Department: {complaint.department}</span>
                    <span>{complaint.timeAgo}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-1">
                  <div className="text-sm font-medium">AI Confidence</div>
                  <div className="flex items-center gap-2">
                    <Progress value={complaint.aiConfidence} className="w-20" />
                    <span className="text-sm text-muted-foreground">
                      {complaint.aiConfidence}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions for College */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">🔧</span>
              </div>
              <div>
                <h4 className="font-medium">Infrastructure Issues</h4>
                <p className="text-sm text-muted-foreground">Report facility problems</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">💰</span>
              </div>
              <div>
                <h4 className="font-medium">Fee & Financial</h4>
                <p className="text-sm text-muted-foreground">Payment and scholarship issues</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600">🚗</span>
              </div>
              <div>
                <h4 className="font-medium">Parking & Transport</h4>
                <p className="text-sm text-muted-foreground">Campus accessibility issues</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
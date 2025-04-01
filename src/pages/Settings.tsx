
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Download, Globe, Key, Lock, LogOut, Moon, Pencil, Shield, Sun, Upload, User } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and settings</p>
      </div>
      
      <Tabs defaultValue="profile">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-64 flex-shrink-0">
            <TabsList className="flex flex-col h-auto w-full bg-background gap-1 p-0">
              <TabsTrigger value="profile" className="justify-start w-full data-[state=active]:bg-muted">
                <User className="mr-2 h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="justify-start w-full data-[state=active]:bg-muted">
                <Key className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="privacy" className="justify-start w-full data-[state=active]:bg-muted">
                <Lock className="mr-2 h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start w-full data-[state=active]:bg-muted">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="appearance" className="justify-start w-full data-[state=active]:bg-muted">
                <Sun className="mr-2 h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="integrations" className="justify-start w-full data-[state=active]:bg-muted">
                <Globe className="mr-2 h-4 w-4" />
                Integrations
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start w-full data-[state=active]:bg-muted">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 space-y-6">
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your profile details and personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    <Avatar className="h-24 w-24 border">
                      <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Avatar" />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium text-lg">Profile Photo</h3>
                        <p className="text-sm text-muted-foreground">
                          This will be displayed on your profile
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload new photo
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" defaultValue="Rahul" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" defaultValue="Sharma" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email address</Label>
                      <Input id="email" defaultValue="rahul.sharma@example.com" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone number</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" type="tel" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Write a short bio about yourself..." 
                        className="min-h-[100px]"
                        defaultValue="Computer Science student at Stanford University with a passion for machine learning and web development."
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Educational Information</CardTitle>
                  <CardDescription>Update your academic details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="university">University/College</Label>
                    <Input id="university" defaultValue="Stanford University" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree</Label>
                      <Input id="degree" defaultValue="Bachelor of Science" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="major">Major</Label>
                      <Input id="major" defaultValue="Computer Science" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduation">Expected Graduation</Label>
                      <Input id="graduation" defaultValue="May 2024" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gpa">GPA</Label>
                      <Input id="gpa" defaultValue="3.8/4.0" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="rahulsharma42" />
                    <p className="text-sm text-muted-foreground">
                      This will be your public username visible to others
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-account">Email address</Label>
                    <Input id="email-account" defaultValue="rahul.sharma@example.com" type="email" disabled />
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>
                      <Button variant="link" className="p-0 h-auto text-sm">Change email</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Account Data</CardTitle>
                      <CardDescription>Download or delete your account data</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex items-start gap-4">
                      <Download className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-medium">Download account data</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Download a copy of your personal data, including your profile information, 
                          courses, projects, and preferences.
                        </p>
                        <Button variant="outline" size="sm">Request data export</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-destructive/20 rounded-md">
                    <div className="flex items-start gap-4">
                      <LogOut className="h-5 w-5 text-destructive mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-medium text-destructive">Close account</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button variant="destructive" size="sm">Close account</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your profile visibility and data sharing preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Profile Visibility</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <Label>Public Profile</Label>
                          <p className="text-sm text-muted-foreground">
                            Make your profile visible to other students and recruiters
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <Label>Show Email Address</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow others to see your email address on your profile
                          </p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="space-y-0.5">
                          <Label>Show Course Progress</Label>
                          <p className="text-sm text-muted-foreground">
                            Display your learning progress and completed courses
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Data Sharing</h3>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="share-analytics" defaultChecked />
                        <div className="grid gap-1.5">
                          <Label htmlFor="share-analytics">
                            Share analytics data
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Help improve the platform by sharing anonymous usage data
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox id="personalized-content" defaultChecked />
                        <div className="grid gap-1.5">
                          <Label htmlFor="personalized-content">
                            Personalized content
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive recommendations based on your learning history and preferences
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Email Notifications</h3>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="border rounded-md divide-y">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Course Updates</p>
                          <p className="text-sm text-muted-foreground">New content and course announcements</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Assignment Reminders</p>
                          <p className="text-sm text-muted-foreground">Deadlines and upcoming assignments</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Job & Internship Opportunities</p>
                          <p className="text-sm text-muted-foreground">New job listings that match your profile</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">System Announcements</p>
                          <p className="text-sm text-muted-foreground">Platform updates and maintenance notices</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Marketing & Promotions</p>
                          <p className="text-sm text-muted-foreground">Special offers and promotional content</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">In-App Notifications</h3>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="border rounded-md divide-y">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Messages</p>
                          <p className="text-sm text-muted-foreground">Direct messages from mentors or peers</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Progress Updates</p>
                          <p className="text-sm text-muted-foreground">Course completion and achievement milestones</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Due Dates</p>
                          <p className="text-sm text-muted-foreground">Assignment and project deadlines</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize the look and feel of your interface</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Theme Preference</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="border rounded-md p-2 w-full aspect-square flex items-center justify-center cursor-pointer bg-background">
                          <Sun className="h-8 w-8" />
                        </div>
                        <span className="text-sm">Light</span>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="border rounded-md p-2 w-full aspect-square flex items-center justify-center cursor-pointer bg-slate-950">
                          <Moon className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-sm">Dark</span>
                      </div>
                      
                      <div className="flex flex-col items-center gap-2">
                        <div className="border rounded-md p-2 w-full aspect-square flex items-center justify-center cursor-pointer relative overflow-hidden">
                          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-background to-slate-950" />
                          <div className="z-10 flex items-center gap-1">
                            <Sun className="h-4 w-4" />
                            <Moon className="h-4 w-4" />
                          </div>
                        </div>
                        <span className="text-sm">System</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Font Size</h3>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="text-center p-2 border rounded-md cursor-pointer">
                        <span className="text-xs">Small</span>
                      </div>
                      <div className="text-center p-2 border rounded-md cursor-pointer bg-muted">
                        <span className="text-sm">Medium</span>
                      </div>
                      <div className="text-center p-2 border rounded-md cursor-pointer">
                        <span className="text-base">Large</span>
                      </div>
                      <div className="text-center p-2 border rounded-md cursor-pointer">
                        <span className="text-lg">XL</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Reduced Motion</h3>
                      <Switch />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Minimize animations and transitions for improved accessibility
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Dashboard Layout</h3>
                    <Select defaultValue="default">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="expanded">Expanded</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Manage your connected platforms and services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-md divide-y">
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" alt="GitHub" />
                          <AvatarFallback>GH</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">GitHub</p>
                          <p className="text-sm text-muted-foreground">Connected as @rahulsharma42</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Disconnect</Button>
                    </div>
                    
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" alt="LinkedIn" />
                          <AvatarFallback>LI</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">LinkedIn</p>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" alt="Google" />
                          <AvatarFallback>G</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-sm text-muted-foreground">Connected as rahul.sharma@gmail.com</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">Disconnect</Button>
                    </div>
                    
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="/placeholder.svg" alt="HackerRank" />
                          <AvatarFallback>HR</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">HackerRank</p>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>Manage API tokens for third-party integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium">Personal API Token</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Use this token to access your data from external applications and services
                    </p>
                    <div className="flex gap-2">
                      <Input 
                        type="password" 
                        value="••••••••••••••••••••••"
                        readOnly
                        className="font-mono"
                      />
                      <Button variant="outline">Copy</Button>
                      <Button variant="outline">Reset</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto">
                    <Pencil className="mr-2 h-4 w-4" />
                    Manage API Permissions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password & Authentication</CardTitle>
                  <CardDescription>Manage your login security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Change Password</h3>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm new password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button>Update password</Button>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline">Setup 2FA</Button>
                  </div>
                  
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="font-medium">Active Sessions</h3>
                    <div className="border rounded-md divide-y">
                      <div className="p-4">
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">Current Session</p>
                          <Badge>Active Now</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • San Francisco, CA</p>
                        <p className="text-xs text-muted-foreground mt-1">Started 2 hours ago</p>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">Mobile App</p>
                          <Badge variant="outline">Last active 2 days ago</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">iPhone 13 • San Francisco, CA</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">Sign out all other sessions</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Login History</CardTitle>
                  <CardDescription>Recent account activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md divide-y">
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Successful login</p>
                            <p className="text-sm">Chrome on Windows • San Francisco, CA</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Today, 10:32 AM</p>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Successful login</p>
                            <p className="text-sm">Mobile App • San Francisco, CA</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Nov 5, 2023, 8:15 PM</p>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Successful login</p>
                            <p className="text-sm">Firefox on MacOS • San Francisco, CA</p>
                          </div>
                          <p className="text-sm text-muted-foreground">Nov 2, 2023, 2:20 PM</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="link" className="px-0">View full history</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;

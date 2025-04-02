import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  
  // General Settings State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("english");
  
  // Account Settings State
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [username, setUsername] = useState("johndoe");
  
  // Privacy Settings State
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [showActivity, setShowActivity] = useState(true);
  const [allowDataCollection, setAllowDataCollection] = useState(true);
  
  // Theme Settings State
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [accentColor, setAccentColor] = useState("blue");
  
  // Integrations State
  const [githubIntegrated, setGithubIntegrated] = useState(true);
  const [googleIntegrated, setGoogleIntegrated] = useState(false);
  const [slackIntegrated, setSlackIntegrated] = useState(false);
  
  const handleSaveGeneral = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Settings updated",
        description: "Your general settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleSaveAccount = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Account updated",
        description: "Your account information has been updated successfully.",
      });
    }, 1000);
  };
  
  const handleSavePrivacy = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Privacy settings updated",
        description: "Your privacy settings have been updated successfully.",
      });
    }, 1000);
  };
  
  const handleSaveTheme = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Theme updated",
        description: "Your theme settings have been updated successfully.",
      });
    }, 1000);
  };
  
  const handleConnectIntegration = (service: string) => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      
      if (service === 'github') {
        setGithubIntegrated(!githubIntegrated);
      } else if (service === 'google') {
        setGoogleIntegrated(!googleIntegrated);
      } else if (service === 'slack') {
        setSlackIntegrated(!slackIntegrated);
      }
      
      toast({
        title: githubIntegrated ? "Disconnected" : "Connected",
        description: `${service} has been ${githubIntegrated ? "disconnected" : "connected"} successfully.`,
      });
    }, 1000);
  };

  return (
    <div className="container max-w-5xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account and preferences</p>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full flex overflow-x-auto mb-8 pb-px gap-2">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your general application settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-gray-500">Use dark theme across the application</p>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Manage your personal account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input 
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => {
                  toast({
                    title: "Account deletion requested",
                    description: "We've sent a confirmation email to delete your account.",
                    variant: "destructive",
                  });
                }}
              >
                Delete Account
              </Button>
              <Button onClick={handleSaveAccount} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
              <CardDescription>
                Control your privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public <Badge className="ml-2" variant="outline">Anyone can view</Badge></SelectItem>
                    <SelectItem value="connections">Connections Only <Badge className="ml-2" variant="outline">Only your connections</Badge></SelectItem>
                    <SelectItem value="private">Private <Badge className="ml-2" variant="outline">Only you can view</Badge></SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Activity Status</h3>
                  <p className="text-sm text-gray-500">Show when you're active on the platform</p>
                </div>
                <Switch 
                  checked={showActivity} 
                  onCheckedChange={setShowActivity} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Data Collection</h3>
                  <p className="text-sm text-gray-500">Allow us to collect usage data to improve the service</p>
                </div>
                <Switch 
                  checked={allowDataCollection} 
                  onCheckedChange={setAllowDataCollection} 
                />
              </div>
              
              <div className="pt-2">
                <h3 className="font-medium mb-2">Download Your Data</h3>
                <p className="text-sm text-gray-500 mb-4">Get a copy of all the data we have about you</p>
                <Button variant="outline" onClick={() => {
                  toast({
                    title: "Data export requested",
                    description: "We'll email you when your data is ready to download.",
                  });
                }}>
                  Request Data Export
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSavePrivacy} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="theme">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Personalize the look and feel of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme Mode</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`cursor-pointer rounded-lg border p-4 text-center hover:bg-muted ${selectedTheme === 'light' ? 'border-primary bg-muted' : ''}`}
                    onClick={() => setSelectedTheme('light')}
                  >
                    <div className="h-20 rounded bg-white border mb-2"></div>
                    <div>Light</div>
                  </div>
                  
                  <div 
                    className={`cursor-pointer rounded-lg border p-4 text-center hover:bg-muted ${selectedTheme === 'dark' ? 'border-primary bg-muted' : ''}`}
                    onClick={() => setSelectedTheme('dark')}
                  >
                    <div className="h-20 rounded bg-gray-800 border mb-2"></div>
                    <div>Dark</div>
                  </div>
                  
                  <div 
                    className={`cursor-pointer rounded-lg border p-4 text-center hover:bg-muted ${selectedTheme === 'system' ? 'border-primary bg-muted' : ''}`}
                    onClick={() => setSelectedTheme('system')}
                  >
                    <div className="h-20 rounded bg-gradient-to-r from-white to-gray-800 border mb-2"></div>
                    <div>System</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <div className="grid grid-cols-5 gap-4">
                  <div 
                    className={`cursor-pointer rounded-full w-12 h-12 bg-blue-500 mx-auto ${accentColor === 'blue' ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                    onClick={() => setAccentColor('blue')}
                  ></div>
                  
                  <div 
                    className={`cursor-pointer rounded-full w-12 h-12 bg-green-500 mx-auto ${accentColor === 'green' ? 'ring-2 ring-offset-2 ring-green-500' : ''}`}
                    onClick={() => setAccentColor('green')}
                  ></div>
                  
                  <div 
                    className={`cursor-pointer rounded-full w-12 h-12 bg-purple-500 mx-auto ${accentColor === 'purple' ? 'ring-2 ring-offset-2 ring-purple-500' : ''}`}
                    onClick={() => setAccentColor('purple')}
                  ></div>
                  
                  <div 
                    className={`cursor-pointer rounded-full w-12 h-12 bg-pink-500 mx-auto ${accentColor === 'pink' ? 'ring-2 ring-offset-2 ring-pink-500' : ''}`}
                    onClick={() => setAccentColor('pink')}
                  ></div>
                  
                  <div 
                    className={`cursor-pointer rounded-full w-12 h-12 bg-orange-500 mx-auto ${accentColor === 'orange' ? 'ring-2 ring-offset-2 ring-orange-500' : ''}`}
                    onClick={() => setAccentColor('orange')}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select defaultValue="medium">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveTheme} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect your accounts to other services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-medium">GitHub</h3>
                    <p className="text-sm text-gray-500">Connect your GitHub account</p>
                  </div>
                </div>
                <Button 
                  variant={githubIntegrated ? "destructive" : "default"}
                  onClick={() => handleConnectIntegration('github')}
                >
                  {githubIntegrated ? "Disconnect" : "Connect"}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Google</h3>
                    <p className="text-sm text-gray-500">Connect your Google account</p>
                  </div>
                </div>
                <Button 
                  variant={googleIntegrated ? "destructive" : "default"}
                  onClick={() => handleConnectIntegration('google')}
                >
                  {googleIntegrated ? "Disconnect" : "Connect"}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path></svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Slack</h3>
                    <p className="text-sm text-gray-500">Connect your Slack workspace</p>
                  </div>
                </div>
                <Button 
                  variant={slackIntegrated ? "destructive" : "default"}
                  onClick={() => handleConnectIntegration('slack')}
                >
                  {slackIntegrated ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

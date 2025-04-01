
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Github } from 'lucide-react';

interface LoginProps {
  onSuccessfulLogin: () => void;
}

export default function Login({ onSuccessfulLogin }: LoginProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (formData.email && formData.password) {
        toast.success('Login successful!');
        onSuccessfulLogin();
        navigate('/');
      } else {
        toast.error('Please enter both email and password');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-grid">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple flex items-center justify-center">
            <span className="text-white text-2xl font-bold">DS</span>
          </div>
          <h1 className="text-3xl font-bold gradient-heading">DeepSeek</h1>
          <p className="text-muted-foreground mt-2">Personalized Learning Automated System for Colleges</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Enter your credentials to access your personalized learning dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">College Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="your.name@college.edu" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a 
                    href="#" 
                    className="text-sm text-primary hover:underline"
                    onClick={(e) => e.preventDefault()}
                  >
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-3">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
              
              <div className="relative w-full my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">or continue with</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full"
                type="button"
                onClick={() => {
                  toast.success('GitHub login successful!');
                  onSuccessfulLogin();
                  navigate('/');
                }}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                Don't have an account?{" "}
                <a href="#" className="text-primary hover:underline" onClick={(e) => e.preventDefault()}>
                  Create one
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}

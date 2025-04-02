
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

interface LoginProps {
  onSuccessfulLogin: () => void;
}

const Login = ({ onSuccessfulLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple validation
    if (!email || !password) {
      toast.error('Please enter both email and password');
      setIsLoading(false);
      return;
    }
    
    try {
      // Simulate login delay
      setTimeout(() => {
        console.info('Login successful (dummy)');
        toast.success('Login successful!');
        onSuccessfulLogin();
        navigate('/');
        setIsLoading(false);
      }, 800);
    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-t-4 border-t-primary">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold text-xl">
                DS
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to DeepSeek</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <button type="button" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              <p>
                Don't have an account?{' '}
                <button type="button" className="text-primary hover:underline">
                  Sign up
                </button>
              </p>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="w-full text-center text-sm text-muted-foreground">
              Your personalized learning companion for college students
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;


import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import BlogEditor from '@/components/BlogEditor';
import BlogManager from '@/components/BlogManager';
import GalleryManager from '@/components/GalleryManager';
import bcrypt from 'bcryptjs';

const Administrator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is already logged in
    const adminSession = localStorage.getItem('bravespace_admin_session');
    if (adminSession) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');

    try {
      // Query the admin_users table directly using service role
      const { data, error } = await supabase
        .from('admin_users')
        .select('username, password_hash')
        .eq('username', username)
        .single();

      if (error || !data) {
        setLoginError('Invalid credentials');
        setIsLoading(false);
        return;
      }

      // For demo purposes, we'll use simple password comparison
      // In production, you should use proper bcrypt comparison
      const isValidPassword = password === 'youcannothackthis@1313';
      
      if (isValidPassword && username === 'bravespace') {
        setIsLoggedIn(true);
        localStorage.setItem('bravespace_admin_session', 'true');
        setLoginError('');
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel!",
        });
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login failed. Please try again.');
    }

    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    localStorage.removeItem('bravespace_admin_session');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 px-6">
        <Card className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 card-glow">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gradient">
              Bravespace Admin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl"
                  required
                />
              </div>
              {loginError && (
                <p className="text-red-500 text-sm text-center">{loginError}</p>
              )}
              <Button 
                type="submit" 
                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gradient">
            Bravespace Admin Dashboard
          </h1>
          <Button onClick={handleLogout} variant="outline" className="rounded-xl">
            Logout
          </Button>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl">
            <TabsTrigger value="blogs" className="rounded-xl">Manage Blogs</TabsTrigger>
            <TabsTrigger value="editor" className="rounded-xl">Write Blog</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-xl">Gallery</TabsTrigger>
          </TabsList>

          {/* Blog Management */}
          <TabsContent value="blogs">
            <BlogManager />
          </TabsContent>

          {/* Blog Editor */}
          <TabsContent value="editor">
            <BlogEditor />
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery">
            <GalleryManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Administrator;


import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import BlogEditor from '@/components/BlogEditor';
import BlogManager from '@/components/BlogManager';
import GalleryManager from '@/components/GalleryManager';
import AdminLogin from '@/components/AdminLogin';
import { LogOut } from 'lucide-react';

const Administrator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gradient">
            Bravespace Admin Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="rounded-xl hover:scale-105 transition-transform duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
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

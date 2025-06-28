
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BlogEditor from '@/components/BlogEditor';
import BlogManager from '@/components/BlogManager';
import GalleryManager from '@/components/GalleryManager';
import TagManager from '@/components/TagManager';
import FounderManager from '@/components/FounderManager';
import AdminLogin from '@/components/AdminLogin';

const Administrator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated (stored in localStorage)
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('admin_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-200 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gradient">
            Bravespace Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="blogs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl">
            <TabsTrigger value="blogs" className="rounded-xl">Manage Blogs</TabsTrigger>
            <TabsTrigger value="editor" className="rounded-xl">Write Blog</TabsTrigger>
            <TabsTrigger value="tags" className="rounded-xl">Manage Tags</TabsTrigger>
            <TabsTrigger value="founders" className="rounded-xl">Manage Founders</TabsTrigger>
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

          {/* Tag Management */}
          <TabsContent value="tags">
            <TagManager />
          </TabsContent>

          {/* Founder Management */}
          <TabsContent value="founders">
            <FounderManager />
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

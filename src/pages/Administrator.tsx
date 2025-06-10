import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

const Administrator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Mock admin credentials - in real app, these would be secured with Supabase
  const ADMIN_USERNAME = 'bravespace_admin';
  const ADMIN_PASSWORD = 'secure_password_123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 px-6">
        <Card className="w-full max-w-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 card-glow">
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
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              {loginError && (
                <p className="text-red-500 text-sm text-center">{loginError}</p>
              )}
              <Button type="submit" className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
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
          <TabsList className="grid w-full grid-cols-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl">
            <TabsTrigger value="blogs" className="rounded-xl">Manage Blogs</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-xl">BRAVESPACE Gallery</TabsTrigger>
          </TabsList>

          {/* Blog Management */}
          <TabsContent value="blogs">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Create New Blog */}
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 card-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-gradient">Create New Blog</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Blog Title" className="rounded-xl" />
                  <Input type="file" accept="image/*" className="rounded-xl" />
                  <Textarea 
                    placeholder="Blog Content (supports markdown formatting)" 
                    rows={8}
                    className="rounded-xl resize-none"
                  />
                  <Button className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600">
                    Publish Blog
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Blogs */}
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 card-glow">
                <CardHeader>
                  <CardTitle className="text-xl text-gradient">Existing Blogs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock blog entries */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <h3 className="font-semibold text-gray-800 dark:text-white">Our First Visit to Sunshine Orphanage</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Published on Jan 15, 2024</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="rounded-lg">Edit</Button>
                        <Button size="sm" variant="destructive" className="rounded-lg">Delete</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                      <h3 className="font-semibold text-gray-800 dark:text-white">Teaching Technology to Our Elders</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Published on Jan 10, 2024</p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline" className="rounded-lg">Edit</Button>
                        <Button size="sm" variant="destructive" className="rounded-lg">Delete</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-0 card-glow">
              <CardHeader>
                <CardTitle className="text-xl text-gradient">Manage BRAVESPACE Word Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Upload New Images for Word Collage
                    </label>
                    <Input type="file" accept="image/*" multiple className="rounded-xl" />
                    <p className="text-xs text-gray-500 mt-1">
                      Upload multiple images that will be used to fill the BRAVESPACE word on the homepage
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Current Gallery Images</h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                      {/* Mock current images */}
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="relative group">
                          <img 
                            src={`https://images.unsplash.com/photo-${1580000000000 + i}?w=200&h=200&fit=crop`}
                            alt={`Gallery ${i}`}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <button className="absolute inset-0 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-sm font-semibold">
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600">
                    Update Gallery
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Administrator;

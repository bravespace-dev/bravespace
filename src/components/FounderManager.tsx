
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Pencil, Trash2, Plus, Upload } from 'lucide-react';

interface Founder {
  id: string;
  name: string;
  description: string;
  image_url: string;
  sort_order: number;
}

const FounderManager = () => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingFounder, setEditingFounder] = useState<Founder | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image_url: '',
    sort_order: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchFounders();
  }, []);

  const fetchFounders = async () => {
    try {
      const { data, error } = await supabase
        .from('founders')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setFounders(data || []);
    } catch (error) {
      console.error('Error fetching founders:', error);
      toast({
        title: "Error",
        description: "Failed to fetch founders",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Error",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "File size must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `founder-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('founder-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('founder-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsUploading(true);
      
      let imageUrl = formData.image_url;
      
      // Upload new image if a file is selected
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      if (editingFounder) {
        // Update existing founder
        const { error } = await supabase
          .from('founders')
          .update({
            name: formData.name,
            description: formData.description,
            image_url: imageUrl,
            sort_order: formData.sort_order,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingFounder.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Founder updated successfully!",
        });
      } else {
        // Create new founder
        const { error } = await supabase
          .from('founders')
          .insert([{
            name: formData.name,
            description: formData.description,
            image_url: imageUrl,
            sort_order: formData.sort_order
          }]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Founder created successfully!",
        });
      }
      
      resetForm();
      fetchFounders();
    } catch (error) {
      console.error('Error saving founder:', error);
      toast({
        title: "Error",
        description: "Failed to save founder",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (founder: Founder) => {
    setEditingFounder(founder);
    setFormData({
      name: founder.name,
      description: founder.description,
      image_url: founder.image_url,
      sort_order: founder.sort_order
    });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this founder?')) return;
    
    try {
      const { error } = await supabase
        .from('founders')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Founder deleted successfully!",
      });
      fetchFounders();
    } catch (error) {
      console.error('Error deleting founder:', error);
      toast({
        title: "Error",
        description: "Failed to delete founder",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image_url: '',
      sort_order: 0
    });
    setEditingFounder(null);
    setSelectedFile(null);
    setIsDialogOpen(false);
  };

  const handleAddNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading founders...</div>;
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 card-glow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl text-gradient">Manage Founders</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={handleAddNew}
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Founder
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingFounder ? 'Edit Founder' : 'Add New Founder'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Profile Image</label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="rounded-xl"
                      />
                      <Upload className="w-4 h-4 text-gray-500" />
                    </div>
                    {selectedFile && (
                      <p className="text-sm text-green-600">Selected: {selectedFile.name}</p>
                    )}
                    {editingFounder && !selectedFile && (
                      <div className="flex items-center gap-2">
                        <img 
                          src={formData.image_url} 
                          alt="Current"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-600">Current image (upload new to replace)</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <Input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                    className="rounded-xl"
                    min="0"
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    disabled={isUploading || (!selectedFile && !editingFounder && !formData.image_url)}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                  >
                    {isUploading ? 'Uploading...' : (editingFounder ? 'Update' : 'Create')}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {founders.map((founder) => (
              <TableRow key={founder.id}>
                <TableCell>
                  <img 
                    src={founder.image_url} 
                    alt={founder.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{founder.name}</TableCell>
                <TableCell className="max-w-xs truncate">{founder.description}</TableCell>
                <TableCell>{founder.sort_order}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(founder)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(founder.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {founders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No founders found. Add your first founder to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FounderManager;

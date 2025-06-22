
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, Plus } from 'lucide-react';

interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
  created_at: string;
}

const TagManager = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#3B82F6');
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { toast } = useToast();

  const fetchTags = async () => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setTags(data || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
      toast({
        title: "Error",
        description: "Failed to fetch tags.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const createSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleAddTag = async () => {
    if (!newTagName.trim()) {
      toast({
        title: "Error",
        description: "Tag name is required.",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);

    try {
      const slug = createSlug(newTagName);
      
      const { error } = await supabase
        .from('tags')
        .insert({
          name: newTagName.trim(),
          slug,
          color: newTagColor,
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Tag created successfully!",
      });

      setNewTagName('');
      setNewTagColor('#3B82F6');
      fetchTags();
    } catch (error) {
      console.error('Error creating tag:', error);
      toast({
        title: "Error",
        description: "Failed to create tag. Please try again.",
        variant: "destructive",
      });
    }

    setIsAdding(false);
  };

  const handleDeleteTag = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Tag deleted successfully!",
      });

      fetchTags();
    } catch (error) {
      console.error('Error deleting tag:', error);
      toast({
        title: "Error",
        description: "Failed to delete tag.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 card-glow">
        <CardContent className="p-8 text-center">
          <p>Loading tags...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 card-glow">
      <CardHeader>
        <CardTitle className="text-2xl text-gradient">Manage Tags</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Tag */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">Add New Tag</h3>
          <div className="flex gap-3">
            <Input
              placeholder="Tag name"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              className="rounded-xl"
            />
            <Input
              type="color"
              value={newTagColor}
              onChange={(e) => setNewTagColor(e.target.value)}
              className="w-16 rounded-xl"
            />
            <Button
              onClick={handleAddTag}
              disabled={isAdding}
              className="rounded-xl px-6"
            >
              <Plus className="w-4 h-4 mr-2" />
              {isAdding ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </div>

        {/* Tags List */}
        <div className="space-y-3">
          {tags.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No tags found. Create your first tag!</p>
          ) : (
            tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Badge style={{ backgroundColor: tag.color }} className="text-white">
                    {tag.name}
                  </Badge>
                  <span className="text-sm text-gray-500">/{tag.slug}</span>
                </div>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteTag(tag.id)}
                  className="rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TagManager;

"use client";

import { useEffect, useState, FormEvent } from 'react';
import { useTheme } from 'next-themes';
import { createClient } from '@supabase/supabase-js';
import { User} from 'lucide-react';

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
  created_at: string;
}

interface CommentDemoProps {
  type?: 'onlycomments' | 'both' | 'upload';
  limit?: number;
}

export default function CommentDemo({ type = 'both', limit = 10 }: CommentDemoProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Fetch comments from Supabase
    async function fetchComments() {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data ?? []); // Handle null or undefined data
      }
    }
    fetchComments();
  }, [limit]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('comments')
      .insert([{ name, email, comment }]);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      if (data) {
        setComments([data[0], ...comments]);
        setName('');
        setEmail('');
        setComment('');
      }
    }
  };

  return (
    <div className={`mx-auto max-w-2xl space-y-6 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {type !== 'upload' && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Comments</h2>
          {type !== 'onlycomments' && (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-4">
                  <div className="h-10 w-10 border rounded-full flex items-center justify-center bg-gray-200">
                    <User className="text-gray-500" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{comment.name}</div>
                      <div className="text-xs text-muted-foreground">{new Date(comment.created_at).toLocaleDateString()}</div>
                    </div>
                    <p className="text-muted-foreground">{comment.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {type !== 'onlycomments' && (
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Add a comment</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="comment" className="block text-sm font-medium">Comment</label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment..."
                rows={4}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

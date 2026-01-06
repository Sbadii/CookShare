'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Comment {
  id: number;
  content: string;
  authorName: string;
  createdAt: string;
}

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
}

export default function CommentSection({ postId, comments: initialComments }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Vous devez être connecté pour commenter.");
        setLoading(false);
        return;
      }

      const res = await fetch('http://localhost:8080/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          content: newComment,
          postId: postId
        })
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          alert("Votre session a expiré. Veuillez vous reconnecter.");
          router.push('/login');
          return;
        }
        const errorText = await res.text();
        console.error("❌ Failed to add comment:", res.status, errorText);
        throw new Error(`Erreur lors de l'ajout du commentaire: ${res.status} ${res.statusText}`);
      }

      const savedComment = await res.json();
      console.log("✅ Comment added:", savedComment);
      setComments([...comments, savedComment]);
      setNewComment('');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Erreur lors de l\'envoi du commentaire. Vérifiez la console pour plus de détails.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-[24px] border border-gray-100 p-6 md:p-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
        
      </div>

      {/* List */}
      <div className="space-y-6 mb-8 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                  <span className="font-bold text-gray-500 text-[10px]">
                    {comment.authorName ? comment.authorName.charAt(0).toUpperCase() : '?'}
                  </span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="bg-gray-50 rounded-2xl rounded-tl-none p-3 border border-gray-100/50">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-black text-gray-900 tracking-tight">{comment.authorName || 'Utilisateur'}</span>
                    <span className="text-[10px] font-bold text-gray-300">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-snug">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Soyez le premier à commenter !</p>
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative mt-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 pr-12 min-h-[48px] max-h-[120px] focus:ring-2 focus:ring-red-500/10 focus:border-red-500 focus:outline-none transition-all resize-none text-sm text-gray-700 placeholder:text-gray-400 placeholder:font-bold placeholder:text-[10px] placeholder:uppercase tracking-tight"
        />
        <button
          type="submit"
          disabled={loading || !newComment.trim()}
          className="absolute right-2 bottom-2 p-2 text-red-600 hover:text-red-700 transition-colors disabled:opacity-30"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
}

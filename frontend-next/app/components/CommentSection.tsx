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
    <div className="w-full bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        💬 Commentaires ({comments.length})
      </h3>

      {/* List */}
      <div className="space-y-8 mb-10 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center border border-orange-200">
                  <span className="font-bold text-orange-600 text-sm">
                    {comment.authorName ? comment.authorName.charAt(0).toUpperCase() : '?'}
                  </span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-900">{comment.authorName || 'Utilisateur inconnu'}</span>
                    <span className="text-xs text-gray-400">
                      {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400">Soyez le premier à commenter !</p>
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Partagez votre avis sur cette recette..."
          className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-4 pr-14 h-24 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:outline-none transition-all resize-none text-gray-700 placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={loading || !newComment.trim()}
          className="absolute bottom-4 right-4 p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
}

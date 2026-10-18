import React, { useState, useMemo } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  MessageCircle,
  PlusCircle,
  Sparkles,
  Share2,
  Send,
  User,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getDemoPostsWithDetails, demoComments } from '../../lib/demo-data';
import type { PostCategory, Post } from '../../types';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';

export const Community: React.FC = () => {
  const { user, profile } = useAuth();
  const { success, error } = useToast();

  const [posts, setPosts] = useState<Post[]>(() => getDemoPostsWithDetails());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedPosts, setLikedPosts] = useState<string[]>(['demo-post-1']);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<PostCategory>('showcase');

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  const toggleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId));
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes_count: p.likes_count - 1 } : p))
      );
    } else {
      setLikedPosts([...likedPosts, postId]);
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p))
      );
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) {
      error('Post content cannot be empty.');
      return;
    }

    const createdPost: Post = {
      id: `post-${Date.now()}`,
      author_id: user?.id || 'demo-user-1',
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      likes_count: 0,
      comments_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: profile || undefined,
    };

    setPosts([createdPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setCreateModalOpen(false);
    success('Post shared with the Nexora Community!');
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p))
    );
    setCommentInput('');
    success('Comment posted!');
  };

  const getCategoryBadgeVariant = (cat: PostCategory) => {
    switch (cat) {
      case 'showcase':
        return 'teal';
      case 'collaboration':
        return 'purple';
      case 'resource':
        return 'info';
      case 'discussion':
        return 'warning';
      case 'question':
      default:
        return 'default';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-slate-900 to-teal-950 rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community & Skill Growth</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Nexora Community Hub</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Share portfolio builds, ask for feedback, announce hackathon collaborations, and exchange
            practical career insights.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setCreateModalOpen(true)}
          className="shrink-0 flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Discussion</span>
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-200">
        {[
          { key: 'all', label: 'All Feeds' },
          { key: 'showcase', label: '🚀 Project Showcase' },
          { key: 'collaboration', label: '🤝 Teammate Requests' },
          { key: 'resource', label: '📚 Learning Resources' },
          { key: 'discussion', label: '💡 Founder Insights' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedCategory(tab.key)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === tab.key
                ? 'bg-navy-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const isLiked = likedPosts.includes(post.id);
          const showComments = expandedComments === post.id;
          return (
            <div
              key={post.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-900 text-teal-300 font-bold flex items-center justify-center text-sm">
                    {post.author?.full_name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-navy-900">
                      {post.author?.full_name || 'Community Member'}
                    </h4>
                    <span className="text-[10px] text-slate-400">
                      {new Date(post.created_at).toLocaleDateString()} • {post.author?.headline || 'Tech Builder'}
                    </span>
                  </div>
                </div>

                <Badge variant={getCategoryBadgeVariant(post.category) as any}>
                  {post.category.toUpperCase()}
                </Badge>
              </div>

              {/* Title & Body */}
              <div className="space-y-1.5">
                {post.title && (
                  <h3 className="font-bold text-base text-navy-900">{post.title}</h3>
                )}
                <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Interaction Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 font-semibold transition-colors ${
                      isLiked ? 'text-teal-600' : 'text-slate-500 hover:text-navy-900'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-teal-600' : ''}`} />
                    <span>{post.likes_count}</span>
                  </button>

                  <button
                    onClick={() =>
                      setExpandedComments(showComments ? null : post.id)
                    }
                    className="flex items-center gap-1.5 font-semibold text-slate-500 hover:text-navy-900 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments_count} Comments</span>
                  </button>
                </div>

                <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full">
                  Sample Community Post
                </span>
              </div>

              {/* Comments Section */}
              {showComments && (
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="space-y-2">
                    {demoComments
                      .filter((c) => c.post_id === post.id)
                      .map((comment) => (
                        <div key={comment.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                          <span className="font-bold text-slate-800">
                            {comment.author_id === 'demo-user-5'
                              ? 'Dr. Sarah Williams'
                              : comment.author_id === 'demo-user-2'
                              ? 'Marcus Chen'
                              : 'Aisha Patel'}
                          </span>
                          <p className="text-slate-600">{comment.content}</p>
                        </div>
                      ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      placeholder="Add a constructive reply..."
                      className="flex-1 text-xs px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleAddComment(post.id)}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Create Post Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Start a Community Discussion"
      >
        <form onSubmit={handleCreatePost} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as PostCategory)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option value="showcase">🚀 Project Showcase</option>
              <option value="collaboration">🤝 Teammate / Co-Founder Request</option>
              <option value="resource">📚 Learning Resource</option>
              <option value="discussion">💡 Founder Discussion</option>
              <option value="question">❓ Question / Guidance</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Headline (Optional)</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Seeking Flutter developer for sustainable agriculture MVP"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Content & Details <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={5}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Share what you're working on, questions you have, or resources you found helpful..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Publish Post
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Community;

import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  CheckCircle2,
  PlusCircle,
  X,
  Send,
  Star,
  Sparkles,
  Camera,
  ExternalLink,
} from 'lucide-react';
import { SOCIAL_POSTS, TESTIMONIALS, SocialFeedPost, Testimonial } from '../data/barbershopData';

interface SocialFeedProps {
  onBookAppointment: () => void;
}

export const SocialFeedSection: React.FC<SocialFeedProps> = ({ onBookAppointment }) => {
  const [posts, setPosts] = useState<SocialFeedPost[]>(SOCIAL_POSTS);
  const [likedPosts, setLikedPosts] = useState<{ [id: string]: boolean }>({});
  const [feedFilter, setFeedFilter] = useState<'all' | 'looks' | 'updates'>('all');
  
  // Interactive comments
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [commentsMap, setCommentsMap] = useState<{ [postId: string]: string[] }>({
    'post-1': ['Sharp fade brother! Marcus is unbeatable.', 'How often do you go? Clean lines.'],
    'post-2': ['See you guys Saturday morning at 9!', 'Best shop in the neighborhood.'],
    'post-3': ['Clean low taper. Fits the classic vibe.'],
    'post-4': ['Insane precision on the cheekline!'],
    'post-5': ['That hot towel ritual is genuinely life-changing.'],
  });
  const [newCommentText, setNewCommentText] = useState('');

  // Submit client look / testimonial modal
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientHandle, setClientHandle] = useState('');
  const [serviceName, setServiceName] = useState('The Signature Haircut');
  const [barberName, setBarberName] = useState('Marcus Vance');
  const [reviewQuote, setReviewQuote] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Toggle like
  const handleToggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const isCurrentlyLiked = !!prev[postId];
      const updated = { ...prev, [postId]: !isCurrentlyLiked };

      setPosts((currentPosts) =>
        currentPosts.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              likes: isCurrentlyLiked ? p.likes - 1 : p.likes + 1,
            };
          }
          return p;
        })
      );

      return updated;
    });
  };

  // Add comment
  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;
    setCommentsMap((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newCommentText.trim()],
    }));
    setPosts((current) =>
      current.map((p) => (p.id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p))
    );
    setNewCommentText('');
  };

  // Submit client testimonial post
  const handleSubmitClientLook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !reviewQuote.trim()) return;

    const newPost: SocialFeedPost = {
      id: `user-post-${Date.now()}`,
      authorName: clientName.trim(),
      handle: clientHandle.trim() ? (clientHandle.startsWith('@') ? clientHandle.trim() : `@${clientHandle.trim()}`) : `@${clientName.toLowerCase().replace(/\s+/g, '_')}`,
      avatar: clientName.slice(0, 2).toUpperCase(),
      imageUrl: '/src/assets/images/haircut_textured_fade_1791282728777.jpg',
      caption: `${reviewQuote.trim()} Styled by ${barberName} at Heritage & Blade.`,
      serviceName,
      barberName,
      likes: 1,
      commentsCount: 0,
      timestamp: 'Just now',
      isVerifiedClient: true,
      type: 'client_look',
      quote: reviewQuote.trim(),
    };

    setPosts([newPost, ...posts]);
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false);
      setShowSubmitModal(false);
      setClientName('');
      setClientHandle('');
      setReviewQuote('');
    }, 1500);
  };

  const filteredPosts = posts.filter((p) => {
    if (feedFilter === 'looks') return p.type === 'client_look';
    if (feedFilter === 'updates') return p.type === 'studio_update';
    return true;
  });

  return (
    <section id="social-feed" className="py-20 bg-[#0d0f12] border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#c59b27] font-medium mb-2">
              Community &amp; Studio Updates
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#f8f5ee] tracking-tight">
              Integrated Client Feed
            </h2>
            <p className="text-sm text-[#a09a8e] mt-2 max-w-xl">
              Live dispatches from the cutting floor: fresh cuts, client reflections, and daily studio announcements from our chairs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-[#161922] rounded-lg border border-white/10">
              <button
                onClick={() => setFeedFilter('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  feedFilter === 'all'
                    ? 'bg-[#c59b27] text-[#0d0f12] font-semibold'
                    : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
                }`}
              >
                All Feed
              </button>
              <button
                onClick={() => setFeedFilter('looks')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  feedFilter === 'looks'
                    ? 'bg-[#c59b27] text-[#0d0f12] font-semibold'
                    : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
                }`}
              >
                Client Cuts
              </button>
              <button
                onClick={() => setFeedFilter('updates')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  feedFilter === 'updates'
                    ? 'bg-[#c59b27] text-[#0d0f12] font-semibold'
                    : 'text-[#c0bbb2] hover:text-[#f8f5ee]'
                }`}
              >
                Studio News
              </button>
            </div>

            {/* Share experience button */}
            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#f8f5ee] bg-white/10 hover:bg-white/15 border border-white/10 rounded transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#c59b27]" />
              <span>Share Your Cut</span>
            </button>
          </div>
        </div>

        {/* Social Feed Grid (Clean 3-column masonry/cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {filteredPosts.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const postComments = commentsMap[post.id] || [];

            return (
              <div
                key={post.id}
                className="bg-[#141720] border border-white/10 rounded-lg overflow-hidden flex flex-col justify-between transition-all hover:border-white/20 hover:shadow-lg"
              >
                {/* Post Top Author Lockup */}
                <div className="p-4 flex items-center justify-between border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#202533] border border-white/10 flex items-center justify-center font-serif font-bold text-xs text-[#c59b27]">
                      {post.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-xs text-[#f8f5ee]">{post.authorName}</span>
                        {post.isVerifiedClient && (
                          <span
                            className="text-[10px] text-emerald-400 flex items-center"
                            title="Verified Chair Visit"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#8c867a]">{post.handle}</div>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#6e685d]">{post.timestamp}</span>
                </div>

                {/* Post Image */}
                <div className="relative aspect-[4/3] bg-[#1a1e28] overflow-hidden group">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  {post.type === 'studio_update' && (
                    <div className="absolute top-3 left-3 bg-[#0d0f12]/90 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-medium text-[#c59b27] border border-white/10">
                      Studio Update
                    </div>
                  )}
                </div>

                {/* Post Engagement Bar */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleToggleLike(post.id)}
                          className="flex items-center gap-1.5 text-xs text-[#c0bbb2] hover:text-rose-400 transition-colors"
                          aria-label="Like post"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              isLiked ? 'fill-rose-500 text-rose-500' : ''
                            }`}
                          />
                          <span className="tabular-nums font-medium">{post.likes}</span>
                        </button>

                        <button
                          onClick={() =>
                            setActiveCommentsPostId(
                              activeCommentsPostId === post.id ? null : post.id
                            )
                          }
                          className="flex items-center gap-1.5 text-xs text-[#c0bbb2] hover:text-[#f8f5ee] transition-colors"
                          aria-label="View comments"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="tabular-nums font-medium">{post.commentsCount}</span>
                        </button>
                      </div>

                      {/* Clean unboxed service badge */}
                      <span className="text-[11px] text-[#c59b27] font-medium">
                        {post.serviceName}
                      </span>
                    </div>

                    <p className="text-xs text-[#b8b2a5] leading-relaxed">
                      {post.caption}
                    </p>

                    {post.quote && (
                      <div className="p-2.5 bg-[#181c26] rounded border border-white/5 text-xs text-[#ded8cb] italic">
                        &ldquo;{post.quote}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Comments accordion drawer */}
                  {activeCommentsPostId === post.id && (
                    <div className="pt-3 border-t border-white/10 space-y-2.5 text-xs">
                      <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                        {postComments.length === 0 ? (
                          <div className="text-[11px] text-[#8c867a]">No comments yet. Be first!</div>
                        ) : (
                          postComments.map((c, i) => (
                            <div key={i} className="p-1.5 bg-[#171a23] rounded text-[11px] text-[#cfc8ba]">
                              {c}
                            </div>
                          ))
                        )}
                      </div>

                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          placeholder="Add comment..."
                          className="flex-1 bg-[#101217] border border-white/10 rounded px-2.5 py-1.5 text-xs text-[#ede7de] focus:outline-none focus:border-[#c59b27]"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="p-1.5 bg-[#c59b27] text-[#0d0f12] rounded hover:bg-[#d8ab34]"
                          aria-label="Submit comment"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Barber attribution */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8c867a]">
                    <span>Craftsman: {post.barberName}</span>
                    <button
                      onClick={onBookAppointment}
                      className="text-[#c59b27] hover:underline font-medium"
                    >
                      Book Chair &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Testimonials Section Adjacent to Social Feed */}
        <div id="testimonials" className="mt-20 pt-16 border-t border-white/10 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-widest text-[#c59b27] font-medium mb-2">
              Uncompromising Quality
            </div>
            <h3 className="text-3xl font-serif font-bold text-[#f8f5ee]">
              Client Voices &amp; Verified Reviews
            </h3>
            <p className="text-xs sm:text-sm text-[#8c867a] mt-2">
              Every client review is linked to an authentic chair appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#141720] border border-white/10 rounded-lg p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#c59b27]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c59b27]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#8c867a]">{t.date}</span>
                </div>

                <p className="text-sm text-[#d4cfc3] leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#f8f5ee]">{t.clientName}</span>
                    <span className="text-[#8c867a] ml-2">· {t.service}</span>
                  </div>
                  <span className="text-[#c59b27]">Craftsman: {t.barber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Share Look & Review Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#141720] border border-white/15 rounded-lg shadow-2xl p-6 text-[#ede7de]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-lg font-serif font-bold text-[#f8f5ee]">
                  Share Your Chair Experience
                </h3>
                <p className="text-xs text-[#8c867a] mt-0.5">
                  Add your look &amp; review to the Heritage &amp; Blade feed
                </p>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1.5 text-[#8c867a] hover:text-[#f8f5ee] rounded hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedbackSuccess ? (
              <div className="py-10 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#c59b27] mx-auto animate-bounce" />
                <div className="text-base font-serif font-semibold text-[#f8f5ee]">
                  Thank You for Your Feedback!
                </div>
                <p className="text-xs text-[#8c867a]">
                  Your post has been broadcast to the community feed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitClientLook} className="pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#c0bbb2] mb-1 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Liam Parker"
                      className="w-full bg-[#171a23] border border-white/10 rounded px-3 py-2 text-xs text-[#f8f5ee] focus:outline-none focus:border-[#c59b27]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#c0bbb2] mb-1 font-medium">Instagram Handle</label>
                    <input
                      type="text"
                      value={clientHandle}
                      onChange={(e) => setClientHandle(e.target.value)}
                      placeholder="@liamparker"
                      className="w-full bg-[#171a23] border border-white/10 rounded px-3 py-2 text-xs text-[#f8f5ee] focus:outline-none focus:border-[#c59b27]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#c0bbb2] mb-1 font-medium">Service Received</label>
                    <select
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full bg-[#171a23] border border-white/10 rounded px-3 py-2 text-xs text-[#f8f5ee] focus:outline-none focus:border-[#c59b27]"
                    >
                      <option>The Signature Haircut</option>
                      <option>Skin Fade &amp; Razor Taper</option>
                      <option>The Heritage Cut &amp; Beard Combo</option>
                      <option>Traditional Hot Towel Shave</option>
                      <option>Executive Grooming Ritual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#c0bbb2] mb-1 font-medium">Barber</label>
                    <select
                      value={barberName}
                      onChange={(e) => setBarberName(e.target.value)}
                      className="w-full bg-[#171a23] border border-white/10 rounded px-3 py-2 text-xs text-[#f8f5ee] focus:outline-none focus:border-[#c59b27]"
                    >
                      <option>Marcus Vance</option>
                      <option>Elena Rostova</option>
                      <option>Darius King</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#c0bbb2] mb-1 font-medium">
                    Testimonial / Review Quote
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={reviewQuote}
                    onChange={(e) => setReviewQuote(e.target.value)}
                    placeholder="Share how your haircut turned out, the precision of the lines, or the studio atmosphere..."
                    className="w-full bg-[#171a23] border border-white/10 rounded px-3 py-2 text-xs text-[#f8f5ee] focus:outline-none focus:border-[#c59b27]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setStarRating(star)}
                        className="text-[#c59b27]"
                      >
                        <Star className={`w-4 h-4 ${star <= starRating ? 'fill-[#c59b27]' : ''}`} />
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="px-3 py-1.5 text-xs text-[#8c867a] hover:text-[#f8f5ee]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-[#0d0f12] bg-[#c59b27] hover:bg-[#d8ab34] rounded transition-colors"
                    >
                      Post Review
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

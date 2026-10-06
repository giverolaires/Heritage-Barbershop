import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  CheckCircle2,
  PlusCircle,
  X,
  Send,
  Star,
} from 'lucide-react';
import { SOCIAL_POSTS, TESTIMONIALS, SocialFeedPost, haircutTexturedFadeImg } from '../data/barbershopData';

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
    'post-1': ['Sharp fade brother! Marcus is unbeatable.', 'Clean lines.'],
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
      handle: clientHandle.trim()
        ? clientHandle.startsWith('@')
          ? clientHandle.trim()
          : `@${clientHandle.trim()}`
        : `@${clientName.toLowerCase().replace(/\s+/g, '_')}`,
      avatar: clientName.slice(0, 2).toUpperCase(),
      imageUrl: haircutTexturedFadeImg,
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
    <section id="social-feed" className="py-20 bg-[#f8f7f4] border-b border-[#1c1c1c]/10 scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        
        {/* Editorial Signature Quote matching Variation 3 */}
        <div id="reviews-quote" className="py-12 sm:py-16 text-center max-w-4xl mx-auto scroll-mt-24">
          <div className="review-bubble">
            “Marcus takes his time to truly assess your hair growth patterns before ever touching the clippers. The straight razor lineup was surgical. Will never go anywhere else in the city.”
          </div>
          <div className="text-xs uppercase tracking-[0.2em] font-bold text-[#1c1c1c] mt-6">
            — ALEXANDER HAYES · <span className="text-[#876d3e]">VERIFIED CHAIR VISIT</span>
          </div>
        </div>

        <div className="editorial-line"></div>

        {/* Client Feed Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8">
          <div>
            <span className="meta-tag">Live Dispatch</span>
            <h2 className="serif-display text-3xl sm:text-5xl text-[#1c1c1c] mt-2 mb-2">
              Integrated Client Feed
            </h2>
            <p className="text-sm text-[#1c1c1c]/60 max-w-lg">
              Fresh cuts, patron reflections, and daily studio announcements from our midtown chairs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-full border border-[#1c1c1c]/10 shadow-sm">
              <button
                onClick={() => setFeedFilter('all')}
                className={`px-3.5 py-1 text-[0.72rem] uppercase tracking-wider font-bold rounded-full transition-colors ${
                  feedFilter === 'all'
                    ? 'bg-[#1c1c1c] text-[#f8f7f4]'
                    : 'text-[#1c1c1c]/70 hover:text-[#1c1c1c]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFeedFilter('looks')}
                className={`px-3.5 py-1 text-[0.72rem] uppercase tracking-wider font-bold rounded-full transition-colors ${
                  feedFilter === 'looks'
                    ? 'bg-[#1c1c1c] text-[#f8f7f4]'
                    : 'text-[#1c1c1c]/70 hover:text-[#1c1c1c]'
                }`}
              >
                Client Cuts
              </button>
              <button
                onClick={() => setFeedFilter('updates')}
                className={`px-3.5 py-1 text-[0.72rem] uppercase tracking-wider font-bold rounded-full transition-colors ${
                  feedFilter === 'updates'
                    ? 'bg-[#1c1c1c] text-[#f8f7f4]'
                    : 'text-[#1c1c1c]/70 hover:text-[#1c1c1c]'
                }`}
              >
                Studio News
              </button>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[0.72rem] uppercase tracking-wider font-bold text-[#1c1c1c] bg-white hover:bg-[#1c1c1c] hover:text-white border border-[#1c1c1c]/20 transition-all rounded shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#876d3e]" />
              <span>Share Your Look</span>
            </button>
          </div>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredPosts.map((post) => {
            const isLiked = !!likedPosts[post.id];
            const postComments = commentsMap[post.id] || [];

            return (
              <div
                key={post.id}
                className="bg-white border border-black/5 hover:border-black/15 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                {/* Author Bar */}
                <div className="p-4 flex items-center justify-between border-b border-[#1c1c1c]/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#f8f7f4] border border-[#1c1c1c]/10 flex items-center justify-center font-serif font-bold text-xs text-[#876d3e]">
                      {post.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-xs text-[#1c1c1c]">{post.authorName}</span>
                        {post.isVerifiedClient && (
                          <span title="Verified Client">
                            <CheckCircle2 className="w-3 h-3 text-[#876d3e]" />
                          </span>
                        )}
                      </div>
                      <div className="text-[0.68rem] text-[#1c1c1c]/50">{post.handle}</div>
                    </div>
                  </div>

                  <span className="text-[0.68rem] text-[#1c1c1c]/45 font-medium">{post.timestamp}</span>
                </div>

                {/* Photo */}
                <div className="relative aspect-[4/3] bg-[#ece8de] overflow-hidden group">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  {post.type === 'studio_update' && (
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm px-2 py-0.5 text-[0.65rem] uppercase tracking-wider font-bold text-[#876d3e]">
                      Announcement
                    </div>
                  )}
                </div>

                {/* Interaction & Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleToggleLike(post.id)}
                          className="flex items-center gap-1.5 text-xs text-[#1c1c1c]/70 hover:text-rose-600 transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              isLiked ? 'fill-rose-500 text-rose-500' : ''
                            }`}
                          />
                          <span className="tabular-nums font-semibold">{post.likes}</span>
                        </button>

                        <button
                          onClick={() =>
                            setActiveCommentsPostId(
                              activeCommentsPostId === post.id ? null : post.id
                            )
                          }
                          className="flex items-center gap-1.5 text-xs text-[#1c1c1c]/70 hover:text-[#1c1c1c] transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span className="tabular-nums font-semibold">{post.commentsCount}</span>
                        </button>
                      </div>

                      <span className="text-[0.68rem] uppercase tracking-wider font-bold text-[#876d3e]">
                        {post.serviceName}
                      </span>
                    </div>

                    <p className="text-xs text-[#1c1c1c]/75 leading-relaxed">
                      {post.caption}
                    </p>

                    {post.quote && (
                      <div className="p-2.5 bg-[#f8f7f4] border-l-2 border-[#876d3e] text-xs text-[#1c1c1c]/80 italic">
                        &ldquo;{post.quote}&rdquo;
                      </div>
                    )}
                  </div>

                  {/* Comments drawer */}
                  {activeCommentsPostId === post.id && (
                    <div className="pt-3 border-t border-[#1c1c1c]/10 space-y-2 text-xs">
                      <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                        {postComments.length === 0 ? (
                          <div className="text-[11px] text-[#1c1c1c]/40">No comments yet.</div>
                        ) : (
                          postComments.map((c, i) => (
                            <div key={i} className="p-1.5 bg-[#f8f7f4] rounded text-[11px] text-[#1c1c1c]/80">
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
                          className="flex-1 bg-white border border-[#1c1c1c]/15 rounded px-2.5 py-1.5 text-xs text-[#1c1c1c] focus:outline-none focus:border-[#876d3e]"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="p-1.5 bg-[#1c1c1c] text-white rounded hover:bg-[#876d3e]"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="pt-3 border-t border-[#1c1c1c]/5 flex items-center justify-between text-[0.68rem] text-[#1c1c1c]/50">
                    <span>Craftsman: {post.barberName}</span>
                    <button
                      onClick={onBookAppointment}
                      className="text-[#876d3e] hover:underline font-bold"
                    >
                      Book Chair &rarr;
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verified Reviews Grid */}
        <div className="mt-16 pt-12 border-t border-[#1c1c1c]/10">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="meta-tag">Patron Journal</span>
            <h3 className="serif-display text-2xl sm:text-3xl text-[#1c1c1c] mt-1">
              Verified Client Impressions
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 border border-black/5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#876d3e]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#876d3e]" />
                    ))}
                  </div>
                  <span className="text-[0.68rem] text-[#1c1c1c]/45 font-medium">{t.date}</span>
                </div>

                <p className="text-xs sm:text-[0.85rem] text-[#1c1c1c]/75 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>

                <div className="pt-2 border-t border-[#1c1c1c]/5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#1c1c1c]">{t.clientName}</span>
                    <span className="text-[#1c1c1c]/50 ml-1.5">· {t.service}</span>
                  </div>
                  <span className="text-[#876d3e] font-medium">{t.barber}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Share Look & Review Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white border border-[#1c1c1c]/15 shadow-2xl p-6 sm:p-7 text-[#1c1c1c]">
            <div className="flex items-center justify-between pb-3 border-b border-[#1c1c1c]/10">
              <div>
                <span className="meta-tag">Share Your Look</span>
                <h3 className="serif-display text-xl sm:text-2xl text-[#1c1c1c]">
                  Patron Review
                </h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1 text-[#1c1c1c]/60 hover:text-[#1c1c1c] rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {feedbackSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-[#876d3e] mx-auto animate-bounce" />
                <h4 className="serif-display text-xl text-[#1c1c1c]">
                  Thank You for Your Voice
                </h4>
                <p className="text-xs text-[#1c1c1c]/60">
                  Your look has been published to the client feed.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitClientLook} className="pt-4 space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1c1c] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Liam Parker"
                      className="w-full bg-[#f8f7f4] border border-[#1c1c1c]/15 rounded px-3 py-2 text-xs text-[#1c1c1c] focus:outline-none focus:border-[#876d3e]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1c1c] mb-1">Handle</label>
                    <input
                      type="text"
                      value={clientHandle}
                      onChange={(e) => setClientHandle(e.target.value)}
                      placeholder="@liamparker"
                      className="w-full bg-[#f8f7f4] border border-[#1c1c1c]/15 rounded px-3 py-2 text-xs text-[#1c1c1c] focus:outline-none focus:border-[#876d3e]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1c1c] mb-1">Treatment</label>
                    <select
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className="w-full bg-[#f8f7f4] border border-[#1c1c1c]/15 rounded px-3 py-2 text-xs text-[#1c1c1c] focus:outline-none focus:border-[#876d3e]"
                    >
                      <option>The Signature Haircut</option>
                      <option>Skin Fade &amp; Razor Taper</option>
                      <option>The Heritage Cut &amp; Beard Combo</option>
                      <option>Traditional Hot Towel Shave</option>
                      <option>Executive Grooming Ritual</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#1c1c1c] mb-1">Barber</label>
                    <select
                      value={barberName}
                      onChange={(e) => setBarberName(e.target.value)}
                      className="w-full bg-[#f8f7f4] border border-[#1c1c1c]/15 rounded px-3 py-2 text-xs text-[#1c1c1c] focus:outline-none focus:border-[#876d3e]"
                    >
                      <option>Marcus Vance</option>
                      <option>Elena Rostova</option>
                      <option>Darius King</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1c1c1c] mb-1">Review Quote</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewQuote}
                    onChange={(e) => setReviewQuote(e.target.value)}
                    placeholder="Share how the haircut turned out, the precision of the lines, or the studio atmosphere..."
                    className="w-full bg-[#f8f7f4] border border-[#1c1c1c]/15 rounded px-3 py-2 text-xs text-[#1c1c1c] focus:outline-none focus:border-[#876d3e]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#1c1c1c]/10">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setStarRating(star)}
                        className="text-[#876d3e]"
                      >
                        <Star className={`w-4 h-4 ${star <= starRating ? 'fill-[#876d3e]' : ''}`} />
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="px-3 py-1.5 text-xs text-[#1c1c1c]/60"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-elegant px-4 py-2 text-[0.7rem]"
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

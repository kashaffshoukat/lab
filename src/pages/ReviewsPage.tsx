import { useEffect, useState } from 'react';
import { supabase } from '../lib';
import type { Review } from '../types';
import { StarRating } from '../components/StarRating';
import { BadgeCheck, ThumbsUp, Globe, ExternalLink } from 'lucide-react';

const SOURCE_META: Record<string, { icon: typeof Globe; label: string }> = {
  Google: { icon: Globe, label: 'Google' },
  Trustpilot: { icon: ExternalLink, label: 'Trustpilot' },
  Website: { icon: BadgeCheck, label: 'Verified Buyer' },
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function ReviewCard({ r }: { r: Review }) {
  const [helpful, setHelpful] = useState(r.helpful_count ?? 0);
  const [voted, setVoted] = useState(false);
  const gradient = r.avatar_color ?? 'from-pink-500 to-rose-500';
  const source = r.source ? SOURCE_META[r.source] ?? SOURCE_META.Website : SOURCE_META.Website;

  return (
    <div className="bg-white/[0.04] rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-base shrink-0`}>
          {r.author.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-white font-semibold text-sm">{r.author}</p>
            {r.verified !== false && (
              <span className="inline-flex items-center gap-0.5 text-[#1a73e8] text-xs font-medium">
                <BadgeCheck size={14} /> Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-gray-500 text-xs">{r.location}</span>
            <span className="text-gray-600 text-xs">·</span>
            <span className="text-gray-500 text-xs">{formatDate(r.reviewed_at ?? r.created_at)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <source.icon size={16} className="text-gray-500" />
          <span className="text-gray-500 text-xs font-medium">{source.label}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <StarRating rating={r.rating} size={16} />
      </div>

      {r.title && <p className="text-white font-semibold text-sm mb-1.5">{r.title}</p>}
      <p className="text-gray-300 text-sm leading-relaxed">{r.body}</p>

      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
        <button
          onClick={() => {
            if (!voted) {
              setHelpful((h) => h + 1);
              setVoted(true);
            }
          }}
          className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${voted ? 'text-[var(--neon-pink)]' : 'text-gray-500 hover:text-gray-300'}`}
        >
          <ThumbsUp size={14} className={voted ? 'fill-[var(--neon-pink)]' : ''} />
          Helpful ({helpful})
        </button>
      </div>
    </div>
  );
}

export function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('reviews').select('*').order('reviewed_at', { ascending: false });
      setReviews(data ?? []);
      setLoading(false);
    })();
  }, []);

  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 5;
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  const filtered = filter ? reviews.filter((r) => r.rating === filter) : reviews;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl lg:text-5xl font-bold text-white">Customer Reviews</h1>
        <p className="text-gray-400 mt-3">Real reviews from real customers across Google, Trustpilot & our website</p>
      </div>

      {/* Summary panel */}
      <div className="bg-white/[0.04] rounded-3xl border border-white/10 p-6 lg:p-8 mb-10">
        <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          <div className="text-center shrink-0">
            <div className="text-5xl font-bold text-white">{avg.toFixed(1)}</div>
            <StarRating rating={avg} size={20} />
            <p className="text-gray-500 text-sm mt-2">{reviews.length} reviews</p>
          </div>
          <div className="flex-1 w-full space-y-2">
            {distribution.map((d) => (
              <button
                key={d.star}
                onClick={() => setFilter(filter === d.star ? null : d.star)}
                className={`flex items-center gap-3 w-full group transition-opacity ${filter && filter !== d.star ? 'opacity-40' : ''}`}
              >
                <span className="text-gray-400 text-xs font-medium w-6 text-right">{d.star}★</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full transition-all" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="text-gray-500 text-xs w-8 text-left">{d.count}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            {['Google', 'Trustpilot', 'Website'].map((src) => {
              const Icon = SOURCE_META[src]?.icon ?? BadgeCheck;
              const count = reviews.filter((r) => r.source === src).length;
              return (
                <div key={src} className="flex items-center gap-2 text-sm">
                  <Icon size={16} className="text-gray-400" />
                  <span className="text-gray-400">{src === 'Website' ? 'Verified Buyer' : src}</span>
                  <span className="text-gray-600">·</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
        {filter && (
          <button onClick={() => setFilter(null)} className="mt-4 text-sm text-[var(--neon-pink)] hover:underline">
            Clear filter ({filter}★ only)
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-44 bg-white/5 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((r) => <ReviewCard key={r.id} r={r} />)}
        </div>
      )}
    </div>
  );
}

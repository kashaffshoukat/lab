import { useState, useRef, useCallback } from 'react';
import { Upload, ArrowRight, Check, X, FileImage, Loader2, PenTool, Clock, MessageSquare, Tag, Phone, Mail, MapPin, ShoppingBag } from 'lucide-react';
import { supabase, formatPrice, NEON_COLORS, NEON_SIZES, NEON_MOUNTING } from '../lib';
import { useCart } from '../cart';
import { navigate } from '../router';

type UploadedFile = {
  file: File;
  previewUrl: string;
  storagePath: string;
  publicUrl: string;
};

const STEPS = [
  { num: 1, title: 'Upload Your Logo', desc: 'Fill out the form below with your design or logo image' },
  { num: 2, title: 'Get Your Quote', desc: "We'll send you a free design draft and price within 1-2 days" },
  { num: 3, title: 'Approve & Create', desc: 'Once approved, your custom neon sign will be handcrafted' },
];

const BENEFITS = [
  { icon: PenTool, label: 'Free Design Draft' },
  { icon: Clock, label: 'Quote within 24hrs' },
  { icon: MessageSquare, label: 'Personal Consultation' },
  { icon: Tag, label: 'Best Price Guaranteed' },
];

const BRANDS = ['Lipton', 'Dove', 'Vodafone', 'Nivea', 'Shell', 'Coca-Cola', 'TikTok', 'Dyson', "L'Oreal", 'Netflix', 'Amazon', 'JD Sports'];

export function LogoUploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [email, setEmail] = useState('');
  const [signName, setSignName] = useState('');
  const [widthCm, setWidthCm] = useState<number | ''>('');
  const [color, setColor] = useState<string>('');
  const [mounting, setMounting] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { add, setOpen } = useCart();

  const handleFiles = useCallback(async (fileList: FileList | File[]) => {
    const arr = Array.from(fileList).filter((f) =>
      ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp', 'application/pdf'].includes(f.type) ||
      /\.(png|jpe?g|svg|pdf|ai|webp)$/i.test(f.name)
    );

    if (arr.length === 0) {
      setError('Please upload a valid image file (PNG, JPG, SVG, PDF, or AI)');
      return;
    }
    setError(null);
    setUploading(true);

    try {
      const uploaded: UploadedFile[] = [];
      for (const file of arr) {
        const ext = file.name.split('.').pop() || 'png';
        const storagePath = `logos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('logo-uploads')
          .upload(storagePath, file, { cacheControl: '3600', upsert: false });

        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

        const { data: urlData } = supabase.storage
          .from('logo-uploads')
          .getPublicUrl(storagePath);

        uploaded.push({
          file,
          previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : '',
          storagePath,
          publicUrl: urlData.publicUrl,
        });
      }
      setFiles((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }, []);

  const removeFile = (idx: number) => {
    setFiles((prev) => {
      const f = prev[idx];
      if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
      return prev.filter((_, i) => i !== idx);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Please upload at least one image or logo file.');
      return;
    }
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('sign_name', signName || '');
      formData.append('width_cm', widthCm || '');
      formData.append('color', color || '');
      formData.append('mounting', mounting || '');
      formData.append('notes', notes || '');
      for (const f of files) {
        formData.append('file_name', f.file.name);
        formData.append('file_url', f.publicUrl || '');
      }
      formData.append('_subject', 'New Logo Upload Quote Request');

      const formspreeRes = await fetch('https://formspree.io/f/mjgnbpve', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (!formspreeRes.ok) throw new Error('Failed to submit notification.');

      for (const f of files) {
        const { error: insertError } = await supabase.from('logo_uploads').insert({
          email,
          file_path: f.storagePath,
          file_name: f.file.name,
          file_url: f.publicUrl,
          sign_name: signName || null,
          width_cm: widthCm || null,
          color: color || null,
          mounting: mounting || null,
          notes: notes || null,
          status: 'pending',
        });
        if (insertError) throw new Error(`Failed to submit: ${insertError.message}`);
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit your request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddToCartAndCheckout = () => {
    const basePrice = 9900;
    const sizeAdd = NEON_SIZES.find((s) => s.name === 'Large')?.priceAdd ?? 6000;
    const mountAdd = NEON_MOUNTING.find((m) => m.name === mounting)?.priceAdd ?? 0;
    const total = basePrice + sizeAdd + mountAdd;

    add({
      id: `logo-quote-${Date.now()}`,
      name: `Custom Neon from Logo${signName ? `: "${signName}"` : ''}`,
      price: total,
      image_url: files[0]?.previewUrl || files[0]?.publicUrl || null,
      quantity: 1,
      variant: `${color || 'As quoted'} / ${widthCm || 'TBD'}cm / ${mounting || 'Wall Mount'}`,
    });

    navigate('/checkout');
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="bg-white/5 rounded-3xl p-10 border border-white/10 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Request Submitted!</h2>
          <p className="text-gray-400 mt-4 leading-relaxed max-w-md mx-auto">
            We've received your logo and details. Our design team will send a free design draft and
            quote to <span className="text-white font-medium">{email}</span> within 1-2 business days.
            Please check your spam folder if you don't hear from us.
          </p>

          <div className="mt-8 p-5 bg-white/5 rounded-2xl border border-white/10 text-left">
            <h3 className="text-white font-semibold text-sm mb-3">Want to proceed now with a deposit?</h3>
            <p className="text-gray-400 text-sm mb-4">
              You can add a standard custom sign to your cart now and check out. We'll refine the design
              after you approve the mockup.
            </p>
            <button
              onClick={handleAddToCartAndCheckout}
              className="w-full bg-[var(--neon-pink)] text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} /> Add to Cart & Checkout — {formatPrice(15900)}
            </button>
          </div>

          <button onClick={() => navigate('/')} className="mt-6 text-[var(--neon-pink)] font-semibold hover:underline">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#0a0a0f] to-[#0a1a2e]" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ background: 'var(--neon-pink)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-20" style={{ background: 'var(--neon-blue)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white">
            Logo & Image <span style={{ color: 'var(--neon-pink)' }} className="neon-text">Upload</span>
          </h1>
          <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-relaxed">
            Use this form to upload an image for a free quote. Once we've received your form, we'll have
            your design drawn and priced up within two working days. Please keep an eye on your email
            (including your spam).
          </p>
        </div>
      </section>

      {/* FREE QUOTE BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">Free Quote & Design Interpretation</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed text-sm lg:text-base">
            Receive a fast and free quote within one business day or sooner. Including a neon design
            interpretation first draft and complementary personal consultation on any design or logo,
            large or small! Or call our Bespoke Team directly to discuss your requirements on{' '}
            <span className="text-white font-medium">+44 7717 764899</span>
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map((b, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--neon-pink)]/20 to-[var(--neon-purple)]/20 flex items-center justify-center mx-auto mb-3">
                <b.icon size={22} className="text-[var(--neon-pink)]" />
              </div>
              <span className="text-white text-sm font-medium">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* STEPS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div key={step.num} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--neon-pink)] text-white font-bold text-lg flex items-center justify-center mb-4">
                {step.num}
              </div>
              <h3 className="text-white font-bold text-base mb-1">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* UPLOAD FORM */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="bg-white/5 rounded-3xl p-6 lg:p-8 border border-white/10 space-y-6">
          {/* Drop zone */}
          <div>
            <label className="block text-white font-semibold mb-3">Upload Your Logo or Design *</label>
            <div
              onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-10 cursor-pointer transition-colors ${
                dragActive ? 'border-[var(--neon-pink)] bg-[var(--neon-pink)]/5' : 'border-white/20 hover:border-[var(--neon-pink)]'
              }`}
            >
              {uploading ? (
                <Loader2 size={32} className="text-[var(--neon-pink)] animate-spin mb-3" />
              ) : (
                <Upload size={32} className="text-gray-400 mb-3" />
              )}
              <span className="text-gray-300 text-sm">
                {uploading ? 'Uploading...' : 'Drag & drop your files here, or click to browse'}
              </span>
              <span className="text-gray-500 text-xs mt-1">PNG, JPG, SVG, PDF, AI, WEBP — up to 10 files</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg,.svg,.ai,.pdf,.webp"
                multiple
                className="hidden"
                onChange={(e) => { if (e.target.files?.length) handleFiles(e.target.files); e.target.value = ''; }}
              />
            </div>
          </div>

          {/* File previews */}
          {files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {files.map((f, i) => (
                <div key={i} className="relative group bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                  {f.previewUrl ? (
                    <img src={f.previewUrl} alt={f.file.name} className="w-full h-32 object-cover" />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center bg-white/5">
                      <FileImage size={32} className="text-gray-500" />
                    </div>
                  )}
                  <div className="p-2">
                    <p className="text-gray-300 text-xs truncate">{f.file.name}</p>
                    <p className="text-gray-500 text-xs">{(f.file.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-white font-semibold mb-2">Email Address *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--neon-pink)] transition-colors"
            />
          </div>

          {/* Sign name */}
          <div>
            <label className="block text-white font-semibold mb-2">Sign Name / Text (optional)</label>
            <input
              type="text"
              value={signName}
              onChange={(e) => setSignName(e.target.value)}
              placeholder='e.g. "Welcome" or your business name'
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--neon-pink)] transition-colors"
            />
          </div>

          {/* Width + Color + Mounting */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-white font-semibold mb-2">Width (cm)</label>
              <input
                type="number"
                value={widthCm}
                onChange={(e) => setWidthCm(e.target.value ? parseInt(e.target.value) : '')}
                placeholder="e.g. 60"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--neon-pink)] transition-colors"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Colour</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--neon-pink)] transition-colors"
              >
                <option value="" className="bg-[#1a1a25]">Select colour</option>
                {NEON_COLORS.map((c) => (
                  <option key={c.name} value={c.name} className="bg-[#1a1a25]">{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white font-semibold mb-2">Mounting</label>
              <select
                value={mounting}
                onChange={(e) => setMounting(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--neon-pink)] transition-colors"
              >
                <option value="" className="bg-[#1a1a25]">Select mounting</option>
                {NEON_MOUNTING.map((m) => (
                  <option key={m.name} value={m.name} className="bg-[#1a1a25]">{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-white font-semibold mb-2">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tell us about your preferred size, colour, and any special requirements..."
              rows={4}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--neon-pink)] resize-none transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || uploading}
            className="w-full bg-[var(--neon-pink)] text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <><Loader2 size={20} className="animate-spin" /> Submitting...</>
            ) : (
              <>Get My Free Quote <ArrowRight size={18} /></>
            )}
          </button>

          <p className="text-gray-500 text-xs text-center">
            By submitting, you agree to be contacted by our design team regarding your quote.
            We typically respond within 1-2 business days.
          </p>
        </form>
      </section>

      {/* CONTACT INFO */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: Phone, label: 'Call Us', value: '+44 7301 288315' },
            { icon: Mail, label: 'Email Us', value: 'sabashoukat2149@gmail.com' },
            { icon: MapPin, label: 'Visit Us', value: 'London, United Kingdom' },
          ].map((c, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
              <c.icon size={22} className="text-[var(--neon-pink)] mx-auto mb-2" />
              <p className="text-gray-400 text-xs">{c.label}</p>
              <p className="text-white text-sm font-medium mt-1">{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS MARQUEE */}
      <section className="py-12 overflow-hidden border-t border-white/10">
        <div className="text-center mb-6">
          <h2 className="text-xl lg:text-2xl font-bold text-white">TRUSTED BY THE BEST</h2>
        </div>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span key={i} className="text-xl lg:text-2xl font-bold text-gray-600 hover:text-gray-400 transition-colors px-6 lg:px-10 select-none">
              {brand}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

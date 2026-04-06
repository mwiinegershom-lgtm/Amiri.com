import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Sparkles, X, ArrowRight } from 'lucide-react';
import { getVibeRecommendations } from '../services/gemini';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

export function VibeSearch() {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<{ base64: string; mimeType: string; url: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ curationTitle: string; curationDescription: string; productIds: string[] } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      setImage({
        base64: base64Data,
        mimeType: file.type,
        url: URL.createObjectURL(file)
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt && !image) return;

    setIsLoading(true);
    try {
      const res = await getVibeRecommendations(prompt, image?.base64, image?.mimeType);
      setResult(res);
    } catch (error) {
      console.error(error);
      alert('Failed to get recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const curatedProducts = result?.productIds.map(id => products.find(p => p.id === id)).filter(Boolean) || [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-32 px-6 md:px-12 pb-24">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-4 flex items-center justify-center gap-4">
            <Sparkles className="w-8 h-8 md:w-12 md:h-12" />
            Vibe Search
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Describe a mood, an event, or upload a reference image. Our AI stylist will curate the perfect AMIRI look for you.
          </p>
        </motion.div>

        <motion.form 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSearch} 
          className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden"
        >
          {/* Animated gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          
          <div className="relative z-10 space-y-8">
            <div>
              <label className="block text-sm font-medium tracking-widest uppercase text-zinc-400 mb-3">
                Describe the Vibe
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Something for a sunset rooftop party in Malibu..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors resize-none h-32"
              />
            </div>

            <div>
              <label className="block text-sm font-medium tracking-widest uppercase text-zinc-400 mb-3">
                Reference Image (Optional)
              </label>
              
              {image ? (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-zinc-800 group">
                  <img src={image.url} alt="Reference" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      onClick={() => setImage(null)}
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-48 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 hover:bg-zinc-800/50 transition-all cursor-pointer"
                >
                  <Upload className="w-8 h-8 mb-4" />
                  <span className="text-sm font-medium">Click to upload a mood board or photo</span>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isLoading || (!prompt && !image)}
              className="w-full py-4 bg-white text-black font-bold tracking-widest uppercase rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
              ) : (
                <>Curate My Look <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </div>
        </motion.form>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="mt-24"
            >
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-6">
                  {result.curationTitle}
                </h2>
                <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
                  {result.curationDescription}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {curatedProducts.map((product, index) => (
                  <motion.div 
                    key={product?.id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link to={`/product/${product?.id}`}>
                      <div className="aspect-[3/4] bg-zinc-900 mb-6 overflow-hidden relative">
                        <img 
                          src={product?.images[0]} 
                          alt={product?.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-xs font-bold tracking-widest uppercase">View Details</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-medium uppercase tracking-wider mb-1">{product?.name}</h3>
                      <p className="text-sm text-zinc-500">${product?.price}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

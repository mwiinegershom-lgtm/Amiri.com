import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ChevronRight } from 'lucide-react';
import { predictSize } from '../../services/gemini';

interface PredictiveSizingProps {
  category: string;
}

export function PredictiveSizing({ category }: PredictiveSizingProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [brand, setBrand] = useState('');
  const [size, setSize] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ recommendedSize: string; explanation: string } | null>(null);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand || !size) return;

    setIsLoading(true);
    try {
      const res = await predictSize(brand, size, category);
      setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t border-zinc-800 pt-8">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full group"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
          <span className="text-sm font-medium tracking-widest uppercase">AI Predictive Sizing</span>
        </div>
        <ChevronRight className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2">
              {!result ? (
                <form onSubmit={handlePredict} className="space-y-4">
                  <p className="text-sm text-zinc-400 mb-4">
                    Tell us your size in another luxury brand, and our AI tailor will recommend your perfect AMIRI fit.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium tracking-widest uppercase text-zinc-500 mb-2">Brand</label>
                      <input 
                        type="text" 
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        placeholder="e.g., Saint Laurent"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium tracking-widest uppercase text-zinc-500 mb-2">Size</label>
                      <input 
                        type="text" 
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        placeholder="e.g., 32"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-none px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={isLoading || !brand || !size}
                    className="w-full py-3 border border-white text-white text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Analyzing Fit...' : 'Find My Size'}
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-zinc-900 border border-zinc-800 p-6 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-white" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shrink-0 font-bold text-lg">
                      {result.recommendedSize}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                        Recommended Size <Check className="w-4 h-4 text-green-500" />
                      </h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {result.explanation}
                      </p>
                      <button 
                        onClick={() => setResult(null)}
                        className="mt-4 text-xs font-medium tracking-widest uppercase text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
                      >
                        Recalculate
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

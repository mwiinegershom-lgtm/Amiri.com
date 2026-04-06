import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Lock } from 'lucide-react';
import { products } from '../data/products';
import { PredictiveSizing } from '../components/ui/PredictiveSizing';
import { useState } from 'react';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!product) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Product not found</div>;
  }

  const handleVaultCheckout = () => {
    if (!selectedSize) {
      alert("Please select a size first.");
      return;
    }
    setIsCheckingOut(true);
    // Simulate ultra-fast checkout
    setTimeout(() => {
      alert("Vault Checkout Complete! Your order is being processed.");
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium tracking-widest uppercase text-zinc-500 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Media Gallery */}
          <div className="space-y-4">
            {product.videoUrl ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-[3/4] bg-zinc-900 w-full overflow-hidden"
              >
                <video 
                  src={product.videoUrl}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-[3/4] bg-zinc-900 w-full overflow-hidden"
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            )}
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="aspect-[3/4] bg-zinc-900 overflow-hidden">
                    <img 
                      src={img} 
                      alt={`${product.name} detail ${idx + 1}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm font-medium tracking-widest uppercase text-zinc-500 mb-4">{product.category}</p>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-6">{product.name}</h1>
              <p className="text-xl font-medium mb-10">${product.price}</p>
              
              <div className="prose prose-invert mb-12">
                <p className="text-zinc-400 leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Sizing */}
              <div className="mb-12">
                <div className="flex justify-between items-end mb-4">
                  <span className="text-sm font-medium tracking-widest uppercase">Select Size</span>
                  <button className="text-xs font-medium tracking-widest uppercase text-zinc-500 underline underline-offset-4 hover:text-white transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-4 text-sm font-bold tracking-widest uppercase border transition-all ${
                        selectedSize === size 
                          ? 'border-white bg-white text-black' 
                          : 'border-zinc-800 text-zinc-400 hover:border-zinc-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                
                <PredictiveSizing category={product.category} />
              </div>

              {/* Checkout Actions */}
              <div className="space-y-4">
                <button 
                  onClick={handleVaultCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-5 bg-white text-black font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-70"
                >
                  {isCheckingOut ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      One-Tap Vault Checkout
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    </>
                  )}
                </button>
                <button className="w-full py-5 border border-zinc-800 text-white font-bold tracking-widest uppercase hover:border-white transition-colors">
                  Add to Bag
                </button>
              </div>
              
              <div className="mt-12 pt-8 border-t border-zinc-800 grid grid-cols-2 gap-8 text-sm text-zinc-500">
                <div>
                  <h5 className="font-bold tracking-widest uppercase text-white mb-2">Complimentary Shipping</h5>
                  <p>On all orders over $1,000.</p>
                </div>
                <div>
                  <h5 className="font-bold tracking-widest uppercase text-white mb-2">Returns</h5>
                  <p>Free returns within 14 days.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

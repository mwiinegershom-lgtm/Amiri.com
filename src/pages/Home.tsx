import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2128&auto=format&fit=crop" 
            alt="AMIRI Campaign" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-6 text-center z-10">
          <motion.h1 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-6"
          >
            Autumn Winter 2026
          </motion.h1>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/vibe-search" className="px-8 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-gray-200 transition-colors">
              Experience Vibe Search
            </Link>
            <button className="px-8 py-4 border border-white text-white text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors">
              Explore Collection
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-3xl font-bold tracking-tight uppercase">New Arrivals</h2>
          <Link to="/" className="text-sm font-medium tracking-widest uppercase border-b border-white/30 pb-1 hover:border-white transition-colors">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
          {featuredProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer"
            >
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-zinc-900">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {product.images[1] && (
                    <img 
                      src={product.images[1]} 
                      alt={`${product.name} alternate`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium uppercase tracking-wider mb-1">{product.name}</h3>
                    <p className="text-sm text-zinc-500">{product.category}</p>
                  </div>
                  <span className="text-sm font-medium">${product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

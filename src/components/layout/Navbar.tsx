import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-difference text-white"
    >
      <div className="flex items-center gap-6">
        <button className="p-2 -ml-2 hover:opacity-70 transition-opacity">
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex gap-6 text-sm font-medium tracking-widest uppercase">
          <Link to="/" className="hover:opacity-70 transition-opacity">Mens</Link>
          <Link to="/" className="hover:opacity-70 transition-opacity">Womens</Link>
          <Link to="/vibe-search" className="hover:opacity-70 transition-opacity flex items-center gap-2">
            <Search className="w-4 h-4" /> Vibe Search
          </Link>
        </div>
      </div>

      <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-2xl font-bold tracking-[0.2em] uppercase">
        AMIRI
      </Link>

      <div className="flex items-center gap-6">
        <button className="md:hidden p-2 hover:opacity-70 transition-opacity">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 -mr-2 hover:opacity-70 transition-opacity flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          <span className="text-xs font-medium hidden md:block">Vault (0)</span>
        </button>
      </div>
    </motion.nav>
  );
}

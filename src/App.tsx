/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { VibeSearch } from './pages/VibeSearch';
import { ProductDetail } from './pages/ProductDetail';

export default function App() {
  return (
    <Router>
      <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vibe-search" element={<VibeSearch />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

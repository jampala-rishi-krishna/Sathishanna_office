import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Women from './pages/Women';
import Men from './pages/Men';
import Wholesale from './pages/Wholesale';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Booking from './pages/Booking';

const ROUTE_METADATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Hair 2 Hair Studio | Hair Patches, Wigs & Hair Replacement in Hyderabad and Khammam',
    description: "Men's hair patches, women's hair patches, human hair wigs, extensions, bonding, weaving and wholesale hair products from Hair 2 Hair Studio in Telangana.",
  },
  '/men': {
    title: "Men's Hair Patches & Hair Systems | Hair 2 Hair Studio",
    description: "Explore men's skin, lace, mono and hybrid hair systems and non-surgical hair replacement options at Hair 2 Hair Studio.",
  },
  '/women': {
    title: "Women's Hair Patches, Toppers & Wigs | Hair 2 Hair Studio",
    description: "Explore women's hair patches, toppers, human hair wigs and extensions at Hair 2 Hair Studio.",
  },
  '/services': {
    title: 'Hair Bonding, Weaving & Extension Services | Hair 2 Hair Studio',
    description: 'Learn about hair bonding, weaving, clip-in solutions, extensions, wig styling and maintenance services at Hair 2 Hair Studio.',
  },
  '/wholesale': {
    title: 'Wholesale Hair Patches, Wigs & Hair Systems | Hair 2 Hair Studio',
    description: 'Wholesale hair systems, wigs, patches and related products for salons, retailers and distributors. Contact Hair 2 Hair Studio for trade enquiries.',
  },
  '/gallery': {
    title: 'Hair Transformations & Gallery | Hair 2 Hair Studio',
    description: 'View hair system, hair patch, wig and hair replacement examples from Hair 2 Hair Studio.',
  },
  '/about': {
    title: 'About Hair 2 Hair Studio | Hair Replacement Specialists in Telangana',
    description: "Learn about Hair 2 Hair Studio, its team, hair replacement services and branches in Dilsukhnagar, Hyderabad and Khammam.",
  },
  '/contact': {
    title: 'Contact Hair 2 Hair Studio | Hyderabad & Khammam',
    description: 'Contact Hair 2 Hair Studio for hair patch, wig, extension, bonding, weaving and wholesale enquiries in Hyderabad and Khammam.',
  },
  '/booking': {
    title: 'Book a Hair Consultation | Hair 2 Hair Studio',
    description: 'Request a consultation with Hair 2 Hair Studio to discuss men's hair systems, women's hair solutions, wigs and extensions.',
  },
};

/** Keep browser metadata aligned with the active React route. */
function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = ROUTE_METADATA[pathname] ?? ROUTE_METADATA['/'];
    document.title = metadata.title;

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = metadata.description;

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    const canonicalPath = pathname === '/' ? '/' : pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    canonical.href = `https://hair2hair.in${canonicalPath}`;
  }, [pathname]);

  return null;
}

/** Scroll to the top on page change, or to the #section when a link targets one. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollManager />
      <RouteMetadata />
      <div className="min-h-screen bg-brand-porcelain">
        <Header />
        <main id="main" className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/women" element={<Women />} />
            <Route path="/men" element={<Men />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;

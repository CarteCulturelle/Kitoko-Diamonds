import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

// --- Types & Data ---

type ViewState = "HOME" | "SHOP" | "PDP" | "IMPACT";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage: string;
  detailImages: string[];
  category: "Solitaire" | "Halo" | "Vintage" | "Band";
  metal: "Yellow Gold" | "White Gold" | "Rose Gold" | "Platinum";
  inspiration: string;
}

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "The Kinshasa Solitaire",
    price: 1850,
    category: "Solitaire",
    metal: "Yellow Gold",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1603561596112-0a132b7223ae?auto=format&fit=crop&q=80&w=800",
    detailImages: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1603561596112-0a132b7223ae?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1596942509633-85dc24177d5c?auto=format&fit=crop&q=80&w=800"
    ],
    inspiration: "Inspired by the vibrant energy of Kinshasa, this solitaire represents a singular, powerful love that stands tall amidst the noise.",
  },
  {
    id: "2",
    name: "The Virunga Halo",
    price: 2400,
    category: "Halo",
    metal: "White Gold",
    image: "https://images.unsplash.com/photo-1603561591411-0a132b7223ae?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    detailImages: [
        "https://images.unsplash.com/photo-1603561591411-0a132b7223ae?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&q=80&w=800"
    ],
    inspiration: "Drawing from the mist-covered peaks of Virunga National Park, the halo setting mimics the ethereal glow of sunrise over the mountains.",
  },
  {
    id: "3",
    name: "The Congo River Band",
    price: 1200,
    category: "Band",
    metal: "Rose Gold",
    image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
    detailImages: [
         "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800",
         "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800",
         "https://images.unsplash.com/photo-1617038224558-2880932728d3?auto=format&fit=crop&q=80&w=800"
    ],
    inspiration: "Fluid and eternal, the curves of this band mirror the winding path of the mighty Congo River, sustaining life and connection.",
  },
  {
    id: "4",
    name: "The Malachite Vintage",
    price: 2100,
    category: "Vintage",
    metal: "Yellow Gold",
    image: "https://images.unsplash.com/photo-1589674781759-c21c37956311?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
    detailImages: [
        "https://images.unsplash.com/photo-1589674781759-c21c37956311?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=800"
    ],
    inspiration: "An ode to the rich mineral heritage of the Katanga province, featuring intricate detailing reminiscent of malachite patterns.",
  },
];

// --- Components ---

const AnnouncementBar = () => (
  <div className="bg-black text-white text-[10px] md:text-xs py-2 text-center tracking-[0.2em] font-heading uppercase flex justify-center items-center px-4 z-50 relative">
    <span className="mr-4">✦ 5% of profits donated to Congolese communities</span>
    <span className="hidden sm:inline opacity-50 mx-2">|</span>
    <span className="ml-4 hidden sm:inline">Free Shipping on Orders Over £500</span>
  </div>
);

const Navbar = ({ onNavigate, cartCount }: { onNavigate: (view: ViewState) => void, cartCount: number }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenuItems = [
    {
      id: 'engagement',
      label: 'Engagement Rings',
      subLabel: 'Design your forever',
      icon: 'fa-ring',
      action: () => onNavigate("SHOP")
    },
    {
      id: 'wedding',
      label: 'Wedding Bands',
      subLabel: 'Symbols of eternity',
      icon: 'fa-infinity',
      action: () => onNavigate("SHOP")
    },
    {
      id: 'impact',
      label: 'World of Kitóko',
      subLabel: 'Our ethical promise',
      icon: 'fa-earth-africa',
      action: () => onNavigate("IMPACT")
    },
    {
      id: 'education',
      label: 'Education',
      subLabel: 'The lab-grown guide',
      icon: 'fa-book-open',
      action: () => setMenuOpen(false) // Just close for now as per requirements
    }
  ];

  return (
    <>
      <nav className={`fixed w-full z-40 transition-all duration-500 ease-in-out ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex justify-between items-center text-black">
          {/* Left: Hamburger */}
          <div className="flex-1 flex items-center">
            <button onClick={() => setMenuOpen(true)} className="p-2 hover:text-earthy-gold transition-colors">
              <i className="fas fa-bars text-xl"></i>
            </button>
            <div className="hidden md:flex ml-8 space-x-8 font-heading text-xs uppercase tracking-widest">
              <button onClick={() => onNavigate("SHOP")} className="hover:text-earthy-gold hover:underline underline-offset-4 decoration-electric-yellow transition-all">Shop</button>
              <button onClick={() => onNavigate("IMPACT")} className="hover:text-earthy-gold hover:underline underline-offset-4 decoration-electric-yellow transition-all">World of Kitóko</button>
              <button className="hover:text-earthy-gold hover:underline underline-offset-4 decoration-electric-yellow transition-all">Education</button>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex-1 text-center">
            <button onClick={() => onNavigate("HOME")} className="font-script text-4xl md:text-5xl cursor-pointer hover:text-earthy-gold transition-colors">
              Kitóko
            </button>
          </div>

          {/* Right: Icons */}
          <div className="flex-1 flex justify-end items-center space-x-6">
            <button className="hidden sm:block hover:text-earthy-gold transition-colors"><i className="fas fa-search"></i></button>
            <button className="hover:text-earthy-gold transition-colors"><i className="far fa-heart"></i></button>
            <button className="hover:text-earthy-gold transition-colors relative group">
              <i className="fas fa-shopping-bag group-hover:scale-110 transition-transform"></i>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-electric-yellow text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col animate-fade-in-fast">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-50">
            <span className="font-script text-3xl">Kitóko</span>
            <button onClick={() => setMenuOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-off-white transition-colors">
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          
          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
            <div className="space-y-2 mb-8">
                {mobileMenuItems.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => { item.action(); setMenuOpen(false); }}
                        className="flex items-center p-4 rounded-xl hover:bg-off-white transition-all group text-left w-full animate-slide-up-fast"
                        style={{ animationDelay: `${index * 75}ms`, opacity: 0, animationFillMode: 'forwards' }}
                    >
                        <div className="w-12 h-12 rounded-full bg-white border border-gray-100 flex items-center justify-center text-earthy-gold group-hover:bg-electric-yellow group-hover:border-electric-yellow group-hover:text-black transition-colors shadow-sm shrink-0">
                            <i className={`fas ${item.icon} text-lg`}></i>
                        </div>
                        <div className="ml-4 grow">
                            <span className="block font-heading text-base uppercase tracking-widest text-black group-hover:text-earthy-gold transition-colors">{item.label}</span>
                            <span className="block font-serif text-sm text-gray-500 italic mt-0.5">{item.subLabel}</span>
                        </div>
                        <i className="fas fa-chevron-right ml-4 text-gray-300 group-hover:text-black transition-colors text-xs"></i>
                    </button>
                ))}
            </div>

            {/* Quick Links */}
            <div className="mt-auto animate-slide-up-fast" style={{ animationDelay: '300ms', opacity: 0, animationFillMode: 'forwards' }}>
                 <div className="grid grid-cols-2 gap-4 mb-6">
                    <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-off-white hover:bg-gray-100 transition-colors">
                        <i className="far fa-heart mb-2 text-gray-600"></i>
                        <span className="text-[10px] uppercase tracking-widest font-heading">Wishlist</span>
                    </button>
                    <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-off-white hover:bg-gray-100 transition-colors">
                        <i className="far fa-user mb-2 text-gray-600"></i>
                        <span className="text-[10px] uppercase tracking-widest font-heading">Account</span>
                    </button>
                 </div>

                 {/* Promo Banner */}
                 <div 
                    className="relative rounded-lg overflow-hidden h-32 group cursor-pointer w-full bg-gray-200" 
                    onClick={() => { onNavigate("SHOP"); setMenuOpen(false); }}
                 >
                    <img 
                        src="https://images.unsplash.com/photo-1617038224558-2880932728d3?auto=format&fit=crop&q=80&w=800" 
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                        alt="Menu Promo" 
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="text-white font-heading uppercase tracking-[0.2em] text-sm border-b border-electric-yellow pb-1">New Arrivals</span>
                    </div>
                 </div>
                 
                 <div className="text-center mt-6 text-gray-400 text-xs font-heading uppercase tracking-widest pb-4">
                     Honouring Traditions
                 </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Footer = () => (
  <footer className="bg-black text-white pt-24 pb-12">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-800 pb-16">
      <div className="md:col-span-1">
        <h3 className="font-script text-4xl mb-6">Kitóko</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 font-serif">
          Luxury with a soul. Ethically sourcing the finest lab-grown diamonds while empowering the heart of Africa.
        </p>
        <div className="flex space-x-6 text-xl text-gray-400">
          <i className="fab fa-instagram hover:text-electric-yellow hover:-translate-y-1 transition-all cursor-pointer"></i>
          <i className="fab fa-pinterest hover:text-electric-yellow hover:-translate-y-1 transition-all cursor-pointer"></i>
          <i className="fab fa-tiktok hover:text-electric-yellow hover:-translate-y-1 transition-all cursor-pointer"></i>
        </div>
      </div>
      <div>
        <h4 className="font-heading uppercase tracking-widest text-xs mb-8 text-electric-yellow">Customer Care</h4>
        <ul className="space-y-4 text-sm text-gray-400 font-serif">
          <li className="hover:text-white transition-colors cursor-pointer">Contact Concierge</li>
          <li className="hover:text-white transition-colors cursor-pointer">Shipping & Returns</li>
          <li className="hover:text-white transition-colors cursor-pointer">Ring Size Guide</li>
          <li className="hover:text-white transition-colors cursor-pointer">FAQ</li>
        </ul>
      </div>
      <div>
        <h4 className="font-heading uppercase tracking-widest text-xs mb-8 text-electric-yellow">About Us</h4>
        <ul className="space-y-4 text-sm text-gray-400 font-serif">
          <li className="hover:text-white transition-colors cursor-pointer">Our Story</li>
          <li className="hover:text-white transition-colors cursor-pointer">Sustainability Report</li>
          <li className="hover:text-white transition-colors cursor-pointer">The Blog</li>
          <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
        </ul>
      </div>
      <div>
        <h4 className="font-heading uppercase tracking-widest text-xs mb-8 text-electric-yellow">Newsletter</h4>
        <p className="text-gray-400 text-sm mb-6 font-serif">Join our community for early access to new collections and ethical luxury news.</p>
        <div className="flex border-b border-white pb-2 relative group">
          <input type="email" placeholder="Your Email" className="bg-transparent w-full outline-none text-white placeholder-gray-600 font-serif" />
          <button className="uppercase text-xs font-bold tracking-widest hover:text-electric-yellow transition-colors">Join</button>
          <div className="absolute bottom-0 left-0 w-0 h-px bg-electric-yellow group-hover:w-full transition-all duration-500"></div>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-6 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-heading tracking-wider uppercase">
      <p>&copy; 2024 Kitóko Diamonds. All Rights Reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
         <span className="cursor-pointer hover:text-gray-400">Privacy</span>
         <span className="cursor-pointer hover:text-gray-400">Terms</span>
      </div>
    </div>
  </footer>
);

// --- NEW FEATURES MODALS ---

// 1. STYLE QUIZ MODAL
const StyleQuizModal = ({ onClose, onFinish }: { onClose: () => void, onFinish: (product: Product) => void }) => {
    const [step, setStep] = useState(0);
    const [selections, setSelections] = useState<{style?: string, metal?: string}>({});

    const steps = [
        {
            title: "Define Your Vibe",
            options: [
                { label: "Classic & Timeless", value: "Solitaire", icon: "fa-gem" },
                { label: "Vintage & Intricate", value: "Vintage", icon: "fa-crown" },
                { label: "Glamorous & Radiant", value: "Halo", icon: "fa-sun" }
            ]
        },
        {
            title: "Select Your Metal",
            options: [
                { label: "Yellow Gold", value: "Yellow Gold", color: "#E6C200" },
                { label: "White Gold", value: "White Gold", color: "#E8E8E8" },
                { label: "Rose Gold", value: "Rose Gold", color: "#E5B899" }
            ]
        }
    ];

    const handleSelect = (value: string) => {
        if (step === 0) setSelections({...selections, style: value});
        if (step === 1) {
            const finalSelections = {...selections, metal: value};
            // Simple recommendation logic
            const match = PRODUCTS.find(p => p.category === finalSelections.style) || PRODUCTS[0];
            onFinish(match);
        } else {
            setStep(step + 1);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in-fast p-4">
            <div className="bg-white max-w-lg w-full p-8 relative shadow-2xl overflow-hidden">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"><i className="fas fa-times text-xl"></i></button>
                
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100">
                    <div className="h-full bg-electric-yellow transition-all duration-500" style={{ width: `${((step + 1) / 2) * 100}%` }}></div>
                </div>

                <div className="text-center mt-6">
                    <h3 className="font-script text-3xl text-earthy-gold mb-2">The Concierge</h3>
                    <h2 className="font-heading text-3xl uppercase tracking-wide mb-8">{steps[step].title}</h2>
                    
                    <div className="grid gap-4">
                        {steps[step].options.map((opt) => (
                            <button 
                                key={opt.label}
                                onClick={() => handleSelect(opt.value)}
                                className="group flex items-center justify-between p-6 border border-gray-200 hover:border-black hover:bg-off-white transition-all text-left"
                            >
                                <div className="flex items-center">
                                    {opt.icon && <i className={`fas ${opt.icon} text-xl w-10 text-gray-400 group-hover:text-earthy-gold transition-colors`}></i>}
                                    {opt.color && <div className="w-8 h-8 rounded-full border border-gray-300 mr-4 shadow-inner" style={{backgroundColor: opt.color}}></div>}
                                    <span className="font-heading uppercase tracking-widest text-sm">{opt.label}</span>
                                </div>
                                <i className="fas fa-arrow-right opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-electric-yellow"></i>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 2. TRACEABILITY MODAL
const TraceabilityModal = ({ onClose }: { onClose: () => void }) => {
    const timeline = [
        { title: "Lab Created", location: "Austin, Texas", desc: "Formed with renewable energy, identical to mined diamonds but conflict-free.", icon: "fa-flask" },
        { title: "Master Cut", location: "Surat, India", desc: "Cut and polished by fair-wage artisans ensuring maximum brilliance.", icon: "fa-gem" },
        { title: "Hand Set", location: "London, UK", desc: "Crafted into 18k recycled gold by our master jewelers.", icon: "fa-hammer" },
        { title: "Impact", location: "Virunga, Congo", desc: "5% of profits donated to local agricultural schools.", icon: "fa-hand-holding-heart" },
        { title: "Forever Yours", location: "Your Hand", desc: "A legacy of love and responsibility.", icon: "fa-ring" }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in-fast p-4 overflow-y-auto">
            <div className="bg-off-white max-w-2xl w-full p-8 relative shadow-2xl my-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-black hover:text-earthy-gold transition-colors"><i className="fas fa-times text-2xl"></i></button>
                
                <h2 className="font-heading text-3xl text-center uppercase tracking-wide mb-12 mt-4">Journey of a Diamond</h2>
                
                <div className="relative border-l-2 border-gray-300 ml-4 md:ml-8 space-y-12 pl-8 pb-4">
                    {timeline.map((item, idx) => (
                        <div key={idx} className="relative group animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                            <div className="absolute -left-[41px] top-0 w-5 h-5 bg-white border-4 border-black rounded-full group-hover:border-electric-yellow transition-colors"></div>
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <div className="bg-white p-4 rounded shadow-sm shrink-0 text-earthy-gold">
                                    <i className={`fas ${item.icon} text-2xl`}></i>
                                </div>
                                <div>
                                    <h3 className="font-heading uppercase tracking-widest text-lg">{item.title}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1"><i className="fas fa-map-marker-alt mr-1"></i> {item.location}</p>
                                    <p className="font-serif text-gray-600 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-8 text-center">
                    <button onClick={onClose} className="bg-black text-white px-8 py-3 uppercase text-xs font-bold tracking-[0.2em] hover:bg-earthy-gold transition-colors">Close Journey</button>
                </div>
            </div>
        </div>
    );
};

// 3. VIRTUAL TRY-ON (SKIN TONE)
const TryOnModal = ({ product, onClose }: { product: Product, onClose: () => void }) => {
    const [skinTone, setSkinTone] = useState("#f5d0b0"); // Default Fair

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white animate-fade-in-fast">
             <div className="w-full h-full max-w-4xl flex flex-col relative bg-off-white">
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
                    <h2 className="font-heading text-xl uppercase tracking-widest">Virtual Try-On</h2>
                    <button onClick={onClose} className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center hover:text-earthy-gold"><i className="fas fa-times"></i></button>
                </div>

                <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-gray-100">
                     {/* Hand Container */}
                     <div className="relative w-[300px] md:w-[400px] h-[500px] md:h-[600px] transition-all duration-500">
                        {/* Generic Hand SVG Shape */}
                        <svg viewBox="0 0 200 400" className="w-full h-full drop-shadow-2xl">
                            <path 
                                d="M60,400 L60,250 C60,250 40,240 40,200 C40,160 55,100 70,80 C80,65 95,65 100,80 L100,180 L110,180 L110,40 C110,15 135,15 135,40 L135,170 L145,170 L145,60 C145,35 170,35 170,60 L170,180 L180,180 L180,90 C180,70 195,70 195,90 L195,250 C195,350 180,400 180,400 Z" 
                                fill={skinTone} 
                            />
                        </svg>
                        
                        {/* Ring Overlay - Positioned on the "Ring Finger" */}
                        <div className="absolute top-[150px] left-[118px] w-[34px] h-[34px] z-10">
                            <img src={product.image} className="w-full h-full object-contain mix-blend-multiply scale-[2.5]" alt="Ring Overlay" />
                        </div>
                     </div>
                     
                     <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none">
                         <p className="font-heading uppercase tracking-widest text-xs mb-2 text-gray-500">Preview Mode</p>
                     </div>
                </div>

                {/* Controls */}
                <div className="bg-white p-8 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-10">
                    <p className="text-center font-heading uppercase text-xs tracking-widest mb-4">Select Skin Tone</p>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => setSkinTone("#f5d0b0")} className={`w-12 h-12 rounded-full border-2 ${skinTone === "#f5d0b0" ? "border-black scale-110" : "border-transparent"} transition-all`} style={{backgroundColor: "#f5d0b0"}} title="Fair"></button>
                        <button onClick={() => setSkinTone("#e0ac69")} className={`w-12 h-12 rounded-full border-2 ${skinTone === "#e0ac69" ? "border-black scale-110" : "border-transparent"} transition-all`} style={{backgroundColor: "#e0ac69"}} title="Medium"></button>
                        <button onClick={() => setSkinTone("#8d5524")} className={`w-12 h-12 rounded-full border-2 ${skinTone === "#8d5524" ? "border-black scale-110" : "border-transparent"} transition-all`} style={{backgroundColor: "#8d5524"}} title="Deep"></button>
                    </div>
                </div>
             </div>
        </div>
    );
};


// --- Views ---

const HomeView = ({ onNavigate, onStartQuiz }: { onNavigate: (view: ViewState) => void, onStartQuiz: () => void }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <header className="relative h-screen w-full overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.70]"
            alt="Hero Model"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white p-6 animate-slide-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 max-w-5xl leading-none font-heading uppercase tracking-tight drop-shadow-lg">
            Honouring Traditions, <br/>
            <span className="italic font-serif font-light normal-case text-electric-yellow">Reimagining Futures.</span>
          </h1>
          <p className="text-lg md:text-xl mb-12 max-w-lg font-serif font-light tracking-wide text-gray-100">
            Conflict-free, lab-grown diamonds inspired by the Heart of Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate("SHOP")}
                className="bg-electric-yellow text-black px-10 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Design Your Ring
              </button>
              <button 
                onClick={onStartQuiz}
                className="border border-white text-white px-10 py-4 text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
              >
                Find Your Style
              </button>
          </div>
        </div>
      </header>

      {/* USP Banner */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-off-white mb-4 group-hover:bg-electric-yellow transition-colors duration-300">
               <i className="fas fa-gem text-lg text-earthy-gold group-hover:text-black"></i>
            </div>
            <h3 className="font-heading uppercase text-xs tracking-widest mb-2">100% Ethical</h3>
            <p className="text-xs text-gray-500 font-serif">Lab-grown, conflict-free stones</p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-off-white mb-4 group-hover:bg-electric-yellow transition-colors duration-300">
                <i className="fas fa-hand-holding-heart text-lg text-earthy-gold group-hover:text-black"></i>
            </div>
            <h3 className="font-heading uppercase text-xs tracking-widest mb-2">5% Donated</h3>
            <p className="text-xs text-gray-500 font-serif">Directly to Congo communities</p>
          </div>
          <div className="flex flex-col items-center group">
             <div className="w-12 h-12 flex items-center justify-center rounded-full bg-off-white mb-4 group-hover:bg-electric-yellow transition-colors duration-300">
                <i className="fas fa-pencil-ruler text-lg text-earthy-gold group-hover:text-black"></i>
             </div>
            <h3 className="font-heading uppercase text-xs tracking-widest mb-2">Bespoke Design</h3>
            <p className="text-xs text-gray-500 font-serif">Crafted exactly for you</p>
          </div>
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-off-white mb-4 group-hover:bg-electric-yellow transition-colors duration-300">
                <i className="fas fa-shipping-fast text-lg text-earthy-gold group-hover:text-black"></i>
            </div>
            <h3 className="font-heading uppercase text-xs tracking-widest mb-2">Secure Shipping</h3>
            <p className="text-xs text-gray-500 font-serif">Insured global delivery</p>
          </div>
        </div>
      </section>

      {/* Category Split */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-[85vh]">
        <div className="relative group cursor-pointer overflow-hidden border-r border-white bg-gray-100" onClick={() => onNavigate("SHOP")}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all z-10 duration-500"></div>
          <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Engagement" />
          <div className="absolute bottom-12 left-12 z-20 text-white transform transition-transform duration-500 group-hover:-translate-y-2">
            <h2 className="text-4xl md:text-5xl font-heading mb-4 uppercase tracking-tight">The Engagement Studio</h2>
            <div className="flex items-center space-x-4">
               <div className="h-px w-12 bg-electric-yellow"></div>
               <p className="font-serif italic text-xl">Create your forever</p>
            </div>
          </div>
        </div>
        <div className="relative group cursor-pointer overflow-hidden bg-gray-100" onClick={() => onNavigate("SHOP")}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all z-10 duration-500"></div>
          <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Collections" />
          <div className="absolute bottom-12 left-12 z-20 text-white transform transition-transform duration-500 group-hover:-translate-y-2">
            <h2 className="text-4xl md:text-5xl font-heading mb-4 uppercase tracking-tight">The Collections</h2>
            <div className="flex items-center space-x-4">
               <div className="h-px w-12 bg-electric-yellow"></div>
               <p className="font-serif italic text-xl">Fine jewelry for every day</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Product: Pre-Proposal Box */}
      <section className="bg-off-white py-24">
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 relative group">
            <div className="absolute top-4 left-4 z-10 bg-black text-white px-3 py-1 text-[10px] uppercase tracking-widest font-heading">
                Best Seller
            </div>
            <div className="relative overflow-hidden shadow-2xl bg-white">
                <img src="https://images.unsplash.com/photo-1512140660600-b695e96a4059?auto=format&fit=crop&q=80&w=800" className="w-full transition-transform duration-700 group-hover:scale-105" alt="Box Kit" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-8 shadow-xl hidden md:block border border-gray-100">
              <p className="font-heading text-3xl">£150</p>
              <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Fully redeemable</p>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-earthy-gold font-bold uppercase tracking-[0.2em] text-xs mb-4">The Smartest Way to Propose</h4>
            <h2 className="text-4xl md:text-6xl font-heading mb-8 leading-none">The Pre-Proposal <br/> Box Kit</h2>
            <p className="text-gray-600 mb-10 leading-loose text-lg font-serif max-w-md">
              Not sure about the size or style? Propose with a resin replica ring and a design consultation voucher. Take the stress out of the surprise and design the dream ring together.
            </p>
            <ul className="mb-10 space-y-4 font-heading text-xs uppercase tracking-widest text-gray-800">
              <li className="flex items-center"><i className="fas fa-check text-electric-yellow mr-4 bg-black rounded-full p-1 text-[8px]"></i> Includes ring sizer & 3 replica styles</li>
              <li className="flex items-center"><i className="fas fa-check text-electric-yellow mr-4 bg-black rounded-full p-1 text-[8px]"></i> Virtual consultation invitation</li>
              <li className="flex items-center"><i className="fas fa-check text-electric-yellow mr-4 bg-black rounded-full p-1 text-[8px]"></i> Cost credited towards final ring</li>
            </ul>
            <button className="border border-black px-10 py-4 uppercase text-xs font-bold tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300">
              Shop The Kit
            </button>
          </div>
        </div>
      </section>

      {/* Impact Counter */}
      <section className="bg-deep-green text-white py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-electric-yellow rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-earthy-gold rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-script text-6xl md:text-7xl mb-4 text-electric-yellow">Impact Created</h2>
          <p className="font-serif italic text-2xl mb-16 opacity-90">Together, we bloom.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-white/20 pt-16">
            <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
              <p className="text-6xl font-heading mb-4">240+</p>
              <p className="uppercase tracking-[0.2em] text-xs opacity-70">Families Supported</p>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
              <p className="text-6xl font-heading mb-4">£15k</p>
              <p className="uppercase tracking-[0.2em] text-xs opacity-70">Donated in 2023</p>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
              <p className="text-6xl font-heading mb-4">3</p>
              <p className="uppercase tracking-[0.2em] text-xs opacity-70">Schools Partnered</p>
            </div>
          </div>
          
          <button onClick={() => onNavigate("IMPACT")} className="mt-20 text-electric-yellow border-b border-electric-yellow pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-[0.2em] text-xs">
            Read our 2023 Impact Report
          </button>
        </div>
      </section>
    </div>
  );
};

const ShopView = ({ onNavigate, onSelectProduct }: { onNavigate: (view: ViewState) => void, onSelectProduct: (p: Product) => void }) => {
  return (
    <div className="pt-28 animate-fade-in pb-20">
      <div className="container mx-auto px-6">
        
        {/* Educational Header */}
        <div className="bg-off-white p-10 md:p-16 mb-16 flex flex-col md:flex-row items-center justify-between rounded-sm relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-earthy-gold opacity-5 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="md:w-1/2 mb-10 md:mb-0 relative z-10">
            <h1 className="text-4xl md:text-5xl font-heading mb-6 uppercase tracking-tight">The Engagement Studio</h1>
            <p className="text-gray-600 mb-8 max-w-md font-serif text-lg leading-relaxed">Explore our collection of ethically crafted, lab-grown diamond rings. Identical brilliance, zero compromise.</p>
            
            {/* Visual Comparison Chart */}
            <div className="flex flex-col space-y-4 max-w-sm">
                <div className="flex items-center text-xs tracking-widest uppercase">
                    <span className="w-24 font-bold text-gray-400">Mined</span>
                    <div className="flex-1 h-8 bg-gray-200 ml-4 relative rounded-r-full overflow-hidden">
                        <span className="absolute left-3 top-2 text-[10px] text-gray-500">Chemically Carbon</span>
                    </div>
                </div>
                <div className="flex items-center text-xs tracking-widest uppercase">
                    <span className="w-24 font-bold text-deep-green">Lab-Grown</span>
                    <div className="flex-1 h-8 bg-electric-yellow ml-4 relative rounded-r-full overflow-hidden shadow-sm">
                         <span className="absolute left-3 top-2 text-[10px] font-bold">Chemically Carbon</span>
                         <i className="fas fa-check absolute right-3 top-2 text-black"></i>
                    </div>
                </div>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-end space-x-2 md:space-x-8 opacity-80">
             <div className="text-center group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border border-gray-200 mb-3 mx-auto group-hover:border-earthy-gold transition-colors">
                    <span className="font-heading text-xl group-hover:text-earthy-gold">1</span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em]">Book</p>
             </div>
             <div className="h-px w-8 md:w-16 bg-gray-300 self-center mb-6"></div>
             <div className="text-center group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border border-gray-200 mb-3 mx-auto group-hover:border-earthy-gold transition-colors">
                    <span className="font-heading text-xl group-hover:text-earthy-gold">2</span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em]">Select</p>
             </div>
             <div className="h-px w-8 md:w-16 bg-gray-300 self-center mb-6"></div>
             <div className="text-center group cursor-pointer">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border border-gray-200 mb-3 mx-auto group-hover:border-earthy-gold transition-colors">
                    <span className="font-heading text-xl group-hover:text-earthy-gold">3</span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em]">Create</p>
             </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-gray-100 pb-6 sticky top-24 bg-white/95 backdrop-blur z-30 pt-4">
          <button className="px-6 py-2 border border-black bg-black text-white text-[10px] uppercase tracking-[0.2em] rounded-full transition-all hover:scale-105">All Rings</button>
          <button className="px-6 py-2 border border-gray-200 hover:border-black text-[10px] uppercase tracking-[0.2em] rounded-full transition-all hover:bg-gray-50">Solitaire</button>
          <button className="px-6 py-2 border border-gray-200 hover:border-black text-[10px] uppercase tracking-[0.2em] rounded-full transition-all hover:bg-gray-50">Halo</button>
          <button className="px-6 py-2 border border-gray-200 hover:border-black text-[10px] uppercase tracking-[0.2em] rounded-full transition-all hover:bg-gray-50">Vintage</button>
          <div className="ml-auto flex items-center space-x-2 text-[10px] uppercase tracking-[0.2em] cursor-pointer group">
            <span className="group-hover:text-earthy-gold transition-colors">Sort By</span>
            <i className="fas fa-chevron-down group-hover:text-earthy-gold transition-colors"></i>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => onSelectProduct(product)}>
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-off-white">
                <img 
                  src={product.image} 
                  className="w-full h-full object-cover absolute inset-0 transition-opacity duration-700 group-hover:opacity-0" 
                  alt={product.name}
                />
                <img 
                  src={product.hoverImage} 
                  className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 scale-105" 
                  alt={`${product.name} on model`}
                />
                <div className="absolute top-3 left-3 bg-white px-3 py-1 text-[10px] uppercase tracking-widest font-heading border border-gray-100">
                  {product.category}
                </div>
                <div className="absolute bottom-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                    <i className="fas fa-plus text-xs"></i>
                </div>
              </div>
              <h3 className="font-heading text-lg mb-2 group-hover:text-earthy-gold transition-colors uppercase tracking-wide">{product.name}</h3>
              <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                <p className="text-xs text-gray-500 font-serif italic">{product.metal}</p>
                <p className="text-sm font-bold font-heading">£{product.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

const ProductDetailView = ({ product, addToCart }: { product: Product, addToCart: () => void }) => {
  const [activeTab, setActiveTab] = useState("inspiration");
  const [showTraceability, setShowTraceability] = useState(false);
  const [showTryOn, setShowTryOn] = useState(false);

  return (
    <>
    <div className="pt-24 animate-fade-in min-h-screen bg-white">
      <div className="container mx-auto px-0 lg:px-6 h-full">
        <div className="flex flex-col lg:flex-row h-full">
          
          {/* Left: Image Gallery */}
          {/* Desktop: Grid / Mobile: Horizontal Swipe */}
          <div className="lg:w-3/5 lg:pr-12 mb-8 lg:mb-0">
             <div className="flex overflow-x-auto snap-x snap-mandatory lg:flex-col lg:overflow-visible gap-1 lg:gap-4 no-scrollbar h-[50vh] lg:h-auto">
                <img src={product.image} className="snap-center min-w-full lg:min-w-0 h-full lg:h-auto object-cover" alt="Main View" />
                <div className="hidden lg:grid grid-cols-2 gap-4">
                     <img src={product.hoverImage} className="w-full h-auto object-cover" alt="Model View" />
                     <img src={product.detailImages[2] || product.image} className="w-full h-auto object-cover" alt="Detail View" />
                </div>
                {/* Mobile Extra Images */}
                <img src={product.hoverImage} className="lg:hidden snap-center min-w-full h-full object-cover" alt="Model View" />
                <img src={product.detailImages[2] || product.image} className="lg:hidden snap-center min-w-full h-full object-cover" alt="Detail View" />
             </div>
             {/* Mobile Pagination Dots Indicator (Visual only) */}
             <div className="flex justify-center gap-2 mt-4 lg:hidden">
                <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
             </div>
          </div>

          {/* Right: Details (Sticky) */}
          <div className="lg:w-2/5 lg:sticky lg:top-32 h-fit pb-20 px-6 lg:px-0">
            <div className="mb-4 text-earthy-gold text-[10px] font-bold tracking-[0.2em] uppercase flex items-center">
              <span className="w-8 h-px bg-earthy-gold mr-3"></span>
              Kitóko Signature Collection
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading mb-4 uppercase tracking-tight">{product.name}</h1>
            <p className="text-2xl font-light mb-8 font-serif">£{product.price.toLocaleString()}</p>

            <div className="prose prose-sm text-gray-600 mb-10 font-serif leading-loose">
              <p>Hand-set in 18k recycled gold. A modern classic featuring a brilliant lab-grown center stone, designed to catch the light from every angle. 100% conflict-free.</p>
            </div>

            {/* Feature Toggles */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                    onClick={() => setShowTryOn(true)}
                    className="flex items-center justify-center border border-gray-200 py-3 hover:border-black transition-colors"
                >
                    <i className="fas fa-hand-sparkles mr-2 text-earthy-gold"></i>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Virtual Try-On</span>
                </button>
                <button 
                    onClick={() => setShowTraceability(true)}
                    className="flex items-center justify-center border border-gray-200 py-3 hover:border-black transition-colors"
                >
                    <i className="fas fa-globe-africa mr-2 text-earthy-gold"></i>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Trace Origin</span>
                </button>
            </div>

            {/* Selectors */}
            <div className="mb-10">
              <div className="flex justify-between mb-3">
                 <label className="block text-xs uppercase tracking-widest font-bold">Ring Size</label>
                 <span className="text-xs text-gray-500 underline cursor-pointer hover:text-black">Size Guide</span>
              </div>
              <div className="relative">
                <select className="w-full border border-gray-300 py-3 px-4 bg-transparent outline-none cursor-pointer appearance-none hover:border-black transition-colors text-sm font-serif">
                    <option>Select Size (UK)</option>
                    <option>H</option>
                    <option>I</option>
                    <option>J</option>
                    <option>K</option>
                    <option>L</option>
                    <option>M</option>
                </select>
                <i className="fas fa-chevron-down absolute right-4 top-4 text-xs pointer-events-none"></i>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-4 mb-10">
              <button 
                onClick={addToCart}
                className="bg-electric-yellow text-black w-full py-4 uppercase font-bold tracking-[0.2em] text-xs hover:bg-black hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Add to Bag
              </button>
              <button className="w-full py-4 border border-black uppercase font-bold tracking-[0.2em] text-xs hover:bg-gray-50 transition-colors flex justify-center items-center group">
                Drop a Hint <i className="far fa-envelope ml-3 group-hover:text-earthy-gold transition-colors"></i>
              </button>
            </div>

            {/* Payment Integrations */}
            <div className="flex items-center justify-center space-x-2 mb-12 text-xs text-gray-500 bg-off-white p-4 rounded border border-gray-100">
              <span>Pay in 3 interest-free payments with</span>
              <span className="font-bold text-black">Klarna.</span>
              <span className="opacity-50">|</span>
              <span className="font-bold text-black">Clearpay</span>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200">
              <button 
                className="w-full py-5 flex justify-between items-center text-left hover:text-earthy-gold transition-colors group"
                onClick={() => setActiveTab(activeTab === "inspiration" ? "" : "inspiration")}
              >
                <span className="font-heading uppercase text-xs tracking-widest">The Inspiration</span>
                <i className={`fas fa-plus text-xs transition-transform duration-300 ${activeTab === "inspiration" ? "rotate-45" : ""} group-hover:text-electric-yellow`}></i>
              </button>
              {activeTab === "inspiration" && (
                <div className="pb-8 text-sm text-gray-600 font-serif italic animate-fade-in pl-4 border-l-2 border-electric-yellow">
                  "{product.inspiration}" <br/>
                  <span className="not-italic mt-4 block text-[10px] uppercase tracking-widest text-earthy-gold font-bold not-italic">- Designed by Amara</span>
                </div>
              )}

              <div className="border-t border-gray-200">
                <button className="w-full py-5 flex justify-between items-center text-left hover:text-earthy-gold transition-colors group">
                  <span className="font-heading uppercase text-xs tracking-widest">Details & Certification</span>
                  <i className="fas fa-plus text-xs group-hover:text-electric-yellow"></i>
                </button>
              </div>
              <div className="border-t border-gray-200">
                <button className="w-full py-5 flex justify-between items-center text-left hover:text-earthy-gold transition-colors group">
                  <span className="font-heading uppercase text-xs tracking-widest">Shipping & Returns</span>
                  <i className="fas fa-plus text-xs group-hover:text-electric-yellow"></i>
                </button>
              </div>
            </div>
            
            {/* Badges */}
            <div className="flex gap-4 mt-8 opacity-60">
                <div className="border border-gray-300 px-4 py-2 text-[10px] uppercase tracking-widest flex items-center">
                    <i className="fas fa-certificate mr-2"></i> IGI Certified
                </div>
                <div className="border border-gray-300 px-4 py-2 text-[10px] uppercase tracking-widest flex items-center">
                    <i className="fas fa-leaf mr-2"></i> Carbon Neutral
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    
    {showTraceability && <TraceabilityModal onClose={() => setShowTraceability(false)} />}
    {showTryOn && <TryOnModal product={product} onClose={() => setShowTryOn(false)} />}
    </>
  );
};

const ImpactView = ({ onNavigate }: { onNavigate: (view: ViewState) => void }) => {
  return (
    <div className="pt-24 animate-fade-in">
      <div className="bg-off-white min-h-screen">
        
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h4 className="text-deep-green font-bold uppercase tracking-[0.2em] text-xs mb-6">Our Promise</h4>
            <h1 className="text-5xl md:text-7xl font-heading mb-10 leading-none">Luxury with a Soul</h1>
            <p className="text-xl font-serif text-gray-700 leading-relaxed font-light">
              Kitóko means "Beautiful" in Lingala. But for us, beauty isn't just aesthetic—it's ethical. 
              We were founded to reclaim the narrative of African diamonds, turning a history of conflict into a future of empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative">
                <div className="absolute top-4 left-4 w-full h-full border-2 border-earthy-gold z-0"></div>
                <img 
                src="https://images.unsplash.com/photo-1489447068241-b3490214e879?auto=format&fit=crop&q=80&w=1000" 
                className="w-full h-[600px] object-cover shadow-2xl relative z-10 grayscale hover:grayscale-0 transition-all duration-700" 
                alt="Community"
                />
            </div>
            <div className="pl-0 md:pl-12">
              <h2 className="text-4xl font-heading mb-8 uppercase tracking-wide">The 5% Model</h2>
              <p className="text-gray-700 font-serif text-lg mb-6 leading-relaxed">
                For every piece of jewelry purchased, <span className="font-bold border-b border-electric-yellow">5% of the profit</span> is invested directly into educational and agricultural projects in the Democratic Republic of Congo.
              </p>
              <p className="text-gray-700 font-serif text-lg mb-10 leading-relaxed">
                We don't just write checks. We partner with local grassroots organizations to build schools, provide micro-loans for women entrepreneurs, and support sustainable farming.
              </p>
              <button 
                 onClick={() => onNavigate("SHOP")}
                 className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-deep-green transition-colors"
               >
                 Shop to Support
              </button>
            </div>
          </div>

          <div className="bg-white p-12 md:p-24 text-center border border-gray-100 shadow-sm max-w-5xl mx-auto">
            <h2 className="text-3xl font-heading mb-10 uppercase tracking-widest">Meet the Founder</h2>
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-8 overflow-hidden border-4 border-off-white shadow-inner">
                <img src="https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover" alt="Amara" />
            </div>
            <p className="font-serif text-2xl italic max-w-3xl mx-auto mb-8 leading-relaxed text-gray-800">
              "I wanted to create jewelry that honors my British-Congolese heritage—pieces that look like the future but respect the past. Lab-grown diamonds allow us to enjoy the sparkle without the scar."
            </p>
            <p className="font-heading uppercase text-xs tracking-[0.2em] text-earthy-gold font-bold">— Amara, Founder</p>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Main App ---

const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>("HOME");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  // Simple Router
  const navigate = (view: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    navigate("PDP");
  };

  const handleQuizFinish = (product: Product) => {
    setShowQuiz(false);
    handleProductSelect(product);
  }

  const addToCart = () => {
    setCartCount(c => c + 1);
    // In a real app, this would use a toast notification
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-black bg-white selection:bg-electric-yellow selection:text-black">
      <AnnouncementBar />
      <Navbar onNavigate={navigate} cartCount={cartCount} />

      <main className="flex-grow">
        {currentView === "HOME" && <HomeView onNavigate={navigate} onStartQuiz={() => setShowQuiz(true)} />}
        {currentView === "SHOP" && <ShopView onNavigate={navigate} onSelectProduct={handleProductSelect} />}
        {currentView === "PDP" && selectedProduct && <ProductDetailView product={selectedProduct} addToCart={addToCart} />}
        {currentView === "IMPACT" && <ImpactView onNavigate={navigate} />}
      </main>

      {/* Floating Chat Button */}
      <a 
        href="#" 
        className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center w-14 h-14 group"
        title="Chat with a Stylist"
      >
        <i className="fab fa-whatsapp text-3xl group-hover:rotate-12 transition-transform"></i>
      </a>
      
      <Footer />
      
      {/* Quiz Modal Overlay */}
      {showQuiz && <StyleQuizModal onClose={() => setShowQuiz(false)} onFinish={handleQuizFinish} />}
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
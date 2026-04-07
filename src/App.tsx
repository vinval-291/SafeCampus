import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate,
  useLocation
} from 'react-router-dom';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  User 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, googleProvider } from './firebase';
import { UserProfile } from './types';
import { cn } from './lib/utils';
import { 
  Home, 
  Search, 
  PlusCircle, 
  User as UserIcon, 
  LogOut, 
  ShieldCheck, 
  Menu, 
  X,
  LayoutDashboard,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import LandlordOnboarding from './pages/LandlordOnboarding';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';
import LandlordDashboard from './pages/LandlordDashboard';
import AddPropertyPage from './pages/AddPropertyPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';

// Theme Context
const ThemeContext = React.createContext({ isDark: false, toggle: () => {} });

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const docRef = doc(db, 'users', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        } else {
          const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: 'student',
            createdAt: serverTimestamp(),
          };
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggle: toggleTheme }}>
      <Router>
        <div className={cn(
          "min-h-screen font-sans transition-colors duration-300",
          isDark ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
        )}>
          {/* Navigation */}
          <nav className={cn(
            "sticky top-0 z-50 border-b transition-colors duration-300",
            isDark ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200",
            "backdrop-blur-md"
          )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <span className={cn(
                    "text-xl font-bold tracking-tight",
                    isDark ? "text-white" : "text-slate-900"
                  )}>
                    Safe<span className="text-blue-600">Campus</span>
                  </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                  <Link to="/search" className="text-sm font-medium hover:text-blue-600 transition-colors">Find Housing</Link>
                  {profile?.role === 'landlord' && (
                    <Link to="/landlord-dashboard" className="text-sm font-medium hover:text-blue-600 transition-colors">Dashboard</Link>
                  )}
                  {profile?.role === 'admin' && (
                    <Link to="/admin" className="text-sm font-medium hover:text-blue-600 transition-colors">Admin</Link>
                  )}
                  
                  <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
                  </button>

                  {!user ? (
                    <button 
                      onClick={handleLogin}
                      className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm active:scale-95"
                    >
                      Login / Sign Up
                    </button>
                  ) : (
                    <div className="flex items-center gap-4">
                      <Link to="/profile" className="flex items-center gap-2 group">
                        <img 
                          src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} 
                          alt="Profile" 
                          className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-blue-400 transition-all"
                        />
                        <span className="text-sm font-medium group-hover:text-blue-600 transition-colors">
                          {user.displayName?.split(' ')[0]}
                        </span>
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        title="Logout"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-2">
                  <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
                  </button>
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={cn(
                    "md:hidden border-b overflow-hidden",
                    isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
                  )}
                >
                  <div className="px-4 pt-2 pb-6 space-y-2">
                    <Link 
                      to="/search" 
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600"
                    >
                      Find Housing
                    </Link>
                    {profile?.role === 'landlord' && (
                      <Link 
                        to="/landlord-dashboard" 
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600"
                      >
                        Dashboard
                      </Link>
                    )}
                    {profile?.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      {!user ? (
                        <button 
                          onClick={() => { handleLogin(); setIsMenuOpen(false); }}
                          className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl text-base font-semibold hover:bg-blue-700 transition-all"
                        >
                          Login / Sign Up
                        </button>
                      ) : (
                        <div className="space-y-2">
                          <Link 
                            to="/profile" 
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium hover:bg-slate-50 dark:hover:bg-slate-800"
                          >
                            <UserIcon className="w-5 h-5" /> Profile
                          </Link>
                          <button 
                            onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                            className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <LogOut className="w-5 h-5" /> Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Main Content */}
          <main className="min-h-[calc(100vh-4rem)]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />
              <Route path="/list-property" element={<LandlordOnboarding profile={profile} />} />
              <Route path="/add-property" element={<AddPropertyPage profile={profile} />} />
              <Route path="/landlord-dashboard" element={<LandlordDashboard profile={profile} />} />
              <Route path="/admin" element={<AdminDashboardPage profile={profile} />} />
              <Route path="/profile" element={<ProfilePage profile={profile} user={user} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terms" element={<LegalPage title="Terms of Service" />} />
              <Route path="/privacy" element={<LegalPage title="Privacy Policy" />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className={cn(
            "py-12 border-t transition-colors duration-300",
            isDark ? "bg-slate-950 border-slate-800 text-slate-500" : "bg-slate-900 border-slate-800 text-slate-400"
          )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2 mb-6">
                    <ShieldCheck className="w-8 h-8 text-blue-500" />
                    <span className="text-2xl font-bold tracking-tight text-white">
                      Safe<span className="text-blue-500">Campus</span>
                    </span>
                  </div>
                  <p className="max-w-md leading-relaxed">
                    The most trusted platform for student accommodation. We verify every landlord and property to ensure your safety and peace of mind.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                  <ul className="space-y-4">
                    <li><Link to="/search" className="hover:text-blue-400 transition-colors">Find Housing</Link></li>
                    <li><Link to="/list-property" className="hover:text-blue-400 transition-colors">List Property</Link></li>
                    <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                    <li><Link to="/faq" className="hover:text-blue-400 transition-colors">FAQs</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-6">Legal</h4>
                  <ul className="space-y-4">
                    <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                    <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                    <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
                  </ul>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm">© 2026 SafeCampus. All rights reserved.</p>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-white transition-colors">Twitter</a>
                  <a href="#" className="hover:text-white transition-colors">Instagram</a>
                  <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

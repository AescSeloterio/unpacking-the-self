import { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreditsModal from './components/CreditsModal';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import DimensionsPage from './pages/DimensionsPage';
import DimensionLessonPage from './pages/DimensionLessonPage';
import SelfReflectionPage from './pages/SelfReflectionPage';
import MultimediaPage from './pages/MultimediaPage';
import ReferencesPage from './pages/ReferencesPage';

export default function App() {
    const [nav, setNav] = useState({ page: 'home' });
    const [completed, setCompleted] = useState(new Set());
    const [showCredits, setShowCredits] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDark = useCallback(() => {
        setDarkMode(prev => {
            const next = !prev;
            document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
            return next;
        });
    }, []);

    const navigate = useCallback((next) => {
        setNav(next);
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    const onComplete = useCallback((id) => {
        setCompleted(prev => new Set([...prev, id]));
    }, []);

    // Changing the key remounts the page whenever navigation changes.
    // The inline animation uses the existing fadeIn keyframe in index.css,
    // so every page gets the same smooth entrance without changing its design.
    const pageKey = nav.dimLesson ? `lesson-${nav.dimLesson}` : nav.page;

    return (<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar current={nav} navigate={navigate} darkMode={darkMode} toggleDark={toggleDark}/>
      <main key={pageKey} style={{ flex: 1, animation: 'fadeIn 0.45s ease both' }}>
        {nav.dimLesson ? (<DimensionLessonPage key={nav.dimLesson} dimId={nav.dimLesson} navigate={navigate} completed={completed} onComplete={onComplete}/>) : nav.page === 'home' ? (<HomePage navigate={navigate} completed={completed}/>) : nav.page === 'about' ? (<AboutPage navigate={navigate}/>) : nav.page === 'dimensions' ? (<DimensionsPage navigate={navigate} completed={completed} onComplete={onComplete}/>) : nav.page === 'reflection' ? (<SelfReflectionPage navigate={navigate}/>) : nav.page === 'multimedia' ? (<MultimediaPage navigate={navigate}/>) : (<ReferencesPage />)}
      </main>
      <Footer navigate={navigate} onShowCredits={() => setShowCredits(true)}/>
      {showCredits && <CreditsModal onClose={() => setShowCredits(false)}/>} 
    </div>);
}

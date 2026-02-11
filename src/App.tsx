import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';
import ProfilePage from './pages/ProfilePage';
import ProblemSearchPage from './pages/ProblemSearchPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import PrivacyPage from './pages/PrivacyPage';

function AppContent() {
	const location = useLocation();
	const hideHeader = location.pathname === '/problems' || location.pathname === '/login/success' || location.pathname === '/privacy';

	return (
		<>
			{!hideHeader && <Header />}
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/stats" element={<StatsPage />} />
				<Route path="/profile/:username" element={<ProfilePage />} />
				<Route path="/problems" element={<ProblemSearchPage />} />
				<Route path="/login/success" element={<AuthCallbackPage />} />
				<Route path="/privacy" element={<PrivacyPage />} />
			</Routes>
		</>
	);
}

function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	);
}

export default App;

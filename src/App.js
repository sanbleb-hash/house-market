import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import ProfilePage from './pages/ProfilePAGE.JS';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Explore />} />
				<Route path='/offers' element={<Offers />} />
				<Route path='/profile-page' element={<ProfilePage />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/login' element={<SignIn />} />
			</Routes>
			<NavBar />
		</BrowserRouter>
	);
}

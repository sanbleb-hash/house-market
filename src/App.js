import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ForgotPassord from './components/ForgotPassord';
import NavBar from './components/NavBar';
import Explore from './pages/Explore';
import Offers from './pages/Offers';

import Login from './pages/Login';
import Signup from './pages/SignUp';
import Profilepage from './pages/Profilepage';
import PrivateRouts from './components/PrivateRouts';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Explore />} />
				<Route path='/offers' element={<Offers />} />

				<Route path='/sign-up' element={<Signup />} />
				<Route path='/login' element={<Login />} />
				<Route path='/forgot-password' element={<ForgotPassord />} />

				<Route path='/profile' element={<PrivateRouts />}>
					<Route path='/profile' element={<Profilepage />} />
				</Route>
			</Routes>
			<NavBar />
			<ToastContainer />
		</BrowserRouter>
	);
}

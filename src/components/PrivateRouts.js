import { Navigate, Outlet } from 'react-router-dom';
import { ImSpinner3 } from 'react-icons/im';
import { useAuthStatus } from '../hooks/useAuthStatus';

const PrivateRouts = () => {
	const { loggedIn, checkingStatus } = useAuthStatus();

	if (checkingStatus) {
		<ImSpinner3 className=' items-center text-indigo-500 text-5xl  absolute top-[50%] right-[50%] animate-spin ' />;
	}
	return loggedIn ? <Outlet /> : <Navigate to='/profile' />;
};

export default PrivateRouts;

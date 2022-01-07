import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const Oauth = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const ongoogleSign = async () => {
		try {
			const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// Check for user
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			// If user, doesn't exist, create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			navigate('/profile');
		} catch (error) {
			toast.error('Could not authorize with Google');
		}
	};
	return (
		<div>
			<p className=' flex items-center gap-2'>
				Sign {location.pathname === '/login' ? 'in' : 'up'} with
				<FcGoogle size={30} onClick={ongoogleSign} />
			</p>
		</div>
	);
};

export default Oauth;

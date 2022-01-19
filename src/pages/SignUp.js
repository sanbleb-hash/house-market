import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { db } from '../firebase.config';
import {
	MdPerson,
	MdOutlineSend,
	MdRemoveRedEye,
	MdEmail,
} from 'react-icons/md';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';

const Signup = () => {
	const navigate = useNavigate();

	const [showPassword, setShowpassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		name: '',
	});

	const { email, password, name } = formData;
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const auth = getAuth();

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;

			updateProfile(auth.currentUser, {
				displayName: name,
			});

			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();

			await setDoc(doc(db, 'users', user.uid), formDataCopy);

			navigate('/');
		} catch (error) {
			toast.error('something went wrong ');
		}
	};

	return (
		<div className=' w-screen h-[90vh] '>
			,
			<form
				onSubmit={handleSubmit}
				className=' w-3/4 mx-auto h-3/4 flex items-center justify-center flex-col gap-6'
			>
				<div className=' w-[80%] flex items-center justify-start ring border-blue-300 mx-auto  '>
					{' '}
					<MdPerson size={30} color='gray' />
					<input
						className=' border-0 outline-none w-[90%] pl-6'
						type='text'
						value={name}
						id='name'
						placeholder='Enter Name'
						onChange={onChange}
					/>
				</div>
				<div className=' w-[80%] flex items-center justify-start ring border-blue-300 mx-auto  '>
					{' '}
					<MdEmail size={25} color='gray' />
					<input
						className=' border-0 outline-none w-[90%] pl-6'
						type='email'
						value={email}
						id='email'
						placeholder='Enter email'
						onChange={onChange}
					/>
				</div>
				<div className=' w-[80%] flex items-center justify-start ring border-blue-300 mx-auto  '>
					<input
						className=' border-0 outline-none w-[90%] pl-14'
						type={showPassword ? 'text' : 'password'}
						value={password}
						id='password'
						placeholder='Enter Password'
						onChange={onChange}
					/>
					<MdRemoveRedEye
						size={30}
						color='gray'
						className=' mx-auto cursor-pointer'
						onClick={() => setShowpassword((prevState) => !prevState)}
					/>
				</div>

				<span className=' flex items-center  gap-8 self-start pl-24'>
					sign up{' '}
					<button type='submit'>
						<MdOutlineSend size={30} color='limeGreen' />
					</button>
				</span>
				<Link to='/login'>
					<span className=' text-green-500'>log in istead </span>
				</Link>
				<Oauth />
			</form>
		</div>
	);
};

export default Signup;

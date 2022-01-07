import React, { useState } from 'react';
import { MdEmail, MdOutlineSend, MdRemoveRedEye } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Login = () => {
	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const [showPassword, setShowpassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const auth = getAuth();
			const userCrediential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			if (userCrediential.user) {
				navigate('/profile');
			}
		} catch (error) {
			toast.error('bad request');
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
					<MdEmail size={25} color='gray' />
					<input
						className=' border-0 outline-none w-[90%] pl-6'
						type='email'
						id='email'
						value={email}
						placeholder='enter email'
						onChange={onChange}
					/>
				</div>
				<div className=' w-[80%] flex items-center justify-start ring border-blue-300 mx-auto  '>
					<input
						className=' border-0 outline-none w-[90%] pl-14'
						type={showPassword ? 'text' : 'password'}
						value={password}
						id='password'
						placeholder='enter password'
						autoComplete='false'
						onChange={onChange}
					/>
					<MdRemoveRedEye
						size={30}
						color='gray'
						className=' mx-auto cursor-pointer'
						onClick={() => setShowpassword((prevState) => !prevState)}
					/>
				</div>

				<span className=' text-right text-green-500 self-end pr-24 '>
					<Link to='/forgot-password'>forgot password ?</Link>
				</span>

				<span className=' flex items-center  gap-8 self-start pl-24'>
					sign in{' '}
					<button type='submit'>
						<MdOutlineSend size={30} color='limeGreen' />
					</button>
				</span>
				<Link to='/sign-up'>
					<span className=' text-green-500'>sing up instead </span>
				</Link>
			</form>
		</div>
	);
};

export default Login;

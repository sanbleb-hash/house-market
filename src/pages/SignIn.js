import React, { useState } from 'react';
import { MdPerson, MdOutlineSend, MdRemoveRedEye } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SignIn = () => {
	const [showPassword, setShowpassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	return (
		<div className=' w-screen h-[90vh] '>
			,
			<form className=' w-3/4 mx-auto h-3/4 flex items-center justify-center flex-col gap-6'>
				<div className=' w-[80%] flex items-center justify-start ring border-blue-300 mx-auto  '>
					{' '}
					<MdPerson size={30} color='gray' />
					<input
						className=' border-0 outline-none w-[90%] pl-6'
						type='email'
						value={email}
						placeholder='enter email'
						onChange={(e) => setFormData(e.target.value)}
					/>
				</div>
				<div className=' w-[80%] flex items-center justify-start ring border-blue-300 mx-auto  '>
					<input
						className=' border-0 outline-none w-[90%] pl-14'
						type={showPassword ? 'text' : 'password'}
						value={password}
						placeholder='enter password'
						onChange={(e) => setFormData(e.target.value)}
					/>
					<MdRemoveRedEye
						size={30}
						color='gray'
						className=' mx-auto cursor-pointer'
						onClick={() => setShowpassword((prevState) => !prevState)}
					/>
				</div>
				<span className=' text-right text-green-500 self-end pr-24 '>
					forgot password ?
				</span>
				<span className=' flex items-center  gap-8 self-start pl-24'>
					sign in{' '}
					<button type='submit'>
						<MdOutlineSend size={30} color='limeGreen' />
					</button>
				</span>
				<Link to='/signup'>
					<span className=' text-green-500'>sing up istead </span>
				</Link>
			</form>
		</div>
	);
};

export default SignIn;

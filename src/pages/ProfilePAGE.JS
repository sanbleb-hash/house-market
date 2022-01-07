import React, { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profilepage = () => {
	const auth = getAuth();
	const navegate = useNavigate();

	const [changeDetails, setChangeDetails] = useState(false);
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;

	const onSubmit = () => {};
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<main className=' bg-slate-100 h-[90vw] w-screen  '>
			<div className=' bg-black text-white w-full h-[8vh] flex items-center justify-between px-[15%]'>
				{' '}
				<h1 className=' capitalize'>my profile</h1>
				<button
					className=' border border-gray-600 px-3 font-thin text-sm p-2 bg-gray-900 hover:bg-opacity-40 transition-all delay-100   '
					onClick={() => {
						auth.signOut();
						navegate('/');
					}}
				>
					<p className=' hover:scale-125 transition-all delay-100 ease-in-out	'>
						sigh out
					</p>
				</button>{' '}
			</div>
			<section className=' w-[80vw] min-h-[70vh] mx-auto'>
				<p className=' pt-7'>Personal details</p>
				<p
					className=' text-green-500 text-right'
					onClick={() => {
						changeDetails && onSubmit();
						setChangeDetails((prevState) => !prevState);
					}}
				>
					{changeDetails ? 'done' : 'change'}
				</p>
				<form className=' w-[60vw] bg-slate-200 mx-auto p-8'>
					<input
						onChange={onChange}
						value={name}
						id='name'
						type='text'
						className={
							!changeDetails
								? 'w-3/4 mx-auto pl-6 mb-7 '
								: 'w-3/4 mx-auto pl-6 mb-7'
						}
						disabled={!changeDetails}
						placeholder='name'
					/>
					<input
						onChange={onChange}
						value={email}
						id='email'
						type='email'
						className={
							!changeDetails ? 'w-3/4 mx-auto pl-6 ' : 'w-3/4 mx-auto pl-6'
						}
						disabled={!changeDetails}
						placeholder='email'
					/>
				</form>
			</section>
		</main>
	);
};

export default Profilepage;

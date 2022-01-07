import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import { MdOutlineSend } from 'react-icons/md';
function ForgotPassord() {
	const [email, setEmail] = useState('');

	const onChange = (e) => setEmail(e.target.value);

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success('Email was sent');
		} catch (error) {
			toast.error('Could not send reset email');
		}
	};
	return (
		<div className=' bg-slate-100 min-h-[90vh] w-screen   '>
			<div className=' bg-black text-white w-full h-[8vh] flex items-center justify-between px-[15%] text-center'>
				{' '}
				<h1 className=' capitalize'>forgot password</h1>
			</div>
			<main
				className=' w-[80%] mx-auto flex h-[70vh] my-auto   
         '
			>
				<form
					onSubmit={onSubmit}
					className=' w-3/4 mx-auto h-3/4 flex items-center justify-center flex-col gap-6  bg-slate-200 shadow-lg my-auto '
				>
					<input
						type='email'
						className=' border-0 outline-none w-[90%] pl-6'
						placeholder='Email'
						id='email'
						value={email}
						onChange={onChange}
					/>
					<Link className='forgotPasswordLink' to='/login'>
						Sign In
					</Link>

					<div className='flex gap-3 items-center text-gray-700 font-medium'>
						<div className=''>Send Reset Link</div>
						<button type='submit'>
							<MdOutlineSend size={30} color='limeGreen' />
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}

export default ForgotPassord;

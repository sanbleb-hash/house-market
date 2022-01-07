import React from 'react';
import { useNavigate } from 'react-router-dom';
import rentCategoryImage from '../utils/assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../utils/assets/jpg/sellCategoryImage.jpg';

const Explore = () => {
	const navigate = useNavigate();
	return (
		<main className=' bg-slate-100 w-screen h-[calc(100vh-10vh)]  text-slate-500   '>
			<section className='w-[80vw] mx-auto py-10  '>
				<h1 className='text-xl font-medium'>Explore</h1>
				{/* slider */}
				<div>
					<p className=' capitalize pb-6 text-lgb'>categories</p>
					<div className=' flex items-center justify-between w-full px-5 gap-2 h-[30vh]'>
						<img
							onClick={() => navigate('/category/rent')}
							className=' h-full object-cover cursor-pointer rounded-md  flex-1'
							src={rentCategoryImage}
							alt='house for rent '
						/>
						<img
							onClick={() => navigate('/category/sale')}
							className=' h-full object-cover cursor-pointer rounded-md  flex-1'
							src={sellCategoryImage}
							alt='house for sale'
						/>
					</div>
				</div>
				<div></div>
			</section>
		</main>
	);
};

export default Explore;

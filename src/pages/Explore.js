import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../components/slider';
import rentCategoryImage from '../utils/assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../utils/assets/jpg/sellCategoryImage.jpg';

const Explore = () => {
	const navigate = useNavigate();
	return (
		<main className=' bg-slate-100 w-screen  text-slate-500 min-h-[90vh]  '>
			<section className='w-[80vw] mx-auto py-10 h-full '>
				<h1 className='text-xl font-medium'>Explore</h1>
				<div className='h-[60vh]'>
					<Slider />
				</div>
				<div className='pt-10 min-h-[60vh]'>
					<p className=' capitalize mb-20 text-lgb'>categories</p>
					<div className=' flex flex-col md:flex-row items-center justify-between w-full px-5 gap-2 '>
						<div className='flex-1 relative'>
							<img
								onClick={() => navigate('/category/rent')}
								className=' h-full object-cover cursor-pointer rounded-md  flex-1 '
								src={rentCategoryImage}
								alt='house for rent '
							/>
							<p
								rental='expore houses for rent'
								className=' before:absolute before:py-2 before:px-4
                        before:text-gray-700 before:font-medium before:text-sm before:italic 
								before:bg-white/60 before:top-1/2 before:left-1/2
								before:content-[attr(rental)]'
							></p>
						</div>
						<div className='flex-1 relative'>
							<img
								onClick={() => navigate('/category/sale')}
								className=' h-full object-cover cursor-pointer rounded-md  flex-1'
								src={sellCategoryImage}
								alt='house for sale'
							/>
							<p
								sale='expore houses for sale'
								className=' before:absolute before:py-2 before:px-4
                        before:text-gray-700 before:font-medium before:text-sm before:italic 
								before:bg-white/60 before:top-1/2 before:left-1/2 
								before:content-[attr(sale)]'
							></p>
						</div>
					</div>
				</div>
				<div></div>
			</section>
		</main>
	);
};

export default Explore;

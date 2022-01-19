import {
	MdOutlineExplore,
	MdOutlineLocalOffer,
	MdOutlinePersonOutline,
} from 'react-icons/md';

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
	const active =
		' text-slate-800 border-b-2 border-blue-400 pb-3 transition-all duration-100  ';
	return (
		<footer className=' text-slate-500 w-screen h-[10vh] bg-slate-200 '>
			<nav className='w-[80vw] mx-auto flex items-center justify-between my-auto py-3  '>
				<NavLink
					to='/'
					className={(navData) =>
						navData.isActive ? `active:${active}` : ' text-slate-600'
					}
				>
					<span className=' items-center justify-center gap-1 flex'>
						<MdOutlineExplore size={25} /> explore
					</span>
				</NavLink>

				<NavLink
					to='/offers'
					className={(navData) =>
						navData.isActive ? `active:${active}` : ' text-slate-600'
					}
				>
					<span className=' items-center justify-center gap-1 flex'>
						<MdOutlineLocalOffer size={25} />
						offers
					</span>
				</NavLink>
				<NavLink
					to='/login'
					className={(navData) =>
						navData.isActive ? `active:${active}` : ' text-slate-600'
					}
				>
					<span className=' items-center justify-center gap-1 flex'>
						<MdOutlinePersonOutline size={25} />
						profile
					</span>
				</NavLink>
			</nav>
		</footer>
	);
};

export default NavBar;

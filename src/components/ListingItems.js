import React from 'react';
import { FaBed, FaTrash, FaBath, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ListingItems = ({ listing, id, onEdit, onDelete }) => {
	return (
		<li className='shadow-lg rounded-md  '>
			<Link
				to={`/category/${listing.type}/${id}`}
				className='shadow-lg rounded-md flex items-center md:inline-block md:max-w-[300px] justify-between '
			>
				<img
					src={listing.imgUrls[0]}
					alt={listing.name}
					className=' inline-block w-1/2 h-full md:w-full '
				/>
				<div className='bg-slate-100 p-3 text-gray-800 rounded-b-md'>
					<p className=' font-medium'>{listing.location}</p>
					<span className=' flex items-center justify-between'>
						<p className='font-medium'>{listing.name}</p>

						<p className='text-sm font-semibold underline'>
							$
							{listing.offer
								? listing.discountedPrice
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								: listing.regularPrice
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							{listing.type === 'rent' && ' / Month'}
						</p>
					</span>
					<div className=' flex items-center justify-between pt-5 '>
						<p className=''>
							<FaBed size={28} color='gray' />
							{listing.bedrooms > 1
								? `${listing.bedrooms} Bedrooms`
								: '1 Bedroom'}
						</p>

						<p className='categoryListingInfoText'>
							<FaBath size={18} color='gray' />
							{listing.bathrooms > 1
								? `${listing.bathrooms} Bathrooms`
								: '1 Bathroom'}
						</p>
					</div>
				</div>
				{onDelete && (
					<FaTrash
						className=' self-end m-3'
						fill='rgb(231, 76,60)'
						onClick={() => onDelete(listing.id, listing.name)}
					/>
				)}
			</Link>

			{onEdit && <FaPen size={30} color='gray' onClick={() => onEdit(id)} />}
		</li>
	);
};

export default ListingItems;

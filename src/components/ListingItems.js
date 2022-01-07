import React from 'react';
import { FaBed, FaTrash, FaBath, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ListingItems = ({ listing, id, onEdit, onDelete }) => {
	return (
		<li className='categoryListing'>
			<Link
				to={`/category/${listing.type}/${id}`}
				className='categoryListingLink'
			>
				<img
					src={listing.imgUrls[0]}
					alt={listing.name}
					className='categoryListingImg'
				/>
				<div className='categoryListingDetails'>
					<p className='categoryListingLocation'>{listing.location}</p>
					<p className='categoryListingName'>{listing.name}</p>

					<p className='categoryListingPrice'>
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
					<div className='categoryListingInfoDiv'>
						<FaBed size={30} color='gray' />
						<p className=''>
							{listing.bedrooms > 1
								? `${listing.bedrooms} Bedrooms`
								: '1 Bedroom'}
						</p>
						<FaBath size={30} color='gray' />
						<p className='categoryListingInfoText'>
							{listing.bathrooms > 1
								? `${listing.bathrooms} Bathrooms`
								: '1 Bathroom'}
						</p>
					</div>
				</div>
			</Link>

			{onDelete && (
				<FaTrash
					className=''
					fill='rgb(231, 76,60)'
					onClick={() => onDelete(listing.id, listing.name)}
				/>
			)}

			{onEdit && <FaPen size={30} color='gray' onClick={() => onEdit(id)} />}
		</li>
	);
};

export default ListingItems;

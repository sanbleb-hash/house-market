import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { FaShareAlt } from 'react-icons/fa';
import Loading from '../components/Loading';

const Listing = () => {
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(true);
	const [shareLink, setShareLink] = useState(false);

	const navigate = useNavigate();
	const params = useParams();
	const auth = getAuth();

	useEffect(() => {
		const fetchListing = async () => {
			const docRef = doc(db, 'listings', params.listingId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				setListing(docSnap.data());
				setLoading(false);
			}
		};

		fetchListing();
	}, [navigate, params.listingId]);
	if (loading) {
		return <Loading />;
	}

	return (
		<main className=' w-screen min-h-[90vh] bg-slate-100 '>
			<div className=' w-[80vw] mx-auto '>
				{/* slider */}
				<div className='py-5 mx-7 flex flex-col  justify-between items-end   '>
					<FaShareAlt
						className='cursor-pointer mr-7'
						color='gray'
						size={25}
						onClick={() => {
							navigator.clipboard.writeText(window.location.href);
							setShareLink(true);
							setTimeout(() => setShareLink(false), 2000);
						}}
					/>
					<span className='text-green-500'>{shareLink && 'coppied'}</span>
				</div>
				<div className='flex flex-col items-start '>
					<p className='text-2xl py-4 text-gray-600'>
						{listing.name} -
						<span className=' font-semibold underline text-gray-800 italic'>
							{' '}
							$
							{listing.offer
								? listing.discountedPrice
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
								: listing.regularPrice
										.toString()
										.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						</span>
					</p>
					<p className=' font-medium'>{listing.location}</p>
					<span className=' flex items-center gap-4 py-4'>
						<p className='py-1 text-sm px-5 bg-green-300 rounded-full '>
							For {listing.type === 'rent' ? 'Rent' : 'Sale'}
						</p>
						{listing.offer && (
							<p className=' px-5 text-sm py-1 bg-black text-white rounded-full '>
								save ${listing.regularPrice - listing.discountedPrice}
							</p>
						)}
					</span>
					<ul className='listingDetailsList'>
						<li>
							{listing.bedrooms > 1
								? `${listing.bedrooms} Bedrooms`
								: '1 Bedroom'}
						</li>
						<li>
							{listing.bathrooms > 1
								? `${listing.bathrooms} Bathrooms`
								: '1 Bathroom'}
						</li>
						<li>{listing.parking && 'Parking Spot'}</li>
						<li>{listing.furnished && 'Furnished'}</li>
					</ul>

					<p className=' py-4 font-medium '>Location</p>

					<div className='leafletContainer'>
						<MapContainer
							style={{ height: '100%', width: '100%' }}
							center={[listing.geolocation.lat, listing.geolocation.lng]}
							zoom={13}
							scrollWheelZoom={false}
						>
							<TileLayer
								attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
							/>

							<Marker
								position={[listing.geolocation.lat, listing.geolocation.lng]}
							>
								<Popup>{listing.location}</Popup>
							</Marker>
						</MapContainer>
					</div>

					{auth.currentUser?.uid !== listing.userRef && (
						<Link
							to={`/contact/${listing.userRef}?listingName=${listing.name}`}
							className='bg-green-600 text-white py-1 sm:py-2 px-4 text-xs sm:text-sm  sm:px-7 hover:opacity-90 text-center'
						>
							Contact Landlord
						</Link>
					)}
				</div>
			</div>
		</main>
	);
};

export default Listing;

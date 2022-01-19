import { ImSpinner3 } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ListingItems from '../components/ListingItems';

const Offers = () => {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);
	const [lastFetchedListing, setLastFetchedListing] = useState(null);

	const params = useParams();

	useEffect(() => {
		const fetchListings = async () => {
			try {
				// Get reference
				const listingsRef = collection(db, 'listings');

				// Create a query
				const q = query(
					listingsRef,
					where('offer', '==', true),
					orderBy('timestamp', 'desc'),
					limit(10)
				);

				// Execute query
				const querySnap = await getDocs(q);

				const lastVisible = querySnap.docs[querySnap.docs.length - 1];
				setLastFetchedListing(lastVisible);

				const listings = [];

				querySnap.forEach((doc) => {
					return listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});

				setListings(listings);
				setLoading(false);
			} catch (error) {
				toast.error('Could not fetch listings');
			}
		};

		fetchListings();
	}, []);

	// Pagination / Load More
	const onFetchMoreListings = async () => {
		try {
			// Get reference
			const listingsRef = collection(db, 'listings');

			// Create a query
			const q = query(
				listingsRef,
				where('type', '==', params.categoryName),
				orderBy('timestamp', 'desc'),
				startAfter(lastFetchedListing),
				limit(10)
			);

			// Execute query
			const querySnap = await getDocs(q);

			const lastVisible = querySnap.docs[querySnap.docs.length - 1];
			setLastFetchedListing(lastVisible);

			const listings = [];

			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			setListings((prevState) => [...prevState, ...listings]);
			setLoading(false);
		} catch (error) {
			toast.error('Could not fetch listings');
		}
	};

	return (
		<div className=' w-screen  min-h-[90vh] '>
			<p className=' text-center text-2xl font-semibold text-gray-300 capitalize p-3 bg-black'>
				offers
			</p>
			{loading ? (
				<ImSpinner3 className=' items-center text-indigo-500 text-5xl  absolute top-[50%] right-[50%] animate-spin ' />
			) : listings && listings.length > 0 ? (
				<>
					<main className=' w-[80vw] mx-auto pt-10 '>
						<ul className='flex items-center justify-between md:max-w-[350px]'>
							{listings.map((listing) => (
								<ListingItems
									listing={listing.data}
									id={listing.id}
									key={listing.id}
								/>
							))}
						</ul>
					</main>

					<br />
					<br />
					{lastFetchedListing && (
						<p
							className='px-5 py-2 bg-blue-300 text-gray-700 inline-block text-sm'
							onClick={onFetchMoreListings}
						>
							Load More
						</p>
					)}
				</>
			) : (
				<p>No offers so far</p>
			)}
		</div>
	);
};

export default Offers;

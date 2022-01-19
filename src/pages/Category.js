import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import Loading from '../components/Loading';

function Category() {
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
					where('type', '==', params.categoryName),
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
	}, [params.categoryName]);

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
			console.log(error);
			toast.error('Could not fetch listings');
		}
	};

	return (
		<div className=' w-screen min-h-[90vh] '>
			<p className=' text-center text-2xl font-semibold text-gray-300 capitalize p-3 bg-black'>
				{params.categoryName === 'rent' ? 'places for rent' : 'places for sale'}
			</p>
			{loading ? (
				<Loading />
			) : listings && listings.length > 0 ? (
				<>
					<main className=' w-[80vw] mx-auto min-h-screen '>
						<ul className='flex flex-col md:flex-row items-center justify-between gap-4 pt-[10vh]  '>
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
				<p className=' flex items-end text-gray-500 text-lg justify-center pt-20'>
					No listings for {params.categoryName}{' '}
					<Link className='font-semibold underline text-blue-700 pl-5' to='/'>
						go back to expore{' '}
					</Link>{' '}
				</p>
			)}
		</div>
	);
}

export default Category;

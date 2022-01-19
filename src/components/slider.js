import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Loading from './Loading';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Slider() {
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchListings = async () => {
			const listingsRef = collection(db, 'listings');
			const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5));
			const querySnap = await getDocs(q);

			let listings = [];

			querySnap.forEach((doc) => {
				return listings.push({
					id: doc.id,
					data: doc.data(),
				});
			});

			setListings(listings);
			setLoading(false);
		};

		fetchListings();
	}, []);

	if (loading) {
		return <Loading />;
	}

	if (listings.length === 0) {
		return <></>;
	}

	return (
		listings && (
			<>
				<p className=''>Recommended</p>

				<Swiper
					slidesPerView={1}
					pagination={{ clickable: true }}
					onAutoplay={true}
				>
					{listings.map(({ data, id }) => (
						<SwiperSlide
							key={id}
							onClick={() => navigate(`/category/${data.type}/${id}`)}
							data-swiper-autoplay='2000'
						>
							<div
								style={{
									background: `url(${data.imgUrls[0]}) center no-repeat`,
									backgroundSize: 'cover',
								}}
								className='h-[60vh] flex items-center justify-center flex-col '
							>
								<span className=' bg-white/40 px-9 py-4 text-red-900 font-medium text-xl'>
									<p className='text-center'>{data.name}</p>
									<p className='text-center'>
										${data.discountedPrice ?? data.regularPrice}{' '}
										{data.type === 'rent' && '/ month'}
									</p>
								</span>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		)
	);
}

export default Slider;

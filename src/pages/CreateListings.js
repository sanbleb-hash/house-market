import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

function CreateListings() {
	// eslint-disable-next-line
	const [geolocationEnabled, setGeolocationEnabled] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		type: 'rent',
		name: '',
		bedrooms: 1,
		bathrooms: 1,
		parking: false,
		furnished: false,
		address: '',
		offer: false,
		regularPrice: 0,
		discountedPrice: 0,
		images: {},
		latitude: 0,
		longitude: 0,
	});

	const {
		type,
		name,
		bedrooms,
		bathrooms,
		parking,
		furnished,
		address,
		offer,
		regularPrice,
		discountedPrice,
		images,
		latitude,
		longitude,
	} = formData;

	const auth = getAuth();
	const navigate = useNavigate();
	const isMounted = useRef(true);

	useEffect(() => {
		if (isMounted) {
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setFormData({ ...formData, userRef: user.uid });
				} else {
					navigate('/sign-in');
				}
			});
		}

		return () => {
			isMounted.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMounted]);

	const onSubmit = async (e) => {
		e.preventDefault();

		setLoading(true);

		if (discountedPrice >= regularPrice) {
			setLoading(false);
			toast.error('Discounted price needs to be less than regular price');
			return;
		}

		if (images.length > 6) {
			setLoading(false);
			toast.error('Max 6 images');
			return;
		}

		let geolocation = {};
		let location;

		if (geolocationEnabled) {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
			);

			const data = await response.json();

			geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
			geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

			location =
				data.status === 'ZERO_RESULTS'
					? undefined
					: data.results[0]?.formatted_address;

			if (location === undefined || location.includes('undefined')) {
				setLoading(false);
				toast.error('Please enter a correct address');
				return;
			}
		} else {
			geolocation.lat = latitude;
			geolocation.lng = longitude;
		}

		// Store image in firebase
		const storeImage = async (image) => {
			return new Promise((resolve, reject) => {
				const storage = getStorage();
				const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

				const storageRef = ref(storage, 'images/' + fileName);

				const uploadTask = uploadBytesResumable(storageRef, image);

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused');
								break;
							case 'running':
								console.log('Upload is running');
								break;
							default:
								break;
						}
					},
					(error) => {
						reject(error);
					},
					() => {
						// Handle successful uploads on complete
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							resolve(downloadURL);
						});
					}
				);
			});
		};

		const imgUrls = await Promise.all(
			[...images].map((image) => storeImage(image))
		).catch(() => {
			setLoading(false);
			toast.error('Images not uploaded');
			return;
		});

		const formDataCopy = {
			...formData,
			imgUrls,
			geolocation,
			timestamp: serverTimestamp(),
		};

		formDataCopy.location = address;
		delete formDataCopy.images;
		delete formDataCopy.address;
		!formDataCopy.offer && delete formDataCopy.discountedPrice;

		const docRef = await addDoc(collection(db, 'listings'), formDataCopy);
		setLoading(false);
		toast.success('Listing saved');
		navigate(`/category/${formDataCopy.type}/${docRef.id}`);
	};

	const onMutate = (e) => {
		let boolean = null;

		if (e.target.value === 'true') {
			boolean = true;
		}
		if (e.target.value === 'false') {
			boolean = false;
		}

		// Files
		if (e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				images: e.target.files,
			}));
		}

		// Text/Booleans/Numbers
		if (!e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: boolean ?? e.target.value,
			}));
		}
	};

	if (loading) {
		return <h3>loading...</h3>;
	}

	return (
		<div className=' bg-slate-100 min-h-[90vh] w-screen  '>
			<header>
				<p className=' bg-black text-white w-full h-[8vh] text-center py-2 fixed'>
					Create a Listing
				</p>
			</header>

			<main className=' md:pl-40 py-14 w-[80vw] min-h-[70vh] mx-auto'>
				<form onSubmit={onSubmit}>
					<label className='py-7 font-semibold'>Sell / Rent</label>
					<div className='flex items-center gap-3'>
						<button
							type='button'
							className={
								type === 'sale'
									? 'bg-green-500 text-gray-500 px-3'
									: ' bg-gray-500 text-gray-100 px-3'
							}
							id='type'
							value='sale'
							onClick={onMutate}
						>
							Sell
						</button>
						<button
							type='button'
							className={
								type === 'rent'
									? 'bg-green-500 text-gray-500 px-3'
									: 'bg-gray-500 text-gray-100 px-3'
							}
							id='type'
							value='rent'
							onClick={onMutate}
						>
							Rent
						</button>
					</div>

					<div className=' flex items-start flex-col'>
						<label className=''>Name</label>
						<input
							className='formInputName'
							type='text'
							id='name'
							value={name}
							onChange={onMutate}
							maxLength='32'
							minLength='10'
							required
						/>
					</div>
					<div className='flex items-start gap-5 '>
						<div className='flex flex-col justify-between gap-3  items-start'>
							<label className='formLabel'>Bedrooms</label>
							<input
								className='formInputSmall'
								type='number'
								id='bedrooms'
								value={bedrooms}
								onChange={onMutate}
								min='1'
								max='50'
								required
							/>
						</div>
						<div className='flex flex-col justify-between gap-3  items-start'>
							<label className='formLabel'>Bathrooms</label>
							<input
								className='formInputSmall'
								type='number'
								id='bathrooms'
								value={bathrooms}
								onChange={onMutate}
								min='1'
								max='50'
								required
							/>
						</div>
					</div>

					<div className=' my-5'>
						<label className=' text-gray-500 block  '>Parking spot</label>
						<button
							className={
								parking
									? 'bg-green-500 text-gray-500 px-3'
									: 'bg-gray-500 text-green-500 px-3'
							}
							type='button'
							id='parking'
							value={true}
							onClick={onMutate}
							min='1'
							max='50'
						>
							Yes
						</button>
						<button
							className={
								!parking && parking !== null
									? 'bg-green-500 text-gray-500 px-3 '
									: 'bg-gray-500 text-green-500 ml-5 px-3'
							}
							type='button'
							id='parking'
							value={false}
							onClick={onMutate}
						>
							No
						</button>
					</div>

					<div className=' pb-2 text-gray-500   '>
						<label className='mt-6 block text-gray-500 '>Furnished</label>
						<button
							className={
								furnished
									? 'bg-green-500 text-gray-500 px-3 mr-3 '
									: 'bg-gray-500 text-green-500 px-3 '
							}
							type='button'
							id='furnished'
							value={true}
							onClick={onMutate}
						>
							Yes
						</button>
						<button
							className={
								!furnished && furnished !== null
									? 'bg-green-500 text-gray-500 px-3 inline'
									: 'bg-gray-500 text-green-500 px-3 inline'
							}
							type='button'
							id='furnished'
							value={false}
							onClick={onMutate}
						>
							No
						</button>
					</div>
					<div className=' flex flex-col pb-3'>
						<label className='py-2'>Address</label>
						<input
							className=' max-w-[200px] '
							type='text'
							id='address'
							value={address}
							onChange={onMutate}
							required
						/>

						{!geolocationEnabled && (
							<div className='formLatLng flex'>
								<div>
									<label className='formLabel'>Latitude</label>
									<input
										className='formInputSmall'
										type='number'
										id='latitude'
										value={latitude}
										onChange={onMutate}
										required
									/>
								</div>
								<div>
									<label className='formLabel'>Longitude</label>
									<input
										className='formInputSmall'
										type='number'
										id='longitude'
										value={longitude}
										onChange={onMutate}
										required
									/>
								</div>
							</div>
						)}
					</div>

					<div className='  '>
						<label className='block text-gray-600'>Offer</label>
						<button
							className={
								offer
									? 'bg-green-500 text-gray-500 mr-2 px-3 inline'
									: 'bg-gray-500 text-green-500 px-3 inline'
							}
							type='button'
							id='offer'
							value={true}
							onClick={onMutate}
						>
							Yes
						</button>
						<button
							className={
								!offer && offer !== null
									? 'bg-green-500 text-gray-500 ml-3 px-3 inline'
									: 'bg-gray-500 text-green-500 ml-3 px-3 inline'
							}
							type='button'
							id='offer'
							value={false}
							onClick={onMutate}
						>
							No
						</button>
					</div>

					<label className=' py-2 block text-gray-600'>Regular Price</label>
					<div className='max-w-[250px]'>
						<input
							className=' max-w-[300px] inline-block'
							type='number'
							id='regularPrice'
							value={regularPrice}
							onChange={onMutate}
							min='50'
							max='750000000'
							required
						/>
						{type === 'rent' && <p className='formPriceText'>$ / Month</p>}
					</div>

					{offer && (
						<>
							<label className='formLabel'>Discounted Price</label>
							<input
								className='formInputSmall'
								type='number'
								id='discountedPrice'
								value={discountedPrice}
								onChange={onMutate}
								min='50'
								max='750000000'
								required={offer}
							/>
						</>
					)}

					<label className='pb-3 pt-6  text-gray-600'>Images</label>
					<p className=' text-sm'>The first image will be the cover (max 6).</p>
					<div className=' flex items-center justify-between'>
						<input
							className='formInputFile'
							type='file'
							id='images'
							onChange={onMutate}
							max='6'
							accept='.jpg,.png,.jpeg'
							multiple
							required
						/>
						<button
							type='submit'
							className=' bg-green-400 text-gray-100 px-5 py-2 hover:bg-green-700 transition-all duration-75 shadow-lg ease-in-out p-10 '
						>
							Create Listing
						</button>
					</div>
				</form>
			</main>
		</div>
	);
}

export default CreateListings;

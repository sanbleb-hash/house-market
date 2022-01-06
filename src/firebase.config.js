// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFireStore } from 'firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyCnwYovb9KVE8i-cR1xSSspgxOc13Cxf_E',
	authDomain: 'house-marketplace-e3622.firebaseapp.com',
	projectId: 'house-marketplace-e3622',
	storageBucket: 'house-marketplace-e3622.appspot.com',
	messagingSenderId: '941076890696',
	appId: '1:941076890696:web:00b2252bc06d3b2102047d',
	measurementId: 'G-5F6DK1YBZ2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFireStore();

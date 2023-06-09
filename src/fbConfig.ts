import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
	apiKey: 'AIzaSyDTX6VDrnGiGMpHOlxbdi4KbKFMd_YPSi8',
	authDomain: 'whoget-assets.firebaseapp.com',
	projectId: 'whoget-assets',
	storageBucket: 'whoget-assets.appspot.com',
	messagingSenderId: '1071190608503',
	appId: '1:1071190608503:web:26ada9bcdd6eddfb7e9472',
	measurementId: 'G-C8MJGD6LD5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth(app);
export default storage;

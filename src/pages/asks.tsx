import Image from 'next/image';
import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import storage from '../fbConfig';
import { getDownloadURL, ref } from 'firebase/storage';

const asks = () => {
	return (
		<div>
			<h1 className="text-xl font-medium text-orange-500">Asks</h1>
			<div className="user-cards">
				<User user={''} />
			</div>
		</div>
	);
};

export default asks;

const User = (props: { user: any }) => {
	const [carUrl, setCarUrl] = useState('');
	const carRef = ref(storage, 'images/car1.jpg');

	getDownloadURL(carRef)
		.then((url) => {
			setCarUrl(url);
			console.log(url);
		})
		.catch((error) => {
			console.log('An error occured!');
		});

	return (
		<div>
			<div>
				<div>icon</div>
				<div>
					<h1>Kimboh Lovette</h1>
					<p>
						I need Google Pixel 4X 128GB to truck with my Samsung
						Note 22 and add cash.
					</p>
				</div>
				<div className="relative">
					{carUrl !== '' && <Image src={carUrl} alt='Car needed' width={300} height={300} />}
					<button className="absolute">
						<HiChevronLeft />
					</button>
					<button className="absolute">
						<HiChevronRight />
					</button>
				</div>
				<div>
					<span>Location</span>
					<span>Yaounde</span>
				</div>
				<button>Hide/Unhide</button>
			</div>
		</div>
	);
};

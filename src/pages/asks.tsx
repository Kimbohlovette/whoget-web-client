import Image from 'next/image';
import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import storage from '../fbConfig';
import { getDownloadURL, ref } from 'firebase/storage';

const asks = () => {
	return (
		<div>
			<div className="user-cards flex flex-col gap-y-4">
				<User user={''} />
				<User user={''} />
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
	const [avatarUrl, setAvatarUrl] = useState('');
	const avatarRef = ref(storage, 'images/eyong_vanisiah.jpg');

	getDownloadURL(avatarRef)
		.then((url) => {
			setAvatarUrl(url);
			console.log(url);
		})
		.catch((error) => {
			console.log('An error occured!');
		});

	return (
		<div className="p-8 rounded-md bg-white hover:bg-indigo-100">
			<div className="flex justify-start items-start gap-3 pt-4">
				<div className="border overflow-hidden rounded-full">
					<Image
						src={avatarUrl}
						height={50}
						width={50}
						alt="eyong_vanisiah"
						className="object-cover object-center aspect-square w-16"
					/>
				</div>
				<div>
					<h1 className="font-semibold text-primary">
						Kimboh Lovette
					</h1>
					<p className="text-slate-600 text-sm">
						I need Google Pixel 4X 128GB to truck with my Samsung
						Note 22 and add cash.
					</p>
				</div>
			</div>

			<div className="relative px-5 py-4 mt-5 w-fit flex flex-row gap-2">
				{carUrl !== '' && (
					<Image
						src={carUrl}
						alt="Car needed"
						width={200}
						height={100}
						className="aspect-video w-full max-w-xs border rounded-sm"
					/>
				)}
				<button className="absolute -left-4 top-1/2 rounded-full hover:bg-slate-200 p-1 shadow-inner">
					<HiChevronLeft className="text-2xl text-slate-500" />
				</button>
				<button className="absolute -right-4 top-1/2 rounded-full hover:bg-slate-200 p-1">
					<HiChevronRight className="text-2xl text-slate-500" />
				</button>
			</div>
			<div className="flex flex-row gap-x-8 text-sm">
				<div className="text-slate-600 font-light">
					<span>Location</span>
				</div>
				<div className="font-semibold text-primary">
					<span>Yaounde</span>
				</div>
			</div>
			<div className="py-4">
				<button className="py-1 px-8 bg-primary text-white font-semibold text-sm rounded-md hover:bg-indigo-950">
					Hide
				</button>
			</div>
		</div>
	);
};

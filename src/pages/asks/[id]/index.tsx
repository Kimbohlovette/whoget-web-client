import { ref, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight, HiX } from 'react-icons/hi';
import Image from 'next/image';
import storage from '@/fbConfig';
const AskDetails = () => {
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
		<div className="relative">
			<button className="absolute top-2 left-8 hover:bg-slate-200 rounded-full p-4 text-slate-600">
				<HiX />
			</button>
			<div className="p-16 rounded-sm bg-white mx-auto">
				<div className="flex flex-row gap-4">
					<div className="border overflow-hidden rounded-full h-fit">
						<Image
							src={avatarUrl}
							height={50}
							width={50}
							alt="eyong_vanisiah"
							className="object-cover object-center aspect-square w-16"
						/>
					</div>
					<div>
						<div>
							<h1 className="font-light text-slate-400s">
								Kimboh Lovette
							</h1>
							<p className="text-slate-600 text-sm">
								I need Google Pixel 4X 128GB to truck with my
								Samsung Note 22 and add cash.
							</p>
						</div>

						<div className="relative py-4 mt-5 w-fit flex flex-row gap-2">
							{carUrl !== '' && (
								<Image
									src={carUrl}
									alt="Car needed"
									width={100}
									height={100}
									className="aspect-[6/4] border rounded-sm h-32 w-auto"
								/>
							)}
							{carUrl !== '' && (
								<Image
									src={carUrl}
									alt="Car needed"
									width={100}
									height={100}
									className="aspect-[6/4] border rounded-sm h-32 w-auto"
								/>
							)}
							<button className="absolute -left-12 top-1/3 rounded-full hover:bg-slate-200 p-1">
								<HiChevronLeft className="text-2xl text-slate-500" />
							</button>
							<button className="absolute -right-12 top-1/3 rounded-full hover:bg-slate-200 p-1">
								<HiChevronRight className="text-2xl text-slate-500" />
							</button>
						</div>
						<div className="flex flex-row gap-x-8 text-sm">
							<div className="text-slate-600 font-extralight">
								<span>Location</span>
							</div>
							<div className="font-semibold text-slate-700">
								<span>Yaounde</span>
							</div>
						</div>
						<div className="py-4">
							<button className="py-1 px-8 bg-primary-500 text-white font-medium text-sm rounded-md hover:bg-indigo-950">
								Hide
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AskDetails;

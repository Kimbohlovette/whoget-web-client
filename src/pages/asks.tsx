import Image from 'next/image';
import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import storage from '../fbConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import Link from 'next/link';
import UserDetals from '@/components/UserDetails';

const asks = () => {
	return (
		<div>
			<div className="user-cards flex flex-col gap-y-4">
				<UserDetals />
			</div>
			<div className="flex justify-center items-center my-5">
				<div className="flex flex-row gap-4">
					<button className="text-slate-600 hover:underline">
						Prev
					</button>
					<ul className="flex flex-row gap-5 [&>*_li]:rounded-sm [&>*_li:active]:text-secondary [&>*_li]:p-2">
						<Link href={'#'}>
							<li className="text-secondary">1</li>
						</Link>
						<Link href={'#'}>
							<li>2</li>
						</Link>
						<Link href={'#'}>
							<li>3</li>
						</Link>
					</ul>
					<button className="text-slate-600 hover:underline">
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default asks;

const Ask = (props: { ask: any }) => {
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
	);
};

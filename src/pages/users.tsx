import storage from '@/fbConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import Image from 'next/legacy/image';
import { MdOutlineLocationOn } from 'react-icons/md';
import Link from 'next/link';

const users = () => {
	return (
		<div>
			<div className="flex flex-col gap-y-4">
				<User />
				<User />
				<User />
				<User />
				<User />
				<User />
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
const User = () => {
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
		<div className="p-5 rounded-md bg-white hover:bg-indigo-100 cursor-pointer">
			<div className="flex flex-row justify-between items-center gap-2">
				<div className="flex justify-start items-start gap-4">
					<div className="border overflow-hidden rounded-full w-16  aspect-square">
						<Image
							src={avatarUrl}
							height={200}
							width={200}
							alt="eyong_vanisiah"
							className="object-cover object-center h-full w-full"
						/>
					</div>
					<div className="mt-2">
						<h1 className="font-semibold text-primary text-lg">
							Kimboh Lovette
						</h1>
						<p className="flex flex-row gap-2 items-center justify-start">
							<MdOutlineLocationOn className="inline text-secondary" />
							<span className="text-slate-600 font-medium">
								Bamenda
							</span>
						</p>
						<p className="mt-3 text-slate-500 text-sm max-w-2xl">
							Placed 15 asks in 63 days.
						</p>
					</div>
				</div>
				<div>
					<button className="px-8 py-1 rounded-md bg-primary hover:bg-indigo-900 font-medium backdrop-blur-sm text-white text-sm">
						Ban
					</button>
				</div>
			</div>
		</div>
	);
};

export default users;

import storage from '@/fbConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import Image from 'next/legacy/image';
import { MdOutlineLocationOn } from 'react-icons/md';

const users = () => {
	return (
		<div className="flex flex-col gap-y-4">
			<User />
			<User />
			<User />
			<User />
			<User />
			<User />
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
					<p className="text-slate-500 text-sm max-w-2xl">
						Placed 15 asks in 63 days.
					</p>
					<div className="pt-4 flex flex-row gap-2 items-center justify-start">
						<MdOutlineLocationOn className="inline text-secondary" />
						<span className="text-slate-600 font-medium">
							Bamenda
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default users;

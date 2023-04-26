import storage from '@/fbConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import { MdOutlineLocationOn } from 'react-icons/md';
import Link from 'next/link';
import asks from './asks';

const Users = () => {
	const [users, setUsers] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	useEffect(() => {
		setError(false);
		setIsLoading(true);
		fetch(
			'https://whoget-app-server.onrender.com/api/v1/users?page=1&limit=5',
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setUsers(data.users);
			})
			.catch((error) => {
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	return (
		<div>
			{error && (
				<div className="text-red-500 py-5 text-sm">
					An error occurred while fetching data. Refresh the page
					again.
				</div>
			)}
			{isLoading && <div>Loading data ...</div>}
			{!users ? (
				<div>Nothing to show</div>
			) : (
				<div className="flex flex-col gap-y-4">
					{users.map((user: any, key: any) => (
						<User key={key} user={user} />
					))}
				</div>
			)}
		</div>
	);
};

const users = () => {
	return (
		<div>
			<Users />
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
const User = (props: { user: any }) => {
	const [avatarUrl, setAvatarUrl] = useState('');
	const avatarRef = ref(storage, 'images/eyong_vanisiah.jpg');

	getDownloadURL(avatarRef)
		.then((url) => {
			setAvatarUrl(url);
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
							src={props.user.profileImage}
							height={200}
							width={200}
							alt="eyong_vanisiah"
							className="object-cover object-center h-full w-full"
						/>
					</div>
					<div className="mt-2">
						<h1 className="font-semibold text-primary text-lg">
							{props.user.name}
						</h1>
						<p className="flex flex-row gap-2 items-center justify-start">
							<span className="text-slate-400 text-xs font-medium">
								{props.user.email}
							</span>
						</p>
						<p className="mt-3 text-slate-600 text-sm max-w-2xl">
							Placed 15 asks in 63 days.
						</p>
					</div>
				</div>
				<div>
					<button className="px-8 py-1 rounded-md bg-primary hover:bg-indigo-900 font-medium backdrop-blur-sm text-white text-sm">
						{props.user.status === 'active' ? 'Ban' : 'Unban'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default users;

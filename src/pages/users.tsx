import storage from '@/fbConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import Image from 'next/legacy/image';
import { MdOutlineLocationOn } from 'react-icons/md';
import Link from 'next/link';
import asks from './asks';

const Users = () => {
	const [users, setUsers] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [page, setPage] = useState(1);
	const fetchData = async (page: number, limit: number) => {
		const response = await fetch(
			`https://whoget-app-server.onrender.com/api/v1/users?page=${page}&limit=${limit}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		return (await response.json()).users;
	};

	const handlePrev = () => {
		setPage((page) => {
			if (page < 2) {
				return 1;
			} else {
				return page - 1;
			}
		});
	};

	const handleNext = () => {
		setPage((page) => page + 1);
	};

	useEffect(() => {
		setError(false);
		setIsLoading(true);
		fetchData(page, 10)
			.then((users) => {
				setUsers(users);
			})
			.catch((error) => {
				setError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [page]);
	return (
		<div>
			{error && (
				<div className="text-red-500 py-5 text-sm">
					An error occurred while fetching data. Refresh the page
					again.
				</div>
			)}
			{isLoading && <div className="text-center">Fetching users ...</div>}
			{users.length === 0 && !isLoading ? (
				<div className="text-center">Nothing to show</div>
			) : (
				<div className="flex flex-col gap-y-4">
					{users.map((user: any, key: any) => (
						<User key={key} user={user} />
					))}
				</div>
			)}
			{!error && !isLoading && (
				<div className="mt-5 flex justify-center flex-row divide-x [&>*]:px-5">
					<button
						onClick={handlePrev}
						className="text-slate-600 hover:underline underline-offset-2"
					>
						Prev
					</button>
					<button
						onClick={handleNext}
						className="text-slate-600 hover:underline underline-offset-2"
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

const users = () => {
	return (
		<div>
			<Users />
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
					<div>
						<h1 className="font-medium text-slate-700">
							{props.user.name}
						</h1>
						<p className="flex flex-row gap-2 items-center justify-start">
							<span className="text-slate-400 text-sm font-mediuma">
								{props.user.email}
							</span>
						</p>
						<p className="mt-3 text-slate-600 text-sm max-w-2xl">
							Placed 15 asks in 63 days.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default users;

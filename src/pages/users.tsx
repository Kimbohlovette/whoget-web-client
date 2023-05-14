import storage from '@/fbConfig';
import { ref, getDownloadURL } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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
				<div className="my-16">
					<table className="table-auto my-5 [&>*]:divide-y w-full">
						<thead>
							<tr className="text-sm sm:text-base [&>*]:py-1 text-slate-800 text-left">
								<th>Name</th>
								<th className="hidden sm:table-cell">
									Phone number
								</th>
								<th className="hidden lg:table-cell">
									No. of Asks
								</th>
								<th className="hidden lg:table-cell">
									Responses Reseived
								</th>
								<th className="hidden md:table-cell">
									Location
								</th>
								<th className="hidden sm:table-cell">
									No. of Reports
								</th>

								<th>Action</th>
							</tr>
						</thead>
						<tbody className="text-sm">
							{users.map((u: any, key: any) => (
								<User key={key} user={u} />
							))}
						</tbody>
					</table>
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
	const navigation = useRouter();
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
		<tr
			className="text-slate-600 py-5 hover:bg-slate-200 cursor-pointer"
			onClick={() => {
				navigation.push('/');
			}}
		>
			<td>
				<div className="max-w-xs py-5 pl-2">
					<div className="flex flex-row gap-x-2 items-center">
						<div className="h-10 aspect-square rounded-full bg-slate-50 border"></div>
						<div>Kimboh Lovette</div>
					</div>
				</div>
			</td>
			<td className="hidden sm:table-cell">
				<div className="py-5">237 654115922</div>
			</td>
			<td className="hidden md:table-cell">
				<div className="py-5">34</div>
			</td>
			<td className="hidden lg:table-cell">
				<div className="py-5">34</div>
			</td>
			<td className="hidden md:table-cell">
				<div className="py-5">Bamenda</div>
			</td>
			<td className="hidden sm:table-cell">
				<div className="py-5">2</div>
			</td>

			<td>
				<button className="py-2 px-4 rounded-lg bg-slate-200 text-sm font-medium">
					Hide
				</button>
			</td>
		</tr>
	);
};

export default users;

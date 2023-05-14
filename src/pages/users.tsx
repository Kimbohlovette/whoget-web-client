/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Image from 'next/image';
import { fetchUsers, updateUserStatus } from '../dataServices/fetchUsersAPI';

const Users = () => {
	const [users, setUsers] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [page, setPage] = useState(1);

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
		fetchUsers(page, 10)
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
			{error && (
				<div className="text-red-500 py-5 text-sm">
					An error occurred while fetching data. Refresh the page
					again.
				</div>
			)}
			{isLoading && <div className="text-center">Fetching users ...</div>}
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
	const [userUpdateState, setUserUpdateState] = useState<
		'idle' | 'inProgress' | 'failed' | 'success'
	>('idle');
	const [userStatus, setUserStatus] = useState<'active' | 'inactive'>(
		'active'
	);

	useEffect(() => {
		setUserStatus(props.user.status);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleUpdateStatus = () => {
		if (userStatus === 'active') {
			updateUserStatus(props.user.id, 'inactive')
				.then(() => {
					setUserStatus('inactive');
					setUserUpdateState('success');
				})
				.catch((error) => {
					console.log(error);
					setUserUpdateState('failed');
				})
				.finally(() => {
					setUserUpdateState('idle');
				});
		} else {
			updateUserStatus(props.user.id, 'active')
				.then(() => {
					setUserStatus('active');
					setUserUpdateState('success');
				})
				.catch((error) => {
					console.log(error);
					setUserUpdateState('failed');
				})
				.finally(() => {
					setUserUpdateState('idle');
				});
		}
	};
	return (
		<tr
			className="relative text-slate-600 py-5 hover:bg-slate-200 cursor-pointer"
			// onClick={() => {
			// 	navigation.push('/');
			// }}
		>
			<td>
				<div className="max-w-xs py-5 pl-2">
					<div className="flex flex-row gap-x-2 items-center">
						<div className="h-10 aspect-square rounded-full bg-slate-50 border overflow-hidden">
							<img
								src={props.user.profileImage}
								className="h-full aspect-square object-center object-cover"
								alt=""
							/>
						</div>
						<div>{props.user.name}</div>
					</div>
				</div>
			</td>
			<td className="hidden sm:table-cell">
				<div className="py-5">{props.user.phoneNumber}</div>
			</td>
			<td className="hidden md:table-cell">
				<div className="py-5">34</div>
			</td>
			<td className="hidden lg:table-cell">
				<div className="py-5">34</div>
			</td>
			<td className="hidden md:table-cell">
				<div className="py-5">{props.user.location || 'Buea'}</div>
			</td>
			<td className="hidden sm:table-cell">
				<div className="py-5">2</div>
			</td>

			<td>
				<button
					onClick={handleUpdateStatus}
					className="z-50 py-2 px-4 rounded-lg bg-slate-200 text-sm font-medium"
				>
					{userStatus === 'active' ? 'Ban' : 'Unband'}
				</button>
			</td>
		</tr>
	);
};

export default users;

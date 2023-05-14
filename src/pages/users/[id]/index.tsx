/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { FaWhatsappSquare } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';

import ShortAsk from '@/components/ShortAsk';
import { useRouter } from 'next/router';
import { fetchUserById } from '@/dataServices/fetchUsersAPI';
const UserDetails = () => {
	const router = useRouter();
	const [user, setUser] = useState<any>(null);
	useEffect(() => {
		if (router.isReady) {
			console.log(router.query.id);
			const id = router.query.id as string;
			fetchUserById(id)
				.then((user) => {
					console.log(user);
					setUser(user);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [router.isReady, router.query]);
	return user ? (
		<div>
			<div className="flex flex-col gap-8 max-h-min sm:flex-row">
				<div className="flex-1 flex justify-center items-center sm:justify-start">
					<div className="h-fit rounded-md overflow-hidden aspect-square">
						<img
							height={400}
							width={300}
							src={user.profileImage}
							alt="Michael Morgan"
							className="h-full object-center object-cover z-0 p-0 m-0"
						/>
					</div>
				</div>
				<div className="flex-1">
					<h1 className="text-center sm:text-left text-lg font-bold mb-5 text-slate-600 sm:text-2xl">
						{user.name}
					</h1>
					<div className="flex flex-col items-center sm:items-baseline gap-y-5">
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<FaWhatsappSquare className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{user.phoneNumber}
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<HiOutlineMail className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{user.email}
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4  min-w-[50px] text-xl">
								<BsTelephone className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{'+237 ' + user.phoneNumber}
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<HiOutlineLocationMarker className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{user.location || 'Buea, Cameroon'}
							</div>
						</div>
					</div>
					<div className="mt-5 flex items-center justify-center sm:justify-start">
						<button className="w-full max-w-fit sm:max-w-xs px-8 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 font-medium text-white">
							{user.status === 'active' ? 'Ban' : 'Unban'}
						</button>
					</div>
				</div>
			</div>
			<div className="mt-12">
				<h1 className="text-center sm:text-left text-slate-600 font-bold text-lg">
					All Asks
				</h1>
				<div className="flex flex-col gap-y-8 mt-8">
					<div>
						<ShortAsk />
					</div>
					<div>
						<ShortAsk />
					</div>
					<div>
						<ShortAsk />
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className="h-full w-full flex justify-center items-center">
			<div>
				<CgSpinner className="text-3xl animate-spin" />
			</div>
		</div>
	);
};

export default UserDetails;

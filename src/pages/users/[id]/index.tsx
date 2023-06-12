import React, { useEffect } from 'react';
import { FaWhatsappSquare } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
import { CgSpinnerTwoAlt } from 'react-icons/cg';

import ShortAsk from '@/components/ShortAsk';
import { useRouter } from 'next/router';
import { fetchUserById } from '@/dataServices/fetchUsersAPI';
import { fetchAsksByUserId } from '@/dataServices/fetchAsksAPI';
import { routeGuard } from '@/utils/routeGuard';
import { ImSpinner8 } from 'react-icons/im';
import { useAppSelector } from '@/store/hooks';
import useSWR from 'swr';
import Image from 'next/image';
import { url } from 'inspector';
const UserDetails = () => {
	const router = useRouter();
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);

	const userResponse = useSWR(router.query.id, fetchUserById);

	const userAsksResponse = useSWR(router.query.id, fetchAsksByUserId);

	useEffect(() => {
		routeGuard(router, isAuthenticated);
	}, [isAuthenticated, router]);

	return userResponse.data ? (
		<div>
			<div className="flex flex-col gap-8 max-h-min sm:flex-row">
				<div className="flex-1 flex justify-center items-center sm:justify-start">
					<div className="h-fit rounded-md overflow-hidden aspect-square">
						<Image
							height={400}
							width={300}
							src={userResponse.data.profileImage}
							alt="Michael Morgan"
							className="h-full object-center object-cover z-0 p-0 m-0"
						/>
					</div>
				</div>
				<div className="flex-1">
					<h1 className="text-center sm:text-left text-lg font-bold mb-5 text-slate-600 sm:text-2xl">
						{userResponse.data.name}
					</h1>
					<div className="flex flex-col items-center sm:items-baseline gap-y-5 w-full text-center sm:text-left sm:max-w-max">
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2 w-full">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<FaWhatsappSquare className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{userResponse.data.phoneNumber}
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2 w-full">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<HiOutlineMail className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{userResponse.data.email}
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2 w-full">
							<span className="hidden sm:block w-1/4  min-w-[50px] text-xl">
								<BsTelephone className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{'+237 ' + userResponse.data.phoneNumber}
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2 w-full">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<HiOutlineLocationMarker className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								{userResponse.data.location || 'Buea, Cameroon'}
							</div>
						</div>
					</div>
					<div className="mt-5 flex items-center justify-center sm:justify-start">
						<button
							disabled={userResponse.isLoading}
							className={
								'w-full max-w-[120px] z-50 py-2 px-4 rounded-md border-primary-500 bg-primary-500 text-xs text-white font-semibold'
							}
						>
							{userResponse.data.status === 'active'
								? 'Ban'
								: 'Unband'}

							{userResponse.isLoading && (
								<CgSpinnerTwoAlt className="text-secondary-400 ml-2 inline animate-spin" />
							)}
						</button>
					</div>
				</div>
			</div>
			<div className="mt-12">
				<h1 className="w-fit relative mx-auto sm:mx-0 sm:text-left text-slate-600 font-bold text-lg">
					<div className="absolute -top-1 -right-2 bg-secondary-500 text-white text-xs h-4 aspect-square rounded-full text-center">
						{userAsksResponse.data
							? userAsksResponse.data.asks.length
							: 0}
					</div>
					All Asks
				</h1>
				<div className="flex flex-col divide-y [&>*]:py-4 mt-8">
					{userAsksResponse.data ? (
						userAsksResponse.data.asks.map((ask: any, key: any) => {
							return (
								<div key={key}>
									<ShortAsk ask={ask} />
								</div>
							);
						})
					) : (
						<div>Your recent asks show here.</div>
					)}
				</div>
			</div>
		</div>
	) : (
		<div className="h-full w-full flex justify-center items-center">
			<div>
				<ImSpinner8 className="text-secondary-400 text-3xl animate-spin" />
			</div>
		</div>
	);
};

export default UserDetails;

/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { fetchAskById, updateAskStatus } from '@/dataServices/fetchAsksAPI';
import { CgSpinnerTwoAlt } from 'react-icons/cg';
import useSWR from 'swr';
import { toast } from 'react-toastify';
const AskDetails = () => {
	const router = useRouter();
	const askResData = useSWR(router.query.id, fetchAskById);
	const [isUpdating, setIsUpdating] = useState(false); // State of updating ask status
	const handleAskStatusUpdates = () => {
		setIsUpdating(true);
		if (askResData.data.status === 'visible') {
			updateAskStatus(askResData.data.id, 'invisible')
				.then((data) => {
					console.log(data);
					if (data.success) {
						askResData.data.status = 'invisible';
						toast.success('Ask updated successfully!');
						setIsUpdating(false);
					} else {
						if (data.code === 'auth/id-token-expired') {
							console.log('Token expired');
							router.push('/login');
						}
					}
				})
				.catch((error) => {
					toast.error('Could not update ask status!');
				});
		} else {
			updateAskStatus(askResData.data.id, 'visible')
				.then((data) => {
					console.log(data);
					if (data.success) {
						askResData.data.status = 'visible';
						toast.success('Ask updated successfully!');
						setIsUpdating(false);
					} else {
						if (data.code === 'auth/id-token-expired') {
							console.log('Token expired');
							router.push('/login');
						}
					}
				})
				.catch((err) => {
					toast.error('Could not update ask status!');
					console.log(err.code);
				})
				.finally(() => {
					setIsUpdating(false);
				});
		}
	};

	return (
		askResData.data && (
			<div className="relative">
				<div className="px-8 py-8 lg:p-16 rounded-sm bg-white mx-auto">
					<div className="flex flex-row gap-4">
						<div className="shrink-0 border overflow-hidden rounded-full h-fit">
							<Image
								height={100}
								width={200}
								src={askResData.data.owner.profileImage}
								alt={
									askResData.data.userName ||
									'Ask details image'
								}
								className="object-cover object-center aspect-square w-10"
							/>
						</div>
						<div>
							<div className="pt-2">
								<h1 className="font-light text-slate-400s">
									{askResData.data.owner.name}
								</h1>
							</div>

							<div className="text-sm text-slate-500 py-5">
								{askResData.data.imageUrl && (
									<div className="relative py-4 mt-5 w-fit flex flex-row gap-2">
										{askResData.data.imageUrl !== '' && (
											<Image
												height={100}
												width={200}
												src={askResData.data.imageUrl}
												alt="Car needed"
												className="aspect-video object-center object-cover border rounded-md w-full lg:max-w-2xl"
											/>
										)}
										<button className="absolute -left-12 top-1/3 rounded-full hover:bg-slate-200 p-1">
											<HiChevronLeft className="text-2xl text-slate-500" />
										</button>
										<button className="absolute -right-12 top-1/3 rounded-full hover:bg-slate-200 p-1">
											<HiChevronRight className="text-2xl text-slate-500" />
										</button>
									</div>
								)}
								<p className="text-slate-600 text-sm py-4 bg-slate-50 px-2 tracking-wide rounded-md my-5 lg:max-w-2xl">
									{askResData.data.message}
								</p>

								<p className="">
									<span className="font-md text-base text-primary-400">
										Expiration Date:{' '}
									</span>
									<span className="">
										{new Date(
											askResData.data.expirationDate
										).toDateString()}
									</span>
								</p>
								<p className="">
									<span className="font-md text-base text-primary-400">
										Location:{' '}
									</span>
									<span className="">
										{askResData.data.location}
									</span>
								</p>
								<p className="block text-xs mt-2">
									0 Reports, 0 Responses
								</p>
							</div>
							<div className="py-4">
								<button
									disabled={isUpdating}
									onClick={handleAskStatusUpdates}
									className="flex flex-row gap-x-2 py-1 px-4 rounded-md border border-primary-500 bg-primary-500 text-white  text-xs font-medium"
								>
									{isUpdating ? (
										'Updating...'
									) : (
										<span className="inline-block">
											{askResData.data.status ===
											'visible'
												? 'Hide'
												: 'Unhide'}
										</span>
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	);
};

export default AskDetails;

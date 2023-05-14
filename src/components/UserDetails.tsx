import React from 'react';
import { FaWhatsappSquare } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
import Image from 'next/legacy/image';
import ShortAsk from './ShortAsk';
const UserDetals = () => {
	return (
		<div>
			<div className="flex flex-col gap-8 max-h-min sm:flex-row">
				<div className="flex-1 flex justify-center items-center sm:justify-start">
					<div className="h-fit rounded-md overflow-hidden aspect-square">
						<Image
							height={400}
							width={300}
							src={require('../assets/michael_morgan.jpg')}
							alt="Michael Morgan"
							className="object-center object-cover z-0 p-0 m-0"
						/>
					</div>
				</div>
				<div className="flex-1">
					<h1 className="text-center sm:text-left text-lg font-bold mb-5 text-slate-600 sm:text-2xl">
						Eyong Ebai
					</h1>
					<div className="flex flex-col items-center sm:items-baseline gap-y-5">
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<FaWhatsappSquare className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								+237 6719218543
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<HiOutlineMail className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								kimbohlovette@gmail.com
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4  min-w-[50px] text-xl">
								<BsTelephone className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								+237 6719218543
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="hidden sm:block w-1/4 min-w-[50px] text-xl">
								<HiOutlineLocationMarker className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								Douala, Cameroon
							</div>
						</div>
					</div>
					<div className="mt-5 flex items-center justify-center sm:justify-start">
						<button className="w-full max-w-fit sm:max-w-xs px-8 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 font-medium text-white">
							Ban
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
	);
};

export default UserDetals;

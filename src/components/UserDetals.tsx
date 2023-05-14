import React from 'react';
import { FaWhatsappSquare } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { BsTelephone } from 'react-icons/bs';
const UserDetals = () => {
	return (
		<div>
			<div className="flex-col sm:flex-row">
				<div className="flex-1"></div>
				<div className="flex-1">
					<h1 className="text-lg font-bold mb-5 text-slate-600">
						Eyong Ebai
					</h1>
					<div className="flex flex-col gap-y-5">
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="block w-1/4 min-w-[50px] text-xl">
								<FaWhatsappSquare className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								+237 6719218543
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="block w-1/4 min-w-[50px] text-xl">
								<HiOutlineMail className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								kimbohlovette@gmail.com
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="block w-1/4  min-w-[50px] text-xl">
								<BsTelephone className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								+237 6719218543
							</div>
						</div>
						<div className="flex flex-row gap-x-4 py-2 px-4 border shadow-sm rounded-md border-slate-2">
							<span className="block w-1/4 min-w-[50px] text-xl">
								<HiOutlineLocationMarker className="mx-auto" />
							</span>
							<div className="flex-1 text-slate-600">
								Douala, Cameroon
							</div>
						</div>
					</div>
					<button className=""> Ban</button>
				</div>
			</div>
		</div>
	);
};

export default UserDetals;

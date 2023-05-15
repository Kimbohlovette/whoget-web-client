import { fetchAsks } from '@/dataServices/fetchAsksAPI';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Asks = () => {
	const [asks, setAsks] = useState<any>(null);
	const [fetchingAsksState, setFetchingAsksState] = useState<
		'idle' | 'inProgress' | 'failed' | 'success'
	>('idle');

	useEffect(() => {
		setFetchingAsksState('inProgress');
		fetchAsks(1, 3000)
			.then((asks) => {
				setAsks(asks);
				setFetchingAsksState('success');
			})
			.catch((error) => {
				console.log(error);
				setFetchingAsksState('failed');
			})
			.finally(() => {
				setFetchingAsksState('idle');
			});
	}, []);
	return (
		asks && (
			<div>
				<div className="cards grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 text-slate-600 text-center">
					<div>
						<div className="font-bold">856</div>
						<div className="font-extralight">Asks</div>
					</div>

					<div>
						<div className="font-bold">20</div>
						<div className="font-extralight">Categories</div>
					</div>
					<div>
						<div className="font-bold">500</div>
						<div>Users</div>
					</div>
					<div>
						<div className="font-bold">45692</div>
						<div className="font-extralight">Responses</div>
					</div>
					<div>
						<div className="font-bold">2</div>
						<div className="font-extralight">Hidden</div>
					</div>
				</div>
				<div className="my-16">
					<table className="table-auto my-5 [&>*]:divide-y w-full">
						<thead>
							<tr className="text-sm sm:text-base [&>*]:py-1 text-slate-800 text-left">
								<th>Message</th>
								<th className="hidden lg:table-cell">
									Location
								</th>
								<th className="hidden lg:table-cell">
									Due date
								</th>
								<th className="hidden md:table-cell">
									Category
								</th>
								<th className="hidden sm:table-cell">Owner</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody className="text-sm">
							{asks.map((ask: any, key: any) => {
								return <AskItem key={key} ask={ask} />;
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	);
};

export default Asks;

const AskItem = (props: { ask: any }) => {
	const router = useRouter();
	return (
		<tr
			onClick={() => {
				router.push(`/asks/${props.ask.id}`);
			}}
			className="text-slate-600 py-5 hover:bg-slate-200"
		>
			<td>
				<div className="max-w-xs py-5 px-2">{props.ask.message}</div>
			</td>

			<td className="hidden md:table-cell">
				<div className="py-5">{props.ask.location || 'N/A'}</div>
			</td>
			<td className="hidden lg:table-cell">
				<div className="py-5">{props.ask.expirationDate}</div>
			</td>
			<td className="hidden md:table-cell">
				<div className="py-5">{props.ask.categoryName || 'N/A'}</div>
			</td>
			<td className="hidden sm:table-cell">
				<div className="py-5">{props.ask.userName || 'N/A'} </div>
			</td>
			<td className="pr-2">
				<button className="py-2 px-4 rounded-lg bg-slate-200 text-sm font-medium">
					Hide
				</button>
			</td>
		</tr>
	);
};

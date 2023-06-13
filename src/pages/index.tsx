import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { BsEye, BsQuestionCircle } from 'react-icons/bs';
import { CiWarning } from 'react-icons/ci';
import { IoBanOutline } from 'react-icons/io5';
import { FiEyeOff } from 'react-icons/fi';

import { useAppDispatch } from '../store/hooks';
import { updateAuthStatus, updateAuthToken } from '@/store/slices/userSlice';

export default function Home() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);
	useEffect(() => {
		const token = localStorage.getItem('@authToken');
		if (token) {
			dispatch(updateAuthToken(token));
			dispatch(updateAuthStatus(true));
		} else {
			router.push('/login');
		}
	}, [router]);

	return (
		isAuthenticated && (
			<main>
				<div className="cards grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-8">
					<Card
						title="Signups"
						figure={2}
						icon={<AiOutlineUser />}
						pastDays={18}
					/>
					<Card
						title="Asks"
						figure={6}
						icon={<BsQuestionCircle />}
						pastDays={34}
					/>
					<Card
						title="Page Views"
						figure={791}
						icon={<BsEye />}
						pastDays={54}
					/>
					<Card
						title="Reports"
						figure={0}
						icon={<CiWarning />}
						pastDays={54}
					/>
					<Card
						title="Banned"
						figure={0}
						icon={<IoBanOutline />}
						pastDays={54}
					/>
					<Card
						title="Hidden"
						figure={0}
						icon={<FiEyeOff />}
						pastDays={14}
					/>
				</div>
			</main>
		)
	);
}

const Card = (props: {
	title: string;
	figure: number;
	pastDays: number;
	icon: ReactNode;
}) => {
	return (
		<div className="card bg-white p-8 rounded-sm">
			<div className="flex flex-row">
				<div className="w-1/4 text-orange-600 text-3xl flex justify-center py-5">
					{props.icon}
				</div>
				<div className="flex flex-col">
					<div>
						<h2 className="text-lg sm:text-xl md:3xl font-semibold pb-2 text-indigo-900">
							{props.title}
						</h2>
						<p className="text-xl tracking-wide text-slate-600">
							{props.figure}
						</p>
					</div>
					<div className="py-4 text-sm font-light border-t mt-4">
						<span className="text-slate-500">
							{`In the last ${props.pastDays} days`}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

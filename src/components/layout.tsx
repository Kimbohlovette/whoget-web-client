import Navbar from './Navbar';
import { ReactNode } from 'react';
import SideBar from './SideBar';
import { useAppSelector } from '@/store/hooks';
import Login from './Login';

export default function Layout(props: { children: ReactNode }) {
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);
	return isAuthenticated ? (
		<div className="flex flex-col">
			<div className="flex-1 flex flex-row py-4">
				<div className="hidden md:block">
					<SideBar />
				</div>
				<div className="flex-1">
					<Navbar />
					<main className="relative py-8 px-8 sm:px-8 lg:px-16 max-w-7xl min-h-screen">
						{props.children}
					</main>
				</div>
			</div>
		</div>
	) : (
		<Login />
	);
}

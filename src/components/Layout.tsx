import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { useAppSelector } from '@/store/hooks';
import { ReactNode } from 'react';

export function HomeLayout(props: { children: ReactNode }) {
	const isAuthenticated = useAppSelector(
		(state) => state.user.isAuthenticated
	);

	return !isAuthenticated ? (
		<p>Login</p>
	) : (
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
	);
}

export const AuthLayout = ({ children }: { children: ReactNode }) => {
	return <div>{children}</div>;
};

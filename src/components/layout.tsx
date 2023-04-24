import Navbar from './Navbar';
import Footer from './Footer';
import { ReactNode } from 'react';
import SideBar from './SideBar';

export default function Layout(props: { children: ReactNode }) {
	return (
		<div className="flex flex-col">
			<div className="flex-1 flex flex-row py-4">
				<div className="hidden md:block">
					<SideBar />
				</div>
				<div className="flex-1">
					<Navbar />
					<main className="py-8 px-4 sm:px-8 lg:px-16 max-w-7xl min-h-screen">
						{props.children}
					</main>
				</div>
			</div>
			<Footer />
		</div>
	);
}

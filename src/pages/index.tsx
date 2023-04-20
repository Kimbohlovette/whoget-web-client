import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<main className="p-5">
			<p className="text-cyan-500 text-lg">WhoGet</p>
		</main>
	);
}

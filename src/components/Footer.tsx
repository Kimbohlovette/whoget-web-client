import Link from 'next/link';
import React from 'react';
import {
	AiFillFacebook,
	AiOutlineInstagram,
	AiOutlineTwitter,
} from 'react-icons/ai';

const Footer = () => {
	return (
		<div className="py-12 px-6 sm:px-8 lg:px-16 bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">
			<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
				<div>
					<h1 className="text-lg font-bold text-white mb-4">Company</h1>
					<ul className="flex flex-col gap-2.5 text-sm">
						<li className="hover:text-white transition-colors cursor-pointer">About us</li>
						<li className="hover:text-white transition-colors cursor-pointer">Contact us</li>
						<li className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</li>
						<li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
					</ul>
				</div>
				<div>
					<h1 className="text-lg font-bold text-white mb-4">Categories</h1>
					<ul className="flex flex-col gap-2.5 text-sm">
						<li className="hover:text-white transition-colors cursor-pointer">Household</li>
						<li className="hover:text-white transition-colors cursor-pointer">Education</li>
						<li className="hover:text-white transition-colors cursor-pointer">Electronics</li>
						<li className="hover:text-white transition-colors cursor-pointer">Agriculture</li>
						<li className="hover:text-white transition-colors cursor-pointer">Fashion</li>
					</ul>
				</div>
				<div>
					<h1 className="text-lg font-bold text-white mb-4">Contact</h1>
					<p className="text-sm mb-1">First Trust Building, Buea, Cameroon</p>
					<p className="text-sm mb-4">+237 675224929</p>
					<div className="flex gap-4 text-xl justify-center sm:justify-start">
						<Link href={'#'} className="hover:text-blue-400 transition-colors">
							<AiOutlineTwitter />
						</Link>
						<Link href={'#'} className="hover:text-blue-600 transition-colors">
							<AiFillFacebook />
						</Link>
						<Link href={'#'} className="hover:text-pink-500 transition-colors">
							<AiOutlineInstagram />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;

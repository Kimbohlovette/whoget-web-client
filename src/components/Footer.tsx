import Link from 'next/link';
import React from 'react';
import {
	AiFillFacebook,
	AiOutlineInstagram,
	AiOutlineTwitter,
} from 'react-icons/ai';

const Footer = () => {
	return (
		<div className="py-12 px-4 sm:px-8 lg:px-16 flex flex-col sm:flex-row justify-evenly gap-8 bg-primary-500 text-slate-200 text-center sm:text-left">
			<div>
				<h1 className="text-lg font-bold uppercase">Company</h1>
				<ul className="flex flex-col gap-2 font-light text-sm">
					<li>About us</li>
					<li>Contact us</li>
					<li>Terms & Conditions</li>
					<li>Privacy Policy</li>
				</ul>
			</div>
			<div>
				<h1 className="text-lg font-bold uppercase">Categories</h1>
				<ul className="flex flex-col gap-2 font-light text-sm">
					<li>Household</li>
					<li>Education</li>
					<li>Electronics</li>
					<li>Agriculture</li>
					<li>Fashion</li>
				</ul>
			</div>
			<div>
				<h1 className="text-lg font-bold uppercase">Contact</h1>
				<p>First Trust Building, Buea, Cameroon</p>
				<p>+237 675224929</p>
				<div className="flex flex-row gap-4 py-4 text-secondary justify-center sm:justify-start">
					<Link href={'#'}>
						<AiOutlineTwitter />
					</Link>
					<Link href={'#'}>
						<AiFillFacebook />
					</Link>
					<Link href={'#'}>
						<AiOutlineInstagram />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;

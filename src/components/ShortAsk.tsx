import React from 'react';

const ShortAsk = () => {
	return (
		<div className="flex flex-row gap-x-2 sm:gap-x-5">
			<div className="h-12 rounded-full bg-slate-200 border aspect-square"></div>
			<div className="flex-1">
				<p className="w-full max-w-md md:max-w-lg">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Quidem minus quod ipsam ...
				</p>
			</div>
			<div>
				<button className="px-8 py-2 text-white bg-primary-500 rounded-lg text-sm font-medium hover:bg-primary-600">
					Hide
				</button>
			</div>
		</div>
	);
};

export default ShortAsk;

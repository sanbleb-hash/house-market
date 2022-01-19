import React from 'react';
import { ImSpinner3 } from 'react-icons/im';

const Loading = () => {
	return (
		<ImSpinner3 className=' items-center text-indigo-500 text-5xl  absolute top-[50%] right-[50%] animate-spin ' />
	);
};

export default Loading;

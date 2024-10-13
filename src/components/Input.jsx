import React from 'react';

export default function Input({
	onChange,
	value,
	className,
	placeholder,
	autoFocus,
	span,
}) {
	return (
		<div className="flex flex-col w-full">
			{span && (
				<h3 className="py-2 text-black dark:text-white text-lg font-bold select-none">
					{span}
				</h3>
			)}

			<input
				className={
					className
						? className
						: 'w-full h-16 border-2 bg-black/10 dark:bg-white/10 border-black/20 dark:border-white/20 px-4 py-2 text-black dark:text-white focus:outline-none rounded-md text-center font-bold text-2xl hover:ring-2 hover:ring-blue-500'
				}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				type="number"
				inputMode="numeric"
				autoFocus={autoFocus}
			/>
		</div>
	);
}

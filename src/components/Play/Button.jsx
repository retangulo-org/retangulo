export default function ButtonCalc({ text, onClick }) {
	return (
		<button
			onClick={onClick}
			type="button"
			className="w-full h-14 text-white rounded-lg hover:font-bold bg-blue-600 hover:bg-blue-800 active:bg-blue-700 select-none"
		>
			{text}
		</button>
	);
}

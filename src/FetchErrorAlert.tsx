interface Props {
	text: string;
}

function FetchErrorAlert({ text }: Props) {
	return <div>{text}</div>;
}

export { FetchErrorAlert };

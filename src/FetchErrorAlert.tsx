import styles from "./FetchErrorAlert.module.css";

interface Props {
	text: string;
}

function FetchErrorAlert({ text }: Props) {
	return <div className={styles.text}>{text}</div>;
}

export { FetchErrorAlert };

import styles from "./IsLoadingAlert.module.css";

interface Props {
	text: string;
}

function IsLoadingAlert({ text }: Props) {
	return (
		<div>
			<div className={styles.wobble}>
				{text.split("").map((char, index) => (
					<span
						key={`${index}. ${char}`}
						style={{ animationDelay: `${index * 50}ms` }}
					>
						{char}
					</span>
				))}
			</div>
		</div>
	);
}

export { IsLoadingAlert };

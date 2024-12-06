import type { Dispatch, SetStateAction } from "react";
import styles from "./UserInfoContainer.module.css";

interface Props {
	userInfo: string;
	setUserInfo: Dispatch<SetStateAction<string>>;
	setHasUserInfoBeenConfirmed: Dispatch<SetStateAction<boolean>>;
}

function UserInfoContainer({
	userInfo,
	setUserInfo,
	setHasUserInfoBeenConfirmed,
}: Props) {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.title}>
					Erzähle mir etwas über deinen Bildungsstand und zu welchen
					Fachgebieten ich dir Fragen stellen soll:
				</div>
				<textarea
					value={userInfo}
					onChange={(e) => setUserInfo(e.target.value)}
					className={styles.userInfoInput}
				/>
				<div className={styles.submitButtonContainer}>
					<button
						type="button"
						disabled={userInfo.length === 0}
						onClick={() => setHasUserInfoBeenConfirmed(true)}
						className={styles.submitButton}
					>
						Bestätigen
					</button>
				</div>
			</div>
		</div>
	);
}

export { UserInfoContainer };

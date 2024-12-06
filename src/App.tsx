import { useEffect, useState } from "react";
import { QuestionContainer } from "./QuestionContainer";
import { UserInfoContainer } from "./UserInfoContainer";

function App() {
	const userInfoKey = "user-info";
	const hasUserInfoBeenConfirmedKey = "has-user-info-been-confirmed";

	const [userInfo, setUserInfo] = useState(
		() => window.localStorage.getItem(userInfoKey) ?? "",
	);

	const [hasUserInfoBeenConfirmed, setHasUserInfoBeenConfirmed] =
		useState<boolean>(() => {
			const stateFromStorage = window.localStorage.getItem(
				hasUserInfoBeenConfirmedKey,
			);

			if (!stateFromStorage) {
				return false;
			}

			try {
				return JSON.parse(stateFromStorage);
			} catch (error) {
				console.error(error);
				return false;
			}
		});

	useEffect(() => {
		window.localStorage.setItem(userInfoKey, userInfo);
	}, [userInfo]);

	useEffect(() => {
		window.localStorage.setItem(
			hasUserInfoBeenConfirmedKey,
			JSON.stringify(hasUserInfoBeenConfirmed),
		);
	}, [hasUserInfoBeenConfirmed]);

	return (
		<>
			{!hasUserInfoBeenConfirmed && (
				<UserInfoContainer
					userInfo={userInfo}
					setUserInfo={setUserInfo}
					setHasUserInfoBeenConfirmed={setHasUserInfoBeenConfirmed}
				/>
			)}
			{hasUserInfoBeenConfirmed && (
				<QuestionContainer
					userInfo={userInfo}
					setHasUserInfoBeenConfirmed={setHasUserInfoBeenConfirmed}
				/>
			)}
		</>
	);
}

export { App };

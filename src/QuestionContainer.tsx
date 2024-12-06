import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { FetchErrorAlert } from "./FetchErrorAlert";
import { IsLoadingAlert } from "./IsLoadingAlert";
import {
	answerSchema,
	submitAnswer as fetchAnswer,
	fetchChatResponseSchema,
	fetchQuestion,
	questionSchema,
} from "./api";

interface Props {
	userInfo: string;
	setHasUserInfoBeenConfirmed: Dispatch<SetStateAction<boolean>>;
}

function QuestionContainer({ userInfo, setHasUserInfoBeenConfirmed }: Props) {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	const productId = searchParams.get("product-id") ?? "";
	const token = searchParams.get("token") ?? "";

	const queryClient = useQueryClient();
	const [answer, setAnswer] = useState("");

	const {
		data: question,
		isError: hasFetchingQuestionFailed,
		isPending: isFetchingQuestion,
	} = useQuery({
		queryKey: ["question"],
		queryFn: async () => {
			const response = await fetchQuestion({ productId, token, userInfo });
			const chat = fetchChatResponseSchema.parse(response);

			const parsedContent = JSON.parse(chat.choices[0]?.message.content ?? "");

			return questionSchema.parse(parsedContent);
		},
	});

	const {
		mutate: submitAnswer,
		data: answerResult,
		isPending: isSubmittingAnswer,
		isError: hasSubmittingAnswerFailed,
	} = useMutation({
		mutationFn: async () => {
			const response = await fetchAnswer({
				productId,
				token,
				questionId: question?.id ?? "",
				questionText: question?.text ?? "",
				answer,
			});
			const chat = fetchChatResponseSchema.parse(response);

			const parsedContent = JSON.parse(chat.choices[0]?.message.content ?? "");

			return answerSchema.parse(parsedContent);
		},
	});

	useEffect(() => {
		setAnswer("");
	}, [question]);

	function requestQuestion() {
		return queryClient.invalidateQueries({
			queryKey: ["question"],
		});
	}

	return (
		<>
			<button type="button" onClick={() => setHasUserInfoBeenConfirmed(false)}>
				Vergiss mich
			</button>
			{hasFetchingQuestionFailed && (
				<FetchErrorAlert text="Leider ging etwas beim Laden der Frage schief!" />
			)}
			{isFetchingQuestion && <IsLoadingAlert text="Frage heraussuchen..." />}
			{!isFetchingQuestion && !hasFetchingQuestionFailed && (
				<>
					<button type="button" onClick={() => requestQuestion()}>
						Neue Frage
					</button>
					<div>Frage</div>
					<div>{question.text}</div>
					<div>Antwort</div>
					<textarea
						value={answer}
						disabled={answerResult?.relatedToQuestionId === question.id}
						onChange={(e) => setAnswer(e.target.value)}
					/>
					<button
						type="button"
						disabled={
							answer.length === 0 ||
							answerResult?.relatedToQuestionId === question.id
						}
						onClick={() => submitAnswer()}
					>
						Antwort abgeben
					</button>
					{hasSubmittingAnswerFailed && (
						<FetchErrorAlert text="Leider ging etwas beim Übermitteln der Antwort schief!" />
					)}
					{isSubmittingAnswer && <IsLoadingAlert text="Antwort prüfen..." />}
					{!isSubmittingAnswer &&
						!hasSubmittingAnswerFailed &&
						answerResult?.relatedToQuestionId === question.id && (
							<>
								{answerResult?.isAnswerCorrect && (
									<div>Korrekte Antwort...</div>
								)}
								{!answerResult?.isAnswerCorrect && (
									<>
										<div>Falsche Antwort...</div>
										<div>{answerResult?.explanation}</div>
									</>
								)}
							</>
						)}
				</>
			)}
		</>
	);
}

export { QuestionContainer };

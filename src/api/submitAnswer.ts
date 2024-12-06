import { fetchChat } from "./fetchChat";

function submitAnswer({
	productId,
	token,
	questionId,
	questionText,
	answer,
}: {
	productId: string;
	token: string;
	questionId: string;
	questionText: string;
	answer: string;
}) {
	return fetchChat({
		productId,
		token,
		messages: [
			{
				role: "system",
				content: `Du bist freundlich und fröhlich.
                            Der User schickt dir seine Antwort auf deine vorherige gestellte Frage ( question ) mit der 'id' ${questionId} und dem 'text' ${questionText}, du bewertest also seine Antwort in Bezug zu dieser gestellten Frage.
                            Antworte ausschließlich im JSON Format. 
                            Nutze die folgenden Felder: 'relatedToQuestionId' wo du ${questionId} zuweist, 'isAnswerCorrect' als Boolean, je nachdem, ob die Antwort korrekt oder falsch ist und 'explanation' mit einer ausführlichen Erklärung, falls die Antwort falsch ist, ansonsten bleibt das Feld einfach leer.`,
			},
			{
				role: "user",
				content: answer,
			},
		],
	});
}

export { submitAnswer };

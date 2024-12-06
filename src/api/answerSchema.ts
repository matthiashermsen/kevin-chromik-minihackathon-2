import { z } from "zod";

const answerSchema = z.object({
	relatedToQuestionId: z.string(),
	isAnswerCorrect: z.boolean(),
	explanation: z.string(),
});

export { answerSchema };

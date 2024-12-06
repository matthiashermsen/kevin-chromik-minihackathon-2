import { z } from "zod";

const fetchChatResponseSchema = z.object({
	choices: z.array(
		z.object({
			message: z.object({
				content: z.string(),
			}),
		}),
	),
});

export { fetchChatResponseSchema };

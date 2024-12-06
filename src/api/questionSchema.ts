import { z } from "zod";

const questionSchema = z.object({
	id: z.string(),
	text: z.string(),
});

export { questionSchema };

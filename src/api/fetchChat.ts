async function fetchChat({
	productId,
	token,
	messages,
}: {
	productId: string;
	token: string;
	messages: {
		role: "system" | "user";
		content: string;
	}[];
}) {
	const url = `/api/1/ai/${productId}/openai/chat/completions`;

	const headers = new Headers();
	headers.set("Authorization", `Bearer ${token}`);
	headers.set("Content-Type", "application/json");

	const options = {
		headers,
		method: "POST",
		body: JSON.stringify({
			model: "mixtral",
			messages,
		}),
	};

	const response = await fetch(url.toString(), options);

	if (!response.ok) {
		const responseText = (await response.text()) || response.statusText;

		throw new Error(responseText);
	}

	return response.json();
}

export { fetchChat };

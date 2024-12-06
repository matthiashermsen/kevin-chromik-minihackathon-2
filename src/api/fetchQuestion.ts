import { fetchChat } from "./fetchChat";

function fetchQuestion({
	productId,
	token,
	userInfo,
}: {
	productId: string;
	token: string;
	userInfo: string;
}) {
	return fetchChat({
		productId,
		token,
		messages: [
			{
				role: "system",
				content: `Du bist freundlich und fröhlich. 
                            Schicke dem User auf Basis seines Bildungsstandes und der genannten Fachgebiete eine passende Frage. 
                            Die von dir gewählte Frage bezieht sich nur auf ein einzelnes Fachgebiet, gibt dir der User mehrere Fachgebiete, wähle nur eines davon. 
                            Stelle nur die reine Frage als Aufgabenstellung, ohne Hinweise.
                            Antworte ausschließlich im JSON Format. 
                            Nutze die folgenden Felder: 'id' für eine GUID der Frage und 'text' mit der eigentlichen Frage.`,
			},
			{
				role: "user",
				content: userInfo,
			},
		],
	});
}

export { fetchQuestion };

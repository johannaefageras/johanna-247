import { ANTHROPIC_API_KEY } from '$env/static/private';
import Anthropic from '@anthropic-ai/sdk';
import type { RequestHandler } from './$types';

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.session) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { messages } = await request.json();

	// Take only the first few messages for title generation
	const context = messages
		.slice(0, 4)
		.map((m: { role: string; content: string }) => `${m.role}: ${m.content}`)
		.join('\n');

	try {
		const response = await anthropic.messages.create({
			model: 'claude-haiku-4-5-20251001',
			max_tokens: 30,
			system:
				'Du genererar korta, beskrivande titlar för chatkonversationer. Svara med ENBART titeln, max 6 ord, på svenska. Ingen punkt eller citattecken.',
			messages: [
				{
					role: 'user',
					content: `Ge denna konversation en kort titel:\n\n${context}`
				}
			]
		});

		const title =
			response.content[0].type === 'text' ? response.content[0].text.trim() : 'Ny konversation';

		return new Response(JSON.stringify({ title }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error('Title generation failed:', err);
		return new Response(JSON.stringify({ title: 'Ny konversation' }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}
};

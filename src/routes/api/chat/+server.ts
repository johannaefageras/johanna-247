import { ANTHROPIC_API_KEY } from '$env/static/private';
import { SYSTEM_PROMPT_CORE } from '$lib/prompts/system-prompt';
import { getModePrompt } from '$lib/prompts/modes/map';
import Anthropic from '@anthropic-ai/sdk';
import type { RequestHandler } from './$types';

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

async function buildUserContext(locals: App.Locals): Promise<string> {
	if (!locals.user) return '';

	const { data: profile } = await locals.supabase
		.from('profiles')
		.select('display_name, phone, about_me')
		.eq('id', locals.user.id)
		.single();

	if (!profile) return '';

	const parts: string[] = [];
	if (profile.display_name) {
		parts.push(`Namn: ${profile.display_name}`);
	}
	if (locals.user.email) {
		parts.push(`E-post: ${locals.user.email}`);
	}
	if (profile.phone) {
		parts.push(`Telefon: ${profile.phone}`);
	}
	if (profile.about_me) {
		parts.push(`Om användaren: ${profile.about_me}`);
	}

	if (parts.length === 0) return '';

	return `\n\n[Användarinfo — delad av användaren själv]\n${parts.join('\n')}`;
}

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.session) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { messages, mode } = await request.json();

	const modeOverlay = getModePrompt(mode ?? 'klassisk');
	const userContext = await buildUserContext(locals);

	let stream;
	try {
		stream = anthropic.messages.stream({
			model: 'claude-sonnet-4-6',
			max_tokens: 4096,
			system: [
				{
					type: 'text',
					text: SYSTEM_PROMPT_CORE,
					cache_control: { type: 'ephemeral' }
				},
				{
					type: 'text',
					text: modeOverlay + userContext
				}
			],
			messages: messages.map((m: { role: string; content: string }) => ({
				role: m.role,
				content: m.content
			}))
		});
	} catch (err) {
		console.error('Failed to create stream:', err);
		return new Response(JSON.stringify({ error: String(err) }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const encoder = new TextEncoder();

	const readable = new ReadableStream({
		async start(controller) {
			try {
				for await (const event of stream) {
					if (
						event.type === 'content_block_delta' &&
						event.delta.type === 'text_delta'
					) {
						controller.enqueue(encoder.encode(event.delta.text));
					}
				}
				controller.close();
			} catch (err) {
				const message = err instanceof Error ? err.message : String(err);
				console.error('Stream error:', message);
				controller.enqueue(encoder.encode(`\n\n[Fel: ${message}]`));
				controller.close();
			}
		}
	});

	return new Response(readable, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Transfer-Encoding': 'chunked'
		}
	});
};

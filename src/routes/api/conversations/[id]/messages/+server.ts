import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
	if (!locals.session || !locals.user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Verify conversation belongs to user
	const { data: conv } = await locals.supabase
		.from('conversations')
		.select('id')
		.eq('id', params.id)
		.eq('user_id', locals.user.id)
		.single();

	if (!conv) {
		return new Response(JSON.stringify({ error: 'Not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { data, error } = await locals.supabase
		.from('messages')
		.select('id, role, content, created_at')
		.eq('conversation_id', params.id)
		.order('created_at', { ascending: true });

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' }
	});
};

export const POST: RequestHandler = async ({ params, request, locals }) => {
	if (!locals.session || !locals.user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Verify conversation belongs to user
	const { data: conv } = await locals.supabase
		.from('conversations')
		.select('id')
		.eq('id', params.id)
		.eq('user_id', locals.user.id)
		.single();

	if (!conv) {
		return new Response(JSON.stringify({ error: 'Not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { messages } = await request.json();

	const rows = messages.map((m: { role: string; content: string }) => ({
		conversation_id: params.id,
		role: m.role,
		content: m.content
	}));

	const { error } = await locals.supabase.from('messages').insert(rows);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Update conversation's updated_at
	await locals.supabase
		.from('conversations')
		.update({ updated_at: new Date().toISOString() })
		.eq('id', params.id);

	return new Response(JSON.stringify({ ok: true }), {
		status: 201,
		headers: { 'Content-Type': 'application/json' }
	});
};

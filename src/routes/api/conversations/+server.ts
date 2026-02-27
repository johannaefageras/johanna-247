import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.session || !locals.user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { data, error } = await locals.supabase
		.from('conversations')
		.select('id, title, mode, created_at, updated_at')
		.eq('user_id', locals.user.id)
		.order('updated_at', { ascending: false });

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

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.session || !locals.user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { mode } = await request.json();

	const { data, error } = await locals.supabase
		.from('conversations')
		.insert({ user_id: locals.user.id, mode: mode || 'klassisk' })
		.select('id')
		.single();

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify(data), {
		status: 201,
		headers: { 'Content-Type': 'application/json' }
	});
};

export const PATCH: RequestHandler = async ({ request, locals }) => {
	if (!locals.session || !locals.user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { id, title } = await request.json();

	const { error } = await locals.supabase
		.from('conversations')
		.update({ title, updated_at: new Date().toISOString() })
		.eq('id', id)
		.eq('user_id', locals.user.id);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify({ ok: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};

export const DELETE: RequestHandler = async ({ request, locals }) => {
	if (!locals.session || !locals.user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { id } = await request.json();

	const { error } = await locals.supabase
		.from('conversations')
		.delete()
		.eq('id', id)
		.eq('user_id', locals.user.id);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify({ ok: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};

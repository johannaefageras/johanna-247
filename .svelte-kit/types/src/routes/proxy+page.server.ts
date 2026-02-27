// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = async ({ url, locals }: Parameters<PageServerLoad>[0]) => {
	const chatId = url.searchParams.get('chat');

	if (!chatId) {
		return { conversation: null, messages: [] };
	}

	if (!locals.user) {
		return { conversation: null, messages: [] };
	}

	// Load existing conversation
	const { data: conversation } = await locals.supabase
		.from('conversations')
		.select('id, title, mode, created_at, updated_at')
		.eq('id', chatId)
		.eq('user_id', locals.user.id)
		.single();

	if (!conversation) {
		return { conversation: null, messages: [] };
	}

	// Load messages
	const { data: messages } = await locals.supabase
		.from('messages')
		.select('role, content')
		.eq('conversation_id', chatId)
		.order('created_at', { ascending: true });

	return {
		conversation,
		messages: messages ?? []
	};
};

export const actions = {
	logout: async ({ locals }: import('./$types').RequestEvent) => {
		await locals.supabase.auth.signOut();
		throw redirect(303, '/login');
	}
};
;null as any as Actions;
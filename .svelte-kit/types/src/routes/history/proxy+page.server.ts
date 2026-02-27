// @ts-nocheck
import type { PageServerLoad } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
	if (!locals.user) {
		return { conversations: [] };
	}

	const { data } = await locals.supabase
		.from('conversations')
		.select('id, title, mode, created_at, updated_at')
		.eq('user_id', locals.user.id)
		.order('updated_at', { ascending: false });

	return {
		conversations: data ?? []
	};
};

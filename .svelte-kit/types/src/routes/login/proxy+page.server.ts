// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, locals }: import('./$types').RequestEvent) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'Ange e-post och lösenord.', email });
		}

		const { error } = await locals.supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			return fail(400, { error: 'Fel e-post eller lösenord.', email });
		}

		throw redirect(303, '/');
	}
};
;null as any as Actions;
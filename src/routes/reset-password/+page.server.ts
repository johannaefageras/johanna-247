import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		if (!email) {
			return fail(400, { error: 'Ange din e-postadress.' });
		}

		const { error } = await locals.supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${url.origin}/auth/callback`
		});

		if (error) {
			return fail(400, { error: error.message });
		}

		return { success: true };
	}
};

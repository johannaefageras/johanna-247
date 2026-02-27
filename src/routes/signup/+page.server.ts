import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals, url }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'Ange e-post och lösenord.', email });
		}

		if (password.length < 6) {
			return fail(400, { error: 'Lösenordet måste vara minst 6 tecken.', email });
		}

		try {
			const { data, error } = await locals.supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${url.origin}/auth/callback`
				}
			});

			if (error) {
				return fail(400, { error: error.message || 'Något gick fel. Försök igen.', email });
			}

			// Supabase returns a user with empty identities when the email is already registered
			if (data.user && data.user.identities?.length === 0) {
				return fail(400, { error: 'Ett konto med den e-postadressen finns redan.', email });
			}

			return { success: true, email };
		} catch (err) {
			console.error('Signup error:', err);
			return fail(500, {
				error: 'Kunde inte nå servern. Försök igen om en stund.',
				email
			});
		}
	}
};

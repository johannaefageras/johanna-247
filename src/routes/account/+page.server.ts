import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session || !locals.user) {
		throw redirect(303, '/login');
	}

	const { data: profile } = await locals.supabase
		.from('profiles')
		.select('*')
		.eq('id', locals.user.id)
		.single();

	return {
		profile: profile ?? {
			display_name: '',
			phone: '',
			about_me: '',
			avatar_url: ''
		},
		email: locals.user.email ?? ''
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		if (!locals.session || !locals.user) {
			return fail(401, { error: 'Ej inloggad' });
		}

		const form = await request.formData();
		const display_name = (form.get('display_name') as string) ?? '';
		const phone = (form.get('phone') as string) ?? '';
		const about_me = (form.get('about_me') as string) ?? '';
		const { error } = await locals.supabase
			.from('profiles')
			.upsert({
				id: locals.user.id,
				display_name,
				phone,
				about_me,
				updated_at: new Date().toISOString()
			});

		if (error) {
			return fail(500, { error: 'Kunde inte spara profilen. Försök igen.' });
		}

		// Update email if changed
		const newEmail = (form.get('email') as string) ?? '';
		if (newEmail && newEmail !== locals.user.email) {
			const { error: emailError } = await locals.supabase.auth.updateUser({
				email: newEmail
			});
			if (emailError) {
				return fail(500, { error: 'Kunde inte uppdatera e-postadressen.' });
			}
		}

		return { success: true };
	},

	updatePassword: async ({ request, locals }) => {
		if (!locals.session || !locals.user) {
			return fail(401, { error: 'Ej inloggad' });
		}

		const form = await request.formData();
		const newPassword = form.get('new_password') as string;
		const confirmPassword = form.get('confirm_password') as string;

		if (!newPassword || newPassword.length < 6) {
			return fail(400, { passwordError: 'Lösenordet måste vara minst 6 tecken.' });
		}

		if (newPassword !== confirmPassword) {
			return fail(400, { passwordError: 'Lösenorden matchar inte.' });
		}

		const { error } = await locals.supabase.auth.updateUser({
			password: newPassword
		});

		if (error) {
			return fail(500, { passwordError: 'Kunde inte uppdatera lösenordet.' });
		}

		return { passwordSuccess: true };
	},

	uploadAvatar: async ({ request, locals }) => {
		if (!locals.session || !locals.user) {
			return fail(401, { error: 'Ej inloggad' });
		}

		const form = await request.formData();
		const file = form.get('avatar') as File;

		if (!file || file.size === 0) {
			return fail(400, { error: 'Ingen fil vald.' });
		}

		if (file.size > 2 * 1024 * 1024) {
			return fail(400, { error: 'Filen är för stor. Max 2 MB.' });
		}

		if (!file.type.startsWith('image/')) {
			return fail(400, { error: 'Filen måste vara en bild.' });
		}

		const ext = file.name.split('.').pop() ?? 'jpg';
		const filePath = `${locals.user.id}/avatar.${ext}`;

		const { error: uploadError } = await locals.supabase.storage
			.from('avatars')
			.upload(filePath, file, { upsert: true });

		if (uploadError) {
			return fail(500, { error: 'Kunde inte ladda upp bilden.' });
		}

		const { data: urlData } = locals.supabase.storage
			.from('avatars')
			.getPublicUrl(filePath);

		const avatar_url = urlData.publicUrl + '?t=' + Date.now();

		await locals.supabase
			.from('profiles')
			.upsert({
				id: locals.user.id,
				avatar_url,
				updated_at: new Date().toISOString()
			});

		return { success: true, avatar_url };
	}
};

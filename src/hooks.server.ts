import { createSupabaseServerClient } from '$lib/server/supabase';
import { redirect, type Handle } from '@sveltejs/kit';

const PUBLIC_PATHS = ['/login', '/signup', '/reset-password', '/auth/callback'];

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient(event);

	event.locals.safeGetSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		if (!session) return { session: null, user: null };

		const {
			data: { user },
			error
		} = await event.locals.supabase.auth.getUser();
		if (error) return { session: null, user: null };

		return { session, user };
	};

	const { session, user } = await event.locals.safeGetSession();
	event.locals.session = session;
	event.locals.user = user;

	const isPublicPath = PUBLIC_PATHS.some((p) => event.url.pathname.startsWith(p));

	if (!session && !isPublicPath) {
		throw redirect(303, '/login');
	}

	if (session && (event.url.pathname === '/login' || event.url.pathname === '/signup')) {
		throw redirect(303, '/');
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range' || name === 'x-supabase-api-version';
		}
	});
};

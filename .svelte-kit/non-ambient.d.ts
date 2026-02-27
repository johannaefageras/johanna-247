
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/account" | "/api" | "/api/chat" | "/api/chat/title" | "/api/conversations" | "/api/conversations/[id]" | "/api/conversations/[id]/messages" | "/auth" | "/auth/callback" | "/history" | "/login" | "/reset-password" | "/signup";
		RouteParams(): {
			"/api/conversations/[id]": { id: string };
			"/api/conversations/[id]/messages": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/account": Record<string, never>;
			"/api": { id?: string };
			"/api/chat": Record<string, never>;
			"/api/chat/title": Record<string, never>;
			"/api/conversations": { id?: string };
			"/api/conversations/[id]": { id: string };
			"/api/conversations/[id]/messages": { id: string };
			"/auth": Record<string, never>;
			"/auth/callback": Record<string, never>;
			"/history": Record<string, never>;
			"/login": Record<string, never>;
			"/reset-password": Record<string, never>;
			"/signup": Record<string, never>
		};
		Pathname(): "/" | "/account" | "/api/chat" | "/api/chat/title" | "/api/conversations" | `/api/conversations/${string}/messages` & {} | "/auth/callback" | "/history" | "/login" | "/reset-password" | "/signup";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}
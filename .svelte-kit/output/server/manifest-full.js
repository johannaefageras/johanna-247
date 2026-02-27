export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.CFBWspbx.js",app:"_app/immutable/entry/app.CPlddRH6.js",imports:["_app/immutable/entry/start.CFBWspbx.js","_app/immutable/chunks/DaTPSn0l.js","_app/immutable/chunks/Rq4LI6QR.js","_app/immutable/chunks/6MsVjp58.js","_app/immutable/entry/app.CPlddRH6.js","_app/immutable/chunks/Rq4LI6QR.js","_app/immutable/chunks/v3yxo8vJ.js","_app/immutable/chunks/ecA2bgat.js","_app/immutable/chunks/DUysMBZ5.js","_app/immutable/chunks/6MsVjp58.js","_app/immutable/chunks/DKQFPS2e.js","_app/immutable/chunks/Vz342YLG.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

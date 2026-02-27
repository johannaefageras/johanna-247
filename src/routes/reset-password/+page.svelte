<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import '$lib/assets/css/fonts.css';
	import '$lib/assets/css/style.css';

	type Theme = 'light' | 'dark';

	let { form } = $props();
	let theme = $state<Theme>('light');

	function getPreferredTheme(): Theme {
		if (typeof window === 'undefined') return 'light';
		const stored = localStorage.getItem('theme');
		if (stored === 'light' || stored === 'dark') return stored;
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function applyTheme(nextTheme: Theme) {
		theme = nextTheme;
		document.documentElement.setAttribute('data-theme', nextTheme);
		localStorage.setItem('theme', nextTheme);
	}

	function toggleTheme() {
		applyTheme(theme === 'dark' ? 'light' : 'dark');
	}

	onMount(() => {
		applyTheme(getPreferredTheme());
	});
</script>

<svelte:head>
	<title>Återställ lösenord — Johanna 24/7</title>
</svelte:head>

<nav class="navbar">
	<div class="navbar-inner">
		<span class="navbar-brand">Johanna 24/7</span>
		<div class="navbar-links">
			<button class="theme-toggle" aria-label="Toggle dark mode" onclick={toggleTheme}>
				<svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
				</svg>
				<svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
				</svg>
			</button>
		</div>
	</div>
</nav>

<main class="main">
	<div class="auth-card">
		<h1 class="auth-heading">Återställ lösenord</h1>
		<p class="auth-subtext">Ange din e-post så skickar vi en återställningslänk.</p>

		{#if form?.success}
			<div class="auth-success">
				<p><strong>Kolla din e-post!</strong></p>
				<p>Om kontot finns har vi skickat en länk för att återställa ditt lösenord.</p>
			</div>
			<div class="auth-links">
				<a href="/login">Tillbaka till inloggning</a>
			</div>
		{:else}
			{#if form?.error}
				<div class="auth-error">{form.error}</div>
			{/if}

			<form method="POST" use:enhance class="auth-form">
				<div class="auth-field">
					<label class="auth-label" for="email">E-post</label>
					<input
						class="auth-input"
						type="email"
						id="email"
						name="email"
						required
						autocomplete="email"
						placeholder="din@epost.se"
					/>
				</div>
				<button class="auth-btn" type="submit">Skicka återställningslänk</button>
			</form>

			<div class="auth-links">
				<a href="/login">Tillbaka till inloggning</a>
			</div>
		{/if}
	</div>
</main>

<footer class="footer">
	<div class="footer-inner">
		<span class="footer-copy">&copy; 2025 Chat</span>
		<span class="footer-sep">&middot;</span>
		<a href="/terms" class="footer-link">Terms</a>
		<span class="footer-sep">&middot;</span>
		<a href="/privacy" class="footer-link">Privacy</a>
	</div>
</footer>

<style>
	.auth-card {
		width: 100%;
		max-width: 400px;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.auth-heading {
		font-size: clamp(1.8rem, 5vw, var(--text-4xl));
		font-weight: var(--weight-light);
		letter-spacing: var(--tracking-tighter);
		line-height: var(--leading-tight);
		color: var(--text-primary);
	}

	.auth-subtext {
		margin-top: -16px;
		font-size: var(--text-base);
		color: var(--text-secondary);
		letter-spacing: var(--tracking-wide);
	}

	.auth-error {
		padding: 10px 14px;
		background: var(--error-bg);
		border: 1px solid var(--error-border);
		border-radius: var(--radius-sm);
		color: var(--error);
		font-size: var(--text-sm);
		font-family: var(--font-mono);
		letter-spacing: var(--tracking-wide);
	}

	.auth-success {
		padding: 16px;
		background: var(--bg-neutral);
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		color: var(--text-primary);
		font-size: var(--text-sm);
		line-height: 1.6;
	}

	.auth-success p {
		margin: 0;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.auth-field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.auth-label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: var(--weight-medium);
		letter-spacing: var(--tracking-wider);
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.auth-input {
		font-family: var(--font-primary);
		font-size: var(--text-base);
		color: var(--text-primary);
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: 12px 14px;
		outline: none;
		transition:
			border-color var(--dur) var(--ease),
			box-shadow var(--dur) var(--ease);
	}

	.auth-input::placeholder {
		color: var(--text-tertiary);
	}

	.auth-input:focus {
		border-color: var(--accent);
		box-shadow: inset 0 0 0 1px var(--accent);
	}

	.auth-btn {
		margin-top: 4px;
		padding: 12px;
		border: none;
		border-radius: var(--radius-sm);
		background: var(--accent);
		color: #fff;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: var(--weight-medium);
		letter-spacing: var(--tracking-wider);
		text-transform: uppercase;
		cursor: pointer;
		transition:
			background var(--dur) var(--ease),
			transform var(--dur) var(--ease);
	}

	.auth-btn:hover {
		background: var(--accent-hover);
		transform: translateY(-1px);
	}

	.auth-btn:active {
		transform: translateY(0);
	}

	.auth-links {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: var(--tracking-wide);
	}

	.auth-links a {
		color: var(--text-secondary);
		text-decoration: none;
		transition: color var(--dur) var(--ease);
	}

	.auth-links a:hover {
		color: var(--accent);
	}
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import '$lib/assets/css/fonts.css';
	import '$lib/assets/css/style.css';

	type Theme = 'light' | 'dark';

	let { data, form } = $props();
	let theme = $state<Theme>('light');
	let avatarOverride = $state('');
	let avatarPreview = $derived(avatarOverride || data.profile.avatar_url || '');
	let fileInputEl: HTMLInputElement | null = null;

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

	function onAvatarClick() {
		fileInputEl?.click();
	}

	function onFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			avatarOverride = e.target?.result as string;
		};
		reader.readAsDataURL(file);

		// Submit the avatar form
		const form = input.closest('form');
		if (form) form.requestSubmit();
	}

	onMount(() => {
		applyTheme(getPreferredTheme());
	});

	// Update preview when server returns new avatar URL
	$effect(() => {
		if (form?.avatar_url) {
			avatarOverride = form.avatar_url;
		}
	});
</script>

<svelte:head>
	<title>Mitt konto — Johanna 24/7</title>
</svelte:head>

<nav class="navbar">
	<div class="navbar-inner">
		<a href="/" class="navbar-brand">Johanna 24/7</a>
		<div class="navbar-links">
			<a href="/" class="nav-link">Chatta</a>
			<a href="/history" class="nav-link">Historik</a>
			<a href="/account" class="nav-link active">Mitt konto</a>
			<form method="POST" action="/?/logout" style="display:contents">
				<button type="submit" class="nav-link">Logga ut</button>
			</form>
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
	<div class="account-card">
		<h1 class="account-heading">Mitt konto</h1>
		<p class="account-subtext">Hantera din profil och inställningar.</p>

		<!-- Avatar section -->
		<form method="POST" action="?/uploadAvatar" enctype="multipart/form-data" use:enhance class="avatar-section">
			<button type="button" class="avatar-wrapper" onclick={onAvatarClick} aria-label="Byt profilbild">
				{#if avatarPreview}
					<img src={avatarPreview} alt="Profilbild" class="avatar-img" />
				{:else}
					<span class="avatar-placeholder">
						<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
							<circle cx="12" cy="7" r="4" />
						</svg>
					</span>
				{/if}
				<span class="avatar-overlay">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
						<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
						<circle cx="12" cy="13" r="4" />
					</svg>
				</span>
			</button>
			<input
				bind:this={fileInputEl}
				type="file"
				name="avatar"
				accept="image/*"
				class="avatar-file-input"
				onchange={onFileChange}
			/>
			<p class="avatar-hint">Klicka för att byta bild</p>
		</form>

		<!-- Success / error messages -->
		{#if form?.success}
			<div class="account-success">Profilen har sparats.</div>
		{/if}
		{#if form?.error}
			<div class="account-error">{form.error}</div>
		{/if}

		<!-- Profile form -->
		<form method="POST" action="?/updateProfile" use:enhance class="account-form">
			<div class="account-field">
				<label class="account-label" for="display_name">Visningsnamn</label>
				<input
					class="account-input"
					type="text"
					id="display_name"
					name="display_name"
					value={data.profile.display_name}
					placeholder="Ditt namn"
					autocomplete="name"
				/>
			</div>

			<div class="account-field">
				<label class="account-label" for="email">E-postadress</label>
				<input
					class="account-input"
					type="email"
					id="email"
					name="email"
					value={data.email}
					placeholder="din@epost.se"
					autocomplete="email"
				/>
			</div>

			<div class="account-field">
				<label class="account-label" for="phone">Telefonnummer</label>
				<input
					class="account-input"
					type="tel"
					id="phone"
					name="phone"
					value={data.profile.phone}
					placeholder="+46 70 123 45 67"
					autocomplete="tel"
				/>
			</div>

			<div class="account-field">
				<label class="account-label" for="about_me">Om mig</label>
				<textarea
					class="account-input account-textarea"
					id="about_me"
					name="about_me"
					placeholder="Berätta lite om dig själv…"
					rows="4"
				>{data.profile.about_me}</textarea>
			</div>

			<button class="account-btn" type="submit">Spara profil</button>
		</form>

		<!-- Password section -->
		<div class="account-divider"></div>
		<h2 class="account-section-heading">Byt lösenord</h2>

		{#if form?.passwordSuccess}
			<div class="account-success">Lösenordet har uppdaterats.</div>
		{/if}
		{#if form?.passwordError}
			<div class="account-error">{form.passwordError}</div>
		{/if}

		<form method="POST" action="?/updatePassword" use:enhance class="account-form">
			<div class="account-field">
				<label class="account-label" for="new_password">Nytt lösenord</label>
				<input
					class="account-input"
					type="password"
					id="new_password"
					name="new_password"
					placeholder="Minst 6 tecken"
					autocomplete="new-password"
					required
				/>
			</div>

			<div class="account-field">
				<label class="account-label" for="confirm_password">Bekräfta lösenord</label>
				<input
					class="account-input"
					type="password"
					id="confirm_password"
					name="confirm_password"
					placeholder="Upprepa lösenordet"
					autocomplete="new-password"
					required
				/>
			</div>

			<button class="account-btn account-btn-secondary" type="submit">Uppdatera lösenord</button>
		</form>
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
	.account-card {
		width: 100%;
		max-width: 620px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding-top: 12px;
		padding-bottom: 48px;
	}

	.account-heading {
		font-size: clamp(1.8rem, 5vw, var(--text-4xl));
		font-weight: var(--weight-light);
		letter-spacing: var(--tracking-tighter);
		line-height: var(--leading-tight);
		color: var(--text-primary);
		text-align: center;
	}

	.account-subtext {
		margin-top: -12px;
		font-size: var(--text-base);
		color: var(--text-secondary);
		letter-spacing: var(--tracking-wide);
		text-align: center;
	}

	.account-section-heading {
		font-size: var(--text-lg);
		font-weight: var(--weight-light);
		letter-spacing: var(--tracking-tight);
		color: var(--text-primary);
	}

	.account-divider {
		height: 1px;
		background: var(--border);
		margin: 8px 0;
	}

	/* Avatar */
	.avatar-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
	}

	.avatar-wrapper {
		position: relative;
		width: 128px;
		height: 128px;
		border-radius: 50%;
		overflow: hidden;
		cursor: pointer;
		border: 2px solid var(--border);
		background: var(--bg-neutral);
		transition: border-color var(--dur) var(--ease);
		padding: 0;
	}

	.avatar-wrapper:hover {
		border-color: var(--accent);
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-tertiary);
	}

	.avatar-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.45);
		color: #fff;
		opacity: 0;
		transition: opacity var(--dur) var(--ease);
	}

	.avatar-wrapper:hover .avatar-overlay {
		opacity: 1;
	}

	.avatar-file-input {
		display: none;
	}

	.avatar-hint {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-tertiary);
		letter-spacing: var(--tracking-wide);
	}

	/* Form */
	.account-form {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.account-field {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.account-label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: var(--weight-medium);
		letter-spacing: var(--tracking-wider);
		text-transform: uppercase;
		color: var(--text-secondary);
	}

	.account-input {
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

	.account-input::placeholder {
		color: var(--text-tertiary);
	}

	.account-input:focus {
		border-color: var(--accent);
		box-shadow: inset 0 0 0 1px var(--accent);
	}

	.account-textarea {
		resize: none;
		min-height: 100px;
		line-height: var(--leading-normal);
	}

	/* Buttons */
	.account-btn {
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

	.account-btn:hover {
		background: var(--accent-hover);
		transform: translateY(-1px);
	}

	.account-btn:active {
		transform: translateY(0);
	}

	.account-btn-secondary {
		background: var(--bg-dark);
		color: var(--text-on-dark);
	}

	.account-btn-secondary:hover {
		background: var(--text-secondary);
	}

	/* Messages */
	.account-success {
		padding: 10px 14px;
		background: #f0fdf4;
		border: 1px solid #bbf7d0;
		border-radius: var(--radius-sm);
		color: #166534;
		font-size: var(--text-sm);
		font-family: var(--font-mono);
		letter-spacing: var(--tracking-wide);
	}

	:global([data-theme='dark']) .account-success {
		background: #052e16;
		border-color: #14532d;
		color: #86efac;
	}

	.account-error {
		padding: 10px 14px;
		background: var(--error-bg);
		border: 1px solid var(--error-border);
		border-radius: var(--radius-sm);
		color: var(--error);
		font-size: var(--text-sm);
		font-family: var(--font-mono);
		letter-spacing: var(--tracking-wide);
	}

	@media (max-width: 560px) {
		.account-card {
			max-width: 100%;
		}
	}
</style>

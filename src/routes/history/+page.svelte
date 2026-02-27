<script lang="ts">
	import { onMount } from 'svelte';
	import '$lib/assets/css/fonts.css';
	import '$lib/assets/css/icons.css';
	import '$lib/assets/css/style.css';

	type Theme = 'light' | 'dark';

	type Conversation = {
		id: string;
		title: string;
		mode: string;
		created_at: string;
		updated_at: string;
	};

	let { data } = $props();
	const initialConversations = data.conversations;
	let theme = $state<Theme>('light');
	let conversations = $state<Conversation[]>(initialConversations);
	let confirmDeleteId = $state<string | null>(null);

	const modeLabels: Record<string, string> = {
		klassisk: 'Klassisk',
		sjuksyster: 'Sjuksyster',
		debugger: 'Debugger',
		handlaggare: 'Handläggare',
		foliehatt: 'Foliehatt',
		'drama-queen': 'Dramaqueen',
		nattuggla: 'Nattuggla',
		terapeut: 'Terapeut',
		filosof: 'Filosof',
		aktivist: 'Aktivist',
		forsvarare: 'Försvarare',
		hyperfokuserad: 'Hyperfokuserad',
		kapten: 'Kapten',
		morsa: 'Morsa',
		pedagog: 'Pedagog',
		recensent: 'Recensent',
		syrlig: 'Syrlig',
		veteran: 'Veteran',
		forhandlare: 'Förhandlare'
	};

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

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		const now = new Date();
		const diff = now.getTime() - date.getTime();
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));

		if (days === 0) {
			return `Idag ${date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}`;
		} else if (days === 1) {
			return `Igår ${date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}`;
		} else if (days < 7) {
			return date.toLocaleDateString('sv-SE', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
		} else {
			return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' });
		}
	}

	async function deleteConversation(id: string) {
		try {
			await fetch('/api/conversations', {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id })
			});
			conversations = conversations.filter((c) => c.id !== id);
		} catch {
			// Silently fail — user can retry
		}
		confirmDeleteId = null;
	}

	onMount(() => {
		applyTheme(getPreferredTheme());
	});
</script>

<svelte:head>
	<title>Historik — Johanna 24/7</title>
</svelte:head>

<nav class="navbar">
	<div class="navbar-inner">
		<a href="/" class="navbar-brand">Johanna 24/7</a>
		<div class="navbar-links">
			<a href="/" class="nav-link">Chatta</a>
			<a href="/history" class="nav-link active">Historik</a>
			<a href="/account" class="nav-link">Mitt konto</a>
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
	<div class="history-card">
		<h1 class="history-heading">Historik</h1>
		<p class="history-subtext">Dina tidigare konversationer.</p>

		{#if conversations.length === 0}
			<div class="history-empty">
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
					<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
				</svg>
				<p>Inga konversationer ännu.</p>
				<a href="/" class="history-start-btn">Starta en chatt</a>
			</div>
		{:else}
			<ul class="history-list">
				{#each conversations as conv (conv.id)}
					<li class="history-item">
						<a href="/?chat={conv.id}" class="history-link">
							<div class="history-item-top">
								<span class="history-title">{conv.title || 'Namnlös konversation'}</span>
								<span class="history-mode">{modeLabels[conv.mode] ?? conv.mode}</span>
							</div>
							<span class="history-date">{formatDate(conv.updated_at)}</span>
						</a>
						<div class="history-actions">
							{#if confirmDeleteId === conv.id}
								<button class="history-delete-confirm" onclick={() => deleteConversation(conv.id)}>
									Ta bort?
								</button>
								<button class="history-delete-cancel" onclick={() => (confirmDeleteId = null)}>
									Avbryt
								</button>
							{:else}
								<button class="history-delete-btn" onclick={() => (confirmDeleteId = conv.id)} aria-label="Ta bort konversation">
									<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<polyline points="3 6 5 6 21 6"></polyline>
										<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
									</svg>
								</button>
							{/if}
						</div>
					</li>
				{/each}
			</ul>
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
	.history-card {
		width: 100%;
		max-width: 620px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding-top: 12px;
		padding-bottom: 48px;
	}

	.history-heading {
		font-size: clamp(1.8rem, 5vw, var(--text-4xl));
		font-weight: var(--weight-light);
		letter-spacing: var(--tracking-tighter);
		line-height: var(--leading-tight);
		color: var(--text-primary);
		text-align: center;
	}

	.history-subtext {
		margin-top: -12px;
		font-size: var(--text-base);
		color: var(--text-secondary);
		letter-spacing: var(--tracking-wide);
		text-align: center;
	}

	/* Empty state */
	.history-empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12px;
		padding: 48px 0;
		color: var(--text-tertiary);
	}

	.history-empty p {
		font-size: var(--text-base);
		color: var(--text-secondary);
	}

	.history-start-btn {
		margin-top: 8px;
		padding: 10px 24px;
		border-radius: var(--radius-sm);
		background: var(--accent);
		color: #fff;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: var(--weight-medium);
		letter-spacing: var(--tracking-wider);
		text-transform: uppercase;
		text-decoration: none;
		transition:
			background var(--dur) var(--ease),
			transform var(--dur) var(--ease);
	}

	.history-start-btn:hover {
		background: var(--accent-hover);
		transform: translateY(-1px);
	}

	/* List */
	.history-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.history-item {
		display: flex;
		align-items: center;
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--bg-surface);
		transition:
			border-color var(--dur) var(--ease),
			box-shadow var(--dur) var(--ease);
	}

	.history-item:hover {
		border-color: var(--accent);
	}

	.history-link {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: 14px 16px;
		text-decoration: none;
		color: inherit;
		min-width: 0;
	}

	.history-item-top {
		display: flex;
		align-items: center;
		gap: 10px;
		min-width: 0;
	}

	.history-title {
		font-size: var(--text-base);
		font-weight: var(--weight-medium);
		color: var(--text-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		flex: 1;
		min-width: 0;
	}

	.history-mode {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-tertiary);
		letter-spacing: var(--tracking-wide);
		white-space: nowrap;
		padding: 2px 8px;
		border-radius: var(--radius-sm);
		background: var(--bg-neutral);
	}

	.history-date {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--text-tertiary);
		letter-spacing: var(--tracking-wide);
	}

	/* Actions */
	.history-actions {
		display: flex;
		align-items: center;
		gap: 4px;
		padding-right: 12px;
		flex-shrink: 0;
	}

	.history-delete-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: none;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--text-tertiary);
		cursor: pointer;
		transition:
			color var(--dur) var(--ease),
			background var(--dur) var(--ease);
	}

	.history-delete-btn:hover {
		color: var(--error);
		background: var(--error-bg);
	}

	.history-delete-confirm {
		padding: 4px 10px;
		border: none;
		border-radius: var(--radius-sm);
		background: var(--error);
		color: #fff;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: var(--weight-medium);
		letter-spacing: var(--tracking-wide);
		cursor: pointer;
		transition: background var(--dur) var(--ease);
	}

	.history-delete-confirm:hover {
		opacity: 0.9;
	}

	.history-delete-cancel {
		padding: 4px 10px;
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--text-secondary);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		letter-spacing: var(--tracking-wide);
		cursor: pointer;
		transition:
			border-color var(--dur) var(--ease),
			color var(--dur) var(--ease);
	}

	.history-delete-cancel:hover {
		border-color: var(--text-secondary);
		color: var(--text-primary);
	}

	@media (max-width: 560px) {
		.history-card {
			max-width: 100%;
		}
	}
</style>

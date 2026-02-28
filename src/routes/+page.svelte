<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import '$lib/assets/css/fonts.css';
	import '$lib/assets/css/icons.css';
	import '$lib/assets/css/style.css';
	import womanLaptop from '$lib/assets/images/woman-laptop.svg';

	type Theme = 'light' | 'dark';
	type Message = { role: 'user' | 'assistant'; content: string };

	let { data } = $props();

	let textareaEl: HTMLTextAreaElement | null = null;
	let chatLogEl = $state<HTMLDivElement | null>(null);
	const initialConversation = data.conversation;
	const initialMessages = data.messages;

	let message = $state('');
	let currentMode = $state(initialConversation?.mode ?? 'klassisk');
	let theme = $state<Theme>('light');
	let messages = $state<Message[]>(initialMessages ?? []);
	let isLoading = $state(false);
	let error = $state('');
	let conversationId = $state<string | null>(initialConversation?.id ?? null);
	let titleGenerated = $state(!!initialConversation?.title);

	const canSend = $derived(message.trim().length > 0 && !isLoading);
	const hasMessages = $derived(messages.length > 0);

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

	async function scrollToBottom() {
		await tick();
		if (chatLogEl) {
			chatLogEl.scrollTop = chatLogEl.scrollHeight;
		}
	}

	async function ensureConversation(): Promise<string> {
		if (conversationId) return conversationId;

		const res = await fetch('/api/conversations', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ mode: currentMode })
		});

		const { id } = await res.json();
		conversationId = id;
		return id;
	}

	async function saveMessages(convId: string, msgs: Message[]) {
		await fetch(`/api/conversations/${convId}/messages`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ messages: msgs })
		});
	}

	async function generateTitle(convId: string) {
		if (titleGenerated) return;
		titleGenerated = true;

		try {
			const res = await fetch('/api/chat/title', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: messages.slice(0, 4) })
			});

			const { title } = await res.json();

			await fetch('/api/conversations', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: convId, title })
			});
		} catch {
			// Title generation is non-critical
		}
	}

	async function send() {
		const text = message.trim();
		if (!text || isLoading) return;

		error = '';
		messages.push({ role: 'user', content: text });
		message = '';
		isLoading = true;

		await scrollToBottom();

		// Add placeholder for assistant response
		messages.push({ role: 'assistant', content: '' });
		const assistantIndex = messages.length - 1;

		try {
			const convId = await ensureConversation();

			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: messages.slice(0, -1).map((m) => ({ role: m.role, content: m.content })),
					mode: currentMode
				})
			});

			if (!res.ok) {
				throw new Error(`Servern svarade med ${res.status}`);
			}

			const reader = res.body?.getReader();
			if (!reader) throw new Error('Kunde inte läsa svar från servern');

			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value, { stream: true });
				messages[assistantIndex].content += chunk;
				await scrollToBottom();
			}

			// Save the user + assistant messages to the database
			const userMsg = messages[assistantIndex - 1];
			const assistantMsg = messages[assistantIndex];
			await saveMessages(convId, [userMsg, assistantMsg]);

			// Generate title after first exchange
			if (messages.length === 2) {
				generateTitle(convId);
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Något gick fel';
			// Remove the empty assistant message on error
			if (messages[assistantIndex].content === '') {
				messages.splice(assistantIndex, 1);
			}
		} finally {
			isLoading = false;
			textareaEl?.focus();
		}
	}

	function startNewChat() {
		messages = [];
		conversationId = null;
		titleGenerated = false;
		currentMode = 'klassisk';
		error = '';
		message = '';
		// Update URL without reloading
		goto('/', { replaceState: true });
	}

	function onTextareaKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			if (canSend) send();
		}
	}

	onMount(() => {
		applyTheme(getPreferredTheme());
		if (hasMessages) {
			scrollToBottom();
		}
		textareaEl?.focus();
	});

	$effect(() => {
		if (!textareaEl) return;
		message;

		textareaEl.style.height = 'auto';
		textareaEl.style.height = `${textareaEl.scrollHeight}px`;
	});

	$effect(() => {
		document.body.classList.toggle('chat-active', hasMessages);
	});
</script>

<svelte:head>
	<title>Johanna 24/7</title>
</svelte:head>

<!-- Navbar -->
	<nav class="navbar">
		<div class="navbar-inner">
			<a href="/" class="navbar-brand">Johanna 24/7</a>
			<div class="navbar-links">
			<a href="/" class="nav-link active">Chatta</a>
			<a href="/history" class="nav-link">Historik</a>
			<a href="/account" class="nav-link">Mitt konto</a>
				<form method="POST" action="?/logout" style="display:contents">
					<button type="submit" class="nav-link">Logga ut</button>
				</form>
				<button class="theme-toggle" aria-label="Toggle dark mode" onclick={toggleTheme}>
					<span class="fa-sun icon-sun" aria-hidden="true"></span>
					<span class="fa-moon icon-moon" aria-hidden="true"></span>
				</button>
			</div>
	</div>
</nav>

<!-- Main -->
<main class="main" class:has-messages={hasMessages}>
	<div class="main-inner">
		{#if !hasMessages}
			<section class="greeting">
				<img src={womanLaptop} alt="Avatar" class="greeting-avatar" />
				<h1 class="greeting-headline">Hej! Jag heter Johanna<span class="dot">.</span></h1>
				<p class="greeting-sub">Hur kan jag hjälpa dig idag?</p>
			</section>
		{/if}

		{#if hasMessages}
			<div class="chat-log" bind:this={chatLogEl}>
				{#each messages as msg}
					<div class="chat-bubble {msg.role}">
						{#if msg.role === 'assistant' && msg.content === '' && isLoading}
							<span class="typing-indicator">
								<span></span><span></span><span></span>
							</span>
						{:else}
							{msg.content}
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		{#if error}
			<p class="chat-error">{error}</p>
		{/if}

		<div class="input-area">
			<div class="input-wrapper">
				<textarea
					bind:this={textareaEl}
					bind:value={message}
					class="chat-input"
					placeholder="Skriv ditt meddelande…"
					rows="1"
					aria-label="Message input"
					disabled={isLoading}
					onkeydown={onTextareaKeydown}
				></textarea>
				<button class="send-btn" aria-label="Send message" disabled={!canSend} onclick={send}>
					<span class="fa-paper-plane-top" aria-hidden="true"></span>
				</button>
			</div>
			<div class="input-meta">
				<p class="input-disclaimer">
					<span class="fa-circle-info" aria-hidden="true"></span>
					AI kan generera felaktig information
				</p>
				<div class="input-meta-right">
					{#if hasMessages}
						<button class="new-chat-btn" onclick={startNewChat}>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<line x1="12" y1="5" x2="12" y2="19"></line>
								<line x1="5" y1="12" x2="19" y2="12"></line>
							</svg>
							Ny chatt
						</button>
					{/if}
					<label class="mode-inline" for="mode-select">
						<span class="mode-inline-label">Läge:</span>
						<span class="mode-inline-select-wrap">
							<select
								id="mode-select"
								class="mode-select"
								aria-label="Select AI mode"
								bind:value={currentMode}
							>
								<option value="klassisk">Klassisk</option>
								<option value="sjuksyster">Sjuksyster</option>
								<option value="debugger">Debugger</option>
								<option value="handlaggare">Handläggare</option>
								<option value="foliehatt">Foliehatt</option>
								<option value="drama-queen">Dramaqueen</option>
								<option value="nattuggla">Nattuggla</option>
								<option value="terapeut">Terapeut</option>
								<option value="filosof">Filosof</option>
								<option value="aktivist">Aktivist</option>
								<option value="forsvarare">Försvarare</option>
								<option value="hyperfokuserad">Hyperfokuserad</option>
								<option value="kapten">Kapten</option>
								<option value="morsa">Morsa</option>
								<option value="pedagog">Pedagog</option>
								<option value="recensent">Recensent</option>
								<option value="syrlig">Syrlig</option>
								<option value="veteran">Veteran</option>
								<option value="forhandlare">Förhandlare</option>
							</select>
							<svg
								class="mode-select-icon"
								width="12"
								height="12"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<polyline
									points="6 9 12 15 18 9"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								></polyline>
							</svg>
						</span>
					</label>
				</div>
			</div>
		</div>
	</div>
</main>

<!-- Footer -->
<footer class="footer">
	<div class="footer-inner">
		<span class="footer-copy">© 2025 Chat</span>
		<span class="footer-sep">·</span>
		<a href="/terms" class="footer-link">Terms</a>
		<span class="footer-sep">·</span>
		<a href="/privacy" class="footer-link">Privacy</a>
	</div>
</footer>

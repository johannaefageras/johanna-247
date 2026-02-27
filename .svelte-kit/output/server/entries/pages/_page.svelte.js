import { h as head, a as attr, e as escape_html, a0 as derived } from '../../chunks/index.js';
const womanLaptop = '/_app/immutable/assets/woman-laptop.DuxNV_n4.svg';
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let message = '';
    let currentMode = 'classic';
    const canSend = derived(() => message.trim().length > 0);
    head('1uha8ag', $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Johanna 24/7</title>`);
      });
    });
    $$renderer2.push(
      `<nav class="navbar"><div class="navbar-inner"><a href="#" class="navbar-brand">Johanna 24/7</a> <div class="navbar-links"><a href="#" class="nav-link active">New</a> <a href="#" class="nav-link">History</a> <button class="theme-toggle" aria-label="Toggle dark mode"><svg class="icon-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> <svg class="icon-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></button></div></div></nav> <main class="main"><div class="main-inner"><section class="greeting"><img${attr('src', womanLaptop)} alt="Avatar" class="greeting-avatar"/> <h1 class="greeting-headline">Hej! Jag heter Johanna<span class="dot">.</span></h1> <p class="greeting-sub">Hur kan jag hjälpa dig idag?</p></section> <div class="input-area"><div class="input-wrapper"><textarea class="chat-input" placeholder="Skriv ditt meddelande…" rows="1" aria-label="Message input">`
    );
    const $$body = escape_html(message);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(
      `</textarea> <button class="send-btn" aria-label="Send message"${attr('disabled', !canSend(), true)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg></button></div> <div class="input-meta"><p class="input-hint"><kbd>↵</kbd> to send · AI kan generera felaktig information</p> <label class="mode-inline" for="mode-select"><span class="mode-inline-label">Mode:</span> <span class="mode-inline-select-wrap">`
    );
    $$renderer2.select(
      {
        id: 'mode-select',
        class: 'mode-select',
        'aria-label': 'Select AI mode',
        value: currentMode
      },
      ($$renderer3) => {
        $$renderer3.option({ value: 'classic' }, ($$renderer4) => {
          $$renderer4.push(`Classic`);
        });
        $$renderer3.option({ value: 'philosophic' }, ($$renderer4) => {
          $$renderer4.push(`Philosophic`);
        });
        $$renderer3.option({ value: 'therapeutic' }, ($$renderer4) => {
          $$renderer4.push(`Therapeutic`);
        });
        $$renderer3.option({ value: 'debugger' }, ($$renderer4) => {
          $$renderer4.push(`Debugger`);
        });
        $$renderer3.option({ value: 'nurse' }, ($$renderer4) => {
          $$renderer4.push(`Nurse`);
        });
        $$renderer3.option({ value: 'creative' }, ($$renderer4) => {
          $$renderer4.push(`Creative`);
        });
        $$renderer3.option({ value: 'socratic' }, ($$renderer4) => {
          $$renderer4.push(`Socratic`);
        });
        $$renderer3.option({ value: 'mentor' }, ($$renderer4) => {
          $$renderer4.push(`Mentor`);
        });
        $$renderer3.option({ value: 'poet' }, ($$renderer4) => {
          $$renderer4.push(`Poet`);
        });
        $$renderer3.option({ value: 'analyst' }, ($$renderer4) => {
          $$renderer4.push(`Analyst`);
        });
        $$renderer3.option({ value: 'comedian' }, ($$renderer4) => {
          $$renderer4.push(`Comedian`);
        });
        $$renderer3.option({ value: 'scientist' }, ($$renderer4) => {
          $$renderer4.push(`Scientist`);
        });
        $$renderer3.option({ value: 'coach' }, ($$renderer4) => {
          $$renderer4.push(`Coach`);
        });
        $$renderer3.option({ value: 'storyteller' }, ($$renderer4) => {
          $$renderer4.push(`Storyteller`);
        });
        $$renderer3.option({ value: 'minimalist' }, ($$renderer4) => {
          $$renderer4.push(`Minimalist`);
        });
        $$renderer3.option({ value: 'explorer' }, ($$renderer4) => {
          $$renderer4.push(`Explorer`);
        });
      }
    );
    $$renderer2.push(
      ` <svg class="mode-select-icon" width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline></svg></span></label></div></div></div></main> <footer class="footer"><div class="footer-inner"><span class="footer-copy">© 2025 Chat</span> <span class="footer-sep">·</span> <a href="#" class="footer-link">Terms</a> <span class="footer-sep">·</span> <a href="#" class="footer-link">Privacy</a></div></footer>`
    );
  });
}
export { _page as default };

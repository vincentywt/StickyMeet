// Shared waitlist handler for every style page.
// Set WAITLIST_ENDPOINT to any URL that accepts a JSON POST (Formspree, a Supabase
// edge function, a webhook...). While it is empty, signups are kept in this
// browser's localStorage only, so the page works as a demo.
const WAITLIST_ENDPOINT = '';

(function () {
  function save(entry) {
    try {
      const list = JSON.parse(localStorage.getItem('stickymeet-waitlist') || '[]');
      list.push(entry);
      localStorage.setItem('stickymeet-waitlist', JSON.stringify(list));
    } catch (e) { /* storage blocked: demo mode only */ }
  }

  document.querySelectorAll('form[data-waitlist]').forEach(function (form) {
    const status = form.querySelector('[data-status]');
    const button = form.querySelector('button[type="submit"], button:not([type])');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      data.style = form.dataset.waitlist;
      data.submitted_at = new Date().toISOString();

      if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        if (status) status.textContent = 'Please enter a valid email.';
        return;
      }

      if (button) button.disabled = true;
      try {
        if (WAITLIST_ENDPOINT) {
          const res = await fetch(WAITLIST_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data),
          });
          if (!res.ok) throw new Error('HTTP ' + res.status);
        } else {
          save(data);
        }
        form.reset();
        form.classList.add('is-done');
        if (status) status.textContent = form.dataset.success || "You're on the list. We'll be in touch before launch.";
      } catch (err) {
        if (status) status.textContent = 'Something went wrong. Please try again.';
      } finally {
        if (button) button.disabled = false;
      }
    });
  });
})();

// Contact form: no backend — store form in localStorage and show a confirmation
function handleSubmit(e){
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !message) return;

  // Save to localStorage as "submissions"
  const existing = JSON.parse(localStorage.getItem('submissions') || '[]');
  existing.push({ name, email, message, time: new Date().toISOString() });
  localStorage.setItem('submissions', JSON.stringify(existing));

  document.getElementById('formStatus').textContent = 'Thanks — message saved locally (no backend).';
  e.target.reset();
  setTimeout(()=> document.getElementById('formStatus').textContent = '', 4000);
}

// QUOTES: optional — fetch real-time quote from a public API
async function fetchQuote(){
  const quoteEl = document.getElementById('quote');
  const authorEl = document.getElementById('author');
  quoteEl.textContent = 'Loading...';
  authorEl.textContent = '';
  try {
    // Using a public quotes API (e.g. quotable.io)
    const res = await fetch('https://api.quotable.io/random');
    if(!res.ok) throw new Error('quote fetch failed');
    const data = await res.json();
    quoteEl.textContent = data.content;
    authorEl.textContent = `— ${data.author}`;
  } catch (err) {
    quoteEl.textContent = 'Could not load a quote. Please try again.';
  }
}

document.getElementById('getQuoteBtn').addEventListener('click', fetchQuote);
window.handleSubmit = handleSubmit;

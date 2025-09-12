// Client-side form validation (no database, no server request)
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const el = id => document.getElementById(id);

  const validators = {
    name: value => {
      if(!value) return 'Name is required.';
      if(value.trim().length < 2) return 'Name must be at least 2 characters.';
      if(value.length > 60) return 'Name must be at most 60 characters.';
      return '';
    },
    email: value => {
      if(!value) return 'Email is required.';
      // Simple email pattern (for demo purposes)
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value);
      return ok ? '' : 'Please enter a valid email address.';
    },
    topic: value => {
      if(!value) return 'Please choose a topic.';
      return '';
    },
    message: value => {
      if(!value) return 'Message is required.';
      if(value.trim().length < 10) return 'Message must be at least 10 characters.';
      return '';
    },
    agree: checked => checked ? '' : 'You must agree to the demo terms.'
  };

  function showError(id, msg){
    el('err-' + id).textContent = msg;
  }

  // Real-time validation
  el('name').addEventListener('input', e => showError('name', validators.name(e.target.value)));
  el('email').addEventListener('input', e => showError('email', validators.email(e.target.value)));
  el('topic').addEventListener('change', e => showError('topic', validators.topic(e.target.value)));
  el('message').addEventListener('input', e => showError('message', validators.message(e.target.value)));
  el('agree').addEventListener('change', e => showError('agree', validators.agree(e.target.checked)));

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = el('name').value;
    const email = el('email').value;
    const topic = el('topic').value;
    const message = el('message').value;
    const agree = el('agree').checked;

    const errors = {
      name: validators.name(name),
      email: validators.email(email),
      topic: validators.topic(topic),
      message: validators.message(message),
      agree: validators.agree(agree)
    };

    Object.entries(errors).forEach(([k,v]) => showError(k, v));

    const ok = Object.values(errors).every(v => v === '');
    const success = el('success');
    if(ok){
      success.hidden = false;
      // Optionally clear the form after a moment
      setTimeout(()=>{ form.reset(); }, 800);
    }else{
      success.hidden = true;
      // Scroll to first error
      const firstErr = Object.keys(errors).find(k => errors[k] !== '');
      if(firstErr){
        const field = el(firstErr);
        field?.focus();
      }
    }
  });
})();

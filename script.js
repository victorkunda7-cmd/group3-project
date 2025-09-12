// General site JS
document.addEventListener('DOMContentLoaded', ()=>{
  // Year in footer
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // Copy buttons
  document.querySelectorAll('.copy').forEach(btn=>{
    btn.addEventListener('click', async ()=>{
      const code = document.querySelector(btn.dataset.clip)?.innerText || '';
      try{
        await navigator.clipboard.writeText(code);
        const txt = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(()=>btn.textContent = txt, 1200);
      }catch(_){}
    });
  });
});

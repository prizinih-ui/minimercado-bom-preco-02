(function() {
  const el = document.getElementById('saudacao');
  if (!el) return;
  const h = new Date().getHours();
  const t = h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  el.textContent = t;
})();
(function () {
  'use strict'
  const form = document.getElementById('formCadastro');
  if (!form) return;
  const data = document.getElementById('data');
  const hoje = new Date(); hoje.setHours(0,0,0,0);
  data.min = hoje.toISOString().slice(0,10);
  form.addEventListener('submit', function (event) {
    const hora = document.getElementById('hora').value;
    const [hh, mm] = hora ? hora.split(':').map(Number) : [0,0];
    const okHora = (hh > 8 || (hh === 8 && mm >= 0)) && (hh < 20 || (hh === 20 && mm === 0));
    if (!okHora) { document.getElementById('hora').setCustomValidity('Fora do horário'); }
    else { document.getElementById('hora').setCustomValidity(''); }
    const d = new Date(data.value + 'T00:00');
    if (isNaN(d.getTime()) || d < hoje) { data.setCustomValidity('Data inválida'); }
    else { data.setCustomValidity(''); }
    if (!form.checkValidity()) { event.preventDefault(); event.stopPropagation(); }
    else {
      event.preventDefault();
      const servico = form.servico.value === 'tele' ? 'Tele-entrega' : 'Retirada no local';
      const resumo = `Cadastro confirmado! Serviço: ${servico} em ${data.value} às ${hora}.`;
      const res = document.getElementById('resultado');
      res.textContent = resumo; res.classList.remove('d-none');
      document.getElementById('announce').textContent = resumo;
      form.classList.remove('was-validated'); form.reset();
      data.min = hoje.toISOString().slice(0,10);
    }
    form.classList.add('was-validated')
  }, false)
})();
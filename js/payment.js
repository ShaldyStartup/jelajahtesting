(() => {
  const methods = window.JelajahData.paymentProviders;
  const dueText = deadline => deadline.toLocaleString('id-ID', {dateStyle:'long', timeStyle:'short'});

  function page(b) {
    const p = packages.find(v => v.id === b.packageId);
    const deadline = new Date(b.paymentDeadline || new Date(b.createdAt).getTime() + 86400000);
    if (Date.now() > deadline.getTime() && b.bookingStatus === 'waiting_payment') {
      b.bookingStatus = 'expired';
      b.paymentStatus = 'expired';
      save('jelajah-bookings', bookings);
    }
    const canPay = b.bookingStatus === 'waiting_payment';
    return shell(`<section class="flow-page section"><div class="container">
      <p class="eyebrow">TINGGAL SATU LANGKAH</p>
      <h1>Selesaikan <em>pembayaran.</em></h1>
      ${stepper(2)}
      <div class="flow-layout payment-flow"><div class="flow-main"><div class="form-panel payment-panel">
        <p class="eyebrow">02 / DETAIL PEMBAYARAN</p>
        <h2>${canPay?'Pilih cara membayar.':'Status pembayaranmu.'}</h2>
        <p class="payment-lead">Total ${money(b.total)} · Bayar sebelum ${dueText(deadline)}</p>
        ${canPay?`
        <div class="payment-mini-steps" aria-label="Tahap pembayaran">
          <span data-payment-step="method" class="active">01 Metode</span>
          <span data-payment-step="provider">02 Provider</span>
          <span data-payment-step="instruction">03 Bayar</span>
        </div>
        <div id="payment-select-stage">
          <fieldset class="payment-choice"><legend>01 / Pilih metode pembayaran</legend>
            <div class="payment-methods">${Object.entries(methods).map(([id,method])=>`
              <label class="method"><input type="radio" name="payment-method" value="${id}">
                <span><strong>${esc(method.label)}</strong><small>${esc(method.description)}</small></span>
              </label>`).join('')}</div>
          </fieldset>
          <fieldset class="payment-choice provider-stage" id="provider-stage" hidden>
            <legend>02 / Pilih bank atau provider</legend>
            <div id="provider-options" class="provider-options"></div>
          </fieldset>
          <button id="payment-next" class="button payment-next" type="button" disabled>Lanjutkan pembayaran ↗</button>
        </div>
        <div id="instruction-stage" hidden>
          <button id="payment-change" class="payment-change" type="button">← Ubah metode pembayaran</button>
          <div class="payment-instructions">
            <p class="eyebrow">INSTRUKSI PEMBAYARAN · SIMULASI</p>
            <h3 id="instruction-name"></h3>
            <span class="instruction-label" id="instruction-number-label"></span>
            <div class="instruction-number-row"><strong id="instruction-number"></strong>
              <button id="copy-payment-number" type="button" aria-live="polite"></button></div>
            <p id="instruction-holder"></p>
            <p id="instruction-help"></p>
            <div class="instruction-total"><span>Total pembayaran</span><strong>${money(b.total)}</strong></div>
            <div class="instruction-deadline"><span>Batas pembayaran</span><strong>${dueText(deadline)}</strong></div>
          </div>
          <form id="payment-proof-form">
            <p class="eyebrow">BUKTI PEMBAYARAN</p>
            <label class="upload payment-upload" id="upload-zone">Pilih berkas atau seret ke sini
              <input id="proof" type="file" accept=".jpg,.jpeg,.png,.pdf">
              <small>JPG, PNG, atau PDF · maksimal 5 MB</small>
            </label>
            <div id="proof-selected" class="proof-selected" hidden>
              <strong id="proof-filename"></strong>
              <img id="proof-preview" alt="Pratinjau bukti pembayaran" hidden>
              <button id="proof-remove" type="button">Hapus berkas</button>
            </div>
            <div id="payment-error" class="form-error" role="alert"></div>
            <button class="button button-full" id="submit-proof" disabled>Kirim bukti pembayaran ↗</button>
          </form>
        </div>`:`<div class="payment-state">${badge(b.bookingStatus)} ${badge(b.paymentStatus)}<p>Pembayaran untuk booking ini tidak dapat dikirim lagi.</p><a class="button" href="#/my-trip">Lihat My Trip ↗</a></div>`}
      </div></div>
      <aside class="summary-card"><img src="${p.images[0]}" alt="${esc(p.name)}"><div class="summary-content">
        <p class="eyebrow">PESANAN #${esc(b.id)}</p><h3>${esc(p.name)}</h3>
        <p>${date(b.departureDate)} · ${b.participantCount} peserta</p>
        <div class="summary-lines"><div><span>Subtotal</span><strong>${money(b.subtotal)}</strong></div>
          <div><span>Diskon</span><strong>${b.discount?'−':''}${money(b.discount)}</strong></div>
          <div class="total"><span>Total bayar</span><strong>${money(b.total)}</strong></div></div>
        ${badge(b.bookingStatus)}
      </div></aside></div></div></section>`);
  }

  function bind() {
    const stage = document.querySelector('#payment-select-stage');
    if (!stage) return;
    const $ = selector => document.querySelector(selector);
    const providerStage = $('#provider-stage');
    const providers = $('#provider-options');
    const next = $('#payment-next');
    const instructions = $('#instruction-stage');
    const proofInput = $('#proof');
    const submit = $('#submit-proof');
    let selectedMethod = null, selectedProvider = null, selectedProof = null, previewUrl = null;

    function progress(step) {
      const order = ['method','provider','instruction'];
      document.querySelectorAll('[data-payment-step]').forEach(item => {
        const position = order.indexOf(item.dataset.paymentStep);
        item.classList.toggle('active',position === order.indexOf(step));
        item.classList.toggle('done',position < order.indexOf(step));
      });
    }
    function clearProof() {
      selectedProof = null;
      proofInput.value = '';
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = null;
      $('#proof-preview').hidden = true;
      $('#proof-preview').removeAttribute('src');
      $('#proof-selected').hidden = true;
      $('#proof-filename').textContent = '';
      $('#payment-error').textContent = '';
      submit.disabled = true;
    }
    function chooseProof(file) {
      clearProof();
      if (!file) return;
      const validType = ['image/jpeg','image/png','application/pdf'].includes(file.type) || /\.(jpe?g|png|pdf)$/i.test(file.name);
      if (!validType || file.size > 5*1024*1024) {
        $('#payment-error').textContent = 'Gunakan JPG, PNG, atau PDF maksimal 5 MB.';
        return;
      }
      selectedProof = file;
      $('#proof-filename').textContent = `${file.name} · ${(file.size/1024).toFixed(0)} KB`;
      $('#proof-selected').hidden = false;
      if (file.type.startsWith('image/')) {
        previewUrl = URL.createObjectURL(file);
        $('#proof-preview').src = previewUrl;
        $('#proof-preview').hidden = false;
      }
      submit.disabled = false;
    }

    document.querySelectorAll('input[name="payment-method"]').forEach(input => input.addEventListener('change', () => {
      selectedMethod = input.value;
      selectedProvider = null;
      providerStage.hidden = false;
      providers.innerHTML = methods[selectedMethod].providers.map(provider => `
        <label class="provider-card"><input type="radio" name="payment-provider" value="${provider.id}">
          <span>${esc(provider.name)}</span></label>`).join('');
      next.disabled = true;
      progress('provider');
    }));
    providers.addEventListener('change', event => {
      if (event.target.name !== 'payment-provider') return;
      selectedProvider = methods[selectedMethod].providers.find(p => p.id === event.target.value);
      next.disabled = !selectedProvider;
    });
    next.addEventListener('click', () => {
      if (!selectedMethod || !selectedProvider) return;
      $('#instruction-name').textContent = selectedProvider.name;
      $('#instruction-number-label').textContent = selectedMethod === 'virtual_account' ? 'Nomor virtual account' : selectedMethod === 'ewallet' ? 'Nomor e-wallet' : 'Nomor rekening';
      $('#instruction-number').textContent = selectedProvider.number;
      $('#instruction-holder').textContent = selectedProvider.holder ? `a.n. ${selectedProvider.holder}` : '';
      $('#instruction-help').textContent = selectedProvider.instruction;
      $('#copy-payment-number').textContent = selectedMethod === 'virtual_account' ? 'Salin nomor VA' : selectedMethod === 'ewallet' ? 'Salin nomor e-wallet' : 'Salin nomor rekening';
      stage.hidden = true;
      instructions.hidden = false;
      progress('instruction');
      instructions.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    });
    $('#payment-change').addEventListener('click', () => {
      instructions.hidden = true;
      stage.hidden = false;
      providerStage.hidden = true;
      providers.replaceChildren();
      document.querySelectorAll('input[name="payment-method"]').forEach(input => input.checked = false);
      selectedMethod = null;
      selectedProvider = null;
      next.disabled = true;
      clearProof();
      progress('method');
      $('.payment-panel').scrollIntoView({block:'start',behavior:'instant'});
    });
    $('#copy-payment-number').addEventListener('click', async event => {
      const number = selectedProvider?.number.replace(/\s/g,'');
      if (!number) return;
      const temp = document.createElement('textarea');
      temp.value = number;
      temp.style.position = 'fixed';
      temp.style.opacity = '0';
      document.body.append(temp);
      temp.focus();
      temp.select();
      let copied = document.execCommand('copy');
      temp.remove();
      if (navigator.clipboard?.writeText) {
        try {
          const write = navigator.clipboard.writeText(number);
          if (copied) write.catch(() => {});
          else { await write; copied = true; }
        } catch {}
      }
      if (copied) {
        const button = event.currentTarget, old = button.textContent;
        button.textContent = 'Tersalin ✓';
        setTimeout(() => {if (button.isConnected) button.textContent = old},1800);
      } else toast('Nomor belum dapat disalin. Pilih dan salin secara manual.');
    });
    proofInput.addEventListener('change', () => chooseProof(proofInput.files[0]));
    const upload = $('#upload-zone');
    upload.addEventListener('dragover', event => {event.preventDefault();upload.classList.add('dragging')});
    upload.addEventListener('dragleave', () => upload.classList.remove('dragging'));
    upload.addEventListener('drop', event => {event.preventDefault();upload.classList.remove('dragging');chooseProof(event.dataTransfer.files[0])});
    $('#proof-remove').addEventListener('click', clearProof);
    $('#payment-proof-form').addEventListener('submit', async event => {
      event.preventDefault();
      if (!selectedProof || !selectedMethod || !selectedProvider) return;
      const b = bookings.find(v => route() === '/payment/' + v.id);
      if (Date.now() > new Date(b.paymentDeadline || new Date(b.createdAt).getTime() + 86400000).getTime()) {
        b.bookingStatus = 'expired';
        b.paymentStatus = 'expired';
        save('jelajah-bookings',bookings);
        render();
        return;
      }
      submit.disabled = true;
      try {
        await storeProof(b.id,selectedProof);
        b.paymentMethod = selectedMethod;
        b.paymentProvider = selectedProvider.id;
        b.proofName = selectedProof.name;
        b.paymentStatus = 'submitted';
        b.bookingStatus = 'waiting_verification';
        save('jelajah-bookings',bookings);
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        toast('Bukti pembayaran berhasil dikirim.');
        go('/booking/' + b.id + '/confirmation');
      } catch {
        $('#payment-error').textContent = 'Bukti belum dapat disimpan di browser ini. Coba lagi.';
        submit.disabled = false;
      }
    });
  }
  window.JelajahPayment = {page,bind};
})();

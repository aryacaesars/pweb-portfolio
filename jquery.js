$(function() {
    $('#contact-form').on('submit', function(e) {
      e.preventDefault();
      let valid = true;
      let messages = [];
  
      // fungsi untuk mengatur maksimal karakter
      const maxName = 50, maxEmail = 50, maxPhone = 15, maxMsgWords = 250;
  
      const name = $('#name').val().trim();
      const email = $('#email').val().trim();
      const phone = $('#phone').val().trim();
      const message = $('#message').val().trim();
  
      // Nama: wajib, hanya huruf dan spasi, tidak boleh angka/karakter khusus
      if (!name) {
        valid = false;
        messages.push('<li>Nama wajib diisi.</li>');
      } else if (!/^[A-Za-z\s]+$/.test(name)) {
        valid = false;
        messages.push('<li>Nama hanya boleh huruf dan spasi, tanpa angka atau karakter khusus.</li>');
      } else if (name.length > maxName) {
        valid = false;
        messages.push('<li>Nama maksimal 50 karakter.</li>');
      }
  
      // Email: wajib, harus mengandung @ dan diakhiri domain .com
      if (!email) {
        valid = false;
        messages.push('<li>Email wajib diisi.</li>');
      } else if (!/^[^\s@]+@[^\s@]+\.com$/.test(email)) {
        valid = false;
        messages.push('<li>Email harus valid dan diakhiri dengan <b>@domain.com</b>.</li>');
      } else if (email.length > maxEmail) {
        valid = false;
        messages.push('<li>Email maksimal 50 karakter.</li>');
      }
  
      // Nomor HP: wajib, hanya angka, 10-15 digit
      if (!phone) {
        valid = false;
        messages.push('<li>Nomor handphone wajib diisi.</li>');
      } else if (!/^\d{10,15}$/.test(phone)) {
        valid = false;
        messages.push('<li>Nomor handphone harus berupa angka 10-15 digit, tanpa huruf atau karakter lain.</li>');
      }
  
      // Pesan: wajib, maksimal 250 kata
      const wordCount = message.split(/\s+/).filter(Boolean).length;
      if (!message) {
        valid = false;
        messages.push('<li>Pesan wajib diisi.</li>');
      } else if (wordCount > maxMsgWords) {
        valid = false;
        messages.push('<li>Pesan maksimal 250 kata.</li>');
      }
  
      // Tampilkan pesan error atau submit
      $('.form-error').remove();
      if (!valid) {
        $(this).prepend(`
          <div class="form-error" style="background:#ffeaea;color:#b71c1c;padding:1rem;border-radius:8px;margin-bottom:1rem;">
            <b>Terjadi kesalahan:</b>
            <ul style="margin:0 0 0 1.2em;padding:0;">${messages.join('')}</ul>
          </div>
        `);
        return false;
      } else {
        // Tampilkan notifikasi sukses
  
        // Tampilkan popup sukses
        $('#popup-success').fadeIn(250);
        this.reset();
        setTimeout(() => {
          $('#popup-success').fadeOut(400);
        }, 2500);
        // Hilangkan notifikasi setelah 3 detik
        setTimeout(() => {
          $('.form-success').fadeOut(400, function() { $(this).remove(); });
        }, 3000);
      }
    });
  
    // Batasi input nama hanya alphabet dan spasi (tidak bisa ketik angka/karakter lain)
    $('#name').on('input', function() {
      this.value = this.value.replace(/[^A-Za-z\s]/g, '');
    });
  
    // Batasi input nomor telepon hanya angka, +, dan - (tidak bisa ketik huruf/karakter lain)
    $('#phone').on('input', function() {
      this.value = this.value.replace(/[^0-9+\-]/g, '');
    });
  
    // Tutup popup jika klik tombol close
    $('#popup-close').on('click', function() {
      $('#popup-success').fadeOut(200);
    });
  });
  // ...existing code...

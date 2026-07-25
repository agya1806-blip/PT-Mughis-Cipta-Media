import { Client } from "pg"
import { config } from "dotenv"

config({ path: ".env" })

const title =
  "PT Mughis Cipta Media Resmi Hadir, Hadirkan Program Apresiasi Penulis dalam Rangka Grand Launching"
const slug = "program-apresiasi-penulis-pt-mughis-cipta-media"
const featuredImage =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"

const content = `
<section class="space-y-6">

  <p class="text-lg leading-8 text-green-dark/90">
    <strong>PT Mughis Cipta Media</strong> — secara resmi mengumumkan kehadirannya sebagai perusahaan penerbitan, percetakan, dan media kreatif yang telah bertransformasi dari Maktabah Al-Mughis. Transformasi ini merupakan langkah strategis untuk menghadirkan layanan yang lebih profesional, terstruktur, dan berdaya saing tinggi dalam ekosistem penerbitan nasional.
  </p>

  <p class="text-lg leading-8 text-green-dark/90">
    Sebagai bagian dari komitmen terhadap dunia literasi Indonesia, PT Mughis Cipta Media dalam rangka Grand Launching menghadirkan <strong>Program Apresiasi Penulis</strong> — sebuah inisiatif perdana yang dirancang untuk mendukung para penulis dalam proses administrasi penerbitan karya mereka.
  </p>

  <div class="rounded-2xl border border-gold/20 bg-gold/5 p-6 my-8">
    <div class="flex items-center gap-3 mb-4">
      <svg class="w-6 h-6 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      <h2 class="text-xl font-bold text-green-dark">Periode Program</h2>
    </div>
    <div class="flex items-center gap-4 text-green-dark/90">
      <svg class="w-5 h-5 text-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
      <p class="text-xl font-bold text-green-dark">26 Juli 2026 — 04 Agustus 2026</p>
    </div>
  </div>

  <h2 class="text-2xl font-bold text-green-dark mt-10 mb-3">Transformasi Perusahaan</h2>
  <p>Maktabah Al-Mughis telah resmi bertransformasi menjadi <strong>PT Mughis Cipta Media</strong>. Perubahan ini bukan sekadar pergantian nama, melainkan peningkatan status badan hukum dari lembaga independen menjadi Perusahaan Terbatas yang terdaftar secara resmi di Pemerintah Republik Indonesia melalui sistem OSS-RBA.</p>
  <p>Dengan identitas hukum yang baru, perusahaan memiliki fondasi yang lebih kokoh untuk menjalankan kegiatan penerbitan, percetakan, dan media kreatif secara profesional dan berkelanjutan. Legalitas yang lengkap — mulai dari NIB, NPWP, hingga izin usaha KBLI 58110 (Penerbitan Buku) — menjadikan PT Mughis Cipta Media sebagai mitra penerbitan yang kredibel dan terpercaya.</p>

  <figure class="my-8 overflow-hidden rounded-2xl border border-gold/20 bg-cream">
    <img src="${featuredImage}" alt="Suasana profesional PT Mughis Cipta Media" class="w-full h-auto object-cover" />
    <figcaption class="px-4 py-3 text-sm text-green/70">PT Mughis Cipta Media hadir sebagai perusahaan penerbitan profesional yang siap mendampingi penulis Indonesia.</figcaption>
  </figure>

  <h2 class="text-2xl font-bold text-green-dark mt-10 mb-3">Mengapa Bertransformasi?</h2>
  <p>Keputusan untuk bertransformasi didorong oleh kebutuhan akan <strong>pelayanan yang lebih profesional, akuntabel, dan berkelanjutan</strong>. Sebagai lembaga independen, Maktabah Al-Mughis telah melayani puluhan penulis dalam menerbitkan karya mereka. Namun, seiring meningkatnya jumlah mitra dan kompleksitas layanan, diperlukan struktur perusahaan yang lebih kuat.</p>
  <p>Dengan status sebagai Perseroan Terbatas, PT Mughis Cipta Media dapat:</p>
  <ul class="space-y-3 pl-5">
    <li class="flex items-start gap-3"><span class="text-gold mt-1 shrink-0">✓</span> Menyediakan layanan penerbitan yang lebih terstruktur dan transparan</li>
    <li class="flex items-start gap-3"><span class="text-gold mt-1 shrink-0">✓</span> Menjalin kemitraan yang lebih luas dengan berbagai pihak industri</li>
    <li class="flex items-start gap-3"><span class="text-gold mt-1 shrink-0">✓</span> Memberikan jaminan legalitas yang jelas bagi setiap proses penerbitan</li>
    <li class="flex items-start gap-3"><span class="text-gold mt-1 shrink-0">✓</span> Mengelola administrasi penerbitan secara lebih profesional dan sesuai ketentuan</li>
  </ul>

  <h2 class="text-2xl font-bold text-green-dark mt-10 mb-3">Komitmen Baru</h2>
  <p>PT Mughis Cipta Media berkomitmen untuk terus meningkatkan kualitas layanan penerbitan dengan standar yang lebih tinggi. Setiap naskah yang masuk akan melalui proses kurasi yang cermat, didampingi oleh tim editorial yang berpengalaman, dan diproduksi dengan kontrol kualitas yang ketat.</p>
  <p>Perusahaan juga berkomitmen untuk mendukung pengembangan literasi nasional melalui penerbitan buku-buku yang berkualitas, baik dari segi isi, desain, maupun produksi. Kolaborasi dengan penulis, akademisi, komunitas literasi, dan mitra industri akan terus diperluas untuk menciptakan ekosistem penerbitan yang sehat dan produktif.</p>

  <blockquote class="border-l-4 border-gold pl-4 italic text-green-dark/85 my-8">
    "Transformasi ini adalah awal dari perjalanan baru. Kami tidak hanya ingin menjadi penerbit buku, tetapi juga mitra strategis bagi para penulis Indonesia dalam mewujudkan karya terbaik mereka."
  </blockquote>

  <h2 class="text-2xl font-bold text-green-dark mt-10 mb-3">Program Apresiasi Penulis</h2>
  <p>Dalam rangka Grand Launching PT Mughis Cipta Media, perusahaan menghadirkan <strong>Program Apresiasi Penulis</strong> — sebuah program perdana yang merupakan bentuk apresiasi kepada para penulis yang ingin menerbitkan karya mereka melalui perusahaan penerbitan yang baru bertransformasi.</p>
  <p>Program ini memberikan pendampingan administrasi penerbitan secara gratis kepada peserta terpilih. Peserta akan memperoleh bimbingan dan asistensi dalam proses administrasi penerbitan sesuai dengan ketentuan yang berlaku. Program ini dirancang untuk membantu penulis, terutama yang baru pertama kali menerbitkan buku, agar dapat menjalani proses penerbitan dengan lebih mudah dan terarah.</p>

  <div class="rounded-2xl border border-gold/20 bg-cream p-6 my-8">
    <h3 class="text-lg font-bold text-green-dark mb-4">Yang Akan Diperoleh Peserta</h3>
    <ul class="space-y-3">
      <li class="flex items-start gap-3">
        <span class="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span class="text-green-dark/90">Pendampingan administrasi penerbitan</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span class="text-green-dark/90">Konsultasi penerbitan</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span class="text-green-dark/90">Pendampingan proses administrasi ISBN sesuai ketentuan yang berlaku</span>
      </li>
      <li class="flex items-start gap-3">
        <span class="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
          <svg class="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span class="text-green-dark/90">Pendampingan komunikasi administrasi hingga proses selesai</span>
      </li>
    </ul>
  </div>

  <h2 class="text-2xl font-bold text-green-dark mt-10 mb-3">Siapa yang Dapat Mengikuti?</h2>
  <p>Program Apresiasi Penulis terbuka bagi berbagai kalangan yang memiliki minat dan semangat dalam dunia literasi. Tidak ada batasan usia atau latar belakang pendidikan tertentu. Program ini dirancang inklusif untuk menjangkau sebanyak mungkin penulis potensial di Indonesia.</p>

  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8">
    <div class="rounded-xl border border-gold/20 bg-cream p-5 text-center hover:border-gold/40 transition-colors">
      <div class="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-3">
        <svg class="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
      </div>
      <p class="text-sm font-semibold text-green-dark">Penulis Pemula</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5 text-center hover:border-gold/40 transition-colors">
      <div class="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-3">
        <svg class="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
      </div>
      <p class="text-sm font-semibold text-green-dark">Mahasiswa</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5 text-center hover:border-gold/40 transition-colors">
      <div class="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-3">
        <svg class="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
      </div>
      <p class="text-sm font-semibold text-green-dark">Guru</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5 text-center hover:border-gold/40 transition-colors">
      <div class="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-3">
        <svg class="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>
      </div>
      <p class="text-sm font-semibold text-green-dark">Dosen</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5 text-center hover:border-gold/40 transition-colors">
      <div class="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-3">
        <svg class="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
      </div>
      <p class="text-sm font-semibold text-green-dark">Penulis Umum</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5 text-center hover:border-gold/40 transition-colors">
      <div class="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-3">
        <svg class="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
      </div>
      <p class="text-sm font-semibold text-green-dark">Komunitas Literasi</p>
    </div>
  </div>

  <h2 class="text-2xl font-bold text-green-dark mt-10 mb-3">Alur Mengikuti Program</h2>
  <p>Proses pendaftaran dan partisipasi dalam Program Apresiasi Penulis dirancang sederhana dan transparan. Berikut adalah tahapan yang akan dilalui oleh setiap peserta:</p>

  <div class="space-y-0 my-8">
    <div class="flex items-start gap-4 pb-8 relative">
      <div class="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0 text-sm font-bold text-green-dark relative z-10">1</div>
      <div class="flex-1">
        <h3 class="text-base font-bold text-green-dark">Daftar</h3>
        <p class="text-sm text-green-dark/80">Isi formulir pendaftaran program secara lengkap melalui halaman pendaftaran.</p>
      </div>
    </div>
    <div class="flex items-start gap-4 pb-8 relative">
      <div class="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0 text-sm font-bold text-green-dark relative z-10">2</div>
      <div class="flex-1">
        <h3 class="text-base font-bold text-green-dark">Verifikasi</h3>
        <p class="text-sm text-green-dark/80">Tim akan memverifikasi data dan berkas yang telah Anda kirimkan.</p>
      </div>
    </div>
    <div class="flex items-start gap-4 pb-8 relative">
      <div class="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0 text-sm font-bold text-green-dark relative z-10">3</div>
      <div class="flex-1">
        <h3 class="text-base font-bold text-green-dark">Admin Menghubungi</h3>
        <p class="text-sm text-green-dark/80">Admin akan menghubungi Anda melalui WhatsApp untuk konfirmasi dan informasi lebih lanjut.</p>
      </div>
    </div>
    <div class="flex items-start gap-4 pb-8 relative">
      <div class="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0 text-sm font-bold text-green-dark relative z-10">4</div>
      <div class="flex-1">
        <h3 class="text-base font-bold text-green-dark">Pengumpulan Dokumen</h3>
        <p class="text-sm text-green-dark/80">Lengkapi dokumen yang diperlukan untuk proses pendampingan administrasi penerbitan.</p>
      </div>
    </div>
    <div class="flex items-start gap-4 pb-8 relative">
      <div class="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0 text-sm font-bold text-green-dark relative z-10">5</div>
      <div class="flex-1">
        <h3 class="text-base font-bold text-green-dark">Pendampingan Administrasi</h3>
        <p class="text-sm text-green-dark/80">Tim mendampingi proses administrasi penerbitan, termasuk pengurusan kelengkapan sesuai ketentuan yang berlaku.</p>
      </div>
    </div>
    <div class="flex items-start gap-4">
      <div class="w-8 h-8 rounded-full bg-green-dark flex items-center justify-center shrink-0 text-sm font-bold text-cream relative z-10">6</div>
      <div class="flex-1">
        <h3 class="text-base font-bold text-green-dark">Selesai</h3>
        <p class="text-sm text-green-dark/80">Proses pendampingan selesai. Buku Anda siap melanjutkan ke tahap penerbitan lebih lanjut.</p>
      </div>
    </div>
  </div>

  <div class="rounded-2xl border border-gold/20 bg-gradient-to-br from-green via-green-dark to-green p-8 my-10 text-center">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(211,194,151,0.12),transparent_50%)] pointer-events-none" style="position: absolute; inset: 0; border-radius: inherit;"></div>
    <div class="relative">
      <h3 class="text-2xl font-bold text-cream mb-3">Mari Menjadi Bagian dari Perjalanan Baru PT Mughis Cipta Media</h3>
      <p class="text-cream/80 mb-6 max-w-lg mx-auto">Daftarkan diri Anda dalam Program Apresiasi Penulis dan wujudkan karya Anda bersama penerbit profesional yang telah bertransformasi.</p>
      <a href="/transformasi#daftar" class="inline-flex items-center gap-2 h-12 px-8 text-sm font-bold rounded-full bg-gold text-green-dark shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 hover:-translate-y-0.5">
        Daftar Program Sekarang
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
      </a>
    </div>
  </div>

  <h2 class="text-2xl font-bold text-green-dark mt-10 mb-6">Pertanyaan yang Sering Diajukan</h2>

  <div class="space-y-4">
    <div class="rounded-xl border border-gold/20 bg-cream p-5">
      <h3 class="text-base font-bold text-green-dark mb-2">Apakah program ini gratis?</h3>
      <p class="text-sm text-green-dark/80">Program Apresiasi Penulis memberikan pendampingan administrasi penerbitan secara gratis kepada peserta terpilih. Ketentuan lebih lanjut akan dijelaskan oleh admin setelah pendaftaran.</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5">
      <h3 class="text-base font-bold text-green-dark mb-2">Siapa saja yang dapat mengikuti?</h3>
      <p class="text-sm text-green-dark/80">Program ini terbuka untuk penulis pemula, mahasiswa, guru, dosen, penulis umum, dan komunitas literasi yang memiliki naskah dan ingin menerbitkan buku.</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5">
      <h3 class="text-base font-bold text-green-dark mb-2">Apakah program berlaku selamanya?</h3>
      <p class="text-sm text-green-dark/80">Program ini merupakan program perdana dalam rangka Grand Launching PT Mughis Cipta Media dan hanya berlaku selama periode yang telah ditentukan, yaitu 26 Juli hingga 4 Agustus 2026.</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5">
      <h3 class="text-base font-bold text-green-dark mb-2">Berapa lama periode program?</h3>
      <p class="text-sm text-green-dark/80">Periode pendaftaran Program Apresiasi Penulis berlangsung selama 10 hari, mulai dari 26 Juli 2026 hingga 4 Agustus 2026.</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5">
      <h3 class="text-base font-bold text-green-dark mb-2">Bagaimana cara mendaftar?</h3>
      <p class="text-sm text-green-dark/80">Pendaftaran dilakukan melalui formulir online yang tersedia di halaman Program Apresiasi Penulis. Isi data diri dan unggah naskah Anda sesuai petunjuk.</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5">
      <h3 class="text-base font-bold text-green-dark mb-2">Apakah saya harus memiliki naskah?</h3>
      <p class="text-sm text-green-dark/80">Ya, peserta program diharapkan memiliki naskah sendiri untuk diproses dalam pendampingan administrasi penerbitan. Naskah dapat dalam berbagai tahap, baik yang sudah selesai maupun masih dalam proses.</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5">
      <h3 class="text-base font-bold text-green-dark mb-2">Bagaimana proses setelah mendaftar?</h3>
      <p class="text-sm text-green-dark/80">Setelah mendaftar, tim akan melakukan verifikasi data. Admin kemudian akan menghubungi Anda melalui WhatsApp untuk konfirmasi dan langkah selanjutnya dalam proses pendampingan.</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5">
      <h3 class="text-base font-bold text-green-dark mb-2">Bagaimana jika kuota telah habis?</h3>
      <p class="text-sm text-green-dark/80">Program ini terbatas untuk 50 peserta. Jika kuota telah habis, Anda tetap dapat menghubungi kami melalui halaman Kontak untuk informasi program dan layanan penerbitan reguler.</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5">
      <h3 class="text-base font-bold text-green-dark mb-2">Apakah peserta akan mendapatkan ISBN?</h3>
      <p class="text-sm text-green-dark/80">Peserta akan memperoleh pendampingan administrasi penerbitan, termasuk proses administrasi ISBN sesuai dengan ketentuan yang berlaku dari Perpustakaan Nasional RI.</p>
    </div>
    <div class="rounded-xl border border-gold/20 bg-cream p-5">
      <h3 class="text-base font-bold text-green-dark mb-2">Apa yang membedakan PT Mughis Cipta Media dengan penerbit lain?</h3>
      <p class="text-sm text-green-dark/80">PT Mughis Cipta Media adalah perusahaan penerbitan resmi dengan legalitas lengkap yang berkomitmen memberikan pendampingan profesional, transparan, dan terstruktur bagi setiap penulis yang ingin menerbitkan buku berkualitas.</p>
    </div>
  </div>

  <h2 class="text-2xl font-bold text-green-dark mt-10 mb-3">Penutup</h2>
  <p>Transformasi Maktabah Al-Mughis menjadi <strong>PT Mughis Cipta Media</strong> adalah tonggak baru dalam perjalanan dunia penerbitan Indonesia. Dengan identitas hukum yang resmi, komitmen yang lebih kuat, dan semangat yang baru, perusahaan siap menjadi mitra terpercaya bagi para penulis dalam mewujudkan karya terbaik mereka.</p>
  <p>Program Apresiasi Penulis yang dihadirkan dalam rangka Grand Launching merupakan wujud nyata dari komitmen tersebut. Kami mengundang para penulis dari seluruh Indonesia untuk menjadi bagian dari perjalanan baru ini. Daftarkan diri Anda sekarang dan wujudkan karya bersama <strong>PT Mughis Cipta Media</strong>.</p>

</section>
`

async function main() {
  console.log("Connecting...")
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()
  console.log("Connected!")

  const existing = await client.query("SELECT id FROM articles WHERE slug = $1", [slug])
  const slugExists = existing.rows.length > 0

  if (slugExists) {
    await client.query(
      "UPDATE articles SET title = $1, content = $2, featured_image = $3, updated_at = NOW() WHERE slug = $4",
      [title, content, featuredImage, slug],
    )
    console.log(`UPDATED: "${title}"`)
  } else {
    await client.query(
      "INSERT INTO articles (title, slug, content, featured_image, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW())",
      [title, slug, content, featuredImage],
    )
    console.log(`CREATED: "${title}"`)
  }

  await client.end()
  console.log("\nDone!")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const schedules = [
  { subject: 'Bahasa Indonesia', color: 'coral', slots: ['Senin, 13.30 - 15.00', 'Kamis, 13.30 - 15.00'] },
  { subject: 'Matematika', color: 'blue', slots: ['Senin, 15.30 - 17.00', 'Kamis, 15.30 - 17.00', 'Jumat, 15.30 - 17.00'] },
  { subject: 'Bahasa Inggris', color: 'yellow', slots: ['Selasa, 13.30 - 15.00', 'Rabu, 15.30 - 17.00'] },
]

const resources = [
  { type: 'Video', title: 'Mengenal Pecahan dengan Cerita', detail: 'Matematika • Kelas 4-6', color: 'blue' },
  { type: 'E-book', title: 'Petualangan Membaca Cerita', detail: 'Bahasa Indonesia • Kelas 1-3', color: 'coral' },
  { type: 'Video', title: 'My First English Words', detail: 'Bahasa Inggris • Kelas 1-3', color: 'yellow' },
  { type: 'E-book', title: 'Latihan Menulis Ceria', detail: 'Bahasa Indonesia • Kelas 1-3', color: 'mint' },
]

const portfolio = [
  { label: 'Karya anak', title: 'Pameran IPAS mini', text: 'Anak belajar menjelaskan hasil pengamatannya dengan percaya diri.', color: 'yellow' },
  { label: 'Proses belajar', title: 'Jurnal membaca', text: 'Latihan singkat yang membantu anak membangun kebiasaan membaca.', color: 'coral' },
  { label: 'Pendampingan', title: 'Proyek kelompok kecil', text: 'Belajar bekerja sama sambil berlatih komunikasi dan pemecahan masalah.', color: 'blue' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSubject, setActiveSubject] = useState('Semua')
  const [resourceFilter, setResourceFilter] = useState('Semua')
  const [submitted, setSubmitted] = useState(false)

  const filteredResources = resourceFilter === 'Semua'
    ? resources
    : resources.filter((item) => item.type === resourceFilter)

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Handayani Course - kembali ke beranda">
          <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Logo Handayani Course" />
          <span>Handayani <strong>Course</strong></span>
        </a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Buka menu navigasi">
          <span></span><span></span><span></span>
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navigasi utama">
          <a href="#program" onClick={closeMenu}>Program</a>
          <a href="#jadwal" onClick={closeMenu}>Jadwal</a>
          <a href="#materi" onClick={closeMenu}>Materi</a>
          <a href="#portofolio" onClick={closeMenu}>Portofolio</a>
          <a className="nav-cta" href="#daftar" onClick={closeMenu}>Daftar sekarang</a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot"></span>Teman belajar anak SD</p>
            <h1>Belajar terasa lebih dekat, <em>percaya diri</em> tumbuh perlahan.</h1>
            <p className="hero-text">Pendampingan belajar yang hangat dan terarah untuk membantu anak memahami pelajaran, berani mencoba, dan menikmati prosesnya.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#daftar">Temukan kelasnya <span>↗</span></a>
              <a className="text-link" href="#jadwal">Lihat jadwal <span>↓</span></a>
            </div>
            <div className="hero-note"><span className="note-mark">✦</span><span>Kelompok kecil dengan pendekatan mahasiswa PGSD.</span></div>
          </div>
          <div className="hero-visual" aria-label="Ilustrasi suasana belajar">
            <div className="sun-shape"></div>
            <div className="doodle doodle-star">✦</div>
            <div className="doodle doodle-circle">○</div>
            <div className="learning-card card-back"><span>3B</span><small>Belajar • Berlatih • Bertanding</small></div>
            <div className="learning-card card-front"><div className="card-icon">Aa</div><strong>Hari ini kita<br />belajar bersama.</strong><small>Pelan-pelan, pasti bisa.</small></div>
            <div className="hero-caption"><span className="caption-dot"></span><span>Ruang aman untuk bertanya</span></div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="section-wrap trust-inner">
            <span>Untuk orang tua yang ingin menemani tumbuh</span>
            <div className="trust-items"><span>✓ Kelas kecil</span><span>✓ Tutor PGSD</span><span>✓ Laporan berkala</span></div>
          </div>
        </section>

        <section className="section-wrap intro-section" id="tentang">
          <div className="section-heading"><p className="eyebrow">Kenapa Handayani?</p><h2>Belajar bukan perlombaan.</h2></div>
          <div className="intro-content"><p>Kami percaya setiap anak punya ritme belajar yang berbeda. Karena itu, Handayani Course menghadirkan pendampingan yang personal, komunikatif, dan menyenangkan.</p><a className="text-link" href="#program">Kenali cara kami belajar <span>↗</span></a></div>
        </section>

        <section className="section-wrap" id="program">
          <div className="section-heading section-heading-row"><div><p className="eyebrow">Program pilihan</p><h2>Teman tumbuh untuk<br /><em>setiap langkah kecil.</em></h2></div><p className="section-aside">Pilih pendampingan yang sesuai dengan kebutuhan dan ritme belajar anak.</p></div>
          <div className="program-grid">
            <article className="program-card program-card-large coral-bg"><div className="program-number">01</div><div><h3>Penguatan dasar</h3><p>Membaca, menulis, dan berhitung dengan aktivitas yang dekat dengan dunia anak.</p></div><span className="card-arrow">↗</span></article>
            <article className="program-card blue-bg"><div className="program-number">02</div><div><h3>Bimbingan mata pelajaran</h3><p>Bahasa Indonesia, Bahasa Inggris, dan Matematika.</p></div><span className="card-arrow">↗</span></article>
            <article className="program-card yellow-bg"><div className="program-number">03</div><div><h3>TST 30 menit</h3><p>Waktu personal untuk membahas materi yang masih terasa sulit.</p></div><span className="card-arrow">↗</span></article>
            <article className="program-card mint-bg"><div className="program-number">04</div><div><h3>Konsep 3B</h3><p>Belajar, berlatih, dan bertanding secara sehat dan menyenangkan.</p></div><span className="card-arrow">↗</span></article>
          </div>
        </section>

        <section className="section-wrap schedule-section" id="jadwal">
          <div className="section-heading section-heading-row"><div><p className="eyebrow">Jadwal pilihan</p><h2>Temukan waktu yang<br /><em>pas untuk belajar.</em></h2></div><p className="section-aside">Pilih salah satu jadwal yang tersedia. Tim kami akan membantu mencocokkan kelasnya.</p></div>
          <div className="schedule-layout"><div className="subject-tabs"><button className={activeSubject === 'Semua' ? 'subject-tab active' : 'subject-tab'} onClick={() => setActiveSubject('Semua')}>Semua mata pelajaran</button>{schedules.map((item) => <button key={item.subject} className={activeSubject === item.subject ? `subject-tab active ${item.color}` : `subject-tab ${item.color}`} onClick={() => setActiveSubject(item.subject)}>{item.subject}</button>)}</div><div className="schedule-list">{schedules.filter((item) => activeSubject === 'Semua' || item.subject === activeSubject).map((item) => <article className={`schedule-card ${item.color}`} key={item.subject}><div className="schedule-top"><span className="schedule-subject">{item.subject}</span><span className="schedule-badge">Kelas tersedia</span></div><div className="slot-list">{item.slots.map((slot) => <span className="slot" key={slot}><span className="slot-dot"></span>{slot}</span>)}</div></article>)}</div></div>
        </section>

        <section className="timeline-band" id="linimasa"><div className="section-wrap"><div className="section-heading section-heading-row"><div><p className="eyebrow light-eyebrow">Linimasa belajar</p><h2>Pelan-pelan, ada<br /><em>prosesnya.</em></h2></div><p className="section-aside light-aside">Setiap tahap dibuat agar anak dan orang tua tahu apa yang sedang dijalani.</p></div><div className="timeline">{timeline.map((item, index) => <article className="timeline-item" key={item.title}><div className={`timeline-marker ${item.color}`}><strong>{item.date}</strong><small>{item.month}</small></div><div className="timeline-copy"><span className="timeline-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p></div>{index < timeline.length - 1 && <div className="timeline-line"></div>}</article>)}</div></div></section>

        <section className="section-wrap resource-section" id="materi"><div className="section-heading section-heading-row"><div><p className="eyebrow">Sudut belajar di rumah</p><h2>Materi yang bisa<br /><em>diulang kapan saja.</em></h2></div><p className="section-aside">Bahan belajar sederhana untuk menemani anak berlatih di luar kelas.</p></div><div className="filter-row">{['Semua', 'Video', 'E-book'].map((filter) => <button key={filter} className={resourceFilter === filter ? 'filter-button active' : 'filter-button'} onClick={() => setResourceFilter(filter)}>{filter}</button>)}</div><div className="resource-grid">{filteredResources.map((item) => <article className={`resource-card ${item.color}`} key={item.title}><div className="resource-visual"><span>{item.type === 'Video' ? '▶' : '▤'}</span><small>{item.type}</small></div><div className="resource-info"><p>{item.detail}</p><h3>{item.title}</h3><button type="button" className="resource-link">Lihat materi <span>↗</span></button></div></article>)}</div></section>

        <section className="portfolio-section" id="portofolio"><div className="section-wrap"><div className="section-heading section-heading-row"><div><p className="eyebrow">Portofolio proses</p><h2>Yang dirayakan adalah<br /><em>perkembangannya.</em></h2></div><p className="section-aside">Contoh kegiatan dan karya belajar yang dapat menjadi cerita kecil di rumah.</p></div><div className="portfolio-grid">{portfolio.map((item) => <article className={`portfolio-card ${item.color}`} key={item.title}><div className="portfolio-art"><span>{item.color === 'yellow' ? '✦' : item.color === 'coral' ? 'Aa' : '1 + 1'}</span></div><div className="portfolio-copy"><span>{item.label}</span><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div></section>

        <section className="section-wrap register-section" id="daftar"><div className="register-panel"><div className="register-copy"><p className="eyebrow">Mulai bersama</p><h2>Siap menemani<br /><em>langkah kecilnya?</em></h2><p>Isi formulir singkat ini. Tim Handayani akan menghubungi orang tua untuk membantu memilih program dan jadwal yang sesuai.</p><div className="register-points"><span>✓ Tidak perlu langsung memutuskan</span><span>✓ Konsultasi kebutuhan awal</span></div></div><form className="registration-form" onSubmit={handleSubmit}><label>Nama orang tua<input name="parent" placeholder="Contoh: Ibu Sari" required /></label><label>Nama / inisial anak<input name="child" placeholder="Contoh: Adit" required /></label><div className="form-row"><label>Kelas<select name="grade" defaultValue="" required><option value="" disabled>Pilih kelas</option><option>1 SD</option><option>2 SD</option><option>3 SD</option><option>4 SD</option><option>5 SD</option><option>6 SD</option></select></label><label>No. WhatsApp<input name="phone" type="tel" placeholder="08xxxxxxxxxx" required /></label></div><label>Mata pelajaran yang diminati<select name="subject" defaultValue="" required><option value="" disabled>Pilih mata pelajaran</option><option>Bahasa Indonesia</option><option>Bahasa Inggris</option><option>Matematika</option></select></label><label className="consent"><input type="checkbox" required /> Saya menyetujui tim menghubungi saya mengenai layanan Handayani Course.</label><button className="button button-primary form-button" type="submit">Kirim pendaftaran <span>↗</span></button>{submitted && <p className="success-message" role="status">Terima kasih. Data awal sudah tercatat di halaman ini.</p>}</form></div></section>
      </main>

      <footer className="site-footer"><div className="section-wrap footer-inner"><a className="brand footer-brand" href="#home"><img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Logo Handayani Course" /><span>Handayani <strong>Course</strong></span></a><p>Ruang belajar yang hangat untuk tumbuh bersama.</p><span className="footer-small">© 2026 Handayani Course</span></div></footer>
    </div>
  )
}

function ModernApp() {
  const [page, setPage] = useState(window.location.hash.slice(1) || 'home')
  const [subject, setSubject] = useState('Semua')
  const [materialType, setMaterialType] = useState('Semua')
  const [submitted, setSubmitted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const syncPage = () => setPage(window.location.hash.slice(1) || 'home')
    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setMenuOpen(false)
  }, [page])

  const go = (target) => {
    window.location.hash = target
    setPage(target)
  }

  const filteredSchedules = subject === 'Semua' ? schedules : schedules.filter((item) => item.subject === subject)
  const filteredMaterials = materialType === 'Semua' ? resources : resources.filter((item) => item.type === materialType)

  function submitRegistration(event) {
    event.preventDefault()
    setSubmitted(true)
    event.currentTarget.reset()
  }

  const navItems = [
    ['home', 'Beranda'],
    ['program', 'Program'],
    ['jadwal', 'Jadwal'],
    ['materi', 'Materi'],
    ['portofolio', 'Portofolio'],
  ]

  return (
    <div className="modern-site">
      <header className="modern-header">
        <a className="modern-brand" href="#home" onClick={() => go('home')}>
          <img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Logo Handayani Course" />
          <span>Handayani <b>Course</b></span>
        </a>
        <button className="modern-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Buka menu">
          <span></span><span></span><span></span>
        </button>
        <nav className={menuOpen ? 'modern-nav open' : 'modern-nav'}>
          {navItems.map(([target, label]) => <a className={page === target ? 'current' : ''} href={`#${target}`} onClick={() => go(target)} key={target}>{label}</a>)}
          <a className="modern-nav-cta" href="#daftar" onClick={() => go('daftar')}>Pendaftaran <span>↗</span></a>
        </nav>
      </header>

      <main>
        {page === 'home' && <HomePage go={go} />}
        {page === 'program' && <ProgramPage go={go} />}
        {page === 'jadwal' && <SchedulePage schedules={filteredSchedules} subject={subject} setSubject={setSubject} go={go} />}
        {page === 'materi' && <MaterialsPage materials={filteredMaterials} type={materialType} setType={setMaterialType} />}
        {page === 'portofolio' && <PortfolioPage />}
        {page === 'daftar' && <RegistrationPage submitted={submitted} onSubmit={submitRegistration} />}
        {!['home', 'program', 'jadwal', 'materi', 'portofolio', 'daftar'].includes(page) && <HomePage go={go} />}
      </main>

      <footer className="modern-footer"><div className="modern-footer-inner"><a className="modern-brand" href="#home"><img src={`${import.meta.env.BASE_URL}logo.jpeg`} alt="Logo Handayani Course" /><span>Handayani <b>Course</b></span></a><p>Belajar dekat, tumbuh kuat.</p><span>© 2026 Handayani Course</span></div></footer>
    </div>
  )
}

function PageIntro({ eyebrow, title, accent, text }) {
  return <div className="page-intro"><p className="modern-eyebrow">{eyebrow}</p><h1>{title} <em>{accent}</em></h1>{text && <p className="page-intro-text">{text}</p>}</div>
}

function HomePage({ go }) {
  return <>
    <section className="modern-hero">
      <div className="modern-hero-copy"><p className="modern-eyebrow"><span></span>Ruang belajar anak SD</p><h1>Belajar dengan cara yang <em>terasa dekat.</em></h1><p className="modern-lead">Pendampingan Bahasa Indonesia, Bahasa Inggris, dan Matematika untuk anak SD. Buka sepanjang tahun, tersedia offline atau online, dan dibayar per pertemuan.</p><div className="modern-actions"><a className="modern-button primary" href="#daftar" onClick={() => go('daftar')}>Mulai pendaftaran <span>↗</span></a><a className="modern-quiet-link" href="#program" onClick={() => go('program')}>Kenali program <span>→</span></a></div><div className="modern-proof"><span className="proof-icon">✦</span><span>Pendampingan oleh mahasiswa PGSD • Kelompok kecil • Ramah anak</span></div></div>
      <div className="modern-hero-art"><div className="art-blob"></div><div className="art-label"><span>01</span><b>Belajar<br />bersama</b><small>Ruang aman untuk bertanya.</small></div><div className="art-note note-one">Aa</div><div className="art-note note-two">1 + 1</div><div className="art-caption">setiap anak punya ritmenya sendiri</div></div>
    </section>
    <section className="home-ribbon"><div><strong>Buka sepanjang tahun</strong><span>Anak dapat memulai atau menghentikan keikutsertaan sesuai kebutuhan.</span></div><div><strong>Bayar per pertemuan</strong><span>Keluarga membayar sesuai pertemuan yang diikuti.</span></div><div><strong>Offline atau online</strong><span>Pilih cara belajar yang paling nyaman.</span></div></section>
    <section className="modern-section home-values"><div className="modern-section-heading"><p className="modern-eyebrow">Cara kami mendampingi</p><h2>Yang dibutuhkan anak,<br /><em>kami dengarkan.</em></h2></div><div className="value-grid"><article><span className="value-index">01</span><h3>Kelompok kecil</h3><p>Tutor punya waktu untuk benar-benar melihat proses belajar setiap anak.</p></article><article><span className="value-index">02</span><h3>Materi yang ramah</h3><p>Penjelasan dibuat sederhana, menggunakan contoh dan aktivitas yang dekat dengan keseharian.</p></article><article><span className="value-index">03</span><h3>Kabar untuk orang tua</h3><p>Orang tua mendapat gambaran tentang hal yang sedang dipelajari dan perlu dilatih di rumah.</p></article></div></section>
    <section className="modern-section home-preview"><div className="preview-heading"><div><p className="modern-eyebrow">Layanan utama</p><h2>Temukan ruang yang<br /><em>sesuai kebutuhan.</em></h2></div><a className="modern-quiet-link" href="#program" onClick={() => go('program')}>Lihat semua program <span>→</span></a></div><div className="preview-cards"><article className="preview-card peach"><span>01 / DASAR</span><h3>Penguatan membaca, menulis, dan berhitung.</h3><p>Untuk anak yang membutuhkan fondasi belajar yang lebih kuat.</p></article><article className="preview-card sky"><span>02 / MAPEL</span><h3>Bahasa Indonesia, Bahasa Inggris, dan Matematika.</h3><p>Pendampingan sesuai pelajaran dan jadwal yang dipilih.</p></article><article className="preview-card dark"><span>03 / BANTUAN</span><h3>Ruang konsultasi tugas dan PR.</h3><p>Bantuan tambahan saat anak menemui kesulitan di luar materi kelas.</p></article></div></section>
    <section className="modern-cta"><div><p className="modern-eyebrow">Langkah pertama</p><h2>Belajar tidak harus<br /><em>menunggu semester baru.</em></h2></div><a className="modern-button light" href="#daftar" onClick={() => go('daftar')}>Daftarkan anak <span>↗</span></a></section>
  </>
}

function ProgramPage({ go }) {
  return <div className="page-shell"><PageIntro eyebrow="Program Handayani" title="Pendampingan belajar yang" accent="sesuai kebutuhan." text="Pilih layanan sesuai kebutuhan anak. Semua program dapat diikuti sepanjang tahun, secara offline maupun online." /><div className="program-detail-grid"><article className="detail-card peach"><span>01</span><h2>Penguatan kemampuan dasar</h2><p>Membantu anak menguatkan kemampuan membaca, menulis, dan berhitung melalui latihan bertahap yang tidak terasa menekan.</p><b>Untuk kelas 1–3 SD</b></article><article className="detail-card sky"><span>02</span><h2>Bimbingan mata pelajaran</h2><p>Pendampingan Bahasa Indonesia, Bahasa Inggris, dan Matematika dengan kelompok kecil dan penjelasan yang mudah dipahami.</p><b>Untuk kelas 1–6 SD</b></article><article className="detail-card yellow"><span>03</span><h2>Ruang konsultasi tugas</h2><p>Waktu tambahan untuk membantu anak mengerjakan PR, mengulang penjelasan dari sekolah, atau membahas bagian yang masih membingungkan.</p><b>Datang saat diperlukan</b></article><article className="detail-card mint"><span>04</span><h2>Belajar mandiri di rumah</h2><p>Video pembelajaran dan e-book menjadi teman latihan yang bisa dibuka kembali bersama orang tua.</p><b>Akses sesuai kebutuhan</b></article></div><div className="parent-note"><span>Untuk orang tua</span><p>Handayani Course tidak menggunakan sistem paket wajib. Anak dapat memulai atau menghentikan keikutsertaan, lalu membayar sesuai pertemuan yang diikuti.</p><a className="modern-button primary" href="#jadwal" onClick={() => go('jadwal')}>Lihat pilihan jadwal <span>→</span></a></div></div>
}

function SchedulePage({ schedules: visibleSchedules, subject, setSubject, go }) {
  return <div className="page-shell"><PageIntro eyebrow="Jadwal kelas" title="Pilih waktu yang" accent="paling nyaman." text="Kelas tersedia sepanjang tahun. Anak dapat mengikuti pertemuan secara offline atau online dan keluarga membayar sesuai pertemuan yang diikuti." /><div className="schedule-policy"><div><strong>Fleksibel sepanjang tahun</strong><span>Tidak perlu menunggu gelombang pendaftaran.</span></div><div><strong>Bayar per pertemuan</strong><span>Bayar sesuai pertemuan yang diikuti.</span></div><div><strong>Offline atau online</strong><span>Informasikan mode belajar saat mendaftar.</span></div></div><div className="page-schedule-layout"><aside className="schedule-filter"><p>Filter mata pelajaran</p>{['Semua', ...schedules.map((item) => item.subject)].filter((item, index, list) => list.indexOf(item) === index).map((item) => <button className={subject === item ? 'selected' : ''} onClick={() => setSubject(item)} key={item}>{item}<span>→</span></button>)}<div className="schedule-help"><span>Butuh waktu lain?</span><p>Sampaikan kebutuhan jadwal pada formulir pendaftaran.</p><a href="#daftar" onClick={() => go('daftar')}>Hubungi tim kami ↗</a></div></aside><div className="schedule-page-list">{visibleSchedules.map((item) => <article className={`schedule-page-card ${item.color}`} key={item.subject}><div className="schedule-page-card-head"><span className="schedule-color-dot"></span><h2>{item.subject}</h2><small>pilihan jadwal</small></div><div className="schedule-time-list">{item.slots.map((slot) => <div key={slot}><span>◷</span>{slot}</div>)}</div><p>Pilih salah satu slot saat mengisi formulir pendaftaran.</p></article>)}</div></div></div>
}

function MaterialsPage({ materials, type, setType }) {
  return <div className="page-shell"><PageIntro eyebrow="Ruang belajar" title="Materi yang dapat" accent="diulang di rumah." text="Video pembelajaran dan e-book pendamping untuk membantu anak berlatih dengan ritmenya sendiri." /><div className="materials-toolbar"><div><strong>Materi pilihan</strong><span>Daftar materi akan diperbarui secara bertahap.</span></div><div className="material-tabs">{['Semua', 'Video', 'E-book'].map((item) => <button className={type === item ? 'selected' : ''} onClick={() => setType(item)} key={item}>{item}</button>)}</div></div><div className="material-page-grid">{materials.map((item) => <article className={`material-page-card ${item.color}`} key={item.title}><div className="material-art"><span>{item.type === 'Video' ? '▶' : '▤'}</span><small>{item.type}</small></div><div className="material-copy"><p>{item.detail}</p><h2>{item.title}</h2><button type="button">Tautan materi akan ditambahkan <span>↗</span></button></div></article>)}</div></div>
}

function PortfolioPage() {
  return <div className="page-shell"><PageIntro eyebrow="Folder kegiatan" title="Cerita belajar yang" accent="bisa dilihat bersama." text="Portofolio ini menjadi ruang untuk mengenal kegiatan, karya, dan proses anak selama mengikuti pendampingan di Handayani Course." /><div className="folder-grid">{portfolio.map((item, index) => <article className={`folder-card folder-${item.color}`} key={item.title}><div className="folder-tab">Folder 0{index + 1}</div><div className="folder-cover"><span>{item.color === 'yellow' ? '✦' : item.color === 'coral' ? 'Aa' : '1 + 1'}</span></div><div className="folder-copy"><small>{item.label}</small><h2>{item.title}</h2><p>{item.text}</p><button type="button">Kegiatan akan ditambahkan <span>↗</span></button></div></article>)}</div><section className="assessment-panel"><div><p className="modern-eyebrow">Penilaian belajar</p><h2>Laporan perkembangan untuk orang tua.</h2><p>Dokumen penilaian dan laporan perkembangan akan dibagikan kepada orang tua melalui Google Drive setelah tautannya tersedia.</p></div><span className="drive-placeholder">Tautan Google Drive<br /><b>akan ditambahkan</b></span></section></div>
}

function RegistrationPage({ submitted, onSubmit }) {
  return <div className="page-shell registration-page"><PageIntro eyebrow="Pendaftaran" title="Mulai saat anak" accent="membutuhkannya." text="Pendaftaran terbuka sepanjang tahun. Isi data singkat di bawah ini, lalu tim Handayani akan menghubungi orang tua untuk mencocokkan kebutuhan dan jadwal." /><div className="registration-layout"><form className="modern-form" onSubmit={onSubmit}><div className="form-section-title"><span>01</span><strong>Data orang tua dan anak</strong></div><label>Nama orang tua<input name="parent" placeholder="Contoh: Ibu Sari" required /></label><div className="form-two"><label>Nama / inisial anak<input name="child" placeholder="Contoh: Adit" required /></label><label>Kelas<select name="grade" defaultValue="" required><option value="" disabled>Pilih kelas</option>{[1, 2, 3, 4, 5, 6].map((grade) => <option key={grade}>{grade} SD</option>)}</select></label></div><label>No. WhatsApp<input name="phone" type="tel" placeholder="08xxxxxxxxxx" required /></label><div className="form-section-title second"><span>02</span><strong>Pilihan pendampingan</strong></div><div className="form-two"><label>Mata pelajaran<select name="subject" defaultValue="" required><option value="" disabled>Pilih mata pelajaran</option><option>Bahasa Indonesia</option><option>Bahasa Inggris</option><option>Matematika</option></select></label></div><label>Jadwal yang diminati<select name="schedule" defaultValue="" required><option value="" disabled>Pilih salah satu slot</option>{schedules.flatMap((item) => item.slots.map((slot) => <option key={`${item.subject}-${slot}`}>{item.subject} — {slot}</option>))}</select></label><label>Kebutuhan anak<textarea name="need" placeholder="Contoh: ingin dibantu membaca atau memahami PR matematika"></textarea></label><label className="form-consent"><input type="checkbox" required /> Saya menyetujui tim Handayani Course menghubungi saya terkait pendaftaran.</label><button className="modern-button primary submit-button" type="submit">Kirim pendaftaran <span>↗</span></button>{submitted && <p className="form-success" role="status">Terima kasih. Data awal sudah tercatat. Tim kami akan menghubungi orang tua.</p>}</form><aside className="registration-aside"><div className="aside-card dark"><p className="modern-eyebrow">Cara bergabung</p><h2>Datang ketika<br /><em>dibutuhkan.</em></h2><p>Anak dapat memulai atau menghentikan keikutsertaan kapan saja. Pembayaran dilakukan sesuai pertemuan yang diikuti.</p></div><div className="aside-card light"><strong>Sebelum mendaftar</strong><span>Siapkan pilihan mata pelajaran dan waktu yang paling nyaman untuk anak.</span><a href="#jadwal">Baca jadwal ↗</a></div></aside></div></div>
}

createRoot(document.getElementById('root')).render(<StrictMode><ModernApp /></StrictMode>)

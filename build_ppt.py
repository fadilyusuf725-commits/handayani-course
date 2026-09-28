from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.util import Inches, Pt


OUT = "d:\\Tugas\\Bimbel\\Analisis_Ruangguru_UPI_PGSD.pptx"

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

NAVY = RGBColor(8, 35, 78)
BLUE = RGBColor(17, 84, 166)
SKY = RGBColor(225, 242, 255)
YELLOW = RGBColor(255, 199, 44)
CORAL = RGBColor(247, 111, 92)
MINT = RGBColor(84, 196, 163)
INK = RGBColor(23, 36, 56)
MUTED = RGBColor(93, 109, 132)
WHITE = RGBColor(255, 255, 255)
LIGHT = RGBColor(247, 250, 253)


def fill(shape, color, transparency=0):
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.fill.transparency = transparency
    if hasattr(shape, "line"):
        shape.line.fill.background()


def box(slide, x, y, w, h, color=WHITE, radius=True, transparency=0):
    kind = MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE
    s = slide.shapes.add_shape(kind, Inches(x), Inches(y), Inches(w), Inches(h))
    fill(s, color, transparency)
    return s


def line(slide, x1, y1, x2, y2, color=BLUE, width=2):
    s = slide.shapes.add_connector(1, Inches(x1), Inches(y1), Inches(x2), Inches(y2))
    s.line.color.rgb = color
    s.line.width = Pt(width)
    return s


def text(slide, value, x, y, w, h, size=18, color=INK, bold=False,
         font="Aptos", align=PP_ALIGN.LEFT, valign=MSO_ANCHOR.TOP):
    tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.clear()
    tf.word_wrap = True
    tf.margin_left = Inches(0.08)
    tf.margin_right = Inches(0.08)
    tf.margin_top = Inches(0.04)
    tf.margin_bottom = Inches(0.03)
    tf.vertical_anchor = valign
    p = tf.paragraphs[0]
    p.alignment = align
    r = p.add_run()
    r.text = value
    r.font.name = font
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.color.rgb = color
    return tb


def title(slide, kicker, heading, sub=None):
    text(slide, kicker.upper(), 0.68, 0.38, 4.2, 0.28, 10, BLUE, True)
    text(slide, heading, 0.65, 0.70, 11.8, 0.65, 26, NAVY, True, font="Aptos Display")
    if sub:
        text(slide, sub, 0.70, 1.40, 11.7, 0.40, 11, MUTED)


def footer(slide, num, home=None):
    line(slide, 0.68, 7.05, 12.65, 7.05, RGBColor(215, 226, 239), 1)
    text(slide, "UPI • ANALISIS BISNIS DIGITAL", 0.70, 7.12, 3.3, 0.2, 8, MUTED, True)
    text(slide, str(num).zfill(2), 12.08, 7.10, 0.55, 0.22, 9, BLUE, True, align=PP_ALIGN.RIGHT)
    if home is not None:
        b = box(slide, 11.35, 0.28, 1.25, 0.36, SKY)
        text(slide, "MENU", 11.42, 0.34, 1.1, 0.18, 9, BLUE, True, align=PP_ALIGN.CENTER)
        b.click_action.target_slide = home


def circle(slide, x, y, d, color):
    s = slide.shapes.add_shape(MSO_SHAPE.OVAL, Inches(x), Inches(y), Inches(d), Inches(d))
    fill(s, color)
    return s


def person(slide, x, y, scale, shirt, skin=RGBColor(244, 191, 147), label=None):
    circle(slide, x + 0.22 * scale, y, 0.46 * scale, skin)
    body = box(slide, x, y + 0.42 * scale, 0.92 * scale, 1.02 * scale, shirt)
    body.adjustments[0] = 0.35
    circle(slide, x + 0.34 * scale, y + 0.16 * scale, 0.06 * scale, INK)
    circle(slide, x + 0.53 * scale, y + 0.16 * scale, 0.06 * scale, INK)
    if label:
        text(slide, label, x - 0.18 * scale, y + 1.52 * scale, 1.28 * scale, 0.3, 10, NAVY, True, align=PP_ALIGN.CENTER)


def phone(slide, x, y, w, h, screen=SKY):
    p = box(slide, x, y, w, h, NAVY)
    p.adjustments[0] = 0.12
    box(slide, x + 0.12, y + 0.22, w - 0.24, h - 0.42, screen, radius=False)
    circle(slide, x + w / 2 - 0.04, y + 0.08, 0.08, WHITE)
    box(slide, x + 0.24, y + 0.42, w - 0.48, 0.18, YELLOW)
    box(slide, x + 0.24, y + 0.78, w - 0.60, 0.12, BLUE)
    box(slide, x + 0.24, y + 1.06, w - 0.48, 0.12, MINT)
    box(slide, x + 0.24, y + 1.34, w - 0.78, 0.12, CORAL)
    return p


def add_bullets(slide, items, x, y, w, size=14, color=INK, gap=0.48):
    for i, item in enumerate(items):
        circle(slide, x, y + i * gap + 0.08, 0.12, YELLOW if i % 2 == 0 else CORAL)
        text(slide, item, x + 0.24, y + i * gap, w - 0.24, 0.36, size, color)


# 1 Cover
cover = prs.slides.add_slide(prs.slide_layouts[6])
fill(cover.background, LIGHT)
box(cover, 0, 0, 13.333, 7.5, NAVY, radius=False)
box(cover, 0, 0, 13.333, 0.26, YELLOW, radius=False)
circle(cover, 9.5, -1.0, 4.5, BLUE)
circle(cover, 10.4, 4.9, 3.4, CORAL)
circle(cover, 8.65, 5.6, 1.6, YELLOW)
text(cover, "UPI • STRATEGI BISNIS DIGITAL", 0.82, 0.78, 5.2, 0.28, 11, YELLOW, True)
text(cover, "Membedah\nRuangguru", 0.76, 1.45, 6.0, 1.55, 39, WHITE, True, font="Aptos Display")
text(cover, "Analisis Ruangguru sebagai inspirasi bimbel anak berbasis PGSD", 0.82, 3.35, 5.1, 0.72, 17, RGBColor(224, 237, 255))
box(cover, 0.82, 5.22, 2.25, 0.52, YELLOW)
text(cover, "ANALISIS 5 PERTANYAAN", 0.9, 5.37, 2.1, 0.2, 10, NAVY, True, align=PP_ALIGN.CENTER)
phone(cover, 8.75, 1.3, 2.15, 3.75, RGBColor(241, 248, 255))
circle(cover, 9.18, 1.95, 0.52, CORAL)
text(cover, "Ruang\nbelajar", 9.15, 2.62, 1.35, 0.5, 15, NAVY, True, align=PP_ALIGN.CENTER)
text(cover, "Klik tombol di menu untuk berpindah antar bagian", 7.82, 6.55, 4.5, 0.3, 10, WHITE, False, align=PP_ALIGN.CENTER)

# 2 Menu
menu = prs.slides.add_slide(prs.slide_layouts[6])
fill(menu.background, LIGHT)
title(menu, "Peta presentasi", "Pilih pintu masuk analisis", "Deck ini dirancang seperti mini-workshop: klik topik, baca analisis, lalu uji keputusanmu.")
items = [
    ("01", "Siapa yang\nterlibat?", "Pengguna • pembeli • decision maker", BLUE),
    ("02", "Masalah\npertama", "Dari les privat ke akses belajar", CORAL),
    ("03", "Mengapa\nbanyak produk?", "Portofolio untuk momen yang berbeda", MINT),
    ("04", "Apa yang bisa\nditirukan?", "Produk digital yang realistis", YELLOW),
    ("05", "Apa yang\ntidak realistis?", "Skala, data, dan ekosistem", NAVY),
]
targets = []
for i, (num, head, sub, color) in enumerate(items):
    x = 0.75 + (i % 3) * 4.1
    y = 2.25 + (i // 3) * 2.05
    card = box(menu, x, y, 3.55, 1.52, WHITE)
    circle(menu, x + 0.25, y + 0.24, 0.55, color)
    text(menu, num, x + 0.25, y + 0.40, 0.55, 0.17, 10, WHITE, True, align=PP_ALIGN.CENTER)
    text(menu, head, x + 0.98, y + 0.22, 2.25, 0.55, 17, NAVY, True)
    text(menu, sub, x + 0.98, y + 0.92, 2.25, 0.27, 10, MUTED)
    targets.append(card)
text(menu, "Bonus: kuis keputusan", 8.95, 4.34, 2.65, 0.3, 15, NAVY, True)
text(menu, "Di akhir, susun layanan bimbel anak yang realistis untuk dimulai.", 8.95, 4.76, 3.0, 0.48, 11, MUTED)
footer(menu, 2)

# 3 Users
users = prs.slides.add_slide(prs.slide_layouts[6])
fill(users.background, LIGHT)
title(users, "Pertanyaan 1", "Siapa yang terlibat dalam bimbel anak?", "Untuk bimbel PGSD, anak belajar; orang tua membayar dan biasanya menentukan pilihan.")
box(users, 0.72, 2.1, 3.72, 4.2, WHITE)
box(users, 4.78, 2.1, 3.72, 4.2, WHITE)
box(users, 8.84, 2.1, 3.72, 4.2, WHITE)
person(users, 1.65, 2.65, 1.2, BLUE, label="SISWA")
text(users, "PENGGUNA", 1.1, 4.32, 2.9, 0.3, 12, BLUE, True, align=PP_ALIGN.CENTER)
text(users, "Ingin paham, senang belajar,\ndan berani mencoba", 1.1, 4.78, 2.9, 0.68, 17, NAVY, True, align=PP_ALIGN.CENTER)
text(users, "Pemicu: tugas, membaca,\nberhitung, dan butuh pendampingan", 1.08, 5.65, 3.0, 0.48, 10, MUTED, align=PP_ALIGN.CENTER)
person(users, 5.72, 2.65, 1.2, CORAL, label="PEMBELI")
text(users, "PEMBELI", 5.16, 4.32, 2.9, 0.3, 12, CORAL, True, align=PP_ALIGN.CENTER)
text(users, "Orang tua atau wali\nyang membayar", 5.16, 4.78, 2.9, 0.68, 17, NAVY, True, align=PP_ALIGN.CENTER)
text(users, "Pemicu: keamanan anak, hasil,\nharga, dan kepercayaan", 5.14, 5.65, 3.0, 0.48, 10, MUTED, align=PP_ALIGN.CENTER)
person(users, 9.78, 2.65, 1.2, MINT, label="KEPUTUSAN")
text(users, "PENGAMBIL KEPUTUSAN", 9.18, 4.32, 3.1, 0.3, 12, MINT, True, align=PP_ALIGN.CENTER)
text(users, "Biasanya orang tua/wali;\nanak ikut memengaruhi", 9.18, 4.78, 3.1, 0.68, 17, NAVY, True, align=PP_ALIGN.CENTER)
text(users, "Momen kunci: memilih jadwal,\npaket, dan memperpanjang", 9.16, 5.65, 3.1, 0.48, 10, MUTED, align=PP_ALIGN.CENTER)
footer(users, 3, menu)

# 4 Problem
problem = prs.slides.add_slide(prs.slide_layouts[6])
fill(problem.background, LIGHT)
title(problem, "Pertanyaan 2", "Masalah pertama: akses belajar yang tidak merata", "Bukan sekadar “butuh video”; yang dicari adalah dukungan belajar yang lebih mudah dijangkau.")
line(problem, 1.1, 4.35, 11.9, 4.35, BLUE, 3)
stages = [
    (1.0, "SEBELUMNYA", "Les privat\nmahal & terikat jadwal", CORAL),
    (4.25, "GANGGUAN", "Siswa butuh\npendampingan fleksibel", YELLOW),
    (7.5, "SOLUSI AWAL", "Materi digital\nyang bisa diulang", MINT),
    (10.75, "HASIL", "Belajar lebih\nterjangkau & scalable", BLUE),
]
for idx, (x, head, body, color) in enumerate(stages, start=1):
    circle(problem, x, 3.98, 0.72, color)
    text(problem, str(idx), x, 4.19, 0.72, 0.18, 13, WHITE, True, align=PP_ALIGN.CENTER)
    text(problem, head, x - 0.55, 2.74, 1.85, 0.25, 10, color, True, align=PP_ALIGN.CENTER)
    text(problem, body, x - 0.85, 4.95, 2.45, 0.6, 14, NAVY, True, align=PP_ALIGN.CENTER)
box(problem, 1.08, 6.05, 11.15, 0.52, SKY)
text(problem, "Inti masalah = akses + kualitas + konsistensi, bukan hanya distribusi konten.", 1.25, 6.18, 10.8, 0.22, 12, BLUE, True, align=PP_ALIGN.CENTER)
footer(problem, 4, menu)

# 5 Portfolio
portfolio = prs.slides.add_slide(prs.slide_layouts[6])
fill(portfolio.background, LIGHT)
title(portfolio, "Pertanyaan 3", "Mengapa tidak cukup satu program?", "Karena kebutuhan belajar berubah menurut usia, tujuan, momen, dan kemampuan membayar.")
box(portfolio, 0.78, 2.1, 5.2, 4.2, NAVY)
text(portfolio, "SATU PROGRAM", 1.12, 2.45, 2.6, 0.3, 12, YELLOW, True)
text(portfolio, "Seperti satu ukuran\nuntuk semua kaki", 1.1, 2.95, 3.2, 0.82, 25, WHITE, True, font="Aptos Display")
text(portfolio, "Risiko: tidak cocok untuk\nsemua segmen dan momen", 1.12, 4.55, 3.6, 0.5, 13, RGBColor(221, 233, 250))
box(portfolio, 4.12, 4.72, 1.3, 0.55, CORAL)
text(portfolio, "FIT RENDAH", 4.18, 4.90, 1.18, 0.17, 9, WHITE, True, align=PP_ALIGN.CENTER)
text(portfolio, "PORTOFOLIO", 6.62, 2.45, 2.4, 0.3, 12, BLUE, True)
cards = [(6.65, 3.0, "SD–SMA", BLUE), (9.25, 3.0, "UTBK", CORAL), (6.65, 4.48, "Mandiri", MINT), (9.25, 4.48, "Orang tua", YELLOW)]
for x, y, label, color in cards:
    box(portfolio, x, y, 2.2, 1.05, WHITE)
    circle(portfolio, x + 0.2, y + 0.25, 0.45, color)
    text(portfolio, label, x + 0.78, y + 0.26, 1.25, 0.25, 14, NAVY, True)
    text(portfolio, "kebutuhan berbeda", x + 0.78, y + 0.62, 1.25, 0.18, 9, MUTED)
text(portfolio, "Portofolio = memperluas funnel,\nmemperpanjang lifetime value, dan\nmembuat ekosistem belajar.", 6.7, 6.05, 4.65, 0.6, 12, NAVY, True)
footer(portfolio, 5, menu)

# 6 Product candidate
candidate = prs.slides.add_slide(prs.slide_layouts[6])
fill(candidate.background, LIGHT)
title(candidate, "Pertanyaan 4", "Produk yang paling mungkin ditiru PGSD", "Ambil logika layanan Ruangguru, lalu sederhanakan untuk kebutuhan anak dan kapasitas mahasiswa.")
box(candidate, 0.78, 2.08, 4.15, 4.45, BLUE)
text(candidate, "KANDIDAT TERKUAT", 1.12, 2.42, 3.1, 0.25, 11, YELLOW, True)
text(candidate, "Bimbel anak\nberbasis pendampingan", 1.08, 2.9, 3.5, 0.86, 26, WHITE, True, font="Aptos Display")
add_bullets(candidate, ["Modul bermain dan lembar kerja", "Kelas kecil yang interaktif", "Pendampingan membaca dan berhitung", "Laporan perkembangan untuk orang tua"], 1.14, 4.35, 3.2, 12, RGBColor(231, 242, 255), 0.43)
box(candidate, 5.45, 2.12, 6.8, 4.35, WHITE)
text(candidate, "KENAPA REALISTIS?", 5.86, 2.5, 2.6, 0.25, 11, BLUE, True)
phone(candidate, 10.35, 2.55, 1.35, 2.7, SKY)
add_bullets(candidate, ["Mulai dari satu target: kelas 1–3 atau satu kemampuan dasar", "Diferensiasi lewat pendekatan bermain khas PGSD", "MVP dapat diuji pada 5–10 anak selama 4 minggu", "Pendapatan: paket bulanan atau kelas per pertemuan"], 5.9, 3.05, 4.1, 12, INK, 0.7)
footer(candidate, 6, menu)

# 7 Not realistic
unreal = prs.slides.add_slide(prs.slide_layouts[6])
fill(unreal.background, LIGHT)
title(unreal, "Pertanyaan 5", "Yang tidak realistis pada tahap awal", "Jangan meniru permukaan besar Ruangguru sebelum fondasi kecilnya terbukti.")
items = [
    ("ECOSYSTEM", "Marketplace tutor +\nsemua jenjang", "Terlalu banyak sisi\nyang harus diaktifkan", CORAL),
    ("AI PERSONALISASI", "Rekomendasi belajar\nskala jutaan siswa", "Butuh data, evaluasi,\ndan infrastruktur", YELLOW),
    ("BRAND NASIONAL", "Akuisisi massal\ndan endorsement", "Biaya marketing dan\ntrust sangat tinggi", BLUE),
]
for i, (head, body, reason, color) in enumerate(items):
    x = 0.78 + i * 4.15
    box(unreal, x, 2.15, 3.55, 3.95, WHITE)
    box(unreal, x, 2.15, 3.55, 0.16, color, radius=False)
    text(unreal, head, x + 0.35, 2.65, 2.8, 0.25, 11, color, True)
    text(unreal, body, x + 0.35, 3.2, 2.75, 0.7, 20, NAVY, True, font="Aptos Display")
    line(unreal, x + 0.35, 4.25, x + 3.18, 4.25, RGBColor(220, 229, 239), 1)
    text(unreal, reason, x + 0.35, 4.52, 2.7, 0.64, 12, MUTED)
text(unreal, "Urutan yang sehat: niche → bukti hasil → sistem → skala.", 1.05, 6.45, 11.2, 0.3, 16, NAVY, True, align=PP_ALIGN.CENTER)
footer(unreal, 7, menu)

# 8 PGSD Plan
pgsd = prs.slides.add_slide(prs.slide_layouts[6])
fill(pgsd.background, LIGHT)
title(pgsd, "Rancangan awal", "Contoh bimbel anak yang bisa dimulai", "Gunakan kekuatan mahasiswa PGSD: memahami tahap perkembangan anak, belajar aktif, dan komunikasi dengan orang tua.")
box(pgsd, 0.8, 2.12, 4.0, 4.15, BLUE)
text(pgsd, "PROGRAM INTI", 1.15, 2.5, 2.3, 0.25, 11, YELLOW, True)
text(pgsd, "Kelas Ceria\nBaca, Hitung, Tumbuh", 1.12, 3.0, 3.2, 0.82, 25, WHITE, True, font="Aptos Display")
add_bullets(pgsd, ["Kelompok kecil 5–8 anak", "2 kali per minggu", "Durasi 60–75 menit", "Laporan singkat untuk orang tua"], 1.16, 4.35, 3.0, 12, RGBColor(231, 242, 255), 0.43)
box(pgsd, 5.35, 2.12, 6.9, 4.15, WHITE)
text(pgsd, "ALUR PENGALAMAN", 5.75, 2.5, 2.7, 0.25, 11, BLUE, True)
steps = [("1", "Kenali", "cek kemampuan awal", CORAL), ("2", "Dampingi", "belajar lewat permainan", YELLOW), ("3", "Pantau", "catat perkembangan", MINT), ("4", "Komunikasikan", "beri umpan balik", BLUE)]
for i, (num, head, body, color) in enumerate(steps):
    x = 5.75 + (i % 2) * 3.05
    y = 3.05 + (i // 2) * 1.35
    circle(pgsd, x, y, 0.46, color)
    text(pgsd, num, x, y + 0.14, 0.46, 0.16, 11, NAVY if color == YELLOW else WHITE, True, align=PP_ALIGN.CENTER)
    text(pgsd, head, x + 0.65, y - 0.02, 1.8, 0.25, 14, NAVY, True)
    text(pgsd, body, x + 0.65, y + 0.36, 1.9, 0.24, 10, MUTED)
text(pgsd, "Mulai kecil, ukur perkembangan anak, lalu kembangkan program.", 5.78, 5.82, 5.6, 0.28, 12, BLUE, True)
footer(pgsd, 8, menu)

# 9 Summary
summary = prs.slides.add_slide(prs.slide_layouts[6])
fill(summary.background, NAVY)
text(summary, "LIMA JAWABAN DALAM SATU NAPAS", 0.82, 0.62, 5.8, 0.27, 11, YELLOW, True)
text(summary, "Dari Ruangguru, yang ditiru bukan ukurannya.\nYang ditiru adalah logika layanan belajarnya.", 0.8, 1.25, 8.9, 0.9, 28, WHITE, True, font="Aptos Display")
recap = [
    ("01", "Siapa?", "Siswa memakai;\norang tua sering membeli.", BLUE),
    ("02", "Masalah?", "Akses belajar yang\nlebih fleksibel.", CORAL),
    ("03", "Mengapa banyak?", "Segmen dan momen\nbelajar berbeda.", MINT),
    ("04", "Tiru apa?", "Bimbel anak\nberbasis pendampingan.", YELLOW),
    ("05", "Hindari apa?", "Skala, AI, dan\nekosistem terlalu dini.", WHITE),
]
for i, (num, head, body, color) in enumerate(recap):
    x = 0.82 + i * 2.42
    box(summary, x, 3.3, 2.05, 2.1, RGBColor(22, 55, 103))
    text(summary, num, x + 0.18, 3.55, 0.45, 0.22, 10, color, True)
    text(summary, head, x + 0.18, 3.95, 1.65, 0.3, 15, WHITE, True)
    text(summary, body, x + 0.18, 4.52, 1.68, 0.55, 11, RGBColor(222, 235, 255))
text(summary, "Pertanyaan penutup: kemampuan dasar apa yang ingin kalian bantu minggu ini?", 1.1, 6.45, 11.0, 0.3, 13, YELLOW, True, align=PP_ALIGN.CENTER)
footer(summary, 10, menu)

# 11 Sources
sources = prs.slides.add_slide(prs.slide_layouts[6])
fill(sources.background, LIGHT)
title(sources, "Catatan sumber", "Basis analisis dan cara membaca deck", "Beberapa kesimpulan bersifat analitis: gunakan sebagai hipotesis strategi, bukan klaim laporan keuangan.")
box(sources, 0.8, 2.1, 7.0, 4.2, WHITE)
text(sources, "SUMBER RUJUKAN", 1.15, 2.48, 2.3, 0.25, 11, BLUE, True)
add_bullets(sources, [
    "Ruangguru — halaman produk dan layanan belajar: ruangguru.com",
    "Google Play — deskripsi aplikasi Ruangguru dan fitur pengguna",
    "Publikasi media bisnis Indonesia tentang model edtech dan pembelajaran digital",
    "Observasi strategi produk: segmentasi, bundling, dan freemium / subscription",
], 1.18, 3.0, 6.1, 13, INK, 0.68)
box(sources, 8.25, 2.1, 4.0, 4.2, SKY)
text(sources, "GUNAKAN SAAT PRESENTASI", 8.62, 2.48, 3.1, 0.25, 11, BLUE, True)
text(sources, "Klik MENU\nuntuk lompat topik", 8.65, 3.08, 2.9, 0.62, 20, NAVY, True, font="Aptos Display")
text(sources, "Gunakan contoh PGSD\nuntuk memancing diskusi", 8.65, 4.25, 3.0, 0.62, 15, NAVY, True)
text(sources, "Terakhir diperbarui: September 2026", 8.65, 5.55, 3.0, 0.25, 10, MUTED)
footer(sources, 11, menu)

menu_targets = [users, problem, portfolio, candidate, unreal]
for card, target in zip(targets, menu_targets):
    card.click_action.target_slide = target

prs.save(OUT)
print(OUT)
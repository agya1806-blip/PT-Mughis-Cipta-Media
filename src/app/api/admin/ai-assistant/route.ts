import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { text, imageBase64, type } = await req.json()

    if (!text && !imageBase64) {
      return NextResponse.json({ error: "Teks atau gambar harus disediakan." }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    const rawLower = (text || "").toLowerCase()

    // System Prompt for AI Engine
    const systemPrompt = `Anda adalah Asisten Pintar AI Admin E-Commerce untuk ${type === 'book' ? 'Penerbitan Buku PT Mughis Cipta Media' : 'Mughis Laptop Store'}.
Tugas Anda adalah menganalisis teks mentah, chat WhatsApp supplier/penjual, atau foto spesifikasi/brosur, lalu mengekstrak dan menentukan data produk ke dalam JSON TERSTRUKTUR.

ATURAN PENENTUAN KATEGORI ("category"):
1. Jika produk adalah software, lisensi, akun AI/aplikasi (seperti Gemini Pro, ChatGPT Plus, Canva Pro, Windows 11, Office 2021, Netflix, Spotify, Key, Software Kasir, E-Book, Lisensi Digital), SET "category": "digital", "badge": "Produk Digital", "conditionNote": "100% Produk Digital Resmi Baru", "warranty": "Garansi 100% Ganti Baru Jika Gagal Aktivasi", "bonus": "Buku panduan cara aktivasi & dibantu via WA CS".
2. Jika produk adalah laptop promo/hemat/ada minus (seperti harga < 3 Jt, minus baterai, atau promo murah), SET "category": "budget", "badge": "Promo & Pilihan Hemat".
3. Jika produk adalah laptop kerja/business/gaming (seperti ThinkPad, EliteBook, Latitude, ASUS, Dell), SET "category": "laptop", "badge": "Paling Laris" atau "Laptop Business".
4. Jika type === "book" atau produk buku, SET "category": "buku", "badge": "Buku Resmi".

FORMAT JSON WAJIB (KEMBALIKAN HANYA JSON):
{
  "title": "Nama/Judul Produk Rapi & Jelas",
  "category": "laptop" | "digital" | "budget" | "buku",
  "badge": "Badge Promo Menarik",
  "priceText": "Rp X.XXX.XXX",
  "rawPriceText": "Rp X.XXX.XXX (Detail varian/masa aktif)",
  "shortDesc": "Deskripsi singkat pemasaran yang menarik dan ramah pembeli (2-3 kalimat).",
  "specs": [
    "Fitur/Spesifikasi 1",
    "Fitur/Spesifikasi 2",
    "Fitur/Spesifikasi 3",
    "Fitur/Spesifikasi 4"
  ],
  "conditionNote": "Kondisi unit atau status lisensi...",
  "warranty": "Garansi Toko 30 Hari / Garansi Ganti Baru",
  "bonus": "Bonus kelengkapan / panduan aktivasi"
}

Teks input mentah dari user:
${text || 'Minta analisis spesifikasi dari gambar yang dilampirkan.'}`

    if (apiKey) {
      try {
        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: systemPrompt },
                  ...(imageBase64 ? [{
                    inline_data: {
                      mime_type: "image/jpeg",
                      data: imageBase64.replace(/^data:image\/\w+;base64,/, "")
                    }
                  }] : [])
                ]
              }
            ]
          })
        })

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json()
          const rawResponseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || ""

          // Extract JSON block using regex
          const jsonMatch = rawResponseText.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            try {
              const parsedJson = JSON.parse(jsonMatch[0])
              return NextResponse.json({ success: true, data: parsedJson })
            } catch {
              // Fallback below if JSON.parse fails
            }
          }
        }
      } catch {
        // Fallback below if API call fails
      }
    }

    // Smart Keyword Detection Engine
    const isDigital = /gemini|chatgpt|canva|lisensi|windows|office|akun|key|digital|software|app|pro|premium|e-book|netflix|spotify|pos/.test(rawLower)
    const isBudget = /minus|baterai lemah|promo|< 3|1\.|2\./.test(rawLower)

    // Price extraction
    let extractedPrice = isDigital ? "Rp 400.000" : "Rp 3.500.000"
    const priceMatch = rawLower.match(/(\d+[\.\,]?\d*)\s*(jt|juta|ribu|rb)/) || rawLower.match(/rp\s*(\d+[\.\,]?\d*)/)
    if (priceMatch) {
      const numVal = parseFloat(priceMatch[1].replace(",", "."))
      if (priceMatch[2] === "jt" || priceMatch[2] === "juta") {
        extractedPrice = `Rp ${(numVal * 1000000).toLocaleString("id-ID")}`
      } else if (priceMatch[2] === "rb" || priceMatch[2] === "ribu") {
        extractedPrice = `Rp ${(numVal * 1000).toLocaleString("id-ID")}`
      }
    }

    let detectedTitle = text ? text.split("\n")[0].substring(0, 60) : "Produk Digital / Laptop Ready"
    if (isDigital && !detectedTitle.toLowerCase().includes("lisensi") && !detectedTitle.toLowerCase().includes("pro")) {
      detectedTitle = `Produk Digital ${detectedTitle}`
    }

    const fallbackResult = {
      title: detectedTitle,
      category: isDigital ? "digital" : (isBudget ? "budget" : (type === "book" ? "buku" : "laptop")),
      badge: isDigital ? "Produk Digital" : (isBudget ? "Promo & Pilihan Hemat" : "Ready Stock AI"),
      priceText: extractedPrice,
      rawPriceText: `${extractedPrice} (${isDigital ? "Aktivasi Permanen / Resmi" : "Unit Ready Stock"})`,
      shortDesc: isDigital
        ? "Paket lisensi / akun resmi original bergaransi. Tinggal pasang, tanpa crack, bebas update selamanya, aman dari virus & dibantu via WA CS."
        : "Unit laptop business pilihan telah melalui proses Quality Control (QC) 100% siap pakai untuk kebutuhan kerja dan kuliah Anda.",
      specs: isDigital ? [
        "Tipe Produk: Digital Account / Official License Key",
        "Masa Aktif: Lifetime / Permanen Resmi",
        "Pengiriman: Key resmi dikirim instan via WhatsApp / Email",
        "Bebas Update: Terkoneksi langsung ke server resmi"
      ] : [
        "Prosesor: Intel Core High Performance",
        "RAM: 8GB / 16GB High Speed",
        "Penyimpanan: 256GB / 512GB SSD NVMe Cepat",
        "Layar: 13.3 - 14.0 inch Full HD Anti-Glare"
      ],
      conditionNote: isDigital ? "100% Produk Digital Resmi Baru" : "Grade A Mulus 90-95%, Baterai Awet 2-4 Jam",
      warranty: isDigital ? "Garansi 100% Ganti Baru Jika Gagal Aktivasi" : "Garansi Toko 30 Hari",
      bonus: isDigital ? "Buku panduan bergambar cara pasang & link download resmi" : "Unit Laptop, Charger Original, Tas Laptop Baru & Mouse"
    }

    return NextResponse.json({ success: true, data: fallbackResult })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Gagal memproses AI." }, { status: 500 })
  }
}

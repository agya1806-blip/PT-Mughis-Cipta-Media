import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { text, imageBase64, type } = await req.json()

    if (!text && !imageBase64) {
      return NextResponse.json({ error: "Teks atau gambar harus disediakan." }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    const rawLower = (text || "").toLowerCase()

    // Detect MIME type dynamically from Base64 string
    let mimeType = "image/jpeg"
    if (imageBase64) {
      const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/)
      if (mimeMatch && mimeMatch[1]) {
        mimeType = mimeMatch[1]
      }
    }

    // Construct Ultra-Precise System Prompt
    const systemPrompt = `Anda adalah Asisten AI Admin Profesional & Pakar E-Commerce untuk ${type === 'book' ? 'Penerbitan PT Mughis Cipta Media' : 'Mughis Laptop Store'}.
Tugas Anda adalah membaca teks mentah, chat WhatsApp supplier, atau FOTO SPESIFIKASI BROSUR/DUS/SCREENSHOT, lalu mengekstrak data produk secara 100% AKURAT ke dalam FORMAT JSON TERSTRUKTUR.

LAKUKAN ANALISIS INPUT SECARA DETAIL:
1. DETEKSI KATEGORI ("category"):
   - Jika teks/foto memuat produk digital/software/lisensi/akun (seperti Gemini Pro, ChatGPT Plus, Canva, Windows 11, Office 2021, Key, Netflix, Spotify, Software Kasir, E-Book), SET "category": "digital", "badge": "Produk Digital", "conditionNote": "100% Produk Digital Resmi Baru", "warranty": "Garansi 100% Ganti Baru Jika Gagal Aktivasi", "bonus": "Buku panduan cara aktivasi & dibantu via WA CS".
   - Jika teks/foto memuat laptop promo/hemat/ada minus (seperti harga < 3 Jt, minus baterai, minus jam), SET "category": "budget", "badge": "Promo & Pilihan Hemat".
   - Jika teks/foto memuat laptop business/kerja (seperti ThinkPad, EliteBook, ProBook, Latitude, ASUS, Dell, Lenovo), SET "category": "laptop", "badge": "Paling Laris" atau "Laptop Business".
   - Jika type === "book" atau produk buku, SET "category": "buku", "badge": "Buku Resmi".

2. EKSTRAKSI HARGA ("priceText" & "rawPriceText"):
   - Jika terdeteksi angka harga (misal 3.5jt, 3,5jt, 150rb, 400rb, 3500000), format menjadi "Rp 3.500.000" atau "Rp 150.000".

3. EKSTRAKSI SPESIFIKASI ("specs"):
   - Pisahkan spesifikasi baris demi baris menjadi array string yang rapi. Contoh: ["Prosesor: Intel Core i5 Gen 8", "RAM: 16GB DDR4", "Penyimpanan: 512GB SSD NVMe", "Layar: 14.0 inch Full HD IPS"].

FORMAT JSON WAJIB (HANYA KEMBALIKAN OBJECT JSON):
{
  "title": "Judul Produk Rapi & Jelas",
  "category": "laptop" | "digital" | "budget" | "buku",
  "badge": "Badge Promo",
  "priceText": "Rp X.XXX.XXX",
  "rawPriceText": "Rp X.XXX.XXX (Rincian singkat)",
  "shortDesc": "Deskripsi singkat pemasaran 2-3 kalimat yang menarik dan ramah pembeli.",
  "specs": [
    "Spesifikasi / Fitur 1",
    "Spesifikasi / Fitur 2",
    "Spesifikasi / Fitur 3",
    "Spesifikasi / Fitur 4"
  ],
  "conditionNote": "Grade A Mulus / Status Lisensi...",
  "warranty": "Garansi Toko 30 Hari / Garansi Ganti Baru",
  "bonus": "Bonus kelengkapan / panduan aktivasi"
}

Teks input mentah dari user:
${text || 'Ekstrak spesifikasi dari gambar yang dilampirkan.'}`

    if (apiKey) {
      // Try Gemini API model endpoints (v1beta)
      const modelsToTry = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"]

      for (const modelName of modelsToTry) {
        try {
          const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: systemPrompt },
                    ...(imageBase64 ? [{
                      inline_data: {
                        mime_type: mimeType,
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

            const jsonMatch = rawResponseText.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
              try {
                const parsedJson = JSON.parse(jsonMatch[0])
                return NextResponse.json({ success: true, data: parsedJson })
              } catch {
                // Continue to next model or fallback
              }
            }
          }
        } catch {
          // Continue
        }
      }
    }

    // Smart Regex & Rule-Based Fallback Engine
    const isDigital = /gemini|chatgpt|canva|lisensi|windows|office|akun|key|digital|software|app|pro|premium|e-book|netflix|spotify|pos/.test(rawLower)
    const isBudget = /minus|baterai lemah|promo|< 3|1\.|2\./.test(rawLower)

    let extractedPrice = isDigital ? "Rp 150.000" : "Rp 3.500.000"
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

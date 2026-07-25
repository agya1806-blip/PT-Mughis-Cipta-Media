const TELEGRAM_API = "https://api.telegram.org/bot"

function getConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    throw new Error(
      "TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set in environment variables"
    )
  }
  return { token, chatId }
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const { token, chatId } = getConfig()
  const res = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Telegram sendMessage failed (${res.status}): ${body}`)
  }
}

export async function sendTelegramPhoto(
  filePath: string,
  caption: string
): Promise<void> {
  const { token, chatId } = getConfig()

  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    const res = await fetch(`${TELEGRAM_API}${token}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        photo: filePath,
        caption,
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Telegram sendPhoto failed (${res.status}): ${body}`)
    }
    return
  }

  const fs = await import("fs/promises")
  const pathModule = await import("path")

  const fullPath = pathModule.join(process.cwd(), "public", filePath)
  const buffer = await fs.readFile(fullPath)

  const formData = new FormData()
  formData.append("chat_id", chatId)
  formData.append("caption", caption)
  formData.append("photo", new Blob([buffer]), pathModule.basename(filePath))

  const res = await fetch(`${TELEGRAM_API}${token}/sendPhoto`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Telegram sendPhoto failed (${res.status}): ${body}`)
  }
}

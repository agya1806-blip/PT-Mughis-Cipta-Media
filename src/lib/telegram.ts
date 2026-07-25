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

function isUrl(path: string): boolean {
  return path.startsWith("http://") || path.startsWith("https://")
}

function sendJson(method: string, body: Record<string, unknown>) {
  const { token } = getConfig()
  return fetch(`${TELEGRAM_API}${token}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const { chatId } = getConfig()
  const res = await sendJson("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
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
  const { chatId } = getConfig()

  if (isUrl(filePath)) {
    const res = await sendJson("sendPhoto", {
      chat_id: chatId,
      photo: filePath,
      caption,
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Telegram sendPhoto failed (${res.status}): ${body}`)
    }
    return
  }

  const fs = await import("fs/promises")
  const pathModule = await import("path")

  const normalizedPath = filePath.startsWith("/") ? filePath.slice(1) : filePath
  const fullPath = pathModule.join(process.cwd(), "public", normalizedPath)
  const buffer = await fs.readFile(fullPath)

  const formData = new FormData()
  formData.append("chat_id", chatId)
  formData.append("caption", caption)
  formData.append("photo", new Blob([buffer]), pathModule.basename(normalizedPath))

  const { token } = getConfig()
  const res = await fetch(`${TELEGRAM_API}${token}/sendPhoto`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Telegram sendPhoto failed (${res.status}): ${body}`)
  }
}

export async function sendTelegramDocument(
  filePath: string,
  caption: string
): Promise<void> {
  const { chatId } = getConfig()

  if (isUrl(filePath)) {
    const res = await sendJson("sendDocument", {
      chat_id: chatId,
      document: filePath,
      caption,
    })
    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Telegram sendDocument failed (${res.status}): ${body}`)
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
  formData.append("document", new Blob([buffer]), pathModule.basename(filePath))

  const { token } = getConfig()
  const res = await fetch(`${TELEGRAM_API}${token}/sendDocument`, {
    method: "POST",
    body: formData,
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Telegram sendDocument failed (${res.status}): ${body}`)
  }
}

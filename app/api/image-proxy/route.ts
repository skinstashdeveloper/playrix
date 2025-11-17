import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")
  
  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 })
  }

  try {
    // Handle Google Drive URLs
    let imageUrl = url
    if (url.includes("drive.google.com")) {
      const fileId = url.match(/[-\w]{25,}/)?.[0]
      if (fileId) {
        imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
      }
    }

    // If it's already a data URL, return as-is
    if (imageUrl.startsWith("data:")) {
      return NextResponse.json({ base64: imageUrl })
    }

    // Fetch and convert to base64
    const response = await fetch(imageUrl)
    if (!response.ok) {
      return NextResponse.json({ base64: imageUrl }) // Fallback to original URL
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const contentType = response.headers.get("content-type") || "image/png"
    const base64 = `data:${contentType};base64,${buffer.toString("base64")}`

    return NextResponse.json({ base64 })
  } catch (error) {
    console.error("Image conversion error:", error)
    // Return original URL as fallback
    return NextResponse.json({ base64: url })
  }
}
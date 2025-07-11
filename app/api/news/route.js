import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function GET() {
  try {
    // Read data.json from public directory
    const dataPath = path.join(process.cwd(), 'public', 'data.json')
    const fileContents = fs.readFileSync(dataPath, 'utf8')
    const newsArray = JSON.parse(fileContents)
    
    return NextResponse.json(newsArray)
  } catch (error) {
    console.error("Error loading news data:", error)
    return NextResponse.json(
      { error: "Failed to load news data" },
      { status: 500 }
    )
  }
}

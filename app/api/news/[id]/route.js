import { NextResponse } from "next/server"
import path from "path"
import fs from "fs"

// Get the data.json file path
const dataPath = path.join(process.cwd(), "lib", "data.json")

// Helper function to read data
function readNewsData() {
  try {
    const fileContents = fs.readFileSync(dataPath, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading data.json:", error)
    return []
  }
}

// Helper function to write data
function writeNewsData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error("Error writing data.json:", error)
    return false
  }
}

// GET /api/news/[id] - Get single news by ID
export async function GET(request, { params }) {
  try {
    const { id } = params
    const newsData = readNewsData()
    const news = newsData.find((item) => item.article_id === id)

    if (!news) {
      return NextResponse.json({ error: `News with id ${id} not found` }, { status: 404 })
    }

    return NextResponse.json(news)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news data" }, { status: 500 })
  }
}

// PATCH /api/news/[id] - Update news title and description
export async function PATCH(request, { params }) {
  try {
    const { id } = params
    const body = await request.json()

    // Check if only title and description are being updated
    const allowedFields = ["title", "description"]
    const updateFields = Object.keys(body)
    const invalidFields = updateFields.filter((field) => !allowedFields.includes(field))

    if (invalidFields.length > 0) {
      return NextResponse.json(
        { error: `Invalid fields: ${invalidFields.join(", ")}. Only 'title' and 'description' can be updated.` },
        { status: 400 },
      )
    }

    const newsData = readNewsData()
    const newsIndex = newsData.findIndex((item) => item.article_id === id)

    if (newsIndex === -1) {
      return NextResponse.json({ error: `News with id ${id} not found` }, { status: 404 })
    }

    // Update the news item
    if (body.title !== undefined) {
      newsData[newsIndex].title = body.title
    }
    if (body.description !== undefined) {
      newsData[newsIndex].description = body.description
    }

    // Save updated data
    const success = writeNewsData(newsData)
    if (!success) {
      return NextResponse.json({ error: "Failed to update news data" }, { status: 500 })
    }

    return NextResponse.json(newsData[newsIndex])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update news data" }, { status: 500 })
  }
}

// DELETE /api/news/[id] - Delete news by ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const newsData = readNewsData()
    const newsIndex = newsData.findIndex((item) => item.article_id === id)

    if (newsIndex === -1) {
      return NextResponse.json({ error: `News with id ${id} not found` }, { status: 404 })
    }

    // Remove the news item
    const deletedNews = newsData.splice(newsIndex, 1)[0]

    // Save updated data
    const success = writeNewsData(newsData)
    if (!success) {
      return NextResponse.json({ error: "Failed to delete news data" }, { status: 500 })
    }

    return NextResponse.json({
      message: "News deleted successfully",
      deletedNews,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete news data" }, { status: 500 })
  }
}


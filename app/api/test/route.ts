import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { allowedMimeTypes } from "@/lib/helper";
import { webinfo } from "@/lib/webinfo";



export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File | null;

    // 1. Validate file existence
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 2. Validate file type
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type. Allowed: ${allowedMimeTypes.join(", ")}`,
        },
        { status: 400 },
      );
    }

    // 3. Validate file size
    if (file.size > webinfo?.maxFileSize) {
      return NextResponse.json(
        {
          error: `File too large. Max size: ${webinfo?.maxFileSize / 1024 / 1024}MB`,
        },
        { status: 400 },
      );
    }

    // 4. Generate unique filename to prevent collisions
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const originalName = file.name.replace(/\s/g, "_");
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);
    const safeFilename = `${timestamp}-${randomStr}-${baseName}${extension}`;

    // 5. Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), "public/assets");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // 6. Convert file to buffer and save
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(uploadDir, safeFilename);
    await writeFile(filePath, buffer);

    // 7. Return public URL and metadata
    const publicUrl = `/assets/${safeFilename}`;

    return NextResponse.json(
      {
        success: true,
        url: publicUrl,
        filename: safeFilename,
        originalName: file.name,
        size: file.size,
        mimeType: file.type,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// // Optional: Increase body size limit for large files (if needed)
// export const config = {
//   api: {
//     bodyParser: false, // Required for FormData
//   },
// };

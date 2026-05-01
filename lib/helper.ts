import { UploadOptions, UploadResult } from "@/types";
import {Session} from "next-auth";

export const checkUserRouteAccess = (session: Session | null, role: string) => {

    if (!session) {
        return false;
    }

    return session?.user?.role === role;
}


// Allowed image MIME types
export const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export async function uploadImage(
  file: File,
  options: UploadOptions = {},
): Promise<UploadResult> {
  const { onProgress, abortController } = options;

  
  if (!allowedMimeTypes.includes(file.type)) {
    throw new Error(
      `Invalid file type. Supported: ${allowedMimeTypes.join(", ")}`,
    );
  }

  // Validate file size (e.g., 5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error(`File too large. Max size: ${maxSize / 1024 / 1024}MB`);
  }

  const formData = new FormData();
  formData.append("image", file);

  const fetchOptions: RequestInit = {
    method: "POST",
    body: formData,
    signal: abortController?.signal,
  };

  try {
    const response = await fetch("/api/test", fetchOptions);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Upload failed");
    }

    const result = await response.json();
    return result as UploadResult;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Upload cancelled");
    }
    throw error;
  }
}



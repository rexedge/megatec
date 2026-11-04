/** What Cloudinary says about a file it has taken: its address, and a picture's size. */
export type UploadedFile = { url: string; width: number; height: number };

/**
 * Sends a file from the browser straight to Cloudinary with the fields the server signed
 * (app/admin/(staff)/uploads.ts), reporting progress as a percentage.
 */
export function sendToCloudinary(
  file: File,
  ticket: { url: string; fields: Record<string, string> },
  onProgress: (percent: number) => void
) {
  return new Promise<UploadedFile>((resolve, reject) => {
    const body = new FormData();
    for (const [key, value] of Object.entries(ticket.fields)) body.append(key, value);
    body.append("file", file);
    const request = new XMLHttpRequest();
    request.open("POST", ticket.url);
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    request.onerror = () => reject(new Error("The upload didn't go through. Check the connection and try again."));
    request.onload = () => {
      let reply: { secure_url?: string; width?: number; height?: number; error?: { message?: string } } = {};
      try {
        reply = JSON.parse(request.responseText);
      } catch {}
      if (request.status >= 200 && request.status < 300 && reply.secure_url) {
        resolve({ url: reply.secure_url, width: reply.width ?? 0, height: reply.height ?? 0 });
      } else {
        reject(new Error(reply.error?.message ? `Cloudinary refused the file: ${reply.error.message}` : "The upload failed. Try again."));
      }
    };
    request.send(body);
  });
}

import { createWorker } from "tesseract.js";

export async function extractTextFromImage(image) {
    const worker = await createWorker();
    const { data } = await worker.recognize(image);
    await worker.terminate();
    return data.text;
}

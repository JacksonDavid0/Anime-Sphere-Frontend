import { removeBackground } from "@imgly/background-removal-node";

export async function backgroundRemoval(imageUrl: string): Promise<string | undefined> {
  try {
    const blob = await removeBackground(imageUrl);
    const buffer = await blob.arrayBuffer();
    const data = Buffer.from(buffer).toString("base64");
    const dataUrl = `data:image/png;base64,${data}`;
    return dataUrl;
  } catch (error) {
    console.error("Something went wrong:", error);
    return undefined;
  }
}
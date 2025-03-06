const HUGGING_FACE_BASE_URL = "https://api-inference.huggingface.co/models";
const API_KEY = process.env.NEXT_PUBLIC_HF_API_KEY; // Store in `.env.local`

export async function queryHuggingFace(model, input) {
    const response = await fetch(`${HUGGING_FACE_BASE_URL}/${model}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: input }),
    });

    return await response.json();
}

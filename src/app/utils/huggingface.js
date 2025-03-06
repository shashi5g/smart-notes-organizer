const HUGGING_FACE_BASE_URL = process.env.HUGGING_FACE_BASE_URL
const HUGGING_FACE_SENTIMENTS_ANALYSIS_URL = process.env.HUGGING_FACE_SENTIMENTS_ANALYSIS_URL
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

// Function to analyze sentiment of text
export const analyzeSentiment = async (text) => {
    const response = await fetch(HUGGING_FACE_SENTIMENTS_ANALYSIS_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
    });

    const result = await response.json();
    return result;
};
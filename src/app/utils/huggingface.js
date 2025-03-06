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


export async function categorizeNote(noteContent) {

    const response = await fetch(`${HUGGING_FACE_BASE_URL}/${'facebook/bart-large-mnli'}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputs: noteContent,
            parameters: { candidate_labels: ["Work", "Personal", "Ideas", "Technology"] }
        })
    });

    const data = await response.json();

    if (response.ok) {
        // Handle the result, which will contain the predicted category
        const category = data.labels[0]; // The category with the highest score
        return category;
    } else {
        console.error("Error:", data);
    }
}

// Example usage


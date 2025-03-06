// app/utils/__tests__/huggingface.test.js
import { queryHuggingFace, analyzeSentiment } from '../huggingface';

const API_URL = "https://api-inference.huggingface.co/models";
const API_URL_SENTIMENTS_ANALYSIS_URL = 'https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english';


describe('Hugging Face API Functions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('queryHuggingFace calls the correct API and returns the response', async () => {
        const mockResponse = [{ summary_text: "This is a summary." }];
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResponse),
            })
        );

        const model = "facebook/bart-large-cnn";
        const input = "This is a test input.";

        const result = await queryHuggingFace(model, input);

        expect(global.fetch).toHaveBeenCalledWith(`${API_URL}/${model}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: input }),
        });

        expect(result).toEqual(mockResponse);
    });

    test('analyzeSentiment calls the correct API and returns the response', async () => {
        const mockResponse = [{ label: "POSITIVE", score: 0.98 }];
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockResponse),
            })
        );

        const text = "I love this!";
        const result = await analyzeSentiment(text);

        expect(global.fetch).toHaveBeenCalledWith(API_URL_SENTIMENTS_ANALYSIS_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ inputs: text }),
        });

        expect(result).toEqual(mockResponse);
    });

    test('queryHuggingFace handles API errors gracefully', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('API Failure')));

        const model = "facebook/bart-large-cnn";
        const input = "Test input";

        await expect(queryHuggingFace(model, input)).rejects.toThrow('API Failure');
    });

    test('analyzeSentiment handles API errors gracefully', async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error('API Failure')));

        const text = "I love this!";
        await expect(analyzeSentiment(text)).rejects.toThrow('API Failure');
    });
});

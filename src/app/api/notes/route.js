// app/api/notes/route.js
import { createClient } from '@supabase/supabase-js';
import { queryHuggingFace } from '@/app/utils/huggingface';

// Initialize Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,  // Your Supabase URL
  process.env.SUPABASE_KEY   // Your Supabase API Key
);

// Handle GET and POST requests
export async function GET() {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false }); // Sorting by creation date

  if (error) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify(data), { status: 200 });
}


export async function POST(req) {
  const { content, category } = await req.json();
  // Analyze sentiment using Hugging Face API
  const sentimentResult = await queryHuggingFace('distilbert-base-uncased-finetuned-sst-2-english', content);
  console.log(sentimentResult, 'sentimentResult')
  const sentiment = sentimentResult[0][0]?.label || 'neutral';
  console.log(sentiment, 'sentiment')
  const { data, error } = await supabase
    .from('notes')
    .insert([{ content, category, sentiment }]).select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  console.log(data, 'data')
  return new Response(JSON.stringify(data), { status: 201 });
}

export async function DELETE(req) {
  const { id } = await req.json();

  const { data, error } = await supabase
    .from('notes')
    .delete()
    .match({ id });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function PUT(req) {
  const { id, content, category } = await req.json();
  // Analyze sentiment using Hugging Face API (optional for editing)
  const sentimentResult = await queryHuggingFace('distilbert-base-uncased-finetuned-sst-2-english', content);
  console.log(sentimentResult, 'sentimentResult')
  const sentiment = sentimentResult[0][0]?.label || 'neutral';
  const { data, error } = await supabase
    .from('notes')
    .update({ content, category, sentiment })
    .match({ id });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}

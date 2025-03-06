// app/api/notes/route.js
import { createClient } from '@supabase/supabase-js';
import { queryHuggingFace, categorizeNote } from '@/app/utils/huggingface';

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
  const { content } = await req.json();
  // Analyze sentiment using Hugging Face API
  const sentimentResult = await queryHuggingFace('distilbert-base-uncased-finetuned-sst-2-english', content);
  const sentiment = sentimentResult[0][0]?.label || 'neutral';
  const categoryNotes = await categorizeNote(content) || 'Not available'

  const { data, error } = await supabase
    .from('notes')
    .insert([{ content, category: categoryNotes, sentiment }]).select('*');

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

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

  try {
    // Validate the input fields
    if (!id || !content || !category) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
    }

    // Analyze sentiment using Hugging Face API (optional for editing)
    const sentimentResult = await queryHuggingFace('distilbert-base-uncased-finetuned-sst-2-english', content);

    const sentiment = sentimentResult[0][0]?.label || 'neutral'; // Default to neutral if no sentiment is returned


    // Update the note in the 'notes' table in Supabase
    const { data, error } = await supabase
      .from('notes')
      .update({ content, category, sentiment })
      .match({ id });

    // If update fails, return error
    if (error) {
      console.error('Update Error:', error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    // Fetch all updated notes from the database after the update
    const { data: allNotes, error: fetchError } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    // If fetching fails, return error
    if (fetchError) {
      console.error('Fetch Error:', fetchError);
      return new Response(JSON.stringify({ error: fetchError.message }), { status: 500 });
    }

    // Return all updated notes
    return new Response(JSON.stringify(allNotes), { status: 200 });

  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
  }
}

import { supabase, CompletionRecord, UserId } from './supabase';

/** Fetch all completion records for a single day. */
export async function getCompletions(
  dayNumber: number
): Promise<CompletionRecord[]> {
  const { data, error } = await supabase
    .from('completions')
    .select('*')
    .eq('day_number', dayNumber);
  if (error) throw error;
  return data ?? [];
}

/** Fetch every completion record (used for the Journey list and progress). */
export async function getAllCompletions(): Promise<CompletionRecord[]> {
  const { data, error } = await supabase.from('completions').select('*');
  if (error) throw error;
  return data ?? [];
}

/** Mark a day complete for a reader (upsert on user_id + day_number). */
export async function markComplete(
  userId: UserId,
  dayNumber: number
): Promise<void> {
  const { error } = await supabase.from('completions').upsert(
    {
      user_id: userId,
      day_number: dayNumber,
      completed: true,
      completed_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,day_number' }
  );
  if (error) throw error;
}

/** Undo a completion for a reader (sets completed = false). */
export async function markIncomplete(
  userId: UserId,
  dayNumber: number
): Promise<void> {
  const { error } = await supabase.from('completions').upsert(
    {
      user_id: userId,
      day_number: dayNumber,
      completed: false,
      completed_at: null,
    },
    { onConflict: 'user_id,day_number' }
  );
  if (error) throw error;
}

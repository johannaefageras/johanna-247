-- Conversations table: one row per chat session
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text default '',
  mode text default 'klassisk',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Messages table: individual messages within a conversation
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null default '',
  created_at timestamptz default now()
);

-- Indexes
create index idx_conversations_user_updated on public.conversations (user_id, updated_at desc);
create index idx_messages_conversation on public.messages (conversation_id, created_at asc);

-- Enable RLS
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Conversations RLS: users can only access their own
create policy "Users can view own conversations"
  on public.conversations for select
  using (auth.uid() = user_id);

create policy "Users can insert own conversations"
  on public.conversations for insert
  with check (auth.uid() = user_id);

create policy "Users can update own conversations"
  on public.conversations for update
  using (auth.uid() = user_id);

create policy "Users can delete own conversations"
  on public.conversations for delete
  using (auth.uid() = user_id);

-- Messages RLS: users can access messages in their own conversations
create policy "Users can view messages in own conversations"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations
      where conversations.id = messages.conversation_id
        and conversations.user_id = auth.uid()
    )
  );

create policy "Users can insert messages in own conversations"
  on public.messages for insert
  with check (
    exists (
      select 1 from public.conversations
      where conversations.id = messages.conversation_id
        and conversations.user_id = auth.uid()
    )
  );

create policy "Users can delete messages in own conversations"
  on public.messages for delete
  using (
    exists (
      select 1 from public.conversations
      where conversations.id = messages.conversation_id
        and conversations.user_id = auth.uid()
    )
  );

-- Service role access for API endpoints
create policy "Service role can read all conversations"
  on public.conversations for select
  using (auth.role() = 'service_role');

create policy "Service role can read all messages"
  on public.messages for select
  using (auth.role() = 'service_role');

-- User profiles table for "Mitt konto"
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text default '',
  phone text default '',
  about_me text default '',
  avatar_url text default '',

  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can read/update only their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', ''));
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists, then create
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Allow service role to read profiles (for chat API AI context)
create policy "Service role can read all profiles"
  on public.profiles for select
  using (auth.role() = 'service_role');

-- Create helper function to keep updated_at current
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create order status enum
do $$ begin
  if not exists (select 1 from pg_type where typname = 'order_status') then
    create type public.order_status as enum ('pending','paid','shipped','delivered','cancelled');
  end if;
end $$;

-- Profiles table linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy if not exists "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy if not exists "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy if not exists "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create trigger if not exists update_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Categories (public readable)
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;
create policy if not exists "Categories are viewable by everyone"
  on public.categories for select using (true);

-- Products (public readable)
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  slug text not null unique,
  name text not null,
  description text,
  price numeric(10,2) not null,
  rating numeric(3,2) not null default 0,
  reviews_count integer not null default 0,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;
create policy if not exists "Products are viewable by everyone"
  on public.products for select using (true);

create trigger if not exists update_products_updated_at
before update on public.products
for each row execute function public.update_updated_at_column();

-- Reviews (public readable, users manage their own)
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;
create policy if not exists "Reviews are viewable by everyone"
  on public.reviews for select using (true);
create policy if not exists "Users can create their reviews"
  on public.reviews for insert with check (auth.uid() = user_id);
create policy if not exists "Users can update their reviews"
  on public.reviews for update using (auth.uid() = user_id);
create policy if not exists "Users can delete their reviews"
  on public.reviews for delete using (auth.uid() = user_id);

-- Carts (one per user)
create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.carts enable row level security;
create policy if not exists "Users manage their own carts"
  on public.carts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Cart items
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  added_at timestamptz not null default now(),
  unique (cart_id, product_id)
);

alter table public.cart_items enable row level security;
create policy if not exists "Users can view their cart items"
  on public.cart_items for select using (exists (
    select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid()
  ));
create policy if not exists "Users can insert their cart items"
  on public.cart_items for insert with check (exists (
    select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid()
  ));
create policy if not exists "Users can update their cart items"
  on public.cart_items for update using (exists (
    select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid()
  ));
create policy if not exists "Users can delete their cart items"
  on public.cart_items for delete using (exists (
    select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid()
  ));

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status public.order_status not null default 'pending',
  total numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;
create policy if not exists "Users manage their own orders"
  on public.orders for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Order items
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null
);

alter table public.order_items enable row level security;
create policy if not exists "Users can view their order items"
  on public.order_items for select using (exists (
    select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()
  ));
create policy if not exists "Users can insert their order items"
  on public.order_items for insert with check (exists (
    select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()
  ));

-- Wishlist items (per user)
create table if not exists public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

alter table public.wishlist_items enable row level security;
create policy if not exists "Users manage their wishlist"
  on public.wishlist_items for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Trigger to create profile on new auth user
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (new.id, new.raw_user_meta_data ->> 'display_name', new.raw_user_meta_data ->> 'avatar_url')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed minimal categories and products if empty
insert into public.categories (slug, name, description)
select x.slug, x.name, x.description
from (values
  ('electronics','Electronics','Phones, laptops, audio and more'),
  ('fashion','Fashion','Clothing, shoes and accessories'),
  ('home-kitchen','Home & Kitchen','Appliances, decor, and essentials'),
  ('beauty','Beauty','Skincare, haircare and cosmetics'),
  ('sports','Sports','Fitness and outdoor gear')
) as x(slug,name,description)
where not exists (select 1 from public.categories);

insert into public.products (category_id, slug, name, description, price, rating, reviews_count, image_url)
select c.id, concat(c.slug,'-demo-phone'), concat(initcap(c.name),' Demo Product'), 'A great product in the '||c.name||' category.',
  99.99, 4.5, 128, null
from public.categories c
where not exists (select 1 from public.products limit 1);

CREATE DATABASE stokup;

\c stocup

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(70) NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE stores(
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
store_id VARCHAR(50) NOT NULL UNIQUE,
name VARCHAR(255) NOT NULL
);

CREATE TABLE store_users(
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
store_id UUID NOT NULL REFERENCES stores(id),
user_id UUID NOT NULL REFERENCES users(id),
role VARCHAR(50) DEFAULT 'store employee',
UNIQUE (store_id, user_id)
);

CREATE TABLE products(
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
name VARCHAR(255) NOT NULL,
sku VARCHAR(50) unique not null,
gtin VARCHAR(30) unique not null
);

CREATE TABLE store_products(
id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
store_id UUID NOT NULL REFERENCES stores(id),
product_id UUID NOT NULL REFERENCES products(id),
current_stock INT NOT NULL,
daily_consumption INT NOT NULL,
min_stock INT NOT NULL,
created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMPTZ NULL,
UNIQUE(store_id, product_id)
);
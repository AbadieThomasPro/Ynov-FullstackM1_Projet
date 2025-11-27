CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

CREATE TABLE users (
id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
email text NOT NULL UNIQUE,
password varchar(255) NOT NULL
)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  userId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email varchar(50) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  pseudo varchar(50) NOT NULL,
  avatarUrl varchar(255),
  bio text,
  role varchar(30) DEFAULT 'user'
);

CREATE TABLE storage (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  userId uuid NOT NULL REFERENCES users(userId),
  fridge boolean,
  ingredientId uuid NOT NULL,
  quantity integer,
  unit varchar(20),
  expirationDate date
);

CREATE TABLE shopping_list (
  listId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  userId uuid NOT NULL REFERENCES users(userId),
  ingredientId uuid NOT NULL,
  quantity integer,
  unit varchar(20),
  createdAt date DEFAULT now(),
  updatedDate date
);

CREATE TABLE planning (
  day varchar(10) NOT NULL,
  meal varchar(20) NOT NULL,
  date date NOT NULL,
  userId uuid NOT NULL REFERENCES users(userId),
  recipeId uuid NOT NULL,
  PRIMARY KEY (day, meal, date, userId, recipeId)
);

CREATE TABLE recipe_favorites (
  favoritesId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  userId uuid NOT NULL REFERENCES users(userId),
  recipeId uuid NOT NULL
);

CREATE TABLE comments (
  commentId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipeId uuid NOT NULL,
  userId uuid NOT NULL REFERENCES users(userId),
  createdAt date DEFAULT now(),
  rating smallint,
  comment text,
  parentCommentId uuid
);
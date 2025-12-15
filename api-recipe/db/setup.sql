
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE recipes (
	recipeId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	name varchar(50) NOT NULL,
	userId uuid NOT NULL,
	description text,
	servings integer,
	preperationTime integer,
	cookTime integer,
	totalTime integer,
	difficulty smallint,
	calorie integer,
	isPrivate boolean DEFAULT false,
	publishedAt date,
	createdAt date NOT NULL DEFAULT now(),
	updatedAt date,
	averageRating smallint,
	ratingCount integer,
	viewsCount integer,
	commentCount integer,
	tips jsonb,
	source varchar(255),
	language varchar(30),
	costEstimate numeric,
	mealType varchar(30),
	seasonal varchar(30),
	lastCookedAt date,
	isVegan boolean,
	isVegetarian boolean,
	isGlutenFree boolean
);

CREATE TABLE ingredients (
	ingredientId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	ingredientName varchar(50) NOT NULL,
	ingredientCategoryId uuid,
	costEstimate numeric,
	origin varchar(100),
	isVegan boolean,
	isVegetarian boolean,
	isAllergen boolean,
	storageAdvice varchar(100),
	description varchar(255),
	shelfLifeFridge integer,
	shelfLifeFreezer integer,
	shelfLifeOutside integer,
	shelfLifeOpened integer
);

CREATE TABLE recipe_ingredients (
	ingredientId uuid NOT NULL,
	recipeId uuid NOT NULL,
	quantity numeric,
	quantityUnit varchar(20),
	"order" smallint,
	optional boolean,
	PRIMARY KEY (ingredientId, recipeId),
	FOREIGN KEY (ingredientId) REFERENCES ingredients(ingredientId),
	FOREIGN KEY (recipeId) REFERENCES recipes(recipeId)
);

CREATE TABLE recipe_category (
	categoryId uuid NOT NULL,
	recipeId uuid NOT NULL,
	PRIMARY KEY (categoryId, recipeId)
);

CREATE TABLE recipe_tags (
	tagId uuid NOT NULL,
	recipeId uuid NOT NULL,
	importance integer,
	PRIMARY KEY (tagId, recipeId)
);

CREATE TABLE recipe_steps (
	stepId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	recipeId uuid NOT NULL,
	stepIndex integer,
	description text,
	duration integer,
	imageId uuid,
	videoId uuid,
	tips jsonb,
	FOREIGN KEY (recipeId) REFERENCES recipes(recipeId)
);

CREATE TABLE recipe_allergens (
	allergensId uuid NOT NULL,
	recipeId uuid NOT NULL,
	PRIMARY KEY (allergensId, recipeId)
);

CREATE TABLE ingredient_category (
	ingredientCategoryId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	ingredientCategory varchar(50)
);

CREATE TABLE category (
	categoryId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	categoryName varchar(30)
);

CREATE TABLE tags (
	tagId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	tag varchar(20)
);

CREATE TABLE images (
	imageId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	recipeId uuid,
	stepId uuid,
	image jsonb,
	"order" smallint,
	alt_text varchar(30),
	FOREIGN KEY (recipeId) REFERENCES recipes(recipeId),
	FOREIGN KEY (stepId) REFERENCES recipe_steps(stepId)
);

CREATE TABLE videos (
	videoId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	recipeId uuid,
	stepId uuid,
	video varchar(255),
	"order" smallint,
	alt_text varchar(30),
	FOREIGN KEY (recipeId) REFERENCES recipes(recipeId),
	FOREIGN KEY (stepId) REFERENCES recipe_steps(stepId)
);

CREATE TABLE nutritions (
	nutritionId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	recipeId uuid,
	ingredientId uuid,
	calorie float,
	protein float,
	proteinPourcent float,
	fats float,
	fatsPourcent float,
	saturatedFattyAcids float,
	saturatedFattyAcidsPourcent float,
	carbohydrates float,
	carbohydratesPourcent float,
	sugars float,
	sugarsPourcent float,
	fiber float,
	fiberPourcent float,
	salt float,
	saltPourcent float,
	sodium float,
	sodiumPourcent float,
	cholesterol float,
	chorlesterolPourcent float,
	unit varchar(20),
	source varchar(255)
);

CREATE TABLE allergens (
	allergensId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
	allergens varchar(30)
);

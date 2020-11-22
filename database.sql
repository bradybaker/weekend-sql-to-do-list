CREATE TABLE "todo" (
	id SERIAL PRIMARY KEY,
	"task" VARCHAR(180) NOT NULL,
	"date_to_complete_by" DATE, 
	"completed" DATE
);

SELECT * FROM "todo" ORDER BY "completed";


INSERT INTO "todo" ("task", "date_to_complete_by") 
VALUES ('Go to the Grocery Store', '12/12/2020');
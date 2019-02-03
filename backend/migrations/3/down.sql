UPDATE migrations SET version = 2;

ALTER TABLE users
  DROP COLUMN email;

UPDATE migrations SET version = 1;

ALTER TABLE users
  DROP COLUMN push_enabled;

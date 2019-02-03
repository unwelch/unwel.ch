UPDATE migrations SET version = 3;

ALTER TABLE users
  ADD email TEXT;


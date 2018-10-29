UPDATE migrations SET version = 2;

ALTER TABLE users
  ADD push_enabled BOOL NOT NULL DEFAULT false;


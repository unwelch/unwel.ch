UPDATE migrations SET version = 5;

ALTER TABLE bets
  ADD is_private BOOL NOT NULL DEFAULT false;

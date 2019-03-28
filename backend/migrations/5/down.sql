UPDATE migrations SET version = 4;

ALTER TABLE bets
  DROP COLUMN is_private;

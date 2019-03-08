UPDATE migrations SET version = 3;

ALTER TABLE bets
  DROP COLUMN target_user_id;

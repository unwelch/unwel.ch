UPDATE migrations SET version = 4;

ALTER TABLE bets
  ADD target_user_id UUID;


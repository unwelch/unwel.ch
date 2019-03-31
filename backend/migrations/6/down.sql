UPDATE migrations SET version = 5;

ALTER TABLE bets DROP CONSTRAINT user_id_constraint;
ALTER TABLE bets DROP CONSTRAINT user2_id_constraint;

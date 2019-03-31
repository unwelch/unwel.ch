UPDATE migrations SET version = 5;

ALTER TABLE "bets"
  DROP CONSTRAINT "statement_id_fk",
  DROP CONSTRAINT "user_id_fk",
  DROP CONSTRAINT "user2_id_fk",
  DROP CONSTRAINT "target_user_id_fk";

ALTER TABLE "statements"
  DROP CONSTRAINT "user_id_fk";

ALTER TABLE "notifications"
  DROP CONSTRAINT "sender_user_id_fk",
  DROP CONSTRAINT "reciever_user_id",
  DROP CONSTRAINT "bet_id_fk";


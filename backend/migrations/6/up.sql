UPDATE migrations SET version = 6;

ALTER TABLE "bets"
  ADD CONSTRAINT "statement_id_fk" FOREIGN KEY ("statement_id") REFERENCES "statements"("id"),
  ADD CONSTRAINT "user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id"),
  ADD CONSTRAINT "user2_id_fk" FOREIGN KEY ("user2_id") REFERENCES "users"("id"),
  ADD CONSTRAINT "target_user_id_fk" FOREIGN KEY ("target_user_id") REFERENCES "users"("id");

ALTER TABLE "statements"
  ADD CONSTRAINT "user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "notifications"
  ADD CONSTRAINT "sender_user_id_fk" FOREIGN KEY ("sender_user_id") REFERENCES "users"("id"),
  ADD CONSTRAINT "reciever_user_id" FOREIGN KEY ("reciever_user_id") REFERENCES "users"("id"),
  ADD CONSTRAINT "bet_id_fk" FOREIGN KEY ("bet_id") REFERENCES "bets"("id");


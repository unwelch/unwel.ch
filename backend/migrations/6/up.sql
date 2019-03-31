UPDATE migrations SET version = 6;

ALTER TABLE bets
  ADD CONSTRAINT user_id_constraint FOREIGN KEY (user_id) REFERENCES users (id),
ALTER TABLE bets
  ADD CONSTRAINT user2_id_constraint FOREIGN KEY (user2_id) REFERENCES users (id);

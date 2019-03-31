UPDATE migrations SET version = 7;

CREATE TABLE pools (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID        NOT NULL,
    statement   TEXT        NOT NULL,
    quantity    TEXT        NOT NULL,
    closed      BOOL        NOT NULL    DEFAULT FALSE,
    is_private  BOOL        NOT NULL    DEFAULT FALSE,
    created_at  TIMESTAMP   NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP
);

ALTER TABLE pools
  ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users (id);

CREATE TABLE pool_bets (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    pool_id     UUID        NOT NULL,
    user_id     UUID        NOT NULL,
    guess       TEXT        NOT NULL,
    created_at  TIMESTAMP   NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP,
    UNIQUE (pool_id, user_id)
);

ALTER TABLE pool_bets
  ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES users (id),
  ADD CONSTRAINT pool_id_fk FOREIGN KEY (pool_id) REFERENCES pools (id);

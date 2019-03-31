UPDATE migrations SET version = 6;

CREATE TABLE pools (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID        NOT NULL,
    statement   TEXT        NOT NULL,
    quantity    TEXT        NOT NULL,
    closed      BOOL        NOT NULL    DEFAULT FALSE,
    created_at  TIMESTAMP   NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP
);

CREATE TABLE pool_bets (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    pool_id     UUID        NOT NULL,
    user_id     UUID        NOT NULL,
    guess       TEXT        NOT NULL,
    created_at  TIMESTAMP   NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP
);

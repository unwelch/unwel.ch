SET client_encoding = 'UTF8';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE migrations (
    version INT PRIMARY KEY
);

INSERT INTO migrations (version) VALUES (1);

CREATE TABLE users (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    google_id   TEXT,
    name        TEXT        NOT NULL,
    avatar      TEXT,
    push_subscription   TEXT,
    created_at  TIMESTAMP   NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP,
    UNIQUE (google_id)
);

CREATE TABLE statements (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id     UUID        NOT NULL,
    statement   TEXT        NOT NULL,
    created_at  TIMESTAMP   NOT NULL    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bets (
    id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    statement_id    UUID    NOT NULL,
    user_id         UUID    NOT NULL,
    user2_id        UUID,
    quantity        TEXT    NOT NULL,
    user_response   BOOL,   -- true means user1 was right, false user2
    user2_response  BOOL,   -- true means user1 was right, false user2
    created_at  TIMESTAMP   NOT NULL    DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP
);

CREATE TABLE notifications (
    id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_user_id     UUID        NOT NULL,
    reciever_user_id     UUID        NOT NULL,
    bet_id     UUID        NOT NULL,
    message     TEXT       NOT NULL,
    visited       BOOL        NOT NULL    DEFAULT false,
    viewed        BOOL        NOT NULL    DEFAULT false,
    created_at  TIMESTAMP   NOT NULL    DEFAULT CURRENT_TIMESTAMP
);

const createSQL = `
DROP TABLE IF EXISTS users, user_game;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_name TEXT NOT NULL,
    password TEXT NOT NULL,
    UNIQUE (user_name)
);

CREATE TABLE IF NOT EXISTS user_game (
    user_id INTEGER NOT NULL,
    game_id INTEGER NOT NULL,

    CONSTRAINT pk_user_game
        PRIMARY KEY (user_id, game_id),

    CONSTRAINT fk_user_game_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);
`;

const insertSQL = `
INSERT INTO users (user_name, password) VALUES
    ('mimo-lala', '$2a$10$ByI/lYJgb/FsWX/e2W5Hken2Db60btgxMbOSpYGEwLiY35FSAJGY2'),
    ('chi-chi_meo_meo', '$2a$10$cDw08Ob4pfTD3B5KLWVeauFnH9fM9ZpwXKzZdfbDGe06SHP5GG5lu'),
    ('harry_lou', '$2a$10$1jOz0pOV8mFrBg2uOlCC3upXrHtT74YXNFPgvh97iz6Lx03.dz02a');
`;

module.exports = {
    createSQL,
    insertSQL,
};

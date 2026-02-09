-- migrate:up
CREATE TABLE IF NOT EXISTS posts (
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT, 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE IF EXISTS posts;

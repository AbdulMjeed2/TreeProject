-- Database Setup Script for Green Saudi Project
-- Run this in your Supabase SQL Editor

-- Drop the table if it exists (for clean setup)
DROP TABLE IF EXISTS total_trees;

-- Create the total_trees table
CREATE TABLE total_trees (
  id SERIAL PRIMARY KEY,
  count INTEGER DEFAULT 0
);

-- Insert the initial record
INSERT INTO total_trees (id, count) VALUES (1, 0);

-- Verify the table was created
SELECT * FROM total_trees;

-- Grant necessary permissions (if needed)
GRANT ALL ON total_trees TO anon;
GRANT ALL ON total_trees TO authenticated;
GRANT USAGE ON SEQUENCE total_trees_id_seq TO anon;
GRANT USAGE ON SEQUENCE total_trees_id_seq TO authenticated;

/*
  # Create myplants table for user plant collections

*/
-- Create myplants table
CREATE TABLE IF NOT EXISTS myplants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plant_id text NOT NULL,
  common_name text NOT NULL,
  plant_type text,
  reference text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE myplants ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert their own plants"
  ON myplants
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own plants"
  ON myplants
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own plants"
  ON myplants
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
# Quick Fix for 404 Error on Vercel

## Step 1: Check Database Table

**Most likely cause**: The `total_trees` table doesn't exist in your Supabase database.

1. Go to your **Supabase Dashboard**
2. Click on **"SQL Editor"**
3. Run this SQL script:

```sql
-- Create the total_trees table
CREATE TABLE IF NOT EXISTS total_trees (
  id SERIAL PRIMARY KEY,
  count INTEGER DEFAULT 0
);

-- Insert initial record
INSERT INTO total_trees (id, count) 
VALUES (1, 0) 
ON CONFLICT (id) DO NOTHING;

-- Verify it worked
SELECT * FROM total_trees;
```

## Step 2: Check Vercel Environment Variables

1. Go to your **Vercel Dashboard**
2. Click on your **TreeProject**
3. Go to **"Settings"** → **"Environment Variables"**
4. Make sure these are set:
   - `SUPABASE_URL`: `https://tgipeboxbnxfnzqdnepv.supabase.co`
   - `SUPABASE_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnaXBlYm94Ym54Zm56cWRuZXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTUxNTcsImV4cCI6MjA3MDU3MTE1N30.SNKVmQqrOzhVWjCVXISUMGj-bTm4M7p2MSXzB1Y9YGU`

## Step 3: Force Redeploy

1. Make a small change to any file (add a comment)
2. Commit and push:
   ```bash
   git add .
   git commit -m "Force redeploy"
   git push TreeProject main
   ```

## Step 4: Test API Endpoints

After deployment, test these URLs in your browser:

1. **Health Check**: `https://your-vercel-url.vercel.app/api/health`
2. **Get Trees**: `https://your-vercel-url.vercel.app/api/total-trees`

## Step 5: Check Vercel Logs

1. Go to **Vercel Dashboard** → **TreeProject** → **"Functions"**
2. Look for any error messages in the logs

## Common Issues:

- **Database table missing**: Run the SQL script above
- **Environment variables not set**: Add them in Vercel settings
- **Deployment failed**: Check Vercel logs for errors

## If Still Not Working:

1. **Check browser console** for JavaScript errors
2. **Check Network tab** for failed API requests
3. **Try accessing the main page** first: `https://your-vercel-url.vercel.app/`

The most common fix is **Step 1** - creating the database table!

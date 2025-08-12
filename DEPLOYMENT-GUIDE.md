# 🚀 Deploy to Vercel - Complete Guide

## 📋 Prerequisites

1. **GitHub Account**: Make sure your project is on GitHub
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **Database Setup**: Ensure your Supabase database is ready

## 🗄️ Database Setup (If not done yet)

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `tgipeboxbnxfnzqdnepv`
3. Go to **SQL Editor**
4. Run this SQL command:

```sql
-- Drop existing tables if they exist
DROP TABLE IF EXISTS global_stats CASCADE;
DROP TABLE IF EXISTS trees CASCADE;
DROP TABLE IF EXISTS total_trees CASCADE;

-- Create the new simplified table
CREATE TABLE total_trees (
    id SERIAL PRIMARY KEY,
    count INTEGER DEFAULT 0
);

-- Insert initial record
INSERT INTO total_trees (id, count) VALUES (1, 0);

-- Verify the table was created
SELECT * FROM total_trees;
```

## 🚀 Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**:
   - **Framework Preset**: Node.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: Leave empty (not needed for this project)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Environment Variables**:
   - Click "Environment Variables"
   - Add these variables:
     - `SUPABASE_URL`: `https://tgipeboxbnxfnzqdnepv.supabase.co`
     - `SUPABASE_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnaXBlYm94Ym54Zm56cWRuZXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTUxNTcsImV4cCI6MjA3MDU3MTE1N30.SNKVmQqrOzhVWjCVXISUMGj-bTm4M7p2MSXzB1Y9YGU`

5. **Deploy**:
   - Click "Deploy"
   - Wait for deployment to complete

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set environment variables when prompted

## 🔧 Post-Deployment Setup

### 1. Update API URLs

After deployment, you'll get a URL like: `https://your-project.vercel.app`

Update your frontend files to use the production URL:

**In `js/script.js`**:
```javascript
const API_BASE = 'https://your-project.vercel.app/api';
```

**In `js/garden.js`**:
```javascript
const response = await fetch('https://your-project.vercel.app/api/total-trees');
```

### 2. Test Your Deployment

1. **Health Check**: Visit `https://your-project.vercel.app/api/health`
2. **Get Total Trees**: Visit `https://your-project.vercel.app/api/total-trees`
3. **Test the App**: Visit `https://your-project.vercel.app`

## 🔄 Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy when you push to `main` branch
- Create preview deployments for pull requests
- Update your live site automatically

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Errors**:
   - Check that `package.json` exists
   - Ensure all dependencies are listed

2. **API Not Working**:
   - Verify environment variables are set
   - Check Supabase connection

3. **Database Connection Issues**:
   - Ensure Supabase project is active
   - Verify API keys are correct

### Debug Commands:

```bash
# Check Vercel logs
vercel logs

# Redeploy
vercel --prod

# Check environment variables
vercel env ls
```

## 📱 Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS setup instructions

## 🎉 Success!

Your Green Saudi app is now live on Vercel! 

**Your app will be available at**: `https://your-project.vercel.app`

**API endpoints**:
- `https://your-project.vercel.app/api/health`
- `https://your-project.vercel.app/api/total-trees`
- `https://your-project.vercel.app/api/add-tree`

## 🔄 Updates

To update your live site:
1. Make changes to your code
2. Push to GitHub: `git push origin main`
3. Vercel automatically deploys the updates

Your app is now production-ready! 🌱

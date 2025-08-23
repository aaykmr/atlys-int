# 🚀 GitHub Pages Deployment Guide

This guide will walk you through deploying your Foo-rum app to GitHub Pages.

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Repository named `atlys-int` (or update homepage in package.json)
- ✅ Node.js 22.16.0 installed
- ✅ Git configured on your machine

## 🔧 Setup Steps

### 1. Repository Configuration

First, ensure your repository is properly configured:

```bash
# Check if you're in the right directory
pwd  # Should show: /path/to/atlys-int

# Check git status
git status

# If not a git repository, initialize it
git init
git remote add origin https://github.com/aaykmr/atlys-int.git
```

### 2. Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/aaykmr/atlys-int`
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### 3. Install Dependencies

```bash
# Install all dependencies including gh-pages
npm install

# Verify gh-pages is installed
npm list gh-pages
```

### 4. Build and Deploy

#### Option A: Automatic Deployment (Recommended)

Simply push to your main branch:

```bash
# Add all changes
git add .

# Commit changes
git commit -m "Deploy to GitHub Pages"

# Push to main branch
git push origin main
```

The GitHub Action will automatically:

- Build your project
- Deploy to GitHub Pages
- Make it available at `https://aaykmr.github.io/atlys-int`

#### Option B: Manual Deployment

```bash
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

#### Option C: Use Deployment Script

```bash
# Run the deployment script
./deploy.sh
```

## 📱 Monitoring Deployment

### Check GitHub Actions

1. Go to your repository
2. Click **Actions** tab
3. Look for the "Deploy to GitHub Pages" workflow
4. Click on the latest run to see progress

### Check GitHub Pages

1. Go to your repository
2. Click **Settings** → **Pages**
3. Look for the green checkmark indicating successful deployment

## 🌐 Access Your App

Once deployed, your app will be available at:
**https://aaykmr.github.io/atlys-int**

## 🔄 Updating Your App

### For Future Updates

1. Make your code changes
2. Commit and push to main branch:

```bash
git add .
git commit -m "Update app features"
git push origin main
```

3. GitHub Actions will automatically redeploy

### Force Redeploy

If you need to force a redeploy:

```bash
# Make a small change (like updating README)
echo "# Updated $(date)" >> README.md

# Commit and push
git add .
git commit -m "Force redeploy"
git push origin main
```

## 🛠️ Troubleshooting

### Common Issues

#### Build Fails

```bash
# Check for errors
npm run build

# Fix any TypeScript/ESLint errors
# Then try building again
```

#### Deployment Fails

1. Check GitHub Actions for error messages
2. Verify repository permissions
3. Ensure `gh-pages` package is installed
4. Check if homepage URL is correct in package.json

#### App Not Loading

1. Wait 5-10 minutes for deployment to complete
2. Check if the gh-pages branch was created
3. Verify GitHub Pages source is set to "GitHub Actions"

### Reset Deployment

If you need to start fresh:

```bash
# Delete gh-pages branch locally
git branch -D gh-pages

# Delete gh-pages branch on GitHub
git push origin --delete gh-pages

# Redeploy
npm run deploy
```

## 📊 Performance Tips

- ✅ Enable GitHub Actions caching
- ✅ Use production builds only
- ✅ Minimize bundle size
- ✅ Enable gzip compression (automatic on GitHub Pages)

## 🔒 Security Notes

- GitHub Pages is public by default
- Don't commit sensitive information
- Use environment variables for API keys
- Consider private repository if needed

## 📞 Support

If you encounter issues:

1. Check GitHub Actions logs
2. Review this deployment guide
3. Check GitHub Pages documentation
4. Open an issue in your repository

---

**🎉 Congratulations!** Your Foo-rum app is now live on GitHub Pages!

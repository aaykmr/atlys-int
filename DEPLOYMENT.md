# GitHub Pages Deployment Guide

This guide explains how to deploy your Foo-rum app to GitHub Pages using GitHub Actions.

## 🚀 **Automatic Deployment (Recommended)**

The project is configured with GitHub Actions that automatically deploy your app whenever you push to the main branch.

### **What Happens Automatically:**

1. **Push to main branch** → GitHub Actions triggers
2. **Build process** → Creates optimized production build
3. **Deploy to Pages** → Automatically deploys to `https://aaykmr.github.io/atlys-int`

### **Setup Required:**

1. **Enable GitHub Pages**:

   - Go to your repository Settings
   - Navigate to Pages section
   - Select "GitHub Actions" as source (not "Deploy from a branch")

2. **Push your changes**:

   ```bash
   git add .
   git commit -m "Setup GitHub Actions deployment"
   git push origin main
   ```

3. **Monitor deployment**:
   - Go to Actions tab in your repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Wait for it to complete successfully

## 🔧 **Manual Deployment (Alternative)**

If you prefer manual deployment or need to troubleshoot:

### **Option 1: Using GitHub CLI**

```bash
# Install GitHub CLI if you haven't
# Then run:
gh pages deploy build --repo aaykmr/atlys-int
```

### **Option 2: Manual Upload**

1. Run `npm run build`
2. Go to repository Settings → Pages
3. Upload the `build` folder contents

## 📋 **Prerequisites**

- ✅ Repository is public (or you have GitHub Pro for private repos)
- ✅ GitHub Pages is enabled in repository settings
- ✅ Source is set to "GitHub Actions" (not "Deploy from a branch")

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **Build Fails**

```bash
# Check for errors
npm run build

# Fix any TypeScript/ESLint errors
npm run lint
```

#### **Deployment Fails**

1. Check GitHub Actions for error messages
2. Verify repository permissions
3. Ensure GitHub Pages is enabled with "GitHub Actions" source

#### **App Not Loading**

1. Wait 5-10 minutes for deployment to complete
2. Check if the deployment was successful in Actions tab
3. Verify the Pages URL in repository Settings

#### **Permission Denied Errors**

- Ensure GitHub Pages source is set to "GitHub Actions"
- Check that the workflow has proper permissions
- Verify the repository is accessible

## 🔄 **Workflow Details**

The GitHub Actions workflow:

- **Triggers**: On push to main/master branch
- **Runs on**: Ubuntu latest
- **Node.js**: Version 22.16.0
- **Build**: Creates optimized production build
- **Deploy**: Uses official GitHub Pages deployment action

## 📱 **Access Your App**

Once deployed, your app will be available at:
**https://aaykmr.github.io/atlys-int**

## 🎯 **Next Steps**

1. **Commit and push** your changes
2. **Monitor the Actions tab** for deployment progress
3. **Check your app** at the GitHub Pages URL
4. **Share your live app** with others!

---

**🎉 Congratulations!** Your Foo-rum app is now live on GitHub Pages!

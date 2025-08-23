#!/bin/bash

echo "🚀 Deploying to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run build

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "🌍 Your app should be available at: https://aaykmr.github.io/atlys-int"
echo "⏱️  It may take a few minutes for changes to appear."

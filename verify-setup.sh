#!/bin/bash

# GitHub Packages Setup Verification Script

echo "🔍 Verifying GitHub Packages Configuration..."
echo ""

# Check if package.json has correct publishConfig
echo "📦 Checking package.json configuration..."
if grep -q "npm.pkg.github.com" package.json; then
    echo "✅ GitHub Packages registry configured in package.json"
else
    echo "❌ GitHub Packages registry NOT found in package.json"
fi

# Check if .npmrc exists
echo ""
echo "📄 Checking .npmrc file..."
if [ -f ".npmrc" ]; then
    echo "✅ .npmrc file exists"
    echo "   Content: $(cat .npmrc)"
else
    echo "❌ .npmrc file missing"
fi

# Check if GitHub Actions workflow exists
echo ""
echo "⚙️  Checking GitHub Actions workflow..."
if [ -f ".github/workflows/publish.yml" ]; then
    echo "✅ GitHub Actions publish workflow configured"
else
    echo "❌ GitHub Actions publish workflow missing"
fi

# Check if package can be built
echo ""
echo "🔨 Testing build process..."
if npm run build:lib > /dev/null 2>&1; then
    echo "✅ Package builds successfully"
else
    echo "❌ Package build failed"
fi

# Check if dist directory exists
echo ""
echo "📁 Checking build output..."
if [ -d "dist" ]; then
    echo "✅ dist directory exists"
    echo "   Files: $(ls dist | wc -l) files in dist/"
else
    echo "❌ dist directory missing"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Create a Personal Access Token with packages:write permission"
echo "3. Run: npm login --scope=@khouloud-bhlel --auth-type=legacy --registry=https://npm.pkg.github.com"
echo "4. Run: npm publish"
echo ""
echo "📚 See GITHUB-PACKAGES-SETUP.md for detailed instructions"

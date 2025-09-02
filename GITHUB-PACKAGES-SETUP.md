# 📦 GitHub Packages Setup Guide

This guide will help you publish your invoice generator package to GitHub Packages.

## 🔧 Prerequisites

1. **GitHub Account** with repository access
2. **Personal Access Token** with `packages:write` and `contents:read` permissions
3. **Git repository** pushed to GitHub

## 🚀 Publishing Steps

### 1. Authenticate with GitHub Packages

Create a Personal Access Token:
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "GitHub Packages - Invoice Generator"
4. Select scopes:
   - `write:packages` (to upload packages)
   - `read:packages` (to download packages)
   - `delete:packages` (optional, to delete packages)

### 2. Login to npm with GitHub

```bash
npm login --scope=@khouloud-bhlel --auth-type=legacy --registry=https://npm.pkg.github.com
```

When prompted:
- **Username**: Your GitHub username
- **Password**: Your Personal Access Token (not your GitHub password!)
- **Email**: Your GitHub email

### 3. Build and Publish

```bash
# Build the library
npm run build:lib

# Publish to GitHub Packages
npm publish
```

### 4. Verify Publication

Check your package at:
```
https://github.com/Khouloud-Bhlel/invoice-generator/packages
```

## 🔄 Automated Publishing with GitHub Actions

The repository includes a GitHub Actions workflow (`.github/workflows/publish.yml`) that automatically publishes when you:

### Option 1: Create a Release
1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Create a new tag (e.g., `v1.0.0`)
4. Fill in release details
5. Click "Publish release"

### Option 2: Push a Version Tag
```bash
# Update version in package.json first
npm version patch  # or minor/major

# Push the tag
git push origin main --tags
```

## 📥 Installing from GitHub Packages

### For Package Users

Users need to configure npm to use GitHub Packages for your scoped package:

#### Method 1: Global Configuration
```bash
npm config set @khouloud-bhlel:registry https://npm.pkg.github.com/
npm install @khouloud-bhlel/invoice-generator
```

#### Method 2: Project .npmrc File
Create `.npmrc` in project root:
```
@khouloud-bhlel:registry=https://npm.pkg.github.com/
```

Then install:
```bash
npm install @khouloud-bhlel/invoice-generator
```

#### Method 3: One-time Install
```bash
npm install @khouloud-bhlel/invoice-generator --registry=https://npm.pkg.github.com/
```

## 🔐 Authentication for Package Installation

### Public Packages
Your package should be installable without authentication if the repository is public.

### Private Packages
Users need to authenticate:

```bash
npm login --scope=@khouloud-bhlel --auth-type=legacy --registry=https://npm.pkg.github.com
```

Or create a `.npmrc` file with:
```
@khouloud-bhlel:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=TOKEN_HERE
```

## 📋 Package Information

- **Registry**: `https://npm.pkg.github.com/`
- **Package Name**: `@khouloud-bhlel/invoice-generator`
- **Scope**: `@khouloud-bhlel`
- **Repository**: `https://github.com/Khouloud-Bhlel/invoice-generator`

## 🛠️ Troubleshooting

### Common Issues:

#### 1. 404 Not Found
- Ensure your GitHub repository exists and is accessible
- Check that the package name matches the GitHub username/organization

#### 2. 403 Forbidden
- Verify your Personal Access Token has correct permissions
- Make sure you're logged in: `npm whoami --registry=https://npm.pkg.github.com`

#### 3. Package Already Exists
- Increment the version in `package.json`
- Run `npm run build:lib` before publishing

#### 4. Authentication Failed
- Generate a new Personal Access Token
- Re-run the npm login command

## ✅ Success Checklist

- [ ] Personal Access Token created with correct permissions
- [ ] Logged in to npm with GitHub credentials
- [ ] Package.json configured with GitHub Packages registry
- [ ] .npmrc file created
- [ ] GitHub Actions workflow configured
- [ ] Library built successfully (`npm run build:lib`)
- [ ] Package published (`npm publish`)
- [ ] Package visible on GitHub repository packages tab

## 🎯 Next Steps

Once published, your package will be available at:
```
https://github.com/Khouloud-Bhlel/invoice-generator/packages
```

Users can install it with:
```bash
npm config set @khouloud-bhlel:registry https://npm.pkg.github.com/
npm install @khouloud-bhlel/invoice-generator
```

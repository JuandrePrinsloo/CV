# 🚀 S3 Deployment Guide - Web3Forms Integration

## 🎯 Overview

Your site is hosted on AWS S3 (static hosting). Since S3 serves static files, environment variables must be **baked into the build** at compile time.

---

## ⚠️ IMPORTANT: Environment Variables in S3

Unlike server-side applications, Vite environment variables are:
- ✅ Compiled into the JavaScript bundle at **build time**
- ❌ NOT available at runtime
- ✅ Only variables prefixed with `VITE_` are exposed to the client

**This means:** You must set `VITE_WEB3FORMS_ACCESS_KEY` **before building** for production.

---

## 🔧 Deployment Methods

Choose the method that matches your workflow:

### Method 1: Manual Build & Upload (Simple)
### Method 2: AWS CLI Script (Automated)
### Method 3: GitHub Actions CI/CD (Enterprise)
### Method 4: AWS CodePipeline (AWS Native)

---

## 📦 Method 1: Manual Build & Upload

### Step 1: Set Environment Variable

**Windows PowerShell:**
```powershell
$env:VITE_WEB3FORMS_ACCESS_KEY="your-actual-key-here"
npm run build
```

**Windows CMD:**
```cmd
set VITE_WEB3FORMS_ACCESS_KEY=your-actual-key-here
npm run build
```

**Linux/Mac:**
```bash
VITE_WEB3FORMS_ACCESS_KEY=your-actual-key-here npm run build
```

### Step 2: Verify Build
```powershell
# Check that dist folder was created
dir dist

# The dist folder should contain:
# - index.html
# - assets/ (JS, CSS)
```

### Step 3: Upload to S3

**Using AWS Console:**
1. Go to S3 Console
2. Open your bucket
3. Delete old files (or use versioning)
4. Upload entire `dist` folder contents
5. Make sure files are public (if needed)

**Using AWS CLI:**
```powershell
# Sync dist folder to S3 bucket
aws s3 sync dist/ s3://your-bucket-name/ --delete

# With CloudFront invalidation (if using CDN)
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

## 🤖 Method 2: AWS CLI Script (Recommended)

I've created automated deployment scripts for you!

### PowerShell Script: `deploy-to-s3.ps1`

**Features:**
- ✅ Validates environment variables
- ✅ Builds production bundle
- ✅ Syncs to S3
- ✅ Invalidates CloudFront cache (optional)
- ✅ Error handling
- ✅ Rollback support

**Usage:**
```powershell
# Set your access key first
$env:VITE_WEB3FORMS_ACCESS_KEY="your-key-here"

# Run deployment
.\deploy-to-s3.ps1 -BucketName "your-bucket-name"

# With CloudFront
.\deploy-to-s3.ps1 -BucketName "your-bucket-name" -CloudFrontDistId "E1234567890ABC"
```

### Bash Script: `deploy-to-s3.sh`

**For Linux/Mac or Git Bash on Windows:**
```bash
# Make executable
chmod +x deploy-to-s3.sh

# Run deployment
VITE_WEB3FORMS_ACCESS_KEY="your-key" ./deploy-to-s3.sh your-bucket-name
```

---

## 🔄 Method 3: GitHub Actions CI/CD

Automate deployments on every push to main!

### Features:
- ✅ Auto-deploy on git push
- ✅ Secrets management (secure)
- ✅ Build caching (faster)
- ✅ Deployment previews
- ✅ Rollback capability

### Setup:

1. **Add GitHub Secrets** (Settings → Secrets → Actions):
   - `VITE_WEB3FORMS_ACCESS_KEY` - Your Web3Forms key
   - `AWS_ACCESS_KEY_ID` - Your AWS access key
   - `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
   - `S3_BUCKET_NAME` - Your bucket name (e.g., `my-portfolio`)
   - `CLOUDFRONT_DISTRIBUTION_ID` - Optional, if using CloudFront

2. **Use the GitHub Action** (`.github/workflows/deploy.yml`)
   - Already created for you!
   - Auto-deploys on push to `main`

3. **Push to GitHub:**
```bash
git add .
git commit -m "Add Web3Forms integration"
git push origin main
```

4. **Watch it deploy!**
   - Go to Actions tab in GitHub
   - Watch the deployment progress
   - Your site updates automatically!

---

## ☁️ Method 4: AWS CodePipeline

For AWS-native CI/CD:

### Setup:

1. **Create CodePipeline:**
   - Source: GitHub/CodeCommit
   - Build: CodeBuild (use `buildspec.yml`)
   - Deploy: S3

2. **Add Environment Variables to CodeBuild:**
   - Go to CodeBuild project
   - Environment → Additional configuration
   - Add: `VITE_WEB3FORMS_ACCESS_KEY`

3. **Use buildspec.yml** (created for you!)

---

## 🔐 Security Best Practices

### ✅ DO:
- Store Web3Forms key in CI/CD secrets
- Use IAM roles with minimum permissions
- Enable S3 bucket versioning
- Use CloudFront for HTTPS
- Set proper CORS headers

### ❌ DON'T:
- Commit `.env` to git
- Share access keys publicly
- Use root AWS credentials
- Skip CloudFront (no HTTPS = insecure)

---

## 📋 Pre-Deployment Checklist

- [ ] Web3Forms access key obtained
- [ ] Environment variable set (local or CI/CD)
- [ ] AWS CLI installed and configured
- [ ] S3 bucket created and configured
- [ ] Bucket policy allows public read (if needed)
- [ ] CloudFront distribution created (recommended)
- [ ] DNS pointing to CloudFront/S3
- [ ] Test build locally first

---

## 🧪 Testing Your Deployment

### 1. Test Locally First:
```powershell
# Build with production env
$env:VITE_WEB3FORMS_ACCESS_KEY="your-key"
npm run build

# Preview the build
npm run preview

# Test contact form
```

### 2. After S3 Upload:
```
1. Visit your S3 website URL
2. Fill out contact form
3. Submit test message
4. Check email inbox
5. Verify instant delivery
```

### 3. Verify Environment Variable:
```powershell
# Check if key is in build
Select-String -Path "dist/assets/*.js" -Pattern "web3forms" -CaseSensitive
```

**You should see:** References to `api.web3forms.com` in the compiled JavaScript.

---

## 🔍 Troubleshooting

### "Contact form not working after deployment"

**Cause:** Environment variable not set during build.

**Fix:**
```powershell
# Rebuild with env var
$env:VITE_WEB3FORMS_ACCESS_KEY="your-key"
npm run build
# Re-upload to S3
```

### "How do I update the access key?"

1. Rebuild with new key
2. Re-upload to S3
3. Invalidate CloudFront cache

### "Form works locally but not on S3"

**Check:**
1. View page source on S3 site
2. Open browser DevTools → Network tab
3. Submit form
4. Look for `api.web3forms.com` request
5. Check if access key is included

### "CORS errors"

**S3 Bucket CORS configuration needed:**
```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "HEAD"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

---

## 📊 Deployment Comparison

| Method | Difficulty | Automation | Best For |
|--------|-----------|------------|----------|
| Manual Upload | Easy | None | Testing |
| AWS CLI Script | Medium | Semi | Small teams |
| GitHub Actions | Medium | Full | Most projects ✅ |
| CodePipeline | Hard | Full | AWS-heavy setups |

**Recommendation:** Use **GitHub Actions** for best developer experience.

---

## 🚀 Quick Start (Fastest Method)

### For Immediate Deployment:

```powershell
# 1. Set env variable
$env:VITE_WEB3FORMS_ACCESS_KEY="your-actual-key-here"

# 2. Build
npm run build

# 3. Upload to S3
aws s3 sync dist/ s3://your-bucket-name/ --delete

# 4. Test
# Visit your site and test the contact form!
```

**Time:** ~2 minutes ⚡

---

## 📦 What Gets Deployed

Your `dist` folder will contain:

```
dist/
├── index.html              # Main HTML file
├── assets/
│   ├── index-abc123.js     # Your compiled app (includes Web3Forms)
│   ├── index-xyz789.css    # Styles
│   └── *.jpg, *.pdf        # Static assets
└── ...
```

**Size:** ~500KB - 2MB (compressed)

---

## 🎯 Post-Deployment Verification

### ✅ Checklist:

1. **Site loads:** Visit your S3/CloudFront URL
2. **Contact form visible:** Scroll to contact section
3. **Form submits:** Fill and submit test message
4. **Email received:** Check inbox (5-30 seconds)
5. **No console errors:** Open DevTools, check console
6. **Mobile responsive:** Test on phone
7. **HTTPS working:** Green padlock in browser

---

## 🔄 Update Process (When You Make Changes)

```powershell
# 1. Make code changes
# 2. Test locally
npm run dev

# 3. Build with env
$env:VITE_WEB3FORMS_ACCESS_KEY="your-key"
npm run build

# 4. Deploy
aws s3 sync dist/ s3://your-bucket-name/ --delete

# 5. Clear cache (if using CloudFront)
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## 💡 Pro Tips

1. **Use CloudFront:** Much faster + free HTTPS
2. **Enable S3 versioning:** Easy rollback if issues
3. **Automate with GitHub Actions:** Save hours of manual work
4. **Monitor costs:** S3 + CloudFront are cheap but not free
5. **Set cache headers:** Faster load times for users
6. **Use Route 53:** Professional custom domain setup

---

## 📚 Additional Resources

- **AWS S3 Static Hosting:** https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html
- **CloudFront Setup:** https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/GettingStarted.html
- **GitHub Actions:** https://docs.github.com/en/actions
- **Vite Environment Variables:** https://vitejs.dev/guide/env-and-mode.html

---

## 🆘 Need Help?

1. Check deployment scripts (`deploy-to-s3.ps1`, `deploy-to-s3.sh`)
2. Review GitHub Actions workflow (`.github/workflows/deploy.yml`)
3. Test locally first (`npm run preview`)
4. Check AWS credentials are configured
5. Verify S3 bucket permissions

---

## ✅ You're Ready!

Your site is configured for S3 deployment with Web3Forms integration.

**Next Steps:**
1. Choose deployment method (GitHub Actions recommended)
2. Set environment variable
3. Build and deploy
4. Test contact form
5. Celebrate! 🎉

---

**Status:** ✅ PRODUCTION READY

Your contact form will work perfectly on S3! 🚀


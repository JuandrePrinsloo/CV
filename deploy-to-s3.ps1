#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Deploy Juandre Resume to AWS S3
.DESCRIPTION
    Builds the Vite app with Web3Forms integration and deploys to S3 bucket
.PARAMETER BucketName
    The S3 bucket name (required)
.PARAMETER CloudFrontDistId
    Optional CloudFront distribution ID for cache invalidation
.PARAMETER Region
    AWS region (default: us-east-1)
.EXAMPLE
    .\deploy-to-s3.ps1 -BucketName "my-portfolio-bucket"
.EXAMPLE
    .\deploy-to-s3.ps1 -BucketName "my-portfolio" -CloudFrontDistId "E1234567890ABC"
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$BucketName,
    
    [Parameter(Mandatory=$false)]
    [string]$CloudFrontDistId = "",
    
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-east-1"
)

# Colors for output
function Write-Success { param($Message) Write-Host "✅ $Message" -ForegroundColor Green }
function Write-Info { param($Message) Write-Host "ℹ️  $Message" -ForegroundColor Cyan }
function Write-Warning { param($Message) Write-Host "⚠️  $Message" -ForegroundColor Yellow }
function Write-Error { param($Message) Write-Host "❌ $Message" -ForegroundColor Red }

Write-Host "`n🚀 Juandre Resume - S3 Deployment Script`n" -ForegroundColor Magenta

# Check if AWS CLI is installed
Write-Info "Checking AWS CLI installation..."
try {
    $awsVersion = aws --version 2>&1
    Write-Success "AWS CLI found: $awsVersion"
} catch {
    Write-Error "AWS CLI not found. Please install it first:"
    Write-Host "   https://aws.amazon.com/cli/`n"
    exit 1
}

# Check if Web3Forms access key is set
Write-Info "Checking environment variables..."
if (-not $env:VITE_WEB3FORMS_ACCESS_KEY) {
    Write-Error "VITE_WEB3FORMS_ACCESS_KEY not set!"
    Write-Host "`nPlease set it before running this script:"
    Write-Host '   $env:VITE_WEB3FORMS_ACCESS_KEY="your-access-key-here"' -ForegroundColor Yellow
    Write-Host "`nOr add it to your .env file and load it.`n"
    exit 1
}
Write-Success "Web3Forms access key found"

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Warning "node_modules not found. Installing dependencies..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Error "npm install failed"
        exit 1
    }
}

# Clean previous build
Write-Info "Cleaning previous build..."
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Success "Previous build cleaned"
}

# Build the app
Write-Info "Building production bundle..."
Write-Host "   This may take a minute...`n" -ForegroundColor Gray
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "Build failed!"
    exit 1
}

# Verify build output
if (-not (Test-Path "dist/index.html")) {
    Write-Error "Build failed - dist/index.html not found"
    exit 1
}

$buildSize = (Get-ChildItem dist -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Success "Build completed! Size: $([math]::Round($buildSize, 2)) MB"

# Verify Web3Forms is in the build
Write-Info "Verifying Web3Forms integration..."
$jsFiles = Get-ChildItem -Path "dist/assets" -Filter "*.js" -Recurse
$web3formsFound = $false
foreach ($file in $jsFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match "web3forms") {
        $web3formsFound = $true
        break
    }
}

if ($web3formsFound) {
    Write-Success "Web3Forms integration verified in build"
} else {
    Write-Warning "Could not verify Web3Forms in build (might be minified)"
}

# Upload to S3
Write-Info "Uploading to S3 bucket: $BucketName"
Write-Host "   Region: $Region`n" -ForegroundColor Gray

aws s3 sync dist/ "s3://$BucketName/" --delete --region $Region

if ($LASTEXITCODE -ne 0) {
    Write-Error "S3 upload failed!"
    Write-Host "`nPossible issues:"
    Write-Host "   1. Check AWS credentials: aws configure"
    Write-Host "   2. Verify bucket exists: aws s3 ls"
    Write-Host "   3. Check IAM permissions"
    Write-Host "   4. Verify bucket name: $BucketName`n"
    exit 1
}

Write-Success "Upload to S3 completed!"

# Invalidate CloudFront cache if distribution ID provided
if ($CloudFrontDistId) {
    Write-Info "Invalidating CloudFront cache..."
    Write-Host "   Distribution: $CloudFrontDistId`n" -ForegroundColor Gray
    
    aws cloudfront create-invalidation `
        --distribution-id $CloudFrontDistId `
        --paths "/*" `
        --region $Region
    
    if ($LASTEXITCODE -eq 0) {
        Write-Success "CloudFront cache invalidation created"
        Write-Host "   Note: May take 5-15 minutes to complete" -ForegroundColor Gray
    } else {
        Write-Warning "CloudFront invalidation failed (non-critical)"
    }
}

# Summary
Write-Host "`n" + "="*60 -ForegroundColor Magenta
Write-Host "🎉 DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host "="*60 + "`n" -ForegroundColor Magenta

Write-Host "📊 Deployment Summary:"
Write-Host "   Bucket:    $BucketName"
Write-Host "   Region:    $Region"
Write-Host "   Build Size: $([math]::Round($buildSize, 2)) MB"
if ($CloudFrontDistId) {
    Write-Host "   CloudFront: $CloudFrontDistId (cache invalidating...)"
}

Write-Host "`n🌐 Your site should be live at:"
Write-Host "   http://$BucketName.s3-website-$Region.amazonaws.com" -ForegroundColor Cyan

if ($CloudFrontDistId) {
    Write-Host "   Or your CloudFront domain (wait for cache invalidation)" -ForegroundColor Cyan
}

Write-Host "`n✅ Next Steps:"
Write-Host "   1. Visit your website"
Write-Host "   2. Test the contact form"
Write-Host "   3. Verify email arrives instantly"

Write-Host "`n💡 Pro Tip: Set up a custom domain with Route 53!`n"


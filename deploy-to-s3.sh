#!/bin/bash

###############################################################################
# Deploy Juandre Resume to AWS S3
# Usage: ./deploy-to-s3.sh <bucket-name> [cloudfront-distribution-id] [region]
###############################################################################

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Functions
success() { echo -e "${GREEN}✅ $1${NC}"; }
info() { echo -e "${CYAN}ℹ️  $1${NC}"; }
warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; exit 1; }

echo -e "\n${MAGENTA}🚀 Juandre Resume - S3 Deployment Script${NC}\n"

# Check arguments
if [ -z "$1" ]; then
    error "Bucket name is required!\n\n   Usage: ./deploy-to-s3.sh <bucket-name> [cloudfront-id] [region]\n   Example: ./deploy-to-s3.sh my-portfolio-bucket"
fi

BUCKET_NAME="$1"
CLOUDFRONT_DIST_ID="${2:-}"
REGION="${3:-us-east-1}"

# Check AWS CLI
info "Checking AWS CLI installation..."
if ! command -v aws &> /dev/null; then
    error "AWS CLI not found. Please install it:\n   https://aws.amazon.com/cli/"
fi
success "AWS CLI found: $(aws --version)"

# Check Web3Forms key
info "Checking environment variables..."
if [ -z "$VITE_WEB3FORMS_ACCESS_KEY" ]; then
    error "VITE_WEB3FORMS_ACCESS_KEY not set!\n\n   Please set it:\n   export VITE_WEB3FORMS_ACCESS_KEY=\"your-key-here\"\n   Or: VITE_WEB3FORMS_ACCESS_KEY=\"your-key\" ./deploy-to-s3.sh $BUCKET_NAME"
fi
success "Web3Forms access key found"

# Check node_modules
if [ ! -d "node_modules" ]; then
    warning "node_modules not found. Installing dependencies..."
    npm install
fi

# Clean previous build
info "Cleaning previous build..."
rm -rf dist
success "Previous build cleaned"

# Build
info "Building production bundle..."
echo -e "   ${NC}This may take a minute...${NC}\n"
npm run build

if [ ! -f "dist/index.html" ]; then
    error "Build failed - dist/index.html not found"
fi

# Calculate build size
BUILD_SIZE=$(du -sh dist | cut -f1)
success "Build completed! Size: $BUILD_SIZE"

# Verify Web3Forms integration
info "Verifying Web3Forms integration..."
if grep -r "web3forms" dist/assets/*.js > /dev/null 2>&1; then
    success "Web3Forms integration verified in build"
else
    warning "Could not verify Web3Forms in build (might be minified)"
fi

# Upload to S3
info "Uploading to S3 bucket: $BUCKET_NAME"
echo -e "   ${NC}Region: $REGION${NC}\n"

if aws s3 sync dist/ "s3://$BUCKET_NAME/" --delete --region "$REGION"; then
    success "Upload to S3 completed!"
else
    error "S3 upload failed!\n\n   Possible issues:\n   1. Check AWS credentials: aws configure\n   2. Verify bucket exists: aws s3 ls\n   3. Check IAM permissions\n   4. Verify bucket name: $BUCKET_NAME"
fi

# Invalidate CloudFront cache
if [ -n "$CLOUDFRONT_DIST_ID" ]; then
    info "Invalidating CloudFront cache..."
    echo -e "   ${NC}Distribution: $CLOUDFRONT_DIST_ID${NC}\n"
    
    if aws cloudfront create-invalidation \
        --distribution-id "$CLOUDFRONT_DIST_ID" \
        --paths "/*" \
        --region "$REGION" > /dev/null 2>&1; then
        success "CloudFront cache invalidation created"
        echo -e "   ${NC}Note: May take 5-15 minutes to complete${NC}"
    else
        warning "CloudFront invalidation failed (non-critical)"
    fi
fi

# Summary
echo -e "\n${MAGENTA}============================================================${NC}"
echo -e "${GREEN}🎉 DEPLOYMENT SUCCESSFUL!${NC}"
echo -e "${MAGENTA}============================================================${NC}\n"

echo -e "📊 Deployment Summary:"
echo -e "   Bucket:     $BUCKET_NAME"
echo -e "   Region:     $REGION"
echo -e "   Build Size: $BUILD_SIZE"
[ -n "$CLOUDFRONT_DIST_ID" ] && echo -e "   CloudFront: $CLOUDFRONT_DIST_ID (cache invalidating...)"

echo -e "\n🌐 Your site should be live at:"
echo -e "   ${CYAN}http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com${NC}"

[ -n "$CLOUDFRONT_DIST_ID" ] && echo -e "   ${CYAN}Or your CloudFront domain (wait for cache invalidation)${NC}"

echo -e "\n✅ Next Steps:"
echo -e "   1. Visit your website"
echo -e "   2. Test the contact form"
echo -e "   3. Verify email arrives instantly"

echo -e "\n💡 Pro Tip: Set up a custom domain with Route 53!\n"


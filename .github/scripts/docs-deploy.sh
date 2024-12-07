aws s3 sync --delete ./packages/docs/dist/ s3://$S3_BUCKET --cache-control "public, max-age=0, must-revalidate, s-maxage=31536000"

aws s3 cp s3://$S3_BUCKET s3://$S3_BUCKET --exclude "*" --include "_astro/*" --recursive --cache-control "public, max-age=31536000, immutable, s-maxage=31536000"

aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
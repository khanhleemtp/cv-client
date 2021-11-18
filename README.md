    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "deploy": "npm run build && aws s3 sync ./build s3://ld-datn-client --delete --acl public-read"
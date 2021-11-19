````javascript

"predeploy": "npm run build",
"deploy": "gh-pages -d build",
"deploy": "npm run build && aws s3 sync ./build s3://ld-datn-client --delete --acl public-read"
DOMAIN=http://localhost:8000/api/v1
REACT_APP_URL=$DOMAIN ```
````

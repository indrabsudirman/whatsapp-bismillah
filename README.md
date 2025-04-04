Please following steps below to run this in your local:

Copy the `.env-example` and update the values based on your own local:

1. NODE_ENV=development
2. DATABASE_URL=mongodb://yourUserNameMongoDB:yourPasswordMongoDB@127.0.0.1:27017/yourDBName?authSource=admin&directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.4.2
3. ACCESS_TOKEN_SECRET=your_access_token_secret
4. REFRESH_TOKEN_SECRET=your_refresh_token_secret
5. DEFAULT_PICTURE=default_picture_url
6. DEFAULT_STATUS=Hey there! I am using WhatsApp
7. CLIENT_ENDPOINT=http://localhost:3000

Please noted on the point number 2. You could update the `yourUserNameMongoDB`, `yourPasswordMongoDB` and `yourDBName` you should update based on your own. The point number 2. I used Mongo DB Docker.

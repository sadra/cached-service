# Cache API Server

This a Node.js and Express.js to build the API and MongoDB to store thecache data in.

## How to Run

1. Just copy `.env.example` to `.env` and fill with your einviorements:

```
PORT=8000
MONGO_DB_NAME=cache_db
MONGO_TEST_DB_NAME=test_db
MONGO_DB_PORT=27017
```

2. Install npm packages:

```bash
npm install
```

3. To run app just call following in your command line:

```bash
npm run start:dev
```

4. You can run project on production js too:

```bash
npm run start
```

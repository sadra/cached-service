# Cache API Server

This a Node.js and Express.js to build the API and MongoDB to store thecache data in.

## How to Run

1. Just copy `.env.example` to `.env` and fill with your einviorements:

```
PORT=8000
MONGO_DB_NAME=cache_db
MONGO_TEST_DB_NAME=test_db
MONGO_DB_PORT=27017
CACHE_LIMIT=10
```

The `CACHE_LIMIT` stands for limit of existing cache on mongo.

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

## Run Test

You should be noticed to run tests you need mongoDb for test repository functions.

1. Just copy `.env.example` to `.env` and fill with your einviorements:

```
MONGO_TEST_DB_NAME=test_db
MONGO_DB_PORT=27017
```

2. To run all the tests:

```bash
npm test
```

## API

Base Route: `https://localhost:8000`
### Get All Keys

Route: `/cache/keys`
Method: `GET`
Response:
```json
["key_1", "key_2", "key_3"]
```

### Get a Data with Key

Route: `/cache/keys/DATA_KEY`
Method: `GET`
Response:
```json
{
    "ttl": 60000,
    "_id": "606c968569a73d64845a72bf",
    "key": "key_1617729157563",
    "data": { "msg": "dummy" },
    "date": "2021-04-06T17:12:37.568Z",
    "__v": 0,
}
```

### Delete a Data with Key

Route: `/cache/keys/DATA_KEY`
Method: `DELETE`
Response:
```json
{ "deletedCount": 1 }
```

### Delete a All Cached Data

Route: `/cache/keys`
Method: `DELETE`
Response:
```json
{ "deletedCount": 10 }
```

### Upsert a Data (Update/Create)

Route: `/cache/keys/DATA_KEY`
Method: `PUT`
Body:
```json
{ "msg": "dummy" } //The data that you want to be cached
```

Response:
```json
{
    "ttl": 60000,
    "_id": "606c968569a73d64845a72bf",
    "key": "key_1617729157563",
    "data": { "msg": "dummy" },
    "date": "2021-04-06T17:12:37.568Z",
    "__v": 0,
}
```

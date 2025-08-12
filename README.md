
# Custom Tokeniser

A simple Node.js API for encoding and decoding text using a custom, word-level tokenizer with random token IDs and special token support.

## Features
- Learns vocabulary from input text (word-level)
- Assigns random token IDs (1-999) to each word
- Handles special tokens: `<PAD>`, `<UNK>`, `<BOS>`, `<EOS>`
- Provides `/encode` and `/decode` API endpoints
- CORS enabled for all origins

## Requirements
- Node.js 18+
- npm

## Installation
1. Clone the repository:
	 ```sh
	 git clone <your-repo-url>
	 cd custom-tokeniser
	 ```
2. Install dependencies:
	 ```sh
	 npm install
	 ```

## Running the Server
Start the API server:
```sh
node index.js
```
The server will run at `http://localhost:3000` by default.

## API Usage

### Encode
- **Endpoint:** `POST /encode`
- **Body:**
	```json
	{ "text": "your text here" }
	```
- **Response:**
	```json
	{ "tokens": [ ... ] }
	```

### Decode
- **Endpoint:** `POST /decode`
- **Body:**
	```json
	{ "tokens": [1, 42, 99, ...] }
	```
- **Response:**
	```json
	{ "text": "decoded text" }
	```

## Example with curl

Encode:
```sh
curl -X POST http://localhost:3000/encode -H "Content-Type: application/json" -d '{"text":"hello world"}'
```

Decode:
```sh
curl -X POST http://localhost:3000/decode -H "Content-Type: application/json" -d '{"tokenIds":[...your token ids...]}'
```

## Vercel Deployment
- Project is ready for Vercel deployment with `vercel.json`.
- Push to your GitHub and connect to Vercel for instant deployment.


## Notes
- The vocabulary is built in-memory and resets when the server restarts.
- Use the same server instance for both encoding and decoding to avoid `<UNK>` tokens.
- Tokenization is performed at the word level (splitting on whitespace). Each unique word is assigned a random token ID.

---

Feel free to open issues or contribute!


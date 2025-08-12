
// CustomTokenizer class that learns vocabulary from text, supports encode/decode, and handles special tokens
// This class builds a vocabulary dynamically as it sees new tokens in input text.
export class CustomTokenizer {
  constructor() {
    // Maps token string to unique integer ID
    this.vocab = {};
    // Maps integer ID back to token string
    this.invVocab = {};
    // Special tokens for padding, unknown, beginning, and end of sequence
    this.specialTokens = {
      PAD: '<PAD>',
      UNK: '<UNK>',
      BOS: '<BOS>',
      EOS: '<EOS>'
    };
    this.nextId = 0;
    // Add special tokens to vocab at initialization
    Object.values(this.specialTokens).forEach(token => this._addToken(token));
  }

  // Add a token to the vocabulary if not already present, using a random unused ID
  _addToken(token) {
    if (!(token in this.vocab)) {
      let id;
      do {
        // Generate a random integer between 1 and 9999 (can be 1, 2, ... 9999)
        id = Math.floor(Math.random() * 9999) + 1;
      } while (id in this.invVocab);
      this.vocab[token] = id;
      this.invVocab[id] = token;
    }
  }

  // Learn new tokens from input text (whitespace tokenization)
  learnVocabFromText(text) {
    // Learn vocab from whitespace tokenization
    const tokens = text.split(/\s+/);
    tokens.forEach(token => this._addToken(token));
  }

  // Encode text to array of token IDs, adding BOS and EOS special tokens
  encode(text) {
    // Add BOS and EOS tokens
    const tokens = [this.specialTokens.BOS, ...text.split(/\s+/), this.specialTokens.EOS];
    return tokens.map(token => {
      if (token in this.vocab) {
        return this.vocab[token];
      } else {
        // Add new token to vocab on the fly
        this._addToken(token);
        return this.vocab[token];
      }
    });
  }

  // Decode array of token IDs back to string, omitting special tokens except UNK
  decode(tokenIds) {
    // Convert token IDs back to tokens, remove special tokens except UNK
    const tokens = tokenIds.map(id => this.invVocab[id] || this.specialTokens.UNK);
    // Remove BOS and EOS if present
    return tokens.filter(t => t !== this.specialTokens.BOS && t !== this.specialTokens.EOS && t !== this.specialTokens.PAD).join(' ');
  }

  // Get a copy of the current vocabulary
  getVocab() {
    return { ...this.vocab };
  }
}

// Singleton instance for API usage
// Use this instance to avoid rebuilding vocab for every request
export const tokenizer = new CustomTokenizer();

export function encode(text) {
  if (typeof text !== 'string') throw new Error('Input must be a string');
  tokenizer.learnVocabFromText(text);
  return tokenizer.encode(text);
}

export function decode(tokenIds) {
  if (!Array.isArray(tokenIds)) throw new Error('Input must be an array of token IDs');
  return tokenizer.decode(tokenIds);
}

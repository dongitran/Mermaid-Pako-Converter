const pako = require('pako');

/**
 * Encode a Uint8Array to a URL-safe base64 string
 * @param {Uint8Array} uint8array - The array to encode
 * @returns {string} URL-safe base64 encoded string
 */
function base64UrlEncode(uint8array) {
  // Convert the Uint8Array to a regular base64 string
  let base64 = Buffer.from(uint8array).toString('base64');
  
  // Make it URL-safe: Replace "+" with "-", "/" with "_", and remove trailing "="
  base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
  return base64;
}

/**
 * Converts Mermaid code to a Mermaid Live Editor compatible URL hash
 * @param {string} mermaidCode - The Mermaid diagram code
 * @returns {string} The compressed hash
 */
function mermaidCodeToHash(mermaidCode) {
  // Create a state object similar to the one in the Mermaid Live Editor
  const state = {
    code: mermaidCode,
    grid: true,
    mermaid: JSON.stringify({
      theme: "default"
    }, null, 2),
    panZoom: true,
    rough: false,
    updateDiagram: true
  };

  // Convert the state to JSON
  const json = JSON.stringify(state);
  
  // Convert the JSON string to Uint8Array (UTF-8 encoded)
  const data = Buffer.from(json, 'utf-8');
  
  // Compress the data using pako (with compression level 9)
  const compressed = pako.deflate(data, { level: 9 });
  
  // Convert the compressed binary data to base64
  const base64 = base64UrlEncode(compressed);
  
  // Return the serialized string with the "pako:" prefix
  return `pako:${base64}`;
}

/**
 * Generates a full Mermaid Live Editor URL from a hash
 * @param {string} hash - The compressed hash
 * @returns {string} The full Mermaid Live Editor URL
 */
function mermaidCodeToUrl(hash) {
  return `https://mermaid.live/edit#${hash}`;
}

module.exports = {
  base64UrlEncode,
  mermaidCodeToHash,
  mermaidCodeToUrl
};

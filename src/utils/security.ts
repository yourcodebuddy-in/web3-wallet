export const KDF_ITERATIONS = 100000;

function bufferToHex(buffer: Uint8Array | Buffer | ArrayBuffer) {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function hexToBuffer(hex: string) {
  return new Uint8Array(hex.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? []);
}

/**
 * Encrypts a value with a password and returns a "vault" object.
 * This vault is what you would store in localStorage.
 *
 * @param {string} valueToEncrypt - The secret value (e.g., mnemonic).
 * @param {string} password - The user's password (from an input field).
 * @returns {Promise<object|null>} The vault object to be stored.
 */
export async function createEncryptedVault(valueToEncrypt: string, password: string) {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const baseKey = await window.crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);
  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: KDF_ITERATIONS,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"]
  );

  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    derivedKey,
    new TextEncoder().encode(valueToEncrypt)
  );

  return {
    encryptedHex: bufferToHex(encryptedData),
    saltHex: bufferToHex(salt),
    ivHex: bufferToHex(iv),
  };
}

/**
 * Decrypts a vault using a password from user input.
 *
 * @param {object} vault - The vault object retrieved from localStorage.
 * @param {string} password - The password entered by the user to unlock.
 * @returns {Promise<string|null>} The decrypted value, or null if it fails.
 */
export async function decryptVault(vault: { saltHex: string; ivHex: string; encryptedHex: string }, password: string) {
  const salt = hexToBuffer(vault.saltHex);
  const iv = hexToBuffer(vault.ivHex);
  const encryptedData = hexToBuffer(vault.encryptedHex);

  const baseKey = await window.crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, [
    "deriveKey",
  ]);
  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: KDF_ITERATIONS,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["decrypt"]
  );

  const decryptedData = await window.crypto.subtle.decrypt({ name: "AES-GCM", iv: iv }, derivedKey, encryptedData);

  return new TextDecoder().decode(decryptedData);
}

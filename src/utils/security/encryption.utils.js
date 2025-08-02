
import CryptoJS from 'crypto-js';

const secretKey = process.env.SECRET_KEY || 'my_secret_key_123';

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};











// import crypto from 'crypto'


// const algorithm = "aes-256-cbc";
// const secretKey = Buffer.from(process.env.SECRET_KEY, "utf-8");

// export const encryptPhone = (phone) => {
//   const iv = crypto.randomBytes(16);
//   const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
//   let encrypted = cipher.update(phone, "utf8", "hex");
//   encrypted += cipher.final("hex");

//   return {
//     encryptedData: encrypted,
//     iv: iv.toString("hex"),
//   };
// }
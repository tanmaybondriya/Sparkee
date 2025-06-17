export const generateQRCode = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `QR${timestamp}${random}`.slice(-10);
};
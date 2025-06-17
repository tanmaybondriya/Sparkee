import React from "react";
import { QRCodeSVG } from "qrcode.react";

const QRModal = ({ showQRModal, setShowQRModal, generatedQR }) =>
  showQRModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">QR Code Generated</h3>
        <div className="text-center">
          <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <QRCode value={generatedQR} size={192} />
          </div>
          <p className="text-sm text-gray-600 mb-4">QR Code: {generatedQR}</p>
          <p className="text-sm text-gray-500 mb-6">
            Print and give this QR code to the guest for vehicle pickup
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowQRModal(false)}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Print QR Code
            </button>
            <button
              onClick={() => setShowQRModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

export default QRModal;

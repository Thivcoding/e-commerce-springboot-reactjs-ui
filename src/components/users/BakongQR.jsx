import { QRCodeCanvas } from "qrcode.react";

const BakongQR = ({ qrString }) => {
  return (
    <div className="flex justify-center">
      <QRCodeCanvas
        value={qrString}
        size={220}
        level="H"
        includeMargin={true}
      />
    </div>
  );
};

export default BakongQR;
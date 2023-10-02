import Qrcode from "qrcode";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFFile } from "../pdfFile/pdfFile";
import { MainContext } from "../../context/mainContext";
export default function QrcodePage() {
  const [src, setSrc] = useState("");
  const { etablishment } = useContext(MainContext);
  useEffect(() => {
    Qrcode.toDataURL(" ").then(setSrc);
  }, []);
  function onChange(value) {
    Qrcode.toDataURL(
      `http://localhost:3000/menu/${etablishment._id}?table=${value}`
    ).then(setSrc);
  }

  return (
    <div className="flex justify-center">
      <div>
        <label className="text-gray-600">Table number</label>
        <div className="relative mt-2 max-w-xs text-gray-500">
          <input
            onChange={(value) => onChange(value.target.value)}
            type="number"
            placeholder="0"
            min="0"
            step="1"
            className="w-full pl-8 pr-16 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
      </div>
      <img src={src} alt="" height="1000" />
      <PDFDownloadLink document={<PDFFile src={src} />} fileName="Qrcode">
        {({ loading }) =>
          loading ? (
            <button>Loading document...</button>
          ) : (
            <button>Download</button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
}

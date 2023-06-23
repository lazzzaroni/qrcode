import { useState } from "react";
import Image from "next/image";

import { saveAs } from "file-saver";
import { nanoid } from "nanoid";
import { toDataURL } from "qrcode";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
export default function QrCode() {
  const [value, setValue] = useState("");
  const [QRCode, setQRCode] = useState("");

  const handleDownload = () => {
    saveAs(QRCode, `qrcode-${nanoid(7)}.png`);
  };

  const handleClear = () => {
    setQRCode("");
    setValue("");
  };

  const generateQRCode = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    toDataURL(
      value,
      {
        width: 800,
        margin: 2,
        color: {
          dark: "#222222ff",
          light: "#f2f2f2ff",
        },
      },
      (err, value: string) => {
        if (err) {
          return console.error(err);
        }
        setQRCode(value);
      }
    );
  };

  return (
    <>
      <main className="mb-auto flex w-full flex-col">
        <section className=" container mt-4 flex w-full flex-col items-center justify-center sm:w-4/5">
          <Input
            required
            type="text"
            placeholder="e.g. example.com"
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
          />
          {!QRCode ? (
            <Button variant="outline" onClick={generateQRCode} className="m-4">
              Generate
            </Button>
          ) : null}
          {QRCode ? (
            <section className="mt-8 flex flex-col items-center justify-center">
              <Image
                src={QRCode}
                width={256}
                height={256}
                alt="Generated QR Code"
                className="w-64 content-center self-center rounded-2xl border border-cyan-200 dark:border-cyan-950"
              />
              <Button
                variant="outline"
                onClick={handleDownload}
                className="m-4"
              >
                Download QR Code
              </Button>
              <Button variant="link" onClick={handleClear}>
                Clear
              </Button>
            </section>
          ) : null}
        </section>
      </main>
    </>
  );
}

"use client";

import { ImageKitProvider, upload, Image } from "@imagekit/next";
import { useRef, useState } from "react";
import { toast } from "sonner";
import NextImage from "next/image";

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;

const authenticator = async () => {
  const res = await fetch("/api/auth/imagekit");
  if (!res.ok) throw new Error("Auth failed");
  return res.json();
};

interface Props {
  onFileChange: (filePath: string) => void;
}

export default function FileUpload({ onFileChange }: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [filePath, setFilePath] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    try {
      setProgress(0);

      const auth = await authenticator();

      const result = await upload({
        file,
        fileName: file.name,
        folder: "ids",
        useUniqueFileName: true,
        publicKey,
        token: auth.token,
        expire: auth.expire,
        signature: auth.signature,
        onProgress: (evt) => {
          const percent = Math.round((evt.loaded / (evt.total || 1)) * 100);
          setProgress(percent);
        },
      });

      setFilePath(result.filePath as string);
      onFileChange(result.filePath as string);

      toast.success("Upload successful 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed ❌");
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input
        type="file"
        ref={fileRef}
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
      />

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="bg-[#232839] text-white p-3 rounded-md flex items-center gap-2"
      >
        <NextImage
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
        />
        Upload Image
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="mt-2 bg-gray-200 rounded-full">
          <div
            className="bg-green-500 text-xs text-white text-center rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {filePath && (
        <div className="mt-4">
          <Image
            src={filePath}
            alt="uploaded"
            width={400}
            height={250}
            className="rounded-lg"
          />
        </div>
      )}
    </ImageKitProvider>
  );
}

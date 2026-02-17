"use client";

import { ImageKitProvider, upload, Image, Video } from "@imagekit/next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import NextImage from "next/image";
// import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
  return response.json();
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (filePath: string) => void;
  value?: string;
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value,
}: Props) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [filePath, setFilePath] = useState<string | null>(value ?? null);
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    text: variant === "dark" ? "text-light-100" : "text-dark-400",
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const auth = await authenticator();

      const res = await upload({
        file,
        fileName: file.name,
        folder,
        publicKey,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        },
      });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <input
        type="file"
        ref={fileRef}
        accept={accept}
        className="hidden"
        onChange={handleUpload}
      />

      <button
        className={cn("flex min-h-14 w-full items-center justify-center gap-1.5 rounded-md", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          fileRef.current?.click();
        }}
      ></button>

      
    </ImageKitProvider>
  );
};

export default FileUpload;

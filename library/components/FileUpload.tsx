"use client";

import { ImageKitProvider, upload, Image, Video } from "@imagekit/next";
import config from "@/lib/config";
import { useRef, useState } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
        ? "bg-[#232839]"
        : "bg-[#F9FAFB] border-gray-100 border",
    placeholder: variant === "dark" ? "text-[#D6E0FF]" : "text-slate-500",
    text: variant === "dark" ? "text-[#D6E0FF]" : "text-[#1E293B]",
  };

  const validateFile = (file: File) => {
    if (type === "image" && file.size > 20 * 1024 * 1024) {
      toast.error("Image must be smaller than 20MB");
      return false;
    }

    if (type === "video" && file.size > 50 * 1024 * 1024) {
      toast.error("Video must be smaller than 50MB");
      return false;
    }

    return true;
  };

  const handleUpload = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    if (!validateFile(file)) return;

    try {
      setProgress(0);

      const auth = await authenticator();

      const result = await upload({
        file,
        fileName: file.name,
        folder,
        useUniqueFileName: true,
        publicKey,
        token: auth.token,
        expire: auth.expire,
        signature: auth.signature,
        onProgress: (evt) => {
          const percent = Math.round(
            (evt.loaded / (evt.total || 1)) * 100
          );
          setProgress(percent);
        },
      });

      setFilePath(result.filePath as string);
      onFileChange(result.filePath as string);

      toast.success("Upload successful");
    } catch (error) {
      console.error(error);
      toast.error("Upload failed");
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input
        type="file"
        ref={fileRef}
        accept={accept}
        className="hidden"
        onChange={handleUpload}
      />

      <button
        className={cn("upload-btn flex items-center gap-2 p-3", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          fileRef.current?.click();
        }}
      >
        <NextImage
          src="/icons/upload.svg"
          alt="upload"
          width={20}
          height={20}
        />

        <p className={cn("text-base", styles.placeholder)}>
          {placeholder}
        </p>

        {filePath && (
          <p className={cn("ml-2 text-sm", styles.text)}>
            Uploaded
          </p>
        )}
      </button>

      {progress > 0 && progress !== 100 && (
        <div className="mt-2 w-full rounded-full bg-green-200">
          <div
            className="bg-green-500 text-white text-xs text-center rounded-full"
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      {filePath &&
        (type === "image" ? (
          <Image
            src={filePath!}
            alt="uploaded"
            width={400}
            height={250}
          />
        ) : (
          <Video
            path={filePath!}
            controls
            className="h-80 w-full rounded-xl"
          />
        ))}
    </ImageKitProvider>
  );
};

export default FileUpload;

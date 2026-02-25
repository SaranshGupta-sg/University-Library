"use client";

import {
  ImageKitProvider,
  upload,
  Image as IKImage,
  Video as IKVideo,
} from "@imagekit/next";
import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;

const authenticator = async () => {
  const res = await fetch("/api/auth/imagekit");
  if (!res.ok) throw new Error("Authentication failed");
  return res.json();
};

interface Props {
  type: "image" | "video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  onFileChange: (fileUrl: string) => void;
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

  const [fileUrl, setFileUrl] = useState<string | null>(value ?? null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const styles = {
  button: cn(
    "transition rounded-md px-4 py-2",
    variant === "dark"
      ? "bg-[#232839] text-white hover:bg-[#1E2230]"
      : "bg-[#F9FAFB] border border-[#E2E8F0] text-[#3A354E] hover:bg-[#EDF1F1]"
  ),

  placeholder:
    variant === "dark"
      ? "text-[#D6E0FF]"
      : "text-[#8D8D8D]",

  text:
    variant === "dark"
      ? "text-[#D6E0FF]"
      : "text-[#3A354E]",
};

  const validateFile = (file: File) => {
    if (type === "image" && file.size > 20 * 1024 * 1024) {
      toast.error("Image must be less than 20MB");
      return false;
    }

    if (type === "video" && file.size > 50 * 1024 * 1024) {
      toast.error("Video must be less than 50MB");
      return false;
    }

    return true;
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFile(file)) return;

    try {
      setIsUploading(true);
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
          if (!evt.total) return;
          const percent = Math.round((evt.loaded / evt.total) * 100);
          setProgress(percent);
        },
      });

      // use URL instead of filePath (production ready)
      setFileUrl(result.url as string);
      onFileChange(result.url as string);

      toast.success(`${type} uploaded successfully 🎉`);
    } catch (err) {
      console.error(err);
      toast.error(`${type} upload failed ❌`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <input
        type="file"
        ref={fileRef}
        accept={accept}
        onChange={handleUpload}
        className="hidden"
      />

      <button
        type="button"
        disabled={isUploading}
        onClick={() => fileRef.current?.click()}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md transition disabled:opacity-50",
          styles.button,
        )}
      >
        <Image src="/icons/upload.svg" alt="upload" width={20} height={20} />

        <span className={styles.placeholder}>
          {isUploading ? "Uploading..." : placeholder}
        </span>
      </button>

      {/* Progress Bar */}
      {isUploading && (
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Preview */}
      {fileUrl && (
        <div className="mt-4">
          {type === "image" ? (
            <IKImage
              src={fileUrl}
              alt="uploaded-image"
              width={500}
              height={300}
              className="rounded-xl"
            />
          ) : (
            <IKVideo
              src={fileUrl}
              controls
              className="h-96 w-full rounded-xl"
            />
          )}
        </div>
      )}
    </ImageKitProvider>
  );
};

export default FileUpload;

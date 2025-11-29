"use client";

import * as React from "react";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { cn } from "../../lib/utils";

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onFileSelect?: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
  error?: boolean;
  label?: string;
  buttonText?: string;
  preview?: boolean;
  multiple?: boolean; // 여러 파일 선택 지원
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      className,
      onFileSelect,
      accept,
      maxSize,
      error,
      label,
      buttonText = "파일 선택",
      preview = false,
      multiple = false,
      ...props
    },
    ref
  ) => {
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => fileInputRef.current as HTMLInputElement);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      
      if (multiple && files && files.length > 0) {
        // 여러 파일 선택 모드
        const validFiles: File[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (maxSize && file.size > maxSize * 1024 * 1024) {
            alert(`파일 "${file.name}"의 크기는 ${maxSize}MB 이하여야 합니다.`);
            continue;
          }
          validFiles.push(file);
        }
        if (validFiles.length > 0) {
          // 여러 파일 중 첫 번째 파일을 선택된 파일로 표시
          setSelectedFile(validFiles[0]);
          if (preview && validFiles[0].type.startsWith("image/")) {
            const url = URL.createObjectURL(validFiles[0]);
            setPreviewUrl(url);
          }
          // 모든 유효한 파일을 콜백으로 전달
          onFileSelect?.(validFiles[0]); // 단일 파일 콜백이므로 첫 번째만 전달
        }
      } else {
        const file = files?.[0] || null;

        if (file) {
          // Check file size
          if (maxSize && file.size > maxSize * 1024 * 1024) {
            alert(`파일 크기는 ${maxSize}MB 이하여야 합니다.`);
            return;
          }

          setSelectedFile(file);

          // Create preview URL for images
          if (preview && file.type.startsWith("image/")) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
          }
        } else {
          setSelectedFile(null);
          if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
          }
        }

        onFileSelect?.(file);
      }
      
      // Reset input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleRemove = () => {
      setSelectedFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onFileSelect?.(null);
    };

    React.useEffect(() => {
      return () => {
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
        }
      };
    }, [previewUrl]);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[var(--text-strong)] mb-1">
            {label}
          </label>
        )}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              multiple={multiple}
              {...props}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className={cn(error && "border-red-500")}
            >
              <Icon name="upload" className="mr-2 h-4 w-4" />
              {buttonText}
            </Button>
            {selectedFile && (
              <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <span>{selectedFile.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemove}
                  className="h-6 w-6 p-0"
                >
                  <Icon name="x" className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          {preview && previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-xs max-h-48 rounded-md border border-[var(--border-subtle)]"
              />
            </div>
          )}
        </div>
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export { FileUpload };


import * as React from "react";
import { Upload, X } from "lucide-react";
import { cn } from "../../lib/cn";

export interface InputFileProps {
  onFilesChange?: (files: File[] | null) => void;
  accept?: string;
  multiple?: boolean;
  className?: string;
  onChange?: (files: File[] | null) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  value?: File[];
}

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
  (
    {
      onFilesChange,
      accept,
      multiple = false,
      className = "",
      onChange,
      onBlur,
      name,
      disabled = false,
      value,
    },
    _ref
  ) => {
    const [isDragOver, setIsDragOver] = React.useState(false);
    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const displayFiles = value ?? selectedFiles;

    const updateFiles = (files: FileList | null) => {
      const filesArray = files ? Array.from(files) : [];
      setSelectedFiles(filesArray);
      onChange?.(filesArray);
      onFilesChange?.(filesArray);
    };

    const removeFile = (indexToRemove: number) => {
      const currentFiles = value ?? selectedFiles;
      const newFiles = currentFiles.filter(
        (_, index) => index !== indexToRemove
      );

      if (!value) {
        setSelectedFiles(newFiles);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onChange?.(newFiles);
      onFilesChange?.(newFiles);
    };

    const handleDragEnter = (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        updateFiles(files);
      }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      updateFiles(e.target.files);
    };

    const handleBoxClick = () => {
      if (disabled) return;
      fileInputRef.current?.click();
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return (
        parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
      );
    };

    return (
      <div className={cn("w-full", className)}>
        {displayFiles.length > 0 ? (
          <div className="space-y-2">
            {displayFiles.map((file, index) => (
              <div
                key={`${file.name}-${file.size}`}
                className="border-border bg-background flex items-center justify-between rounded-sm border p-3"
              >
                <div className="flex items-center space-x-3">
                  <Upload className="text-input-text size-5" />
                  <div>
                    <p className="text-foreground text-sm font-medium">
                      {file.name}
                    </p>
                    <p className="text-input-text text-xs">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  className="hover:bg-destructive/10 rounded-full p-1 transition-colors disabled:opacity-50"
                >
                  <X className="text-destructive size-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleBoxClick}
              disabled={disabled}
              className="border-border text-semibold text-primary hover:bg-primary/5 w-full cursor-pointer rounded-sm border border-dashed p-3 text-sm transition-colors disabled:opacity-50"
            >
              {multiple ? "Agregar más archivos" : "Cambiar archivo"}
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "flex h-[184px] w-full flex-col items-center justify-center border border-dashed transition-colors",
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
              isDragOver ? "border-primary" : "border-border"
            )}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleBoxClick}
          >
            <div className="flex flex-col items-center space-y-[6px]">
              <Upload className="text-input-text size-6" />
              <div className="text-center">
                <p className="text-input-text text-base">
                  Arrastra y suelta archivos aquí o
                </p>
                <p className="text-primary mt-1.5 text-base font-semibold">
                  seleccionar archivos
                </p>
              </div>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          onBlur={onBlur}
          name={name}
          disabled={disabled}
          className="hidden"
        />
      </div>
    );
  }
);

InputFile.displayName = "InputFile";

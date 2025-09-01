"use client";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  label: string;
  type: string;
  name: string;
  width?: string;
  onClick?: () => void;
  placeholder?: string;
}

export default function CustomInput({
  label,
  type,
  name,
  width,
  onClick,
  placeholder,
}: InputProps) {
  // --- Hooks ---
  // All hooks are now at the top level to follow the Rules of Hooks.

  // State for password input
  const [showPassword, setShowPassword] = useState(false);

  // State for select input
  const [selectValue, setSelectValue] = useState("select");

  // State for file input
  const [filename, setFilename] = useState("Choose file...");
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [, setFileValue] = useState<File | null>(null); // fileValue is not read, so we can ignore it.
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for text-like inputs
  const [textValue, setTextValue] = useState("");

  // --- Handlers ---

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setFileValue(file);
    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setFilename(file.name);
  };

  // --- Render logic ---

  if (type === "password") {
    return (
      <div className="input" style={{ width: width ?? "100%" }}>
        <label className="label">{label}</label>
        <div className="password">
          <input
            type={showPassword ? "text" : type}
            name={name}
            placeholder={placeholder}
            className="inputTag"
            autoComplete="current-password"
            onClick={onClick}
          />
          <button
            type="button"
            className="showPassword"
            onClick={togglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="input" style={{ width: width ?? "100%" }}>
        <label className="label">{label}</label>
        <select
          name={name}
          className="inputTag"
          value={selectValue}
          id="inputSelect"
          onChange={(e) => setSelectValue(e.target.value)}
          onClick={onClick}
        >
          <option value="select" disabled>
            Select...
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
    );
  }

  if (type === "file") {
    return (
      <div className="input" style={{ width: width ?? "100%" }}>
        <label className="label">{label}</label>
        <input
          type="file"
          name={name}
          accept="image/*"
          className="inputTag"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          onClick={onClick}
        />
        <button
          type="button"
          className="select-image-btn"
          onClick={handleFileButtonClick}
        >
          {fileUrl && (
            <Image
              src={fileUrl}
              alt="Selected file preview"
              className="select-image"
              width={36}
              height={36}
            />
          )}
          <span className="select-image-text">{filename}</span>
        </button>
      </div>
    );
  }

  // Default to a standard text-like input
  return (
    <div className="input" style={{ width: width ?? "100%" }}>
      <label className="label">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="inputTag"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        onClick={onClick}
        autoComplete={
          name === "email" ? "email" : name === "username" ? "username" : "off"
        }
      />
    </div>
  );
}

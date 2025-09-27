"use client";
import Link from "next/link";
import React from "react";

// Defines the props for our dramatic error page
interface ErrorPageProps {
  statusCode?: number;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode, message }) => {
  return (
    <div className="error-container">
      {/* Title block with Glitch/CRT effect */}
      <h1 className="glitch-title" data-text={statusCode}>
        {statusCode}
      </h1>

      {/* Error message card */}
      <div className="error-card">
        <p className="status-text">
          <span className="status-icon">⚠️</span>
          Connection Lost. System Alert:
        </p>

        <p className="error-message">{message}</p>

        {/* Call to action button */}
        <Link href="/" className="btn">
          Reboot System (Return Home)
        </Link>

        <p className="sub-text">Access Denied. Protocol 7 active.</p>
      </div>
    </div>
  );
};

export default ErrorPage;

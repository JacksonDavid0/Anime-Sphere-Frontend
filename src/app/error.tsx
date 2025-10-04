"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// Defines the props for our dramatic error page
interface ErrorPageProps {
  statusCode?: number;
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode, message }) => {
  const pathname = usePathname();
  return (
    <div className="error">
      <div className="container">
        <h1 className="heading-404" data-text={statusCode}>
          {statusCode ? statusCode : "500"}
        </h1>

        <p className="sub-heading">
          <span className="status-icon">⚠️</span>
          An Error Occour
        </p>

        <p className="message">
          {message ? message : "Oops! Something went wrong"}
        </p>

        <Link href={pathname} className="btn">
          Try Reload Page
        </Link>
        <br />

        <br />
        <Link href={"/"} className="link">
          Or Return Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="container">
        <h1 className="heading-404">404</h1>
        <h2 className="sub-heading">Page Not Found</h2>
        <p className="message">
          Oops! It seems the page you are looking for has been moved or doesn't
          exist.
        </p>
        <Link href="/" className="btn">
          Go Home
        </Link>
      </div>
    </div>
  );
}

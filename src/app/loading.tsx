export default function Loading() {
  return (
    <div className="loading">
      <div className="loading-container">
        <div className="loader-svg">
          <svg
            className="loader-path"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="45" strokeDasharray="115 285" />
          </svg>
          <svg
            className="logo-inner"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
            <path d="M11 10v4h2v-4h-2zm-2 0v4h2v-4H9zm4 0v4h2v-4h-2z" />
          </svg>
        </div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
}

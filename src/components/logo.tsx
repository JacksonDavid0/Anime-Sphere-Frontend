'use client'

export default function Logo({ className }: { className?: string }) {
    return (
        <div className={`logo ${className}`}>
            <svg className="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-10v4h2v-4h-2zm-2 0v4h2v-4H9zm4 0v4h2v-4h-2z" />
            </svg>

            <h1 className="logo-text">Anime Sphere</h1>
        </div>
    )
}
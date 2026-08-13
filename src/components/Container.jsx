function Container({ children, className = "" }) {
    return (
        <div
            className={`min-h-screen w-full max-w-4xl rounded-xl border-2 border-blue-500 bg-blue-50 p-8 ${className}`.trim()}
        >
            {children}
        </div>
    );
}

export default Container;

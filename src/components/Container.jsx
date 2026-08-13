function Container({ children, className = "" }) {
    return (
        <div
            className={`flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 rounded-xl border-2 border-blue-500 bg-blue-50 p-8 ${className}`.trim()}
        >
            <header>
                <h1 className="text-3xl font-bold text-blue-700">AutomaticEmail</h1>
            </header>

            <main className="w-full">{children}</main>

            <footer>
                <button
                    type="button"
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Enviar E-mails
                </button>
            </footer>
        </div>
    );
}

export default Container;

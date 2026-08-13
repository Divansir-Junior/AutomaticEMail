function Container({ children, className = "" }) {
    return (
        <div
            className={`flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-8 rounded-xl border-2 border-blue-500 bg-blue-50 p-8 ${className}`.trim()}
        >
            <header>
                <h1 className="text-3xl font-bold text-blue-700">
                    AutomaticEmail
                </h1>
            </header>

            <main className="w-full">
                {children}

                <div>
                    <label
                        htmlFor="cargo"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Selecione o cargo
                    </label>
                    <select
                        id="cargo"
                        defaultValue=""
                        className="w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900"
                    >
                        <option value="" disabled>
                            Selecione uma opção
                        </option>
                        <option>Auxiliar Administrativo</option>
                        <option>Auxiliar de T.I</option>
                        <option>Assistente Administrativo</option>
                        <option>Assistente de RH</option>
                        <option>Assistente de Transportes</option>
                        <option>Assistente de T.I</option>
                        <option>Assistente Financeiro</option>
                        <option>Assistente de Supply Chain</option>
                        <option>Assistente de Logística</option>
                    </select>
                </div>
            </main>
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

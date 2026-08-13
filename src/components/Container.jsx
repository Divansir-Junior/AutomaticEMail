import { useRef, useState } from "react";
import ImageUploader from "./ImageUploader.jsx";
import ExtractedData from "./ExtractedData.jsx";
import { extractTextFromImage } from "../services/ocrService.js";
import { extractEmail, extractPhone } from "../utils/extractors.js";
import useImageToText from "../hooks/useImageToText.js";

function Container({ children, className = "" }) {
    const fileInputRef = useRef(null);
    const { image, setImage, setText, loading, setLoading } = useImageToText();
    const [data, setData] = useState(null);

    const handleFileSelect = (file) => {
        setImage(file);
        setData(null);
    };

    const handleSend = async () => {
        if (!image) {
            console.log("Nenhuma imagem selecionada");
            return;
        }

        setLoading(true);
        try {
            const recognizedText = await extractTextFromImage(image);
            setText(recognizedText);

            const email = extractEmail(recognizedText);
            const phone = extractPhone(recognizedText);

            setData({ email, phone });

            console.log(`Email: ${email || "nao encontrado"}`);
            console.log(`Telefone: ${phone || "nao encontrado"}`);
        } catch (error) {
            console.error("Erro ao processar a imagem:", error);
        } finally {
            setLoading(false);
        }
    };

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

                <ExtractedData data={data} />
            </main>

            <footer className="flex gap-4">
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={loading}
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Processando..." : "Enviar E-mails"}
                </button>
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Adicionar imagem
                </button>
                <ImageUploader onFileSelect={handleFileSelect} ref={fileInputRef} />
            </footer>
        </div>
    );
}

export default Container;

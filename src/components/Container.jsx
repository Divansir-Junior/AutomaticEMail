import { useRef, useState } from "react";
import ImageUploader from "./ImageUploader.jsx";
import ExtractedData from "./ExtractedData.jsx";
import { extractTextFromImage } from "../services/ocrService.js";
import { extractEmail, extractPhone } from "../utils/extractors.js";
import useImageToText from "../hooks/useImageToText.js";
import sendEmail from "../services/emailService.js";
import { EMAIL_SUBJECT } from "../constants/email.js";
import { body } from "../constants/message.js";

function Container({ children, className = "" }) {
    const fileInputRef = useRef(null);
    const { image, setImage, setText, loading, setLoading } = useImageToText();
    const [data, setData] = useState(null);
    const [cargo, setCargo] = useState("");

    const handleFileSelect = (file) => {
        setImage(file);
        setData(null);
    };

    const handleSend = async () => {
        if (!image) {
            alert("Selecione uma imagem para extrair o e-mail.");
            return;
        }

        setLoading(true);
        try {
            const recognizedText = await extractTextFromImage(image);
            setText(recognizedText);

            const email = extractEmail(recognizedText);
            const phone = extractPhone(recognizedText);

            setData({ email, phone });

            if (!email) {
                alert("Não foi possível encontrar um e-mail na imagem.");
                return;
            }

            sendEmail(email, EMAIL_SUBJECT, body(recognizedText, cargo));
        } catch (error) {
            console.error("Erro ao processar a imagem:", error);
            alert("Ocorreu um erro ao processar a imagem.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`w-full max-w-4xl rounded-sm border-2 border-red-600/70 bg-zinc-950 p-8 shadow-[0_0_60px_rgba(220,38,38,0.15)] ${className}`.trim()}
        >
            <main className="w-full">
                {children}

                <div>
                    <label
                        htmlFor="cargo"
                        className="mb-2 block text-sm font-medium text-red-500"
                    >
                        Selecione o cargo
                    </label>
                    <select
                        id="cargo"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        className="w-full cursor-pointer rounded-sm border-2 border-red-600/50 bg-black px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
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

            <footer className="mt-8 flex gap-4">
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={loading}
                    className="rounded-sm bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? "Processando..." : "Enviar E-mails"}
                </button>
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="rounded-sm border-2 border-red-600 bg-black px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                >
                    Adicionar imagem
                </button>
                <ImageUploader onFileSelect={handleFileSelect} ref={fileInputRef} />
            </footer>
        </div>
    );
}

export default Container;

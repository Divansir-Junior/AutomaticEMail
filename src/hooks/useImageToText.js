import { useState } from "react";

function useImageToText() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    return { text, setText, loading, setLoading };
}

export default useImageToText;

import { useState } from "react";

function useImageToText() {
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    return { image, setImage, text, setText, loading, setLoading };
}

export default useImageToText;

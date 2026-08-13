import { useState } from "react";

function useEmail() {
    const [recipient, setRecipient] = useState("");
    const [message, setMessage] = useState("");

    return { recipient, setRecipient, message, setMessage };
}

export default useEmail;

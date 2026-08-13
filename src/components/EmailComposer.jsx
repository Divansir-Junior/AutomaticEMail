function EmailComposer({ recipient, message }) {
    return (
        <div>
            <p>Para: {recipient}</p>
            <p>{message}</p>
        </div>
    );
}

export default EmailComposer;

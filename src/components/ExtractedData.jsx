function ExtractedData({ data }) {
    if (!data) return null;

    return (
        <div>
            <p>Email: {data.email}</p>
            <p>Telefone: {data.phone}</p>
        </div>
    );
}

export default ExtractedData;

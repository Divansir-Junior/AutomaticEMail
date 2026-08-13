function ImageUploader({ onFileSelect }) {
    return (
        <input
            type="file"
            accept="image/*"
            onChange={(event) => onFileSelect(event.target.files[0])}
        />
    );
}

export default ImageUploader;

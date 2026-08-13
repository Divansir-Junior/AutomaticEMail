import { forwardRef } from "react";

const ImageUploader = forwardRef(function ImageUploader({ onFileSelect }, ref) {
    return (
        <input
            ref={ref}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => onFileSelect(event.target.files[0])}
        />
    );
});

export default ImageUploader;

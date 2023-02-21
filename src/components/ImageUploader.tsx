import React, { useState, useRef } from "react";

interface ImageUploaderProps {
  onImageSelected: (image: string) => void;
  coords: { x: string; y: string };
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, coords }) => {
  const [image, setImage] = useState<string | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result as string);
        onImageSelected(reader.result as string);
      };
    }
  };

  return (
    <div style={{left: coords.x, top: coords.y}}
    className="image-item" onClick={handleClick}>
      {image ? (
        <img draggable='false' src={image} alt="uploaded" />
      ) : (
        <div>
          Click to upload image
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUploader;

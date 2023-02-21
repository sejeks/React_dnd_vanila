import React, { useState } from "react";
import getRelativeCoords from "../utils";

import ImageUploader from "./ImageUploader";
import Textarea from "./TextArea";

interface DraggableItem {
  id: string;
  coords: { x: string; y: string };
}

const DND = () => {
  const [dragOver, setDragOver] = useState(false);
  const handleDragOverStart = () => setDragOver(true);
  const handleDragOverEnd = () => setDragOver(false);
  const [arrayState, setArrayState] = useState<DraggableItem[]>([]);

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", event.currentTarget.id);
  };

  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData("text");

    const elementCoords = getRelativeCoords({
      event: event,
      nodeClassName: "dnd-field",
    });

    setArrayState([...arrayState, { id: id, coords: elementCoords }]);

    console.log(arrayState);

    setDragOver(false);
  };

  return (
    <div className="dnd-app">
      <div className="dnd-sidebar">
        <div
          className="dnd-draggable-item"
          id="textArea"
          draggable="true"
          onDragStart={handleDragStart}
        >
          <p>Text area</p>
        </div>
        <div
          className="dnd-draggable-item"
          id="image"
          draggable="true"
          onDragStart={handleDragStart}
        >
          <p>Image previewer</p>
        </div>
      </div>
      <div
        className="dnd-field"
        onDragOver={enableDropping}
        onDrop={handleDrop}
        onDragEnter={handleDragOverStart}
        onDragLeave={handleDragOverEnd}
        style={dragOver ? { opacity: 0.7 } : { opacity: 1 }}
      >
        {arrayState.map((obj, index) => {
          if (obj.id === "textArea") {
            return (
              <Textarea
                coords={obj.coords}
                key={obj.id + index}
                placeholder="Write something here..."
                onChange={() => {}}
              />
            );
          } else {
            return (
              <ImageUploader
                coords={obj.coords}
                key={obj.id + index}
                onImageSelected={() => {}}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default DND;

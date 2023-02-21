interface getRelativeCoordsParams {
    event: {
      clientX: number;
      clientY: number;
    };
    nodeClassName: string;
  }
  
  const getRelativeCoords = ({ event, nodeClassName }: getRelativeCoordsParams) => {
    const eventCoords = {
      x: event.clientX,
      y: event.clientY,
    };
    const field = document.getElementsByClassName(nodeClassName)[0];
    const fieldCoords = field.getBoundingClientRect();
    const elementCoords = {
      x: eventCoords.x - fieldCoords.x + "px",
      y: eventCoords.y - fieldCoords.y + "px",
    };
    return elementCoords;
  };
  
  export default getRelativeCoords;
  
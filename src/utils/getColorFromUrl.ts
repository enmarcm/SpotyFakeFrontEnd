async function getDominantColorHex(imageUrl: string): Promise<string> {
  try {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;

    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const sampleSize = 10; // Tamaño del área de muestreo (10x10)
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = sampleSize;
    canvas.height = sampleSize;

    if (!context) return '';
    context.drawImage(img, 0, 0, sampleSize, sampleSize);

    const imageData = context.getImageData(0, 0, sampleSize, sampleSize).data;
    let r = 0, g = 0, b = 0;
    const totalPixels = imageData.length / 4; // Cada pixel tiene 4 componentes (RGBA)

    for (let i = 0; i < imageData.length; i += 4) {
      r += imageData[i];
      g += imageData[i + 1];
      b += imageData[i + 2];
    }

    // Calcula el promedio de cada componente de color
    r = Math.floor(r / totalPixels);
    g = Math.floor(g / totalPixels);
    b = Math.floor(b / totalPixels);

    const color = rgbToHex(r, g, b);

    return color;
  } catch (error) {
    console.error('Error al obtener el color dominante:', error);
    return '';
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

export default getDominantColorHex;
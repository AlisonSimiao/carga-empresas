export function calculateSize(size: number){
    return (size / (1024 * 1024)).toFixed(3) + 'MB'
}

export function getColorDownload(perc: number){
    const ratio = perc / 100;

    // Interpole entre as cores amarelo e verde
    const red = Math.round(255 * (1 - ratio));   // De 255 a 0
    const green = 255;                           // Verde fixo em 255
    const blue = Math.round(150 * (1 - ratio));                              // Azul fixo em 0

    // Converta para o formato hexadecimal
    return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
  }
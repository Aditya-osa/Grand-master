import fs from 'fs';
import zlib from 'zlib';

function getPngBBox(filePath) {
  const buf = fs.readFileSync(filePath);
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idatChunks = [];

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = buf.readUInt32BE(pos + 8);
      height = buf.readUInt32BE(pos + 12);
      bitDepth = buf[pos + 16];
      colorType = buf[pos + 17];
    } else if (type === 'IDAT') {
      idatChunks.push(buf.subarray(pos + 8, pos + 8 + len));
    } else if (type === 'IEND') {
      break;
    }
    pos += 12 + len;
  }

  const compressed = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressed);

  // For 8-bit RGBA (colorType 6)
  if (colorType === 6 && bitDepth === 8) {
    const bytesPerPixel = 4;
    const stride = 1 + width * bytesPerPixel;
    let minX = width, maxX = 0, minY = height, maxY = 0;

    for (let y = 0; y < height; y++) {
      const rowStart = y * stride + 1; // skip filter byte
      for (let x = 0; x < width; x++) {
        const alpha = decompressed[rowStart + x * bytesPerPixel + 3];
        if (alpha > 10) { // non-transparent
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return { width, height, minX, maxX, minY, maxY, bottleWidth: maxX - minX + 1, bottleHeight: maxY - minY + 1 };
  }
  return { width, height, colorType, bitDepth };
}

const files = [
  'public/Assets/7.png',
  'src/assets/bottles/chocolate-bottle.png',
  'src/assets/bottles/Blue berry bottle.png',
  'src/assets/bottles/all-flav/3.png'
];

for (const f of files) {
  try {
    console.log(f, getPngBBox(f));
  } catch (e) {
    console.error(f, e.message);
  }
}

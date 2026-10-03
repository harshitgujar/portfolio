declare module "gifenc" {
  export interface GIFEncoderOptions {
    auto?: boolean;
    initialCapacity?: number;
  }
  export interface WriteFrameOptions {
    palette?: number[][];
    delay?: number;
    transparent?: boolean;
    transparentIndex?: number;
  }
  export interface GIFEncoderInstance {
    writeFrame: (
      index: Uint8Array,
      width: number,
      height: number,
      opts?: WriteFrameOptions
    ) => void;
    finish: () => void;
    bytes: () => Uint8Array;
    bytesView: () => Uint8Array;
  }
  export function GIFEncoder(opts?: GIFEncoderOptions): GIFEncoderInstance;
  export function quantize(
    rgba: Uint8Array | Uint8ClampedArray,
    maxColors: number,
    opts?: unknown
  ): number[][];
  export function applyPalette(
    rgba: Uint8Array | Uint8ClampedArray,
    palette: number[][]
  ): Uint8Array;
}

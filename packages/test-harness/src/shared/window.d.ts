export {};

declare global {
  interface Window {
    resetRenderCount: () => void;
    getRenderCount: () => number;
  }
}

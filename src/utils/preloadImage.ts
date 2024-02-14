function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = function () {
      resolve(img);
    };
    img.onerror = img.onabort = function () {
      reject(src);
    };
  });
}
export { preloadImage };

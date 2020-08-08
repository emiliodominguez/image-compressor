export const convertBytesToMb = bytes => {
    return (bytes / 1024 / 1024).toFixed(2);
};

export const getCompressedImageSize = base64 => {
    let compressedSize = window.atob(base64.split(",")[1]).length;
    return convertBytesToMb(compressedSize);
};

function decodeToken(token) {
    const payload = token.split('.')[1]; // Lấy phần payload của token
    const decoded = JSON.parse(atob(payload)); // Giải mã base64 và chuyển sang JSON
    return decoded;
}

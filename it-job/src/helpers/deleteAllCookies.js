export function deleteAllCookies() {
    // Lấy danh sách tất cả cookie
    const cookies = document.cookie.split(';');

    // Duyệt qua từng cookie và xóa nó
    for (let i = 0; i < cookies.length; i++) {
        // Lấy tên của cookie (không bao gồm giá trị và khoảng trắng)
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

        // Xóa cookie bằng cách thiết lập giá trị rỗng và ngày hết hạn trong quá khứ
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }
}

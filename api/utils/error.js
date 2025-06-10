export const errorHandler = (statusCode, message) => {
  const error = new Error();            // Tạo một đối tượng lỗi mới
  error.statusCode = statusCode;        // Gán mã lỗi HTTP (ví dụ: 400, 401, 500,...)
  error.message = message;              // Gán thông điệp lỗi tùy chỉnh
  return error;                         // Trả về lỗi này để đưa vào next()
};

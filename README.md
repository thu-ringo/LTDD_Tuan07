# BookStore — Bài thực hành Buổi 7

Đã hoàn thành BT7.1–BT7.8, thử thách C1 (yêu thích), C2 (lọc giá), và sắp xếp giá trong câu hỏi bổ sung.

## Chạy ứng dụng

```bash
npm install
npm run api
```

Mở terminal thứ hai:

```bash
npx expo start
```

Nhấn `w` để mở bản web hoặc quét QR bằng Expo Go. Điện thoại và máy tính cần cùng Wi-Fi. Nếu không tự nhận địa chỉ API, đặt biến môi trường trong PowerShell trước khi chạy Expo:

```powershell
$env:EXPO_PUBLIC_API_URL = "http://<IP-máy-tính>:3000"
npx expo start -c
```

Kiểm tra kiểu bằng `npm run typecheck`. Tab Tài khoản dùng nút Đăng nhập thử với Học viên Demo / demo@bookstore.vn; trạng thái Redux trở về ban đầu khi tải lại app.

## Nội dung bài nộp

- [TraLoi.md](TraLoi.md): trả lời 5 câu hỏi bổ sung và giải thích adapter wishlist.
- [docs/KiemThu.md](docs/KiemThu.md): kết quả kiểm thử và 8 ảnh minh chứng.
- [docs/UI.md](docs/UI.md): mô tả giao diện mẫu của đề.

File `BookStore_Buoi7_HoanThanh.zip` chứa mã nguồn, tài liệu, ảnh và package-lock; không chứa node_modules hay dữ liệu tạm của Expo. Đổi tên thành `MSSV_HoTen_Buoi7.zip` trước khi nộp theo thông tin sinh viên.

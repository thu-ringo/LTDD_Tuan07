# Kiểm tra bài thực hành Buổi 7

Đã kiểm tra tự động trên Chrome bản web với kích thước 430 × 932, kết nối json-server của dự án.

- TypeScript: `npm run typecheck` đạt.
- Home nhận sách và danh mục từ API; không dùng dữ liệu mock.
- Tìm không dấu `nha gia` ra Nhà Giả Kim; từ khóa không khớp hiện trạng thái rỗng; xóa bộ lọc khôi phục sách.
- Sắp xếp giá tăng dần; lọc kết hợp từ khóa, danh mục, khoảng giá.
- Chi tiết mở đúng Clean Code; bật/tắt yêu thích qua Redux.
- Thêm Clean Code đến 5 cuốn thì khóa nút thêm, không vượt tồn kho.
- Giỏ hiện x5, badge và tổng tiền; Checkout nhận đúng tổng tiền từ giỏ.
- Đăng nhập thử hiện Học viên Demo; đăng xuất trở về nhánh chưa đăng nhập.
- Chọn Lập trình ở Danh mục chuyển sang Home và lọc đúng.
- Chặn kết nối API trong trình duyệt để mô phỏng mất mạng: hiện lỗi tiếng Việt; bỏ chặn và bấm Thử lại tải lại thành công. Không tắt tiến trình API có sẵn của người dùng.
- Kiểm tra reducer: tăng/giảm theo tồn kho, không thêm sách hết hàng, xóa sách, xóa giỏ, state cũ bất biến, đăng nhập/đăng xuất, toggle wishlist.
- Kiểm tra tìm kiếm không dấu/viết hoa và các biên giá 99.999, 100.000, 300.000, 300.001 đồng.

Chưa kiểm tra trên điện thoại thật.

## Ảnh minh chứng

| Nội dung | Ảnh |
|---|---|
| Home | [01-home.png](screenshots/01-home.png) |
| Tìm kiếm | [02-search.png](screenshots/02-search.png) |
| Không có kết quả | [03-empty.png](screenshots/03-empty.png) |
| Chi tiết | [04-detail.png](screenshots/04-detail.png) |
| Giỏ có badge | [05-cart-badge.png](screenshots/05-cart-badge.png) |
| Tài khoản đã đăng nhập | [06-account.png](screenshots/06-account.png) |
| Sắp xếp giá | [07-sort-price.png](screenshots/07-sort-price.png) |
| Lỗi API | [08-api-error.png](screenshots/08-api-error.png) |

# Dự án Ecommerce NextJS/Typescript/ReactQuery

## Chức năng trong dự án

- Authentication module: Quản lý bằng JWT
  - Đăng ký
  - Đăng nhập
  - Đăng xuất
- Trang danh sách sản phẩm:
  - Có phân trang
  - Sort (sắp xếp) theo từng thuộc tính sản phẩm
  - filter nâng cao theo từng thuộc tính sản phẩm
  - Tìm kiếm sản phẩm
- Trang chi tiết sản phẩm:
  - Hiển thị thông tin chi tiết
  - Ảnh hiển thị theo slider + hover zoom effect
  - Hiển thị bằng Markdown
  - Có chức năng mua hàng
- Giỏ hàng
  - Quản lý đơn hàng: Thêm, sửa, xóa sản phẩm
  - Mua hàng
- Quản lý Profile khách hàng
  - Update thông tin cá nhân
  - Upload Avatar
  - Đổi mật khẩu
  - Xem tình trạng đơn hàng

## Công nghệ sử dụng

- UI / CSS Library: Tailwindcss + HeadlessUI
- State Management: React Query cho async state và Redux Toolkit cho state thường
- Form Management: React Hook Form, Ant Design
- API: Strapi
- Hỗ trợ đa ngôn ngữ với react.i18next
- Hỗ trợ SEO
- Mô hình hóa các component với story book
- Unit Test

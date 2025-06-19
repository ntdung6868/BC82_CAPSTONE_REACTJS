# 🎬 Galaxy Cinema Clone - Hệ thống Đặt vé Xem Phim

## 📋 Giới thiệu

Đây là một dự án học tập nhằm mô phỏng trang web đặt vé xem phim của Galaxy Cinema. Dự án được xây dựng với mục đích học tập và nghiên cứu, sử dụng các công nghệ web hiện đại để tạo ra một ứng dụng đặt vé phim hoàn chỉnh.

⚠️ **Lưu ý quan trọng**: Đây là dự án học tập, không phải sản phẩm thương mại và không liên quan chính thức đến Galaxy Cinema.

## ✨ Tính năng chính

### Người dùng (User)

- 🏠 **Trang chủ**: Hiển thị danh sách phim đang chiếu
- 🎭 **Chi tiết phim**: Xem thông tin chi tiết, trailer, lịch chiếu
- 🎫 **Đặt vé**: Chọn ghế, thanh toán (mô phỏng)
- 🔐 **Đăng nhập/Đăng ký**: Quản lý tài khoản người dùng
- 📱 **Responsive Design**: Tương thích trên mọi thiết bị

### Quản trị viên (Admin)

- 📊 **Dashboard**: Thống kê tổng quan hệ thống
- 🎬 **Quản lý phim**: Thêm, sửa, xóa thông tin phim
- 👥 **Quản lý người dùng**: Quản lý danh sách user
- ⏰ **Quản lý lịch chiếu**: Thiết lập lịch chiếu cho từng phim
- 📄 **Phân trang**: Hỗ trợ phân trang cho các danh sách

## 🛠️ Công nghệ sử dụng

### Frontend

- **React 19** - Thư viện UI chính
- **Vite** - Build tool và dev server
- **React Router Dom** - Routing
- **Redux Toolkit** - State management
- **React Query** - Data fetching và caching
- **React Hook Form** - Form handling
- **Yup** - Form validation

### UI/UX

- **Tailwind CSS** - Styling framework
- **Radix UI** - Component primitives
- **Lucide React** - Icon library
- **Tabler Icons** - Additional icons
- **Swiper** - Carousel/slider
- **React Toastify** - Notifications

### Utilities

- **Axios** - HTTP client
- **Date-fns** - Date manipulation
- **Recharts** - Charts và graphs
- **Class Variance Authority** - Component variants

## 📁 Cấu trúc thư mục

```
src/
├── apis/              # API calls và services
│   ├── auth.js        # Authentication APIs
│   ├── cinema-system.js # Cinema system APIs
│   ├── movie.js       # Movie APIs
│   ├── user.js        # User management APIs
│   └── fetcher.js     # Base HTTP client
├── components/        # React components
│   ├── ui/            # Reusable UI components
│   ├── layouts/       # Layout components
│   ├── cinema-info/   # Cinema information components
│   └── movie/         # Movie-related components
├── pages/             # Page components
│   ├── home/          # Homepage
│   ├── movie-details/ # Movie details page
│   ├── auth/          # Login/Register pages
│   ├── admin/         # Admin dashboard pages
│   ├── booking-tickets-movie/ # Ticket booking
│   └── not-found/     # 404 page
├── routes/            # Routing configuration
├── store/             # Redux store
├── hooks/             # Custom React hooks
├── constants/         # App constants
├── lib/               # Utility libraries
└── assets/            # Static assets
```

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js >= 16.0.0
- npm hoặc yarn

### Các bước cài đặt

1. **Clone repository**

```bash
git clone https://github.com/ntdung6868/BC82_CAPSTONE_REACTJS.git
cd BC82_CAPSTONE_REACTJS
```

2. **Cài đặt dependencies**

```bash
npm install
# hoặc
yarn install
```

3. **Chạy development server**

```bash
npm run dev
# hoặc
yarn dev
```

4. **Truy cập ứng dụng**
   Mở trình duyệt và truy cập: `http://localhost:5173`

### Build production

```bash
npm run build
# hoặc
yarn build
```

### Xem trước build

```bash
npm run preview
# hoặc
yarn preview
```

## 🔧 Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run lint` - Chạy ESLint kiểm tra code
- `npm run preview` - Preview production build

## 🎯 Mục đích học tập

Dự án này được phát triển với các mục tiêu học tập:

1. **Frontend Development**: Thực hành React, state management, routing
2. **UI/UX Design**: Học cách thiết kế giao diện người dùng hiện đại
3. **API Integration**: Tích hợp với backend APIs
4. **Project Structure**: Tổ chức code theo best practices
5. **Modern Tooling**: Sử dụng các công cụ phát triển hiện đại

## 📄 License

Dự án này được phân phối dưới giấy phép MIT. Xem file `LICENSE` để biết thêm chi tiết.

## ⚖️ Tuyên bố pháp lý

- Dự án này chỉ nhằm mục đích học tập và nghiên cứu
- Không có mục đích thương mại
- Không liên quan chính thức đến Galaxy Cinema
- Mọi nội dung chỉ mang tính chất mô phỏng
- Tôn trọng bản quyền và thương hiệu của Galaxy Cinema

## 👨‍💻 Tác giả

**Nguyen Tri Dung**

- Dự án học tập tại BC82 - React.js Course
- Mục đích: Capstone Project

## 📞 Liên hệ

Nếu có bất kỳ câu hỏi nào về dự án, vui lòng tạo issue trên repository này.

---

_Được tạo với ❤️ cho mục đích học tập_

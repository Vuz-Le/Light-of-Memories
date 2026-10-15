# Cuội Đi Tìm Chị Hằng — Những Người Bạn Bị Bỏ Lại Trên Mặt Trăng

Dự án game giáo dục STEM & Storytelling tham gia **NASA Space Apps Challenge 2026** (Challenge #1: *Abandoned but not Forgotten*).

Dự án được xây dựng theo đúng bản kế hoạch chi tiết trong [`plan.md`](./plan.md).

---

## 🚀 Hướng Dẫn Chạy Dự Án

### 1. Cài đặt thư viện
```bash
npm install
```

### 2. Chạy môi trường phát triển (Dev server)
```bash
npm run dev
```
Trình duyệt sẽ mở tại: `http://localhost:5173/`

### 3. Đóng gói bản chạy thử (Build & Preview)
```bash
npm run build
npm run preview
```

---

## 🎮 Cách Chơi & Điều Khiển

- **Bàn phím:**
  - `A` / `D` hoặc mũi tên `←` / `→`: Cuội bước đi sang trái / phải.
  - Phím `E`: Tương tác với nhân vật hoặc vật thể khi đứng gần.
  - Phím `Space` hoặc `Enter` hoặc `E`: Đọc tiếp lời thoại hội thoại.
- **Chuột:**
  - Bấm vào bất kỳ đâu trên nền đất: Cuội sẽ đi tới vị trí được bấm.
  - Bấm vào nhân vật hoặc đồ vật ở xa: Cuội sẽ tự động đi tới gần rồi mới mở tương tác.
- **Ưu tiên bàn phím:** Khi bấm phím di chuyển, mục tiêu click chuột trước đó sẽ lập tức bị hủy bỏ.
- **Sách Đồng Hành:** Bấm nút **Sách Đồng Hành** trên thanh công cụ để mở sách đọc 4 trang nội dung, tìm manh mối giải câu đố của Mắt Tròn.

---

## 🌟 Cấu Trúc Đã Hoàn Thành (Theo plan.md)

1. **Lượt 1 — Khung chơi:**
   - Tích hợp chuẩn **React + TypeScript + Vite + Phaser 3**.
   - Phân tách rõ ràng: React quản lý giao diện/hội thoại/sách/câu đố; Phaser phụ trách cảnh vật/chuyển động/vùng tương tác.
   - Cơ chế khóa điều khiển (lock controls) khi mở sách, hội thoại hoặc menu.
   - Tự động co giãn theo kích thước màn hình.

2. **Lượt 2 — Kịch bản mở đầu:**
   - Menu chính (Bắt đầu mới, Tiếp tục, Hướng dẫn).
   - Cảnh **Gốc Đa**: Ghế đá trống không, Cây Đa ngàn năm giao nhiệm vụ, trao **Đèn Ông Sao 5 cánh** (hiện trạng ban đầu `0/5`).
   - Lối chuyển cảnh sang Miệng Hố Thiên Thạch.

3. **Lượt 3 — Màn 1: “Nhật ký của Mắt Tròn” (Surveyor 3):**
   - Cảnh **Miệng hố của Mắt Tròn**: Gặp robot Mắt Tròn (Surveyor 3, 1967).
   - Tìm kiếm 3 mảnh nhật ký rải rác quanh miệng hố.
   - Bảng sắp xếp nhật ký 3 sự kiện theo dòng thời gian (Hạ cánh đào đất ➔ Chụp 6.315 ảnh ➔ Apollo 12 ghé thăm).
   - Nút **Mở sách**, **Gợi ý**, **Kiểm tra**.
   - Thắp sáng cánh sao đầu tiên trên Đèn Ông Sao (`1/5 Cánh`).
   - Mở khóa **Thẻ Nhân Vật: Mắt Tròn — Surveyor 3** & kỹ năng STEM *Mắt phóng to*.
   - Tự động lưu tiến trình vào `localStorage`.

4. **Lượt 4 — Hoàn thiện & Tư liệu khoa học:**
   - Đồ họa minh họa bằng Canvas/SVG sắc nét, phong cách thiếu nhi ấm áp.
   - Âm thanh tổng hợp Web Audio API (bước chân, tiếng bíp hội thoại, nhạc chuông thắp sao, pháo hoa ăn mừng).
   - Toàn bộ thông tin lịch sử về **Surveyor 3** và **Apollo 12** được đối chiếu với tư liệu NASA.

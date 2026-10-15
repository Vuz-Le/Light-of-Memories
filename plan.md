**1. Phạm vi bản đầu**

| Hạng mục | Chốt triển khai |
|---|---|
| Nền tảng | Web trên máy tính; co giãn bố cục nhẹ khi đổi kích thước cửa sổ |
| Công nghệ | React + TypeScript + Vite + Phaser; CSS/Tailwind cho giao diện |
| Góc nhìn | 2D ngang, các cảnh nhỏ nối tiếp nhau |
| Điều khiển | A/D hoặc ←/→ để đi; E để tương tác; click nền để đi, click vật thể để tới gần và tương tác |
| Nội dung | Màn hình đầu → Gốc Đa → gặp Mắt Tròn → câu đố → thắp sao |
| Sách | Đọc trực tiếp trong game, có manh mối cần thiết cho màn 1 |
| Lưu tiến trình | Tự lưu trên trình duyệt bằng localStorage |
| Ngôn ngữ | Tiếng Việt trước; tách nội dung để thêm tiếng Anh sau |
| Chưa triển khai | Tài khoản, backend, chương 2–5, điều khiển cảm ứng, hệ thống vật lý phức tạp |

**2. Khung ứng dụng**

Phân chia trách nhiệm rõ để Antigravity không trộn toàn bộ vào một component:

| Phần | Trách nhiệm |
|---|---|
| React | Menu, hội thoại, sách, cài đặt, thẻ nhân vật và hiển thị tiến trình |
| Phaser | Cảnh vật, Cuội di chuyển, vùng tương tác, hoạt cảnh và câu đố |
| Dữ liệu nội dung | Lời thoại, chương sách, nhân vật, câu đố và liên kết giữa chúng |
| Trạng thái chung | Chương hiện tại, vật đã tìm, câu đố đã giải, sao đã sáng |
| Lưu trữ | Đọc/ghi tiến trình, tiếp tục trò chơi, bắt đầu lại |

Các quy tắc cần có ngay:

- **Bàn phím được ưu tiên:** nhấn phím di chuyển sẽ hủy đích đến do click trước đó.
- Click nhân vật ở xa thì Cuội đi tới gần rồi mới tương tác.
- Mở sách, hội thoại hoặc menu thì khóa điều khiển cảnh phía sau.
- Đóng sách giữ nguyên vị trí Cuội và trạng thái câu đố.
- Nút **Bắt đầu lại** yêu cầu xác nhận nếu đã có tiến trình.

**3. Nhân vật và tài nguyên tối thiểu**

| Nhân vật | Vai trò trong bản đầu | Hình ảnh/chuyển động cần có |
|---|---|---|
| Cuội | Nhân vật điều khiển | Đứng, đi, hướng trái/phải; hình tạm cũng phải nhận diện được |
| Cây Đa | Giao nhiệm vụ, giải thích đèn ông sao | Cây tĩnh, hiệu ứng sáng nhẹ khi nói |
| Mắt Tròn | Nhân vật chính của chương 1 | Thiết bị ba chân, trạng thái im lặng và đang trò chuyện |
| Chị Hằng | Người Cuội tìm kiếm | Một hình gợi nhớ hoặc bóng dáng trong phần mở đầu |

**Đề xuất thêm:** dùng hai cảnh nền là **Gốc Đa** và **Miệng hố của Mắt Tròn**. Đường chuyển giữa hai cảnh chỉ cần một vùng tương tác ở mép màn hình. Chưa cần xây bản đồ rộng.

**4. Kịch bản mở đầu — khoảng 1–2 phút**

| Bước | Diễn biến | Thao tác người chơi |
|---|---|---|
| 1 | Cuội tỉnh dậy dưới gốc đa | Bấm bắt đầu; hiện hướng dẫn di chuyển ngắn |
| 2 | Cuội thấy ghế đá bên cạnh trống | Đi tới và tương tác với ghế |
| 3 | Cuội gọi chị Hằng nhưng không thấy ai | Đọc 2–3 lượt thoại |
| 4 | Cây Đa gọi Cuội lại | Đi tới cây bằng bàn phím hoặc chuột |
| 5 | Cây Đa trao chiếc đèn năm cánh còn tối | Nhận đèn; tiến trình hiện `0/5` |
| 6 | Cây Đa giới thiệu cuốn sách đồng hành | Mở rồi đóng trang giới thiệu |
| 7 | Cuội phát hiện dấu vết dẫn tới một miệng hố | Đi sang cảnh màn 1 |

Lời thoại trong bản đầu cần ngắn, mỗi lượt một hoặc hai câu. Không tự chạy hết hội thoại trước khi người chơi kịp đọc.

**5. Màn chơi 1 — “Nhật ký của Mắt Tròn”**

Mục tiêu: **giúp Mắt Tròn khôi phục ba trang nhật ký, qua đó biết bạn ấy từng làm gì trên Mặt Trăng.**

**Đoạn A — Gặp người bạn**

Cuội thấy một thiết bị đứng im trong miệng hố. Khi tương tác, Mắt Tròn giới thiệu tên và nhờ Cuội giúp sắp lại nhật ký.

Sau hội thoại, giao diện hiện mục tiêu: **“Tìm ba mảnh nhật ký quanh Mắt Tròn.”**

**Đoạn B — Khám phá cảnh**

Đặt ba vật có thể tương tác ở các vị trí dễ thấy nhưng cần đi khám phá. Mỗi vật mở một ảnh ký ức và được đánh dấu đã thu thập.

Đây là **mảnh ký ức hư cấu phục vụ câu chuyện**, không mô tả Cuội tháo linh kiện thật của thiết bị.

**Đoạn C — Dùng sách giải câu đố**

Khi tìm đủ ba mảnh, mở bảng sắp xếp:

| Thành phần | Thiết kế |
|---|---|
| Dữ liệu đầu vào | Ba ảnh minh họa sự kiện, thứ tự ban đầu bị xáo trộn |
| Thao tác | Kéo thả ảnh vào ba ô; có thể chọn ảnh rồi chọn ô thay thế |
| Manh mối | Đoạn truyện trong chương Mắt Tròn cho biết quan hệ trước–sau |
| Nút hỗ trợ | Mở sách, Gợi ý, Kiểm tra |
| Trả lời sai | Giữ nguyên bài làm, gợi ý nhẹ, cho sửa |
| Trả lời đúng | Phát lại ba ảnh theo thứ tự và lời kể ngắn |

**Đề xuất để sách có vai trò thật:** ảnh dùng các biểu tượng hoặc chi tiết chỉ được giải thích trong sách, thay vì ghi sẵn ngày tháng để người chơi chỉ cần xếp số.

Không bắt buộc người chơi phải bấm mở sách mới được trả lời đúng; trẻ đã đọc sách trước vẫn có thể giải luôn.

**Đoạn D — Kết chương**

1. Mắt Tròn kể lại nhật ký đã khôi phục.
2. Cuội nói lời hứa nhớ tên bạn.
3. Cánh sao đầu tiên sáng lên.
4. Mở thẻ **Mắt Tròn — Surveyor 3**.
5. Tự lưu tiến trình và hiện **“Bạn đã hoàn thành chương 1”**.

Kỹ năng “Mắt phóng to” có thể được giới thiệu như phần thưởng, nhưng chưa cần xây hệ thống sử dụng kỹ năng ở bản này.

**6. Sách đồng hành cho bản thử**

Chỉ cần **4 trang nội dung**, chưa cần làm cả cuốn:

| Trang | Nội dung |
|---|---|
| 1 | Cuội, chị Hằng và lý do bắt đầu hành trình |
| 2 | Giới thiệu Mắt Tròn bằng tranh và đoạn kể ngắn |
| 3 | Nhật ký chứa manh mối giải câu đố |
| 4 | Thẻ kiến thức, phân biệt thiết bị thật và phần tưởng tượng |

Mỗi trang có mã cố định, ví dụ `surveyor-journal`, để game mở đúng nội dung ngay cả khi sau này đổi số trang.

Trên cửa sổ rộng, sách mở bên cạnh game. Khi cửa sổ hẹp hơn, sách mở dạng hộp phủ lớn. Nội dung cần đọc được mà không phải thu nhỏ chữ quá mức.

**7. Thứ tự giao việc cho Antigravity**

Mình đề xuất chia thành **bốn lượt triển khai**, mỗi lượt đều có kết quả chạy được:

| Lượt | Công việc | Điều kiện hoàn thành |
|---|---|---|
| **1. Khung chơi** | Tạo dự án, tích hợp React–Phaser, dựng cảnh tạm, Cuội di chuyển bằng hai cách, mở/đóng sách | Không xung đột điều khiển; đổi kích thước cửa sổ vẫn dùng được |
| **2. Mở đầu** | Menu, ghế đá, Cây Đa, hội thoại, nhận đèn, chuyển cảnh | Chơi trọn từ Bắt đầu tới gặp Mắt Tròn |
| **3. Màn 1** | Thu thập ba mảnh, sách có manh mối, câu đố, thắp sao, lưu tiến trình | Hoàn thành chương; tải lại trang vẫn tiếp tục đúng |
| **4. Hoàn thiện** | Thay hình tạm, thêm chuyển động nhẹ, âm thanh, chỉnh chữ và sửa lỗi | Một người mới có thể tự chơi từ đầu tới cuối |

**Đừng để Antigravity tự mở rộng sang các chương tiếp theo trước khi lượt 3 chạy ổn.** Phần cần kiểm chứng sớm nhất là việc người chơi hiểu mình phải làm gì và biết tìm manh mối trong sách.

**8. Tiêu chí nghiệm thu bản chơi thử**

- Cả chuột và bàn phím đều hoàn thành được toàn bộ hành trình.
- Không đi xuyên khỏi vùng cho phép hoặc tương tác từ khoảng cách bất hợp lý.
- Mở sách không làm mất câu đố đang giải.
- Có thể sửa đáp án sai và hoàn thành mà không bị kẹt.
- Cánh sao chỉ được thưởng một lần.
- Tải lại trang khôi phục đúng tiến trình; bắt đầu lại xóa đúng dữ liệu.
- Các hình, âm thanh và thông tin khoa học dùng trong bản hoàn thiện có nguồn rõ ràng.
- Nội dung lịch sử về Surveyor 3 được kiểm chứng trước khi thay nội dung thử bằng bản chính thức.

Bạn có thể dùng kế hoạch này làm yêu cầu tổng thể cho Antigravity, rồi giao **từng lượt**. Với mục tiêu xem sản phẩm nhanh, lượt đầu chỉ cần một Cuội hình tạm đi được, một Cây Đa tương tác được và cuốn sách mở được là đã đủ để bắt đầu đánh giá hướng làm.
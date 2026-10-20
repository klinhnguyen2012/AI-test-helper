# Thiết kế hai chế độ Mock và Exam

## Mục tiêu

Cho người học chọn rõ giữa Mock luyện tập không giới hạn giờ và Exam thi thử có đồng hồ. Sau khi nộp, kết quả hiển thị đáp án và lời giải ngay.

## Trải nghiệm

- Màn hình thiết lập có lựa chọn cấp cao `Mock luyện tập` hoặc `Exam thi thử`.
- Các lựa chọn nội dung hiện có (tổng hợp, module, code/toán, câu sai) tiếp tục là bộ lọc cho Mock.
- Mock không có hạn giờ; có thể nộp bất cứ lúc nào.
- Exam mặc định 90 phút; vẫn cho phép nộp sớm. Khi hết giờ, bài tự nộp.
- Cả hai chế độ chỉ mở kết quả sau khi nộp; trang kết quả hiển thị đáp án/lời giải ngay.
- Lịch sử lưu nhãn Mock hoặc Exam. Lượt cũ thiếu nhãn được xem là Exam nếu có thời hạn, còn lại là Mock.

## Dữ liệu và tương thích

Thêm `sessionType: 'mock' | 'exam'` vào cấu hình phiên và kết quả đã lưu. Lượt đang chạy cũ được đọc an toàn bằng cách suy ra chế độ từ deadline.

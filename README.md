# Dưới bóng Mẹ, tôi lặng lẽ lớn lên
> **Báo cáo Nghiên cứu Chuyên sâu & Học thuật**
> 
> *Một phân tích đa chiều về tình mẫu tử và quá trình trưởng thành: Từ cấu trúc tâm lý học phát triển (Thuyết gắn bó), biểu tượng văn hóa nghệ thuật Á Đông, đến các giải cấu trúc nữ quyền Phương Tây và biến thiên xã hội trong kỷ nguyên số.*

---

## 📖 Tổng quan Đề tài & Mục tiêu
Dự án là một nền tảng đọc và phổ biến **Báo cáo Nghiên cứu Học thuật chuyên sâu** có tựa đề **"Dưới bóng Mẹ, tôi lặng lẽ lớn lên"**. Nền tảng được xây dựng với mục tiêu cung cấp một trải nghiệm đọc tinh hoa, tối giản và tập trung cao độ (distraction-free), mô phỏng quy chuẩn của các tạp chí khoa học quốc tế uy tín nhưng tích hợp các tương tác số hiện đại.

Đề tài nghiên cứu khảo sát sâu sắc các khía cạnh:
1. **Hiện tượng học về Không gian "Bóng Mẹ":** Khảo sát cảm quan và triết học về sự che chở.
2. **Tâm lý học Mối quan hệ Mẹ - Con:** Phân tích Thuyết gắn bó của John Bowlby, Mary Ainsworth đến bệnh lý tâm lý bao bọc quá mức (*Overparenting*).
3. **Bản thể học Văn hóa:** Tình mẫu tử trong kho tàng văn chương truyền thống Việt Nam và siêu cấu trúc nghệ thuật thơ ca (Nguyễn Duy, Trần Đăng Khoa).
4. **Giải cấu trúc Nữ quyền:** So sánh góc nhìn văn chương nữ quyền Phương Tây hiện đại với truyền thống.
5. **Biến thiên Xã hội học:** Đứt gãy tương tác thế hệ và thách thức nuôi dạy con trong bối cảnh chuyển đổi số.

---

## 🛠️ Kiến trúc Công nghệ (Tech Stack)

Dự án được phát triển dựa trên các công nghệ hiện đại và tối ưu nhất:

*   **Core Framework:** [Next.js 16.2 (Turbopack)](https://nextjs.org/) & [React 19](https://react.dev/) - Tận dụng tối đa mô hình **React Server Components (RSC)** để tải và phân tích dữ liệu trực tiếp tại server, giảm thiểu tối đa JavaScript tải về client.
*   **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/) - Đảm bảo kiểm soát kiểu chặt chẽ, tránh lỗi runtime phát sinh.
*   **Styling (CSS):** [Tailwind CSS v4](https://tailwindcss.com/) kết hợp PostCSS và Vanilla CSS - Mang lại khả năng tùy biến mạnh mẽ, tải phông chữ động thông qua CSS Variables.
*   **Phông chữ (Typography):** Tải và tối ưu hóa qua `next/font/google` với bộ đôi phông chữ học thuật cao cấp:
    *   `Playfair Display` (serif) - Dành cho các tiêu đề lớn, trích dẫn thơ nghệ thuật.
    *   `Lora` (serif) - Dành cho nội dung bài đọc chính và hệ thống chú thích popover.
*   **Dữ liệu Nội dung:** Lưu trữ tĩnh dưới định dạng Markdown (`lonlen.md`), được đọc và phân tích trực tiếp ở Build-time.

---

## 📂 Cấu trúc Thư mục Dự án

```text
duoibongducme/
├── app/
│   ├── globals.css         # Hệ thống định nghĩa Style toàn cục, HSL colors, hiệu ứng in ấn
│   ├── layout.tsx          # Bố cục chính, tối ưu hóa SEO Metadata, liên kết Google Fonts
│   └── page.tsx            # Trang chủ (Server Component) đọc nội dung và dựng cấu trúc chính
├── components/
│   ├── Dividers.tsx        # Các đường phân cách học thuật (SectionDivider, CrossDivider)
│   ├── Footer.tsx          # Chân trang học thuật lịch lãm và thông tin bản quyền
│   ├── HeroSection.tsx     # Bìa báo cáo nghệ thuật (Hiệu ứng hào quang, hạt trôi nổi và chữ lớn)
│   ├── MarkdownRenderer.tsx# Bộ dựng giao diện bài viết, xử lý bảng học thuật, blockquote và thơ ca
│   ├── ReadingProgress.tsx # Thanh tiến độ đọc toàn thời gian & Nút cuộn nhanh lên đầu trang
│   └── TableOfContents.tsx # Hệ thống Mục lục thông minh (Sticky Desktop Sidebar & Mobile Drawer)
├── lib/
│   └── contentParser.ts    # Bộ phân tích cú pháp tĩnh từ Markdown sang JSON, trích xuất cấu trúc Citations
├── public/                 # Các tài nguyên tĩnh (favicon, hình ảnh, tài liệu)
├── lonlen.md               # Toàn bộ nội dung văn bản gốc của Báo cáo Nghiên cứu
├── tsconfig.json           # Cấu hình TypeScript dự án
├── package.json            # Danh sách thư viện phụ thuộc và các câu lệnh thực thi
└── README.md               # Tài liệu hướng dẫn dự án (tệp này)
```

---

## ✨ Các Tính năng Nổi bật & Cải tiến Giao diện

### 1. Chủ đề Học thuật Cao cấp (Premium Academic Theme)
*   Sử dụng bảng màu mang âm hưởng học thuật Châu Âu cổ kính kết hợp thần học: màu nền trắng ngà/giấy da giấy cổ (`#F9F6F0`, `#EDE8DB`), màu văn bản xám than tối dịu mắt (`#1F2937`), các chi tiết điểm nhấn màu đỏ vang Burgundy quý phái (`#7B2D3B`) và nhũ vàng kim cổ điển (`#D4AF37`).
*   Hiệu ứng bìa bài viết (**Hero Section**) động với các tia sáng hào quang khuếch tán từ trên cao (mô phỏng ánh sáng nhà thờ) và hệ thống hạt ánh sáng li ti chuyển động chậm rãi (*shimmer effect*).

### 2. Phân tích nội dung Tĩnh linh hoạt (Dynamic Build-time Parsing)
*   Bộ mã `lib/contentParser.ts` đọc tệp `lonlen.md` duy nhất tại build-time, tự động cắt lát các tiêu đề H2, H3 để sinh cấu trúc Mục lục tự động, liên kết Citations số hóa và ánh xạ các biểu bảng phân tích học thuật cấu trúc phức tạp mà không cần truy vấn cơ sở dữ liệu.

### 3. Hệ thống Mục lục kép thông minh (Dual-Layout Table of Contents)
*   **Trên Desktop:** Hiển thị dưới dạng thanh biên (Sidebar) cố định bên trái, tự động theo dõi tiến trình đọc thông qua `IntersectionObserver`. Tiêu đề chương đang đọc sẽ tự động sáng lên và bám biên mượt mà.
*   **Trên Mobile (Độc quyền Ergonomics UX):** 
    *   Ẩn hoàn toàn thanh mục lục desktop để tiết kiệm diện tích.
    *   Tích hợp phím nổi Hamburger Menu tròn màu xanh Navy sang trọng xếp chồng ngay ngắn ở **góc dưới bên phải** (tại tọa độ công học lý tưởng `bottom-24 right-8`, cách xa logo hệ thống).
    *   Nhấp vào nút di động sẽ kích hoạt **Ngăn kéo trượt (Sliding Drawer)** từ bên trái chứa toàn bộ mục lục chương mục, đi kèm lớp phủ nền mờ mịn. Khi chọn một chương, trang web tự động cuộn mượt mà đến vùng nội dung và ngăn kéo tự động đóng lại ngăn nắp.

### 4. Bong bóng Chú thích Học thuật (Academic Popover Tooltips)
*   Các chỉ số trích dẫn superscript số hóa (ví dụ: `1`, `2`) được liên kết động với danh mục nguồn tài liệu tham khảo ở cuối bài.
*   Khi rê chuột (hover) vào số trích dẫn trên Desktop, một bong bóng thông tin (popover) đen tuyền có viền vàng lề trái sẽ xuất hiện ngay phía trên để hiển thị tức thời nguồn trích dẫn đầy đủ mà không làm gián đoạn mạch đọc của độc giả.
*   Đã triệt tiêu hoàn toàn thuộc tính mặc định `title` của trình duyệt để ngăn chặn tình trạng hiện đúp hai bong bóng đè lên nhau.

### 5. Dựng thơ ca & Bảng biểu Học thuật chuyên biệt
*   Tự động phát hiện các đoạn trích thơ ca (như thơ Nguyễn Duy hay thơ Trần Đăng Khoa) trong Markdown và hiển thị chúng dưới dạng khối blockquote nghệ thuật, phông chữ Playfair Display nghiêng cỡ lớn căn giữa tinh tế.
*   Hiển thị biểu bảng so sánh học thuật chuẩn cấu trúc lưới nghiên cứu chuyên sâu, trang bị tính năng cuộn ngang tự nhiên trên các màn hình di động nhỏ để không gây vỡ giao diện.

### 6. Tối ưu hóa Bản in & Xuất PDF (Print-Ready CSS)
*   Trang bị đầy đủ bộ chỉ thị in ấn `@media print` cao cấp trong CSS. Khi độc giả nhấn `Ctrl + P` để xuất tài liệu hoặc in ra giấy:
    *   Hệ thống tự động ẩn toàn bộ phím nổi, thanh mục lục, thanh tiến trình đọc và chân trang.
    *   Bảng màu chuyển hoàn toàn về trắng đen có độ tương phản cao, phông chữ tối ưu cho định dạng giấy khổ A4.
    *   Tự động chèn ngắt trang hợp lý giữa các chương mục lớn và khối bảng biểu, đảm bảo tài liệu PDF in ra chuẩn chỉnh như một bài báo khoa học bản in thực thụ.

---

## 🚀 Hướng dẫn Cài đặt & Chạy Cục bộ

### Yêu cầu hệ thống
*   Đã cài đặt **Node.js** (Khuyến nghị phiên bản LTS từ 18.x trở lên).
*   Đã cài đặt trình quản lý gói `npm` (đi kèm Node.js).

### Các bước khởi chạy

1.  **Cài đặt các thư viện phụ thuộc (Dependencies):**
    Di chuyển vào thư mục dự án và chạy lệnh cài đặt:
    ```bash
    npm install
    ```

2.  **Khởi động máy chủ phát triển (Development Server):**
    ```bash
    npm run dev
    ```
    Sau khi chạy thành công, mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000) để xem kết quả trực quan thời gian thực (Hot-reload tự động).

3.  **Biên dịch tối ưu hóa Sản xuất (Build Production):**
    Để kiểm tra hiệu năng tối đa và biên dịch tĩnh toàn bộ trang web:
    ```bash
    npm run build
    ```

4.  **Chạy thử bản phân phối sản xuất cục bộ:**
    ```bash
    npm run start
    ```

---

## ✍️ Quy chuẩn Định dạng Nội dung trong `lonlen.md`

Để tệp Markdown được biên dịch hoàn hảo thông qua bộ phân tích `contentParser.ts` và bộ dựng `MarkdownRenderer.tsx`, tệp nội dung cần tuân thủ các quy tắc cấu trúc sau:

### 1. Tiêu đề chính & Tiêu đề chương
*   Dòng đầu tiên trong tệp `lonlen.md` sẽ được nhận diện là **Phụ đề Nghiên cứu** (hiển thị dưới tiêu đề bìa lớn).
*   Các tiêu đề chương lớn (H2) phải nằm trong danh sách `H2_TITLES` của tệp [contentParser.ts](file:///d:/duoibongducme/lib/contentParser.ts#L41) để hệ thống bắt được sự kiện cuộn trang và dựng mục lục.
*   Các tiêu đề chương phụ (H3) phải nằm trong danh sách `H3_TITLES` của tệp [contentParser.ts](file:///d:/duoibongducme/lib/contentParser.ts#L52).

### 2. Ký hiệu Trích dẫn (Citations)
*   Trích dẫn được ghi bằng số nguyên (từ `1` đến `20`) đặt ngay sát sau các dấu kết thúc câu hoặc cụm từ (ví dụ: `...thành.1` hoặc `...xã hội.12`).
*   Bộ quét regex sẽ tự động chuyển đổi các số này thành thẻ superscript tương tác có popover liên kết trực tiếp với danh mục ở chương cuối cùng.

### 3. Trích thơ ca
*   Đoạn thơ ca cần được đặt hoàn toàn trong dấu ngoặc kép dạng `"Dòng thơ 1"`, `"Dòng thơ 2"` và đoạn văn bản đó phải chứa ít nhất một trong các câu thơ định danh có trong mảng `poetryMarkers` tại [MarkdownRenderer.tsx](file:///d:/duoibongducme/components/MarkdownRenderer.tsx#L24) để hệ thống kích hoạt chế độ dựng thơ nghệ thuật.

### 4. Biểu bảng phân tích
*   Bảng 1 (Các chiều kích hành vi bao bọc quá mức) được dựng động khi gặp dòng văn bản nhận diện placeholder `___TABLE1___`.
*   Bảng 2 (Bảng so sánh hệ quy chiếu) được dựng động khi gặp dòng văn bản nhận diện placeholder `___TABLE2___`.

---

## 📜 Bản quyền & Giấy phép
Nội dung báo cáo nghiên cứu học thuật và toàn bộ mã nguồn giao diện thuộc sở hữu của tác giả dự án. Tài liệu được phân phối và biên soạn hoàn toàn phục vụ cho mục đích học tập, phổ biến kiến thức phi thương mại và nghiên cứu khoa học chuyên sâu.

*Copyright © 2026 · Báo cáo Nghiên cứu Học thuật · Mọi quyền được bảo lưu.*

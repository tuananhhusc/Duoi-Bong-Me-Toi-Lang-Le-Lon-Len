import { ReactNode } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface ContentSection {
  id: string;
  title: string;
  level: number;
  paragraphs: string[];
}

export interface ReferenceItem {
  id: number;
  text: string;
  url: string;
}

export interface ParsedContent {
  reportTitle: string;
  reportSubtitle: string;
  sections: ContentSection[];
  references: ReferenceItem[];
  tocItems: TocItem[];
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .substring(0, 80);
}

// These are the lines that serve as section headings (H2)
const H2_TITLES = [
  "Dẫn luận: Khảo sát Hiện tượng học về Không gian \"Bóng Mẹ\"",
  "Nền tảng Tâm lý học Mối quan hệ Mẹ - Con: Từ Thuyết Gắn bó đến Sự Tiến hóa của Khái niệm Tự chủ",
  "Bản thể học Văn hóa về Sự Hy sinh: Tình Mẫu tử trong Kho tàng Văn chương Truyền thống Việt Nam",
  "Giải cấu trúc Tình mẫu tử trong Văn chương Nữ quyền Phương Tây Hiện đại",
  "Biến thiên Xã hội học: Tình Mẫu tử và Sự Đứt gãy trong Bối cảnh Chuyển đổi Số",
  "Tổng luận: Điểm Cân bằng Giữa Sự Che chở Tuyệt đối và Sự Giải phóng Tự do",
  "Nguồn trích dẫn",
];

// These are H3 sub-headings
const H3_TITLES = [
  "Nguồn gốc và Cấu trúc của Thuyết Gắn bó",
  "Sự Mở rộng và Chuyển dịch của Mô hình Gắn bó ở Người Trưởng thành",
  "Bệnh lý của Sự Che chở: Hiện tượng Bao bọc Quá mức (Overparenting) và Hệ lụy Nhân cách",
  "Triết lý Nhân sinh về Sự Đánh đổi qua Siêu cấu trúc Nghệ thuật \"Mẹ và quả\"",
  "Tản văn Đương đại: Không gian Bình yên và Cơ chế Chữa lành",
  "Sự Trỗi dậy của Tính Hữu hình và Chấn thương Thể lý (Physicality)",
  "Sự Cô lập Tôn giáo của Tình Mẫu tử và Lát cắt \"Vắng bóng\" Người Cha",
  "Khoảng trống Tương tác và Nỗ lực Hàn gắn trong Kỷ nguyên Số",
  "Sự Tương tác Hai chiều và Những Góc Khuất của Đạo lý",
  "Xác lập Ranh giới: Phân biệt Giữa Hy sinh Lành mạnh và Sự Áp đặt Tâm lý",
];

// Table data lines (the structured table content)
const TABLE_HEADERS_OVERPARENTING = [
  "Các Chiều kích của Hành vi Bao bọc Quá mức",
  "Phân tích Động cơ và Biểu hiện Hành vi của Phụ huynh",
  "Tác động Hệ lụy Tâm lý học đối với Quá trình Trưởng thành của Trẻ em",
];

const TABLE_HEADERS_COMPARISON = [
  "Khía cạnh Phân tích Mở rộng",
  "Hệ quy chiếu Truyền thống (Đại diện: Văn học Á Đông/Thơ ca Việt Nam)",
  "Hệ quy chiếu Hiện đại (Đại diện: Văn chương Nữ quyền Phương Tây)",
];

export function parseContent(rawContent: string): ParsedContent {
  const lines = rawContent.split("\n").map((l) => l.replace(/\r$/, ""));

  // Line 1 is the big report title (subtitle)
  const reportTitle = "Dưới bóng Mẹ, tôi lặng lẽ lớn lên";
  const reportSubtitle = lines[0] || "";

  const sections: ContentSection[] = [];
  const references: ReferenceItem[] = [];
  const tocItems: TocItem[] = [];

  let currentSection: ContentSection | null = null;
  let inReferences = false;
  let inTable1 = false;
  let inTable2 = false;
  let table1Rows: string[][] = [];
  let table2Rows: string[][] = [];
  let currentTableRow: string[] = [];
  let skipNextLines = 0;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    if (skipNextLines > 0) {
      skipNextLines--;
      continue;
    }

    if (!line) continue;

    // Check if we've entered references
    if (line === "Nguồn trích dẫn") {
      inReferences = true;
      // Add the references section heading
      const id = generateSlug(line);
      tocItems.push({ id, text: line, level: 2 });
      // Flush current section
      if (currentSection && currentSection.paragraphs.length > 0) {
        sections.push(currentSection);
      }
      currentSection = null;
      continue;
    }

    if (inReferences) {
      // Parse reference lines like: "Title, truy cập vào tháng ..., URL"
      // The reference numbering is implicit by order
      const urlMatch = line.match(/(https?:\/\/[^\s,]+)/);
      if (urlMatch) {
        const url = urlMatch[1];
        const textPart = line.replace(url, "").replace(/,\s*$/, "").trim();
        references.push({
          id: references.length + 1,
          text: textPart,
          url: url,
        });
      }
      continue;
    }

    // Handle Table 1 (Overparenting) - Lines 18-36
    if (line === TABLE_HEADERS_OVERPARENTING[0]) {
      inTable1 = true;
      table1Rows = [];
      currentTableRow = [line];
      // Read next two header lines
      continue;
    }

    if (inTable1) {
      if (line === TABLE_HEADERS_OVERPARENTING[1] || line === TABLE_HEADERS_OVERPARENTING[2]) {
        currentTableRow.push(line);
        if (currentTableRow.length === 3) {
          table1Rows.push([...currentTableRow]);
          currentTableRow = [];
        }
        continue;
      }

      // Check if this is a row number prefix (1. through 5.)
      const rowNumberMatch = line.match(/^(\d+)\.\s+(.+)$/);
      if (rowNumberMatch) {
        if (currentTableRow.length > 0 && currentTableRow.length >= 2) {
          table1Rows.push([...currentTableRow]);
          currentTableRow = [];
        }
        currentTableRow.push(line);
        continue;
      }

      // Could be a continuation of a table cell
      if (currentTableRow.length > 0 && currentTableRow.length < 3) {
        currentTableRow.push(line);
        if (currentTableRow.length === 3) {
          table1Rows.push([...currentTableRow]);
          currentTableRow = [];
        }
        continue;
      }

      // End of table
      if (currentTableRow.length > 0) {
        // Pad if needed
        while (currentTableRow.length < 3) currentTableRow.push("");
        table1Rows.push([...currentTableRow]);
        currentTableRow = [];
      }

      // Store the table in the current section
      if (currentSection) {
        currentSection.paragraphs.push("___TABLE1___");
      }
      inTable1 = false;
      // Don't continue  process this line normally
    }

    // Handle Table 2 (Comparison) - Lines 64-79
    if (line === TABLE_HEADERS_COMPARISON[0]) {
      inTable2 = true;
      table2Rows = [];
      currentTableRow = [line];
      continue;
    }

    if (inTable2) {
      if (
        line === TABLE_HEADERS_COMPARISON[1] ||
        line === TABLE_HEADERS_COMPARISON[2]
      ) {
        currentTableRow.push(line);
        if (currentTableRow.length === 3) {
          table2Rows.push([...currentTableRow]);
          currentTableRow = [];
        }
        continue;
      }

      // Check for comparison row topics
      const comparisonTopics = [
        "Bản chất của sự hy sinh",
        "Cảm xúc chủ đạo của người mẹ",
        "Sự tồn tại của bản ngã",
        "Không gian gia đình",
      ];

      if (comparisonTopics.includes(line)) {
        if (currentTableRow.length > 0) {
          while (currentTableRow.length < 3) currentTableRow.push("");
          table2Rows.push([...currentTableRow]);
          currentTableRow = [];
        }
        currentTableRow.push(line);
        continue;
      }

      if (currentTableRow.length > 0 && currentTableRow.length < 3) {
        currentTableRow.push(line);
        if (currentTableRow.length === 3) {
          table2Rows.push([...currentTableRow]);
          currentTableRow = [];
        }
        continue;
      }

      // End of table 2
      if (currentTableRow.length > 0) {
        while (currentTableRow.length < 3) currentTableRow.push("");
        table2Rows.push([...currentTableRow]);
        currentTableRow = [];
      }

      if (currentSection) {
        currentSection.paragraphs.push("___TABLE2___");
      }
      inTable2 = false;
    }

    // Check if it's H2
    if (H2_TITLES.includes(line)) {
      // Save previous section
      if (currentSection && currentSection.paragraphs.length > 0) {
        sections.push(currentSection);
      }
      const id = generateSlug(line);
      tocItems.push({ id, text: line, level: 2 });
      currentSection = {
        id,
        title: line,
        level: 2,
        paragraphs: [],
      };
      continue;
    }

    // Check if it's H3
    if (H3_TITLES.includes(line)) {
      if (currentSection && currentSection.paragraphs.length > 0) {
        sections.push(currentSection);
      }
      const id = generateSlug(line);
      tocItems.push({ id, text: line, level: 3 });
      currentSection = {
        id,
        title: line,
        level: 3,
        paragraphs: [],
      };
      continue;
    }

    // Regular paragraph
    if (currentSection) {
      currentSection.paragraphs.push(line);
    }
  }

  // Flush last section
  if (currentSection && currentSection.paragraphs.length > 0) {
    sections.push(currentSection);
  }

  return {
    reportTitle,
    reportSubtitle,
    sections,
    references,
    tocItems,
  };
}

// Process inline citation markers like: text.1 or text.12
// Looking for superscript numbers at end of sentences
export function processCitations(text: string): ReactNode[] {
  // Match citation patterns: a number at the end of words, after punctuation
  // Pattern: match things like "word.1" or "word.12" or "(text).4"
  const parts: ReactNode[] = [];
  
  // Split by citation markers  numbers that appear as superscript references
  // In the source: text ends with a number like "...sinh.6" or "...con.2"
  const regex = /(\d{1,2})(?=\s|$|\.|\,|\))/g;
  
  // Instead, let's use a simpler approach - find standalone numbers at sentence boundaries
  // The markdown uses numbers inline like "...thành.6" meaning citation [6]
  // Actually looking at the content more carefully, citations appear at end of paragraphs
  // like "...phần đời còn lại.6" where 6 is citation
  
  // Split text to find citation numbers
  // Pattern: find numbers that appear to be citation markers (after period, comma, or at end)
  const citationRegex = /(?<=[\.\)\"\'\u201D\u201C])([\d]{1,2})(?=\s|$|\.|,)/g;
  
  let lastIndex = 0;
  let match;
  
  const citationRegex2 = /\.([\d]{1,2})(?=\s|$)/g;
  
  while ((match = citationRegex2.exec(text)) !== null) {
    const citNum = match[1];
    const beforeMatch = text.substring(lastIndex, match.index + 1); // include the period
    if (beforeMatch) {
      parts.push(beforeMatch);
    }
    parts.push(
      `__CITE_${citNum}__`
    );
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  if (parts.length === 0) {
    return [text];
  }
  
  return parts;
}

// Get the overparenting table data
export function getOverparentingTableData(): string[][] {
  return [
    [
      "Các Chiều kích của Hành vi Bao bọc Quá mức",
      "Phân tích Động cơ và Biểu hiện Hành vi của Phụ huynh",
      "Tác động Hệ lụy Tâm lý học đối với Quá trình Trưởng thành của Trẻ em",
    ],
    [
      "1. Tước đoạt cơ hội giải quyết vấn đề",
      "Phụ huynh phản xạ can thiệp ngay lập tức khi con gặp trở ngại. Ví dụ: tự đứng ra thương lượng với nhà trường để giảm bài tập, hoặc trực tiếp can thiệp vào xích mích giữa con và bạn bè trước khi con kịp thử nghiệm giải pháp của mình.",
      "Trẻ bị đánh cắp không gian tự thử sức và vấp ngã. Trẻ không thể thiết lập tư duy logic độc lập, dẫn đến sự thâm hụt nghiêm trọng trong kỹ năng giải quyết vấn đề và thiếu tính chủ động khi đối diện với thế giới thực.",
    ],
    [
      "2. Bức tường cách ly cảm xúc tiêu cực",
      "Cha mẹ mắc hội chứng sợ hãi cảm xúc tiêu cực của con, liên tục tìm cách trấn an, đánh lạc hướng bằng phần thưởng vật chất hoặc can thiệp khẩn cấp để dập tắt nỗi buồn, sự thất vọng của trẻ.",
      "Sự trưởng thành đòi hỏi phải thẩm thấu mọi phổ cảm xúc. Việc che chắn khiến trẻ mất đi khả năng đối diện, xử lý và chấp nhận rủi ro cảm xúc, làm thui chột chỉ số trí tuệ cảm xúc (EQ) và sức bật tinh thần khi trưởng thành.",
    ],
    [
      '3. Định kiến về sự "mong manh" (Fragility)',
      "Phụ huynh tự hạ thấp tiêu chuẩn, giảm bớt phản hồi mang tính xây dựng, hoặc cho phép con dễ dàng từ bỏ các hoạt động khó khăn chỉ vì sợ con không chịu nổi áp lực tâm lý hoặc tổn thương.",
      "Hành vi này cấy vào tiềm thức trẻ một niềm tin cốt lõi sai lệch: rằng bản thân chúng vô cùng yếu kém và dễ vỡ. Thay vì học cách thích nghi và lớn lên từ khó chịu, trẻ sẽ hình thành thói quen né tránh khó khăn.",
    ],
    [
      "4. Ám ảnh kết quả, xóa sổ quá trình",
      "Can thiệp thái quá vào quy trình học tập để đảm bảo sản phẩm cuối cùng hoàn hảo, không có sai sót (ví dụ: làm hộ bài thủ công, can thiệp để con vào nhóm tốt nhất, tranh cãi với huấn luyện viên thể thao).",
      "Xóa bỏ không gian học hỏi từ sai lầm (trial and error). Trẻ không có cơ hội tự phân tích, điều chỉnh hành vi và tự rút ra kinh nghiệm xương máu. Sự tự tôn bị gắn liền với kết quả ảo do cha mẹ tạo ra.",
    ],
    [
      "5. Nỗi bất an của cha mẹ trở thành động cơ",
      'Hành vi nuôi dạy không xuất phát từ nhu cầu phát triển tự nhiên của trẻ, mà bắt nguồn từ nỗi lo âu, sợ hãi thất bại, hoặc định kiến xã hội của chính người lớn. Cha mẹ giám sát con gắt gao như một liệu pháp an thần cho chính mình.',
      "Trẻ em có độ nhạy cảm cao với cảm xúc của người lớn. Khi nhận thấy sự can thiệp xuất phát từ sự bất an, trẻ hiểu rằng chúng không được tin tưởng. Điều này khuếch đại sự lo âu nội tại, tạo ra một vòng lặp phụ thuộc độc hại.",
    ],
  ];
}

export function getComparisonTableData(): string[][] {
  return [
    [
      "Khía cạnh Phân tích Mở rộng",
      "Hệ quy chiếu Truyền thống (Đại diện: Văn học Á Đông/Thơ ca Việt Nam)",
      "Hệ quy chiếu Hiện đại (Đại diện: Văn chương Nữ quyền Phương Tây)",
    ],
    [
      "Bản chất của sự hy sinh",
      'Mang tính vô hình, vị tha, được lãng mạn hóa thành chuẩn mực đạo đức thiêng liêng ("giọt mồ hôi mặn", "bàn tay mỏi").',
      "Mang tính hữu hình, trần trụi, đau đớn tột cùng về sinh lý và chấn thương tâm thần học (mất ngủ, hoang tưởng, tổn thương cơ quan sinh sản).",
    ],
    [
      "Cảm xúc chủ đạo của người mẹ",
      'Ẩn nhẫn, bao dung, nén nỗi đau vào trong một lòng thầm lặng sâu sắc ("nước mắt chảy xuôi").',
      "Hoang mang tột độ, cô độc, hoảng loạn, đấu tranh khốc liệt giữa tình yêu thương bản năng và sự đánh mất cái tôi.",
    ],
    [
      "Sự tồn tại của bản ngã",
      'Cá nhân người mẹ bị xóa nhòa, hòa tan hoàn toàn để trở thành môi trường nuôi dưỡng con cái ("đất đai nuôi quả lớn lên").',
      "Người mẹ vật lộn dữ dội để gìn giữ sự tỉnh táo, năng lực sáng tạo và bảo vệ định danh cá nhân trước sức hút của việc làm mẹ.",
    ],
    [
      "Không gian gia đình",
      "Là một thiết chế xã hội vi mô đầm ấm, nơi tổng hòa các mối quan hệ, là bến đỗ bình yên cho tất cả thành viên.",
      "Là một không gian sinh quyển đóng kín, ngột ngạt và biệt lập giữa mẹ và trẻ sơ sinh; vai trò người cha bị đẩy ra vùng biên ngoại lai.",
    ],
  ];
}

import { ContentSection, ReferenceItem, getOverparentingTableData, getComparisonTableData } from "@/lib/contentParser";
import { SectionDivider, CrossDivider } from "./Dividers";

interface MarkdownRendererProps {
  sections: ContentSection[];
  references: ReferenceItem[];
}

// Extract poetry/verse quotes from text (lines wrapped in quotes)
function extractQuotes(text: string): { before: string; quote: string; after: string } | null {
  // Match text between quotation marks that spans a verse-like structure
  const quoteMatch = text.match(/([\s\S]*?)\"([^"]+)\"([\s\S]*)/);
  if (quoteMatch) {
    return {
      before: quoteMatch[1],
      quote: quoteMatch[2],
      after: quoteMatch[3],
    };
  }
  return null;
}

// Check if a paragraph contains a verse/poetry quote
function isPoetryParagraph(text: string): boolean {
  // Poetry lines from the document
  const poetryMarkers = [
    "Lũ chúng tôi từ tay mẹ lớn lên",
    "Còn những bí và bầu thì lớn xuống",
    "Chúng mang dáng những giọt mồ hôi mặn",
    "Rỏ xuống lòng thầm lặng mẹ tôi",
    "Tôi hoảng sợ ngày bàn tay mẹ mỏi",
    "Mình vẫn còn một thứ quả non xanh",
  ];
  return poetryMarkers.some((marker) => text.includes(marker));
}

// Process citation markers in text and return JSX with popover tooltips
function renderTextWithCitations(text: string, references: ReferenceItem[]): React.ReactNode {
  const parts: React.ReactNode[] = [];

  // Match citation numbers after: period, closing paren, closing quote, or at start after whitespace
  // Also match standalone citation numbers (just a number possibly with whitespace)
  const citRegex = /(?<=[\.\)\"\'\u201D\u201C])(\d{1,2})(?=\s|$)|(?<=\s)(\d{1,2})$/g;

  let lastIdx = 0;
  let match;
  let key = 0;

  while ((match = citRegex.exec(text)) !== null) {
    const citNum = match[1] || match[2];
    const citNumInt = parseInt(citNum, 10);
    // Only treat as citation if it's a reasonable reference number (1-20)
    if (citNumInt < 1 || citNumInt > 20) continue;

    const before = text.substring(lastIdx, match.index);
    if (before) {
      parts.push(<span key={`t-${key++}`}>{before}</span>);
    }

    const refItem = references.find(r => r.id === citNumInt);
    const tooltipContent = refItem ? refItem.text : "";

    parts.push(
      <span key={`c-container-${key++}`} className="citation-container">
        <a
          href={`#ref-${citNum}`}
          className="citation-ref"
          aria-label={`Trích dẫn ${citNum}`}
        >
          {citNum}
        </a>
        {tooltipContent && (
          <span className="citation-tooltip">
            {tooltipContent}
          </span>
        )}
      </span>
    );
    lastIdx = match.index + match[0].length;
  }

  if (lastIdx < text.length) {
    parts.push(<span key={`t-${key++}`}>{text.substring(lastIdx)}</span>);
  }

  return parts.length > 0 ? <>{parts}</> : <>{text}</>;
}


// Render a single academic table
interface AcademicTableProps {
  data: string[][];
  id: string;
  references: ReferenceItem[];
}

function AcademicTable({ data, id, references }: AcademicTableProps) {
  if (data.length === 0) return null;
  const headers = data[0];
  const rows = data.slice(1);

  return (
    <div className="table-responsive" id={id}>
      <table>
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci}>
                  {ci === 0 ? (
                    <strong>{cell}</strong>
                  ) : (
                    renderTextWithCitations(cell, references)
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export default function MarkdownRenderer({
  sections,
  references,
}: MarkdownRendererProps) {
  const table1Data = getOverparentingTableData();
  const table2Data = getComparisonTableData();

  let table1Rendered = false;
  let table2Rendered = false;
  let lastH2Index = -1;

  return (
    <article className="prose-academic" id="content">
      {sections.map((section, sectionIdx) => {
        const isH2 = section.level === 2;
        const showDivider = isH2 && sectionIdx > 0;
        
        if (isH2) lastH2Index = sectionIdx;

        return (
          <div key={section.id}>
            {showDivider && <SectionDivider />}

            {isH2 ? (
              <h2 id={section.id}>{section.title}</h2>
            ) : (
              <h3 id={section.id}>{section.title}</h3>
            )}

            {section.paragraphs.map((para, pIdx) => {
              // Handle table placeholders
              if (para === "___TABLE1___" && !table1Rendered) {
                table1Rendered = true;
                return (
                  <AcademicTable
                    key={`table1-${pIdx}`}
                    data={table1Data}
                    id="table-overparenting"
                    references={references}
                  />
                );
              }

              if (para === "___TABLE2___" && !table2Rendered) {
                table2Rendered = true;
                return (
                  <AcademicTable
                    key={`table2-${pIdx}`}
                    data={table2Data}
                    id="table-comparison"
                    references={references}
                  />
                );
              }

              // Check if this paragraph contains poetry/verse
              if (isPoetryParagraph(para)) {
                // Extract the verse portion
                const verseLines = para.match(/\"([^\"]+)\"/g);
                if (verseLines) {
                  const textBefore = para.substring(0, para.indexOf('"'));
                  const textAfter = para.substring(para.lastIndexOf('"') + 1);
                  const verses = verseLines.map((v) =>
                    v.replace(/\"/g, "")
                  );

                  return (
                    <div key={`p-${sectionIdx}-${pIdx}`}>
                      {textBefore && (
                        <p>{renderTextWithCitations(textBefore, references)}</p>
                      )}
                      <blockquote>
                        {verses.map((verse, vi) => (
                          <p key={vi} className="!text-center !text-lg font-[family-name:var(--font-playfair)]">
                            {verse}
                          </p>
                        ))}
                      </blockquote>
                      {textAfter && textAfter.trim() && (
                        <p>{renderTextWithCitations(textAfter, references)}</p>
                      )}
                    </div>
                  );
                }
              }

              return (
                <p key={`p-${sectionIdx}-${pIdx}`}>
                  {renderTextWithCitations(para, references)}
                </p>
              );
            })}
          </div>
        );
      })}

      {/* Render tables that haven't been placed yet */}
      {!table1Rendered && (
        <>
          <SectionDivider />
          <AcademicTable data={table1Data} id="table-overparenting" references={references} />
        </>
      )}
      {!table2Rendered && (
        <>
          <SectionDivider />
          <AcademicTable data={table2Data} id="table-comparison" references={references} />
        </>
      )}

      {/* References Section */}
      {references.length > 0 && (
        <div className="references-section" id="nguồn-trích-dẫn">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[#5C1F2B] mb-6">
            Nguồn trích dẫn
          </h2>
          <div>
            {references.map((ref) => (
              <div
                key={ref.id}
                className="reference-item"
                id={`ref-${ref.id}`}
              >
                <span className="reference-number">{ref.id}.</span>
                <span>{ref.text} </span>
                <a href={ref.url} target="_blank" rel="noopener noreferrer">
                  {ref.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

import fs from "fs";
import path from "path";
import HeroSection from "@/components/HeroSection";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import TableOfContents from "@/components/TableOfContents";
import ReadingProgress from "@/components/ReadingProgress";
import Footer from "@/components/Footer";
import { parseContent } from "@/lib/contentParser";

export default function Home() {
  // Read the markdown file at build time (Server Component)
  const filePath = path.join(process.cwd(), "lonlen.md");
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { sections, references, tocItems } = parseContent(rawContent);

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <HeroSection />

      {/* Main Content Area */}
      <main className="bg-[#F9F6F0] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Table of Contents - Sidebar */}
            <TableOfContents items={tocItems} />

            {/* Article Content */}
            <div className="flex-1 min-w-0 max-w-3xl">
              <MarkdownRenderer sections={sections} references={references} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

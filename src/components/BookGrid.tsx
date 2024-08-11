import { BookInfo } from "../consts";
import Book from "./Book";

interface BookGridProps {
  booksInfo: BookInfo[];
}

export default function BookGrid({ booksInfo }: BookGridProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))` }}
    >
      {booksInfo.length > 0
        ? booksInfo.map((bookInfo) => (
            <Book key={bookInfo.uuid} bookInfo={bookInfo} />
          ))
        : "Loading books info..."}
    </div>
  );
}

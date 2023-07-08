import ReactMarkdown from "react-markdown";
import instructions from "../assets/instructions.md?raw";

export default function Instructions() {
  return (
    <main>
      <ReactMarkdown className="markdown">{instructions}</ReactMarkdown>
    </main>
  );
}

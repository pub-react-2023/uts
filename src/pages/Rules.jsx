import ReactMarkdown from "react-markdown";
import rules from "../assets/rules.md?raw";

export default function Rules() {
  return (
    <main>
      <ReactMarkdown className="markdown">{rules}</ReactMarkdown>
    </main>
  );
}

import { Sparkles } from "lucide-react";
import { use, useState } from "react";

const WriteArticle = () => {
  const articleLength = [
    {
      length: 800,
      text: "Short (500-800 words)",
    },
    {
      length: 1200,
      text: "Medium (1000-1200 words)",
    },
    {
      length: 1600,
      text: "Long (1600+ words)",
    },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left col */}
      <form className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Article Topic</p>
        <input
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The future of AI is..."
          required
        />
        <p className="mt-4 text-sm font-medium">Article Length</p>
        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map(({ length, text }) => (
            <span
              key={length}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
                selectedLength.length === length
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 border-gray-300"
              }`}
              onClick={() => setSelectedLength({ length, text })}
            >
              {text}
            </span>
          ))}
        </div>
      </form>
      {/* right col */}
    </div>
  );
};

export default WriteArticle;

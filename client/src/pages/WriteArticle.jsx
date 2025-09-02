import { Edit, Sparkles } from "lucide-react";
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

  const submithandler = async (e) => {
    e.preventDefault();
    // handle form submission
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left col */}
      <form
        onSubmit={submithandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
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
          onChange={(e) => setInput(e.target.value)}
          value={input}
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
        <br />
        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <Edit className="w-5" /> Generate Article
        </button>
      </form>
      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Edit className="w-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Generated Article</h1>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Edit className="w-9 h-9" />
            <p>Enter a topic and click "Generate article" to get started </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;

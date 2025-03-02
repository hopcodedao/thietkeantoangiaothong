import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Footer } from "../components";

function ChatAI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessages = [...messages, { text: input, user: true }];
      setMessages(newMessages);
      setInput("");

      try {
        setLoading(true);
        const response = await axios.post(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyA1U2na4dM4afkhYiNYRNhd03SmEBfR5fM",
          {
            contents: [
              {
                parts: [
                  {
                    text: input,
                  },
                ],
              },
            ],
          }
        );

        const botResponse = response.data.candidates[0].content.parts[0].text;
        setLoading(false);
        setMessages([...newMessages, { text: botResponse, user: false }]);
      } catch (error) {
        console.error("Error sending message:", error);
        setLoading(false);
        setMessages([
          ...newMessages,
          { text: "Lỗi: Không thể nhận phản hồi từ AI", user: false },
        ]);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
        <h1 className="page-heading" style={{ color: "white" }}>
         HỎI ĐÁP AN TOÀN GIAO THÔNG
        </h1>
        <div className="bg-white w-full max-w-lg shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 h-96 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.user ? "justify-end" : "justify-start"} mb-2`}
              >
                <div
                  className={`rounded-lg p-2 shadow-md overflow-x-hidden flex flex-wrap ${msg.user ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="wrapper">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <div className="shadow"></div>
                <span>Đang xử lý</span>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200 flex">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-lg outline-none"
              placeholder="Hỏi về An toàn giao thông..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="ml-2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
              onClick={handleSendMessage}
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              color: "#000",
              fontWeight: 600,
              background: "#44BBA9",
            },
            duration: 3000,
          }}
        />
      </div>
      <Footer />
    </>
  );
}

export default ChatAI;

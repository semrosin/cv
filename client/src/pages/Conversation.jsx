import { useEffect, useRef, useState, useContext } from "react";
import { Context } from "../main";
import { api, API_URL } from "../utils/api";
import { FaArrowAltCircleUp, FaArrowLeft } from "react-icons/fa";
import { MAIN_ROUTE } from "../utils/consts";

const ConversationPage = () => {
    const { userStore } = useContext(Context);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const bottomRef = useRef(null);

    const loadComments = async () => {
        const data = await api.get("/comments");
        setComments(data.sort((a, b) => a.createdAt.localeCompare(b.createdAt)));
    };

    useEffect(() => {
        loadComments();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [comments]);

    const sendComment = async () => {
        if (!text.trim()) return;

        await api.post("/comments", { text });
        setText("");
        loadComments();
    };

  if (!userStore?.isAuth) {
    return (
      <div className="h-screen flex items-center justify-center text-pink-400 bg-black">
        Sorry, only authorized users can view conversations
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center h-screen max-h-screen w-screen bg-black">
        <div className="w-full flex fixed text-pink-400 mt-4 md:mt-7 items-center px-3 sm:px-10">
            <a href={MAIN_ROUTE}><FaArrowLeft size={20}/></a>
            <h1 className="flex text-[1.7rem] mt-0.5 font-sans font-bold md:whitespace-nowrap w-full justify-center">Conversation</h1>
        </div>

        <div className="w-full max-w-2xl flex-1 bg-black rounded-2xl shadow p-4 overflow-y-auto mt-20 no-scrollbar">
            {comments.map((c) => (
                <div key={c.id} className="flex gap-3 mb-4 max-w-full">
                    <img
                        src={`${API_URL}${c.avatar}`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm text-gray-600">{c.author}</div>
                        <div className="text-white break-words overflow-wrap-anywhere">
                            {c.text}
                        </div>
                    </div>
                </div>
            ))}
            <div ref={bottomRef} />
        </div>

        <div className="flex items-center w-full max-w-full md:max-w-2xl p-2 bg-black border-gray-300">
            <input
                name="comment"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a message..."
                onKeyDown={(e) => e.key === "Enter" && sendComment()}
                className="flex-1 min-w-0 px-3 py-2 text-white bg-transparent border border-white rounded-xl focus:border-pink-400 outline-none placeholder-gray-500"
            />
            <button
                onClick={sendComment}
                className="flex-shrink-0 ml-2 text-white hover:text-pink-400 active:text-pink-400 disabled:text-gray-200"
                disabled={!text.trim()}
            >
                <FaArrowAltCircleUp size={27}/>
            </button>
            </div>
    </div>
  );
};

export default ConversationPage;
import { useState, useRef } from "react";
import { MailService } from "../../../utils/MailService.js";
import SocialMedia from "../../../components/SocialMedia.jsx";
import { MediaUrls } from "../../../data/MediaUrls.js";
import { motion } from "motion/react";

export default function Footer({ id = "Contacts" }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [comment, setComment] = useState("");
  let [title, setTitle] = useState("I’d be glad to get your feedback");
  const send = MailService();
  function handleSubmit(e) {
    e.preventDefault();
    if (email !== "") {
      send({ name: email, company: company, message: comment });
      setTitle("Thanks for feedback!");
    }
    setEmail("");
    setCompany("");
    setComment("");
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);
  const gifDuration = 3000;

  const handleClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);

      // Останавливаем предыдущий таймер
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Через указанное время возвращаем статичную картинку
      timerRef.current = setTimeout(() => {
        setIsPlaying(false);
      }, gifDuration);
    }
  };

  return (
    <motion.section
      id={id}
      className="flex flex-col content-center min-h-[100vh] md:min-h-[80vh] bg-black shadow-[0_-12px_100px_28px_black]"
    >
      <div className="flex justify-center h-70 mt-15 mx-10 text-center text-white text-5xl font-sans leading-[1.2]">
        {title}
      </div>
      <div className="flex flex-col mx-[8vw] h-full md:flex-row md:items-start justify-between md:gap-25">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:w-[calc(50%-2.5rem)] text-white mb-10"
        >
          <div className="mb-4 ml-2 text-2xl font-sans font-bold text-pink-400">
            Contact Me
          </div>
          <div className="my-2 block max-w-full grow bg-transparent">
            <label
              htmlFor="email"
              className="absolute whitespace-nowrap -mt-3 bg-black px-1 text-sm/6 mx-2.5 font-medium text-white"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full grow bg-transparent py-1.5 pr-3 pl-2 mb-3 font-sans text-lg border-2 border-gray-200 rounded-lg placeholder:text-gray-500 focus:border-pink-400 focus:outline-none transition-colors duration-150"
            />
          </div>
          <div className="my-2 max-w-full">
            <label
              htmlFor="company"
              className="absolute whitespace-nowrap -mt-3 bg-black px-1 text-sm/6 mx-2.5 font-medium text-white"
            >
              Who are you from?
            </label>
            <input
              id="company"
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="block w-full grow bg-transparent py-1.5 pr-3 pl-2 mb-3 font-sans text-lg border-2 border-gray-200 rounded-lg placeholder:text-gray-500 focus:border-pink-400 focus:outline-none transition-colors duration-150"
            />
          </div>
          <div className="my-2 max-w-full">
            <label
              htmlFor="comment"
              className="absolute whitespace-nowrap -mt-3 bg-black px-1 text-sm/6 mx-2.5 font-medium text-white"
            >
              Comment / suggestion
            </label>
            <textarea
              id="comment"
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="block w-full min-h-55 grow bg-transparent py-1.5 pr-3 pl-2 mb-3 font-sans text-lg border-2 border-gray-200 rounded-lg placeholder:text-gray-500 focus:border-pink-400 focus:outline-none transition-colors duration-150"
            />
          </div>
          <div className="flex flex-row-reverse">
            <button
              type="submit"
              className="px-4.5 h-10 text-lg font-medium rounded-lg border border-pink-400 hover:bg-pink-400 cursor-pointer transition-all duration-300"
            >
              Send
            </button>
          </div>
        </form>
        <div className="flex flex-col mb-3">
          <div className="flex flex-col items-center">
            <h5 className="mb-6 text-2xl font-sans font-bold text-pink-400 md:whitespace-nowrap">
              Social Media
            </h5>
            <SocialMedia
              mediaUrls={MediaUrls}
              showName={true}
              className="flex-col"
            />
          </div>
        </div>
        <div className="flex md:hidden ml:flex lg:hidden justify-center max-w-full">
          <img
            src={isPlaying ? "/img/spinningKitten.gif" : "/img/kittenBack.png"}
            onClick={handleClick}
            alt="pixel kitten's back"
            className="flex aspect-ratio min-w-[200px] max-h-[400px] max-w-[400px]"
          />
        </div>
      </div>
    </motion.section>
  );
}

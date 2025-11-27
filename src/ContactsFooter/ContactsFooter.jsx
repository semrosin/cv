import { useState } from "react";
import { MailService } from "./MailService";
import SocialMedia from "../AboutPage/SocialMedia";

export default function ContactsFooter({ id = "Contacts" }) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [comment, setComment] = useState("");
  const send = MailService();
  function handleSubmit(e) {
    e.preventDefault();
    if (email !== "") send({ name: email, company: company, message: comment });
    setEmail("");
    setCompany("");
    setComment("");
  }

  return (
    <section
      id={id}
      className="flex flex-col content-center h-[100vh] md:h-[80vh] bg-black shadow-[0_-12px_100px_28px_black]"
    >
      <div className="flex justify-center mt-15 mx-10 text-center text-white text-5xl font-sans leading-[1.2]">
        I’d be glad to get your feedback.
      </div>
      <div className="flex flex-col mx-[8vw] h-full lg:flex-row lg:items-end justify-end lg:justify-start gap-25">
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
              Where are you from? (e.g., company)
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
              className="px-4.5 h-10 text-lg rounded-lg border border-pink-400 hover:bg-pink-400 cursor-pointer transition-all duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

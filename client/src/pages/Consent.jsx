import { FaArrowLeft } from "react-icons/fa";
import { MAIN_ROUTE } from "../utils/consts";

const ConsentPage = () => {
  return (
  <section className="flex flex-col bg-black w-screen min-h-screen">
    <div className="flex text-pink-400 pt-7 items-center px-7">
      <a href={MAIN_ROUTE}><FaArrowLeft size={20}/></a>
    </div>
    <div className="flex flex-col w-full h-full justify-center mt-9 px-3 md:px-20 lg:px-50 xl:px-145">
      <h1 className="text-4xl mt-0.5 font-sans font-bold text-center text-pink-400">Privacy Policy</h1>
      <div className="flex flex-col border w-full h-full rounded-xl my-12 p-8 max-sm:px-5 text-lg gap-4">
        <p>I hereby confirm that I, in accordance with the Federal Law of July 27, 2006 No. 152-FZ "On Personal Data", voluntarily provide consent to the processing of my personal data to the operator Rosin Semyon Olegovich (hereinafter referred to as the "Operator").
        </p>
        <p>
          This Consent is granted for the processing of the following personal data:
          <ul className="list-disc pl-5">
            <li>Username;</li>
            <li>User identifier;</li>
            <li>User avatar.</li>
          </ul>
        </p>
        <p>Purpose of the processing of personal data: providing access to the website's functions, user identification, enabling the ability to leave comments.</p>
        <p>The processing of personal data will be carried out by means of collection, recording, systematization, accumulation, storage, clarification (updating, modification), retrieval, use, transfer (distribution, provision, access), depersonalization, blocking, deletion, and destruction of personal data.</p>
        <p>I confirm that I have been informed that this Consent may be revoked by sending a written application to the following email address: semen.rosin1@gmail.com</p>
      </div>
    </div>
  </section>
  );
};

export default ConsentPage;

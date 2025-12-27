import emailjs from "@emailjs/browser";
import { useEffect } from "react";
export const MailService = () => {
  const publicKey = "bRfej8m-eiB2Q_peU";
  const serviceId = "service_9fuhtfh";
  const templateId = "template_yim4t8n";
  useEffect(() => {
    emailjs.init({
      publicKey: publicKey,
      blockHeadless: true,
      limitRate: {
        id: "app",
        throttle: 10000,
      },
    });
  });
  const send = (templateParams, options = "") => {
    emailjs
      .send(serviceId, templateId, templateParams, options)
      .then((e) => console.log(e));
  };
  return send;
};

import { EMAIL_SENDER, SENDGRID_API_KEY } from "@/config";
import sgMail, { ResponseError, type MailDataRequired } from "@sendgrid/mail";

export async function sendEmail(to: string, subject: string, html: string) {
  sgMail.setApiKey(SENDGRID_API_KEY || "");

  const msg: MailDataRequired = {
    to,
    from: EMAIL_SENDER || "rsystfip@gmail.com",
    subject,
    html,
  };

  try {
    const [response] = await sgMail.send(msg);
    return { response: response.statusCode === 202 };
  } catch (error) {
    if (error instanceof ResponseError) {
      console.error(error.message);
    }
  }
}

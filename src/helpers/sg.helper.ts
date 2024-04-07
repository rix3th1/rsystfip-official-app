import sgMail, { ResponseError, type MailDataRequired } from "@sendgrid/mail";

const { EMAIL_SENDER, SENDGRID_API_KEY } = process.env;

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
    console.error({ error });

    if (error instanceof Error) {
      console.log((error as ResponseError).response.body);
      return { response: false, error: (error as ResponseError).message };
    }
  }
}

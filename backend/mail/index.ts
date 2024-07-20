import ejs from 'ejs';
import sgMail from '@sendgrid/mail';

class MailService {
    private from: string;

    constructor() {
        this.from = process.env.EMAIL_HOST!;
    }

    async sendMail(to: string, subject: string, template: string, data: Record<string, string | number>) {
        const html: string = await ejs.renderFile(__dirname + `/templates/${template}.ejs`, data);

        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

        const msg = {
            to,
            from: this.from,
            subject,
            html
        };

        await sgMail.send(msg);
    }
}

export default MailService;
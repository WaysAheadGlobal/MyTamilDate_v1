import ejs from 'ejs';
import sgMail from '@sendgrid/mail';

class MailService {
    private from: string;

    constructor() {
        this.from = process.env.EMAIL_HOST!;
    }

    private async sendMail(to: string, subject: string, template: string, data: Record<string, string | number>) {
        const html: string = await ejs.renderFile(__dirname + `/templates/${template}.ejs`, {
            ...data,
            logo: `${process.env.IMAGES_URL}/logo.png`,
            couple: `${process.env.IMAGES_URL}/couple.png`,
            mobile: `${process.env.IMAGES_URL}/mobile.png`,
        });

        sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

        const msg = {
            to,
            from: this.from,
            subject,
            html
        };

        await sgMail.send(msg);
    }

    async sendVerificationMail(to: string, token: string) {
        await this.sendMail(to, 'Verify your email to access your myTamilDate account', 'verify', {
            link: token            
        });
    }

    async sendSignUpMail(to: string) {
        await this.sendMail(to, 'You have successfully signed up for myTamilDate', 'signup', {});
    }

    async sendReviewMail(to: string, name: string) {
        await this.sendMail(to, 'You can access your myTamilDate account soon', 'review', {
            name
        });
    }
}

export default MailService;
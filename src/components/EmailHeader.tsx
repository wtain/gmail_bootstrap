export type EmailHeader = {
    sender: string;
    subject: string;
    date: Date;
    labels: string[];
    snippet: string;
};

export default EmailHeader;
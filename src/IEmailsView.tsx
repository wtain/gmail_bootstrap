import { EmailHeader } from "./components/EmailHeader";

export interface IEmailsView {

    setSenderFilter: (sender: string) => void;

    getPageCount: () => Promise<number>;
    getEmails: (page_number: number) => Promise<EmailHeader[]>;
}
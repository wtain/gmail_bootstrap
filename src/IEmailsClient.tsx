import { EmailHeader } from './components/EmailHeader';

export interface IEmailsClient {
    getPageCount: (page_size: number) => Promise<number>;
    getEmailsForPage: (current_page: number, page_size: number) => Promise<EmailHeader[]>;
    getEmailsBySender: (sender: string) => Promise<EmailHeader[]>;
    getPageCountBySender: (page_size: number, sender: string) => Promise<number>;
    getEmailsPageBySender: (sender: string, current_page: number, page_size: number) => Promise<EmailHeader[]>;
}
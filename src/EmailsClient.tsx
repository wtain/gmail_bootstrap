import axios from 'axios';
import { EmailHeader } from './components/EmailHeader';
import { IEmailsClient } from './IEmailsClient';

export class EmailsClient implements IEmailsClient {

    emailServiceEndpoint: string;

    constructor(emailServiceEndpoint: string) {
        this.emailServiceEndpoint = emailServiceEndpoint;
    }

    getPageCount = async (page_size: number): Promise<number> => {
        const response = await axios
            .get<number>(this.emailServiceEndpoint + "/page_count?page_size=" + page_size);
        return response.data;
    };

    getEmailsForPage = async (current_page: number, page_size: number): Promise<EmailHeader[]> => {
        const response = await axios
            .get<EmailHeader[]>(this.emailServiceEndpoint + "/page?page=" + current_page + "&page_size=" + page_size);
        return response.data;
    };

    getEmailsBySender = async (sender: string): Promise<EmailHeader[]> => {
        const response = await axios
            .get<EmailHeader[]>(this.emailServiceEndpoint + "/list_by_sender?sender=" + sender);
        return response.data;
    };

    getPageCountBySender = async (page_size: number, sender: string): Promise<number> => {
        const response = await axios
            .get<number>(this.emailServiceEndpoint + "/page_count_by_sender?page_size=" + page_size + "&sender=" + sender);
        return response.data;
    };

    getEmailsPageBySender = async (sender: string, current_page: number, page_size: number): Promise<EmailHeader[]> => {
        console.log("Loading for page " + current_page)
        const response = await axios
            .get<EmailHeader[]>(this.emailServiceEndpoint + "/list_page_by_sender?sender=" + sender + "&page=" + current_page + "&page_size=" + page_size);
        return response.data;
    };
}

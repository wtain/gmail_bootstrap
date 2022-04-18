import EmailHeader from "./EmailHeader";
import { EmailsClient } from "../EmailsClient";
import { IEmailsClient } from "../IEmailsClient";
import { IEmailsView } from "../IEmailsView";

export class EmailsView implements IEmailsView {

    client: IEmailsClient;
    filter: string;
    page_size: number;

    constructor () {
        this.client = new EmailsClient("http://127.0.0.1:5000")
        this.filter = ""
        this.page_size = 10
    }

    setSenderFilter = (sender: string) => {
        this.filter = sender
    }

    getPageCount = () => {
        if (this.filter.length > 0) {
            return this.client.getPageCountBySender(this.page_size, this.filter)
        }
        else {
            return this.client.getPageCount(this.page_size)
        }
    }
    
    getEmails = (page_number: number) => {
        if (this.filter.length > 0) {
            return this.client.getEmailsPageBySender(this.filter, page_number, this.page_size)
        }
        else {
            return this.client.getEmailsForPage(page_number, this.page_size)
        }
    }

}

export default EmailsView
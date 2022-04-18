
import React from 'react';
import { ListGroup, Pagination } from 'react-bootstrap';
import * as _ from "lodash";
import PaginationControl from './PaginationControl';
import { EmailHeader } from './EmailHeader';
import { EmailsClient } from '../EmailsClient';
import { EMailListContent } from './EmailListContent';
import EmailsView from './EmailsView';

interface EMailListProps {
    PageSize: number;
    Filter: string;
    MaxButtons: number;
    OnSelectedPageChanged: (i: number) => void;
    OnPageCountChanged: (new_count: number) => void;
    SelectedPage: number;
    PageCount: number;
}

export const EMailList = (props: EMailListProps) => {

    const defaultEmails:EmailHeader[] = [];

    const page_size = props.PageSize;
    const sender = props.Filter;

    const [emails, setEmails]: [EmailHeader[], (emails: EmailHeader[]) => void] = React.useState(defaultEmails);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = React.useState("");
    const [filter, setFilter]: [string, (error: string) => void] = React.useState("");

    // const client = new EmailsClient("http://127.0.0.1:5000")
    const view = new EmailsView();

    React.useEffect(() => {
        view.setSenderFilter(filter);
    }, [filter])

    // view.setSenderFilter(filter);

    const current_page = props.SelectedPage;
    const page_count = props.PageCount;

    const update_page_count = (new_count: number) => {
        props.OnPageCountChanged(new_count)
    }

    const load = () => {
        console.log("Loading")
        setLoading(true);
        view.getPageCount()
            .then(result => update_page_count(result));
        
        view.getEmails(current_page)
            .then(response => {
                setEmails(response);
                setLoading(false)
            })
            .catch(ex => {
                            const error =
                            ex.response.status === 404
                                ? "Resource Not found"
                                : "An unexpected error has occurred";
                            setError(error);
                            setLoading(false);
                        });
        // if (sender.length > 0) {
        //     client.getPageCountBySender(page_size, sender)
        //         .then(result => update_page_count(result))
        //     console.log("Filtering")
        //     client.getEmailsPageBySender(sender, current_page, page_size)
        //     .then(response => {
        //             setEmails(response);
        //             setLoading(false)
        //         })
        //     .catch(ex => {
        //                     const error =
        //                     ex.response.status === 404
        //                         ? "Resource Not found"
        //                         : "An unexpected error has occurred";
        //                     setError(error);
        //                     setLoading(false);
        //                 });
        // }
        // else {
        //     client.getPageCount(page_size)
        //         .then(result => update_page_count(result))

        //     client.getEmailsForPage(current_page, page_size)
        //         .then(response => {
        //                 setEmails(response);
        //                 setLoading(false)
        //             })
        //         .catch(ex => {
        //                         const error =
        //                         ex.response.status === 404
        //                             ? "Resource Not found"
        //                             : "An unexpected error has occurred";
        //                         setError(error);
        //                         setLoading(false);
        //                     });
        // }
        setFilter(sender)
    };

    if (sender !== filter) {
        load();
    }

    React.useEffect(() => {
                            load();
                        }, [filter, current_page]);

    return (
        <EMailListContent IsLoading={loading}
            EMails={emails}
            Error={error}
            PageCount={page_count}
            SelectedPage={current_page}
            OnClick={(i: number) => {
                console.log("Setting current page to " + i)
                props.OnSelectedPageChanged(i)
                load();                 
            }}
            MaxButtons={props.MaxButtons} />
    )
}

export default EMailList;
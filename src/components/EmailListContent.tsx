import { ListGroup } from "react-bootstrap";
import { EmailHeader } from "./EmailHeader";
import PaginationControl from "./PaginationControl";

interface EMailListContentProps {
    IsLoading: boolean
    EMails: EmailHeader[]
    Error: string
    PageCount: number
    SelectedPage: number
    OnClick: (i: number) => void
    MaxButtons: number
}

export const EMailListContent = (props: EMailListContentProps) => {

    return (
        <div>
            <PaginationControl PageNumber={props.SelectedPage} 
                                PageCount={props.PageCount} 
                                OnClick={props.OnClick} 
                                MaxButtons={props.MaxButtons} />
            {
                props.IsLoading && <div style={{display: 'flex', justifyContent: 'center'}}>
                                <img src="https://c.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif" />
                           </div>
            }
            <ListGroup>
                {
                    props.EMails.map((item, i) => (
                        <ListGroup.Item key={i}>
                            <table width="100%">
                                <tbody>
                                    <tr>
                                        <td style={{width: '60%'}}>{item.subject}</td>
                                        <td>{item.sender}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </ListGroup.Item>
                        ))
                }
            </ListGroup>
            {props.Error && <p className="error">{props.Error}</p>}
        </div>
    )
}
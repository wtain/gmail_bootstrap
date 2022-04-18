import React from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import './App.css';
import EMailList from './components/EmailList';
import Filter from './components/Filter';

function App() {

    const [filter, setFilter]: [string, (filter: string) => void] = React.useState("");
    const [page_count, setPageCount]: [number, (cnt: number) => void] = React.useState(1);
    const [current_page, setCurrentPage]: [number, (cnt: number) => void] = React.useState(1);

    return (
        <div className="App">
            <Container>
                <Filter OnFilterChanged={(new_filter) => setFilter(new_filter)} />
                <EMailList PageSize={10} Filter={filter} MaxButtons={10} 
                    SelectedPage={current_page}
                    PageCount={page_count}
                    OnSelectedPageChanged={(i: number) => setCurrentPage(i)}
                    OnPageCountChanged={
                    (new_count: number) => {
                        setPageCount(new_count)
                        if (current_page > new_count) {
                            setCurrentPage(1)
                        }
                    }
                } />
            </Container>
        </div>
    )
}

export default App;
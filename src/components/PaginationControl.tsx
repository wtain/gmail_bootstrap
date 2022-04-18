
import React from 'react';
import { Pagination } from 'react-bootstrap';
import * as _ from "lodash";
import { toInteger } from 'lodash';
import GetPaginationButtons from '../PaginationHelper';

interface OptionalProps {
    MaxButtons: number
}

const defaultProps: OptionalProps = {
    MaxButtons: 5
}

interface RequiredProps {
    PageNumber: number;
    PageCount: number;
    OnClick: (i: number) => void;
}

interface Props extends RequiredProps, OptionalProps {
    
}

function PaginationControl(props: Props) {
    if (props.PageCount > props.MaxButtons) {
        
        const [low, high] = GetPaginationButtons(props.MaxButtons, props.PageNumber, props.PageCount)

        return (
            <Pagination>
                <Pagination.First onClick={() => props.OnClick(1)} />
                <Pagination.Prev onClick={() => props.OnClick(props.PageNumber-1)} disabled={props.PageNumber === 1} />
                {
                    (low > 1) && <Pagination.Ellipsis />
                }
                {
                    _.range(low, high+1).map((i) => (
                        <Pagination.Item key={i} active={i === props.PageNumber} onClick={
                            () => props.OnClick(i)
                            }>
                            {i}
                        </Pagination.Item>
                    ))
                }
                {
                    (high < props.PageCount) && <Pagination.Ellipsis />
                }
                <Pagination.Next onClick={() => props.OnClick(props.PageNumber+1)} disabled={props.PageNumber === props.PageCount} />
                <Pagination.Last onClick={() => props.OnClick(props.PageCount)} />
            </Pagination>
        );

    }

    return (
        <Pagination>
                {
                    _.range(1, props.PageCount+1).map((i) => (
                        <Pagination.Item key={i}  active={i === props.PageNumber} onClick={
                            () => props.OnClick(i)
                            }>
                            {i}
                        </Pagination.Item>
                    ))
                }
        </Pagination>
    );
}

export default PaginationControl;
import React from "react";

interface IFilterProps {
    OnFilterChanged: (filter: string) => void;
}

export const Filter = (props: IFilterProps) => {

    const [text, setText]: [string, (text: string) => void] = React.useState("");
    const [lastEventPushed, setLastEventPushed]: [Date, (date: Date) => void] = React.useState(new Date());
    
    const updateDelay = 300;

    return (
        <input type='text' value={text} onChange={
            (e) => {
                setText(e.target.value);
                const lastPush = new Date()
                setLastEventPushed(lastPush)
                console.log("Pushing update event")
                setTimeout(() => {
                    const now = new Date()
                    const difference = now.valueOf() - Math.max(lastEventPushed.valueOf(), lastPush.valueOf());
                    console.log(difference)
                    if (difference >= updateDelay) {
                        console.log("Updating filter")
                        //setFilter(e.target.value)
                        props.OnFilterChanged(e.target.value)
                    }
                }, updateDelay)
            }
        } />
    )
}

export default Filter;
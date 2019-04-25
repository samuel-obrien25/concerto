import React from 'react';

function ListCheckbox(props) {
    const lists = props.allLists;

    if (props.isLoaded) {
        const mappedLists = lists.map((list, index) => {
            return <input type="checkbox" value={list.listName} name={index}>{list.listName}</input>;
        });

        return (
            <div>
                {mappedLists}
            </div>
        )
    }
    else return null
}


export default ListCheckbox;

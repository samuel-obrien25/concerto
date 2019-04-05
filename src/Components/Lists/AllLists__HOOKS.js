import React, { useEffect, useState, useRef } from 'react';

function AllLists(props) {

    //Store props.userLists in a const
    const [userLists, getUserLists] = useState(null);
    const [mappedLists, setMappedLists] = useState();

    //ComponentDidUpdate, but with a one second timeout to let component data catch up
    useEffect(() => {
        if (props.activeDatabase) {
            setTimeout(() =>{ 
                handleDataTransfer();
                console.log('check', userLists);
                console.log('mappedLists', mappedLists);
            }, 2000);
        }
    },[props.activeDatabase]);

    //Function for getting all lists from database
    function handleDataTransfer() {

        const returnArr = [];
        const userData = props.activeUserData;
        const userListsRef = props.activeDatabase.ref('users/' + userData.uid + '/lists');


        userListsRef.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;
                returnArr.push(item);
            });
        });

        getUserLists(returnArr);
        return setMappedLists(() => {
            returnArr.map((list, index) => {
                return <li key={index}>{list.listName}</li>;
            })
        })
    }

       if(userLists) {
           return (
            <ul>{mappedLists}</ul>
           )
       } else {
           return null
       }
}
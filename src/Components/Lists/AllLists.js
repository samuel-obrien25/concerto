import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase';

function AllLists(props) {

    //Store props.userLists in a const
    const [userLists, getUserLists] = useState();
    const [mappedLists, setMappedLists] = useState();

    //The issue is here. Why so many re-renders?
    console.log('listOverview.js --> AllLists.js activeUserData', props.activeUserData);
    console.log('listOverview.js --> AllLists.js activeDatabase', props.activeDatabase);


    useEffect(() => {
        getUserLists(props.activeUserData)

        console.log('check', userLists);
        console.log('mappedLists', mappedLists);
        
    },[props.activeUserData]);

    //Function for getting all lists from database
    function handleDataTransfer() {
        const returnArr = [];
        const userData = firebase.auth().currentUser;
        const userListsRef = firebase.database().ref('users/' + userData.uid + '/lists');


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
           return (
            <ul>{mappedLists}</ul>
           )
}
export default AllLists
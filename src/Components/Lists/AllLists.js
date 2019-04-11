import React, { useEffect, useState, useRef } from 'react';
import firebase from 'firebase';
import List from '../Lists/List';


function AllLists(props) {

    //Store props.userLists in a const
    const [rawLists, setRawLists] = useState();

    //The issue is here. Why so many re-renders?
    let activeUserData = props.activeUserData,
        activeDatabase = firebase.database();

    useEffect(() => {
        setRawLists(() => {
            let returnArr = [],
                userListsRef = activeDatabase.ref('users/' + activeUserData.uid + '/lists');

            userListsRef.on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    const item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
            });
            return returnArr;
        });
    }, []);

    //Function returning mapped rawLists from the firebase database
    function mapLists(arr) {
        let processedLists = arr.map((list, index) => {
            return <div id={index}>{list.listName}</div>;
        });
        return processedLists;
    }

    console.log(rawLists);
    if(rawLists){
        return (
            <List listData = {rawLists} />
        )
    } else {
        return null
    }

}
export default AllLists
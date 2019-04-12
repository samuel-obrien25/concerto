import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import List from './List';
import Loading from '../../Utilities/Loading';


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

    if(props.isLoaded){
        return (
                <List listData={rawLists} />
        )
    } else {
        return <Loading />
    }

}
export default AllLists
import React, { useEffect, useState } from 'react';

function AllLists(props) {

    //Store props.userLists in a const
    const [userLists, getUserLists] = useState(getUserListsFromDB());

    console.log("user lists: ", userLists);

    //Function for getting all lists from database
    function getUserListsFromDB() {
        const returnArr = [];
        const userData = props.activeUserData;
        const database = props.activeDatabase;

        const userListsRef = database.ref('users/' + userData.uid + '/lists');

        userListsRef.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;
                returnArr.push(item);
            });
        });
        return (returnArr);
    }

    console.log(userLists);

   let mappedLists = userLists.map((list, index) => {
               return <li key={index}>{list.listName}</li>;
           });
   console.log(mappedLists);

    return (
        <ul>{mappedLists}</ul>
    )
}


export default AllLists;

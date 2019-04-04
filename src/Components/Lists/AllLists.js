import React, { useEffect, useState } from 'react';

function AllLists(props) {

    //Store props.userLists in a const
    const [userLists, getUserLists] = useState(null);

    //ComponentDidUpdate, but with a one second timeout to let component data catch up
    useEffect(() => {
        setTimeout(() => {
            getUserLists(getUserListsFromDB());
            console.log('check');
        }, 2000);
    },[]);


    //Function for getting all lists from database
    function getUserListsFromDB() {
        if(props.activeDatabase){
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
            return (returnArr);    
        } else {
            return;
        }
    }

    //This might be the stupidest code I've ever written.
    //Here's the issue: I CANNOT figure out why I am getting delayed results
    //from props. It's like they are not getting passed quickly enough.

    //Here's what this does: mappedLists = '' unless the user lists exist.
    let mappedLists;
   userLists ? mappedLists = userLists.map((list, index) => {
               return <li key={index}>{list.listName}</li>;
           })
           : mappedLists = '';

           console.log("user lists: ", userLists);
           console.log("Mapped lists: ", mappedLists);
       if(userLists) {
           return (
            <ul>{mappedLists}</ul>
           )
       } else {
           return null
       }
}


export default AllLists;

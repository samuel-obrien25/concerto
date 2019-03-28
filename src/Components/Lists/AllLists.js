import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'firebase';

const StyledForm = styled.form`
`;

function AllLists(props) {
    const database = firebase.database();
    const userId = firebase.auth().currentUser.uid;
    let retrievedLists = firebase.database().ref('users/' + userId + '/lists');


    const [lists, getAllLists] = useState(retrievedLists);

    useEffect(() => {
        retrievedLists.on('value', function (snapshot) {
            const mappedLists = snapshot.val().listName;
            console.log(mappedLists);
        })
    })

    return (
        <ul>
        </ul>
    )
}


export default AllLists;
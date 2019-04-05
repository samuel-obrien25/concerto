import React from 'react';
import firebase from 'firebase';

class AllLists extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            activeUserData: '',
            activeUserLists: ''
        }
    }

    
    handleDataTransfer() {
        const returnArr = [];
        const userData = this.state.activeUserData;
        const userListsRef = firebase.database().ref('users/' + userData.uid + '/lists');


        userListsRef.on('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;
                returnArr.push(item);
            });
        });

        console.log("returnArr", returnArr);

        this.setState({
            activeUserLists: returnArr
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                activeUserData: this.props.activeUserData,
            }, () => {
                this.handleDataTransfer();
                console.log("returnArr2", this.state.activeUserLists);
            });
        }, 2000);
    }

        render(){

            return (
                <ul>
                    {this.state.activeUserLists}
                </ul>
            )
        };
    }
        export default AllLists

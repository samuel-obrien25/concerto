import React from 'react';
import firebase from 'firebase';
import { FirebaseAuth } from 'react-firebaseui';
import Slide from '../Utilities/Slide';
import styled from 'styled-components';

// #region STYLES
const StyledSignInScreen = styled.div`
    width: 50vw;
    height: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin: auto;
    position: relative;
    z-index: 9000;
    `;
// #endregion

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
firebase.initializeApp(config);

class SignInScreen extends React.Component {

    // The component's Local state.
    state = {
        isSignedIn: this.props.isSignedIn // Local signed-in state.
    };

    // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false
        }
    };

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({ isSignedIn: !!user })
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        if (this.props.isSignedIn) {
           return null
        }
        return (
            <Slide animDelay='0s' animDuration='1s' animFillMode='forwards' inOut='in' isForText={true}>
                <StyledSignInScreen isSignedIn = {this.props.isSignedIn}>
                    <p>Please sign up, or login below:</p>
                    <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                </StyledSignInScreen>
            </Slide>
        );
    }
}
export default SignInScreen
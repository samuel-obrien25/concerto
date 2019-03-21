import React from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import SlideIn from '../Utilities/SlideIn';
import styled from 'styled-components';

// #region STYLES

const StyledSignInScreen = styled.div`
    width: auto;
    height: auto;
    padding: 100px;
    display: flex;
    flex-direction: column;
    margin: auto;
    position: relative;
    z-index: 9000;
    background-color: rgba(255,255,255,.9);
    box-shadow: 0px 2px 4px 2px rgba(0,0,0,.32);
    border-radius: 20px;
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
        isSignedIn: false // Local signed-in state.
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
        if (!this.state.isSignedIn) {
            return (
                <SlideIn animDelay="0s" animDuration="1s" animFillMode="forwards" animStyle="fullScreen" isForText="false">
                    <StyledSignInScreen>
                    <h1>My App</h1>
                    <p>Please sign-in:</p>
                    <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                    </StyledSignInScreen>
                </SlideIn>
            );
        }
        return (
            
            <div loggedIn={this.state.isSignedIn}></div>
        );
    }
}
export default SignInScreen
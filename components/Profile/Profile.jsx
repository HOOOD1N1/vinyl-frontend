import { Box, Flex } from '@chakra-ui/react';
import '../Login/LoginForm.css'
import React, { useState, useEffect, Fragment } from 'react';
import { redirect, useSearchParams, useNavigate } from "react-router-dom";
import { Button, Heading, Text, Link, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import {Navigate } from 'react-router-dom';
import './Profile.css'

function Profile() {

    const [searchParams, setSearchParams] = useSearchParams();
    const [isDisabledDiscogs, setIsDisablesDicsogs] = useState(false)
    const [isLastFmDisabled, setIsDisabledLastFm] = useState(false);
    const [hasError, setErrors] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [userIsAuth, setIsUserAuth] = useState(getToken());

    const navigate = useNavigate()

    const lastFmAuthUrl = "http://www.last.fm/api/auth/?api_key=xxx&cb=http://example.com"; // use HTTP GET and also add the callback path to profile page
    //we will receive either <callback_url>/?token=xxxxxxx or <callback_url>&token=xxxxxxx
    //then we use the auth token (60min valid) to create a Last.fm web service session

    //For that we want to Send your api key along with an api signature and your authentication token as arguments to the auth.getSession API method call
    // The parameters for this call are defined as such:

    // api_key: Your 32-character API Key.
    // token: The authentication token received at your callback url as a GET variable.
    // api_sig: Your 32-character API method signature, as explained in Section 6

    // Note: You can only use an authentication token once. It will be consumed when creating your web service session.

    // The response format of this call is :
        //     <lfm status="ok">
        //   <session>
        //     <name>MyLastFMUsername</name>
        //     <key>d580d57f32848f5dcf574d1ce18d78b2</key>
        //      <subscriber>0</subscriber>
        //   </session>
        // </lfm>



    // function getToken() {
    //     const tokenString = sessionStorage.getItem('token')
    //     return tokenString
    // }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const requestOptions = {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `${getToken()}`
    //             }
    //         }

    //         const access_token_url = ``
    //         const res = await fetch(access_token_url, requestOptions)
    //         return res
    //     }

    //     const oauth_verifier = searchParams.get("oauth_verifier")

    //     const getStatus = async () => {
    //         if (oauth_verifier) {
    //             const res = await fetchData()

    //             res.json().then(res => {
    //                 if (res) {
    //                     setShowAlert(true)

    //                     setTimeout(() => {
    //                         setShowAlert(false);
    //                       }, 3000);
    //                 }
    //             })
    //                 .catch(console.error);
    //         }
    //     }

    //     getStatus()
    //     navigate('/profile')
    // }, []);

    // async function getProfileData(user) {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${getToken()}`
    //         },
    //         body: JSON.stringify({
    //         })
    //     }

        // const profileURL = ``
        // const res = await fetch(profileURL, requestOptions)
        // res.json()
        //     .then(res => {
        //         if (res.userData.discogs_secret) {

        //             setIsDisablesDicsogs(true)
        //         }
        //     })
        // return res
    // }

    // useEffect(() => {

    //     const user = getToken()
    //     getProfileData(user.sub)
    // }, []);

    // const onSubmitDiscogs = async (e) => {

        // const res = await fetch('')
        // const token = await res.json()
        // window.location.replace(token.authorizationUrl);
    // }

    const backToProfile = () => {
        setErrors(false)
    }

    if (hasError) {

        return (<Text color='tomato' fontSize='2xl' >We have encountered an error, please <Link fontWeight={'extrabold'} onClick={backToProfile} color='red' >try again</Link></Text>)
    }

    const handleLogout = () => {
    
        sessionStorage.removeItem('token')
        window.location.reload();
    }

    useEffect(() => {
        setIsUserAuth(getToken());
    }, []);

    function getToken() {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'));
        console.log("userStorage is ", userLocalStorage)
        if(userLocalStorage){
            return (userLocalStorage.message === 'USER_IS_AUTHENTICATED' || userLocalStorage.message === 'USER_REGISTERED_SUCCESSFULLY' || userLocalStorage.message === 'USER_ALREDY_REGISTERED') ? true : false;
        }
        return false;
    }


    return (
        <Fragment>
            { userIsAuth? 
        <Flex className='authForm' gap='4' justify='space-between' margin={'20vh'} width={'fit-content'}>
            {showAlert && (
                <Alert status='success'>
                    <AlertIcon />
                    <AlertTitle>Connected</AlertTitle>
                    <AlertDescription>Connected to Discogs</AlertDescription>
                </Alert>
            )}
            <Flex className='titleForm'>
                <Heading size='lg' as='h3' className='profile_title'>
                    Profile
                </Heading>
            </Flex>

            <Box width={'500px'}>
                <Button
                    type='submit'
                    className='full submitButton'
                    colorScheme='orange'
                    // onClick={onSubmitLastFm}
                    >
                    Associate account with Last.fm
                </Button>
            </Box>
            <Box width={'500px'}>
                <Button
                    disabled={isDisabledDiscogs}
                    className='submitButton full'
                    type='submit'
                    width='fit-content'
                    // onClick={onSubmitDiscogs}
                    colorScheme='orange'>
                    Associate account with Discogs
                </Button>
            </Box>

            <Box width={'250px'}>
                <Button
                    disabled={isDisabledDiscogs}
                    className='full submitButton'
                    width='fit-content'
                    onClick={handleLogout}
                    type='submit'
                    colorScheme='red'>
                    Logout out of all accounts
                </Button>
            </Box>

        </Flex>
        : <Navigate to="/" replace={true}/> }
        </Fragment>
    )
}

export default Profile;
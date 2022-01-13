
import React, { useState, useEffect } from 'react';
import { Splash } from '../screens/index';
import { MainStack } from './mainStack';
import { AuthStack } from './authStack';
import { useDispatch, useSelector, connect } from 'react-redux';

const RootNavigation = () => {
    const [load, setLoad] = useState(true)
    const IsLogin = useSelector(state => state.auth.isLoged)
    // console.log('loginDataloginData........',IsLogin)

    async function performload() {
        return new Promise(response => {
            setTimeout(() => { response("") }, 2000)
        })
    }
    useEffect(() => {
        async function apicall() {
            const d = await performload()
            if (d !== null) {
                setLoad(false)
            }
        }
        apicall()
    });
    if (load) {
        return (<Splash />)
    }
    else {
        return (
            IsLogin ?
                <MainStack />
                :
                <AuthStack />
        );
    }
};

export default RootNavigation;

import { useState } from 'react';
import { motion, animate, AnimatePresence } from 'framer-motion';

import Bg1 from '../../../assets/img/prj/authenPageBg1.jpg';
import Bg2 from '../../../assets/img/prj/authenPageBg2.jpg';

import MainBtn from '../../base/MainBtn/MainBtn';

import './UserAuthenticationPage.scss';

const FRONT = { x: 0, y: 0, opacity: 1, zIndex: 20 };
const BACK = { x: 12, y: 12, opacity: 0.36, zIndex: 10 };

const pageTypes = [
    { id: 0, type: 'logIn', label: 'Log In', url: Bg1, formHeading: 'LOG IN TO YOUR ACCOUNT' },
    { id: 1, type: 'signUp', label: 'Sign Up', url: Bg2, formHeading: 'CREATE AN ACCOUNT' },
];

const AuthenForm = ({ pageTypeId }) => {
    const formType = pageTypes[pageTypeId].type + 'Form';

    return (
        <>
            <h1 className="authenFormHeading">{pageTypes[pageTypeId].formHeading}</h1>
            <form action="" className={`authenForm ${formType}`}>
                <label htmlFor={`${formType}UserName`} className="authenInpLabel">
                    User name:
                    <input type="text" id={`${formType}UserName`} className="authenInp" />
                </label>

                {pageTypes[pageTypeId].type === 'logIn' && (
                    <>
                        <label htmlFor={`${formType}Pwd`} className="authenInpLabel">
                            Password:
                            <input type="text" id={`${formType}Pwd`} className="authenInp" />
                        </label>
                    </>
                )}

                {pageTypes[pageTypeId].type === 'signUp' && (
                    <div className="signUpPwdWrapper">
                        <label htmlFor={`${formType}Pwd`} className="authenInpLabel">
                            Password:
                            <input type="text" id={`${formType}Pwd`} className="authenInp" />
                        </label>
                        <label htmlFor={`${formType}RetypePwd`} className="authenInpLabel">
                            Retype password:
                            <input type="text" id={`${formType}RetypePwd`} className="authenInp" />
                        </label>
                    </div>
                )}

                <MainBtn btnOnClickHandler={() => {}} btnClassName="authenFormBtn">
                    Log in
                </MainBtn>
            </form>
        </>
    );
};

const UserAuthenticationPage = () => {
    const [pageTypeId, setPageTypeId] = useState(0);

    const loginProps = pageTypeId === 0 ? FRONT : BACK;
    const signupProps = pageTypeId === 1 ? FRONT : BACK;

    const formTransition = { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] };

    const changeAuthenTypeBtnOnClickHandler = (typeId) => {
        setPageTypeId(typeId);
    };

    return (
        <div className="authenPageWrapper">
            <div className="authenBgImgWrapper">
                <AnimatePresence>
                    <motion.img
                        key={pageTypes[pageTypeId].url}
                        src={pageTypes[pageTypeId].url}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.66, ease: 'easeInOut' }}
                        className="authenBgImg"
                    />
                </AnimatePresence>
            </div>

            <div className="authenContentWrapper">
                {/* <div className="authenContent"></div> */}
                <div className="authenSwapBtnsWrapper">
                    {pageTypes.map((type) => {
                        return (
                            <MainBtn
                                key={type.id}
                                btnOnClickHandler={() => {
                                    changeAuthenTypeBtnOnClickHandler(type.id);
                                }}
                                btnClassName={`authenSwapBtn ${pageTypeId === type.id ? 'active' : ''}`}
                            >
                                {type.label}
                            </MainBtn>
                        );
                    })}
                </div>
                {/* <div className="authenContent"></div> */}

                <div className="authenFormsWrapper">
                    <motion.div animate={loginProps} transition={formTransition} className="formCard logInCard">
                        <AuthenForm pageTypeId={0}></AuthenForm>
                    </motion.div>

                    <motion.div animate={signupProps} transition={formTransition} className="formCard signUpCard">
                        <AuthenForm pageTypeId={1}></AuthenForm>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default UserAuthenticationPage;

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, animate, AnimatePresence } from 'framer-motion';

import { useAuthenticate } from '../../../hooks/useAuthenticate';
import { useInfoBadge } from '../../../hooks/useInfoBadge';

import formInpValidator from '../../../utils/formInpsValidator';
import backEndApiHelper from '../../../utils/backEndApiHelper';

import Bg1 from '../../../assets/img/prj/authenPageBg1.jpg';
import Bg2 from '../../../assets/img/prj/authenPageBg2.jpg';

import InfoBadge from '../../base/InfoBadge/InfoBadge';
import MainBtn from '../../base/MainBtn/MainBtn';
import MainInp from '../../base/MainInp/MainInp';

import './UserAuthenticationPage.scss';

const FRONT = { x: 0, y: 0, opacity: 1, zIndex: 20 };
const BACK = { x: 16, y: 14, opacity: 0.36, zIndex: 10 };

const pageTypes = [
    { id: 0, type: 'logIn', label: 'Log In', url: Bg1, formHeading: 'LOG IN TO YOUR ACCOUNT' },
    { id: 1, type: 'signUp', label: 'Sign Up', url: Bg2, formHeading: 'CREATE AN ACCOUNT' },
];

const inpValidator = formInpValidator();
const beApi = backEndApiHelper();

const AuthenForm = ({
    pageTypeId,
    userNameValue,
    userNameOnChangeHandler,
    pwdValue,
    pwdOnChangeHandler,
    retypePwdValue,
    retypePwdOnChangeHandler,
    formSubmitBtnOnClickHandler,
}) => {
    const formType = pageTypes[pageTypeId].type + 'Form';

    return (
        <>
            <h1 className="authenFormHeading">{pageTypes[pageTypeId].formHeading}</h1>
            <form action="" className={`authenForm ${formType}`}>
                <div className="formInpWrapper">
                    <MainInp
                        inpType="text"
                        inpLabel="User name*"
                        inpId={`${formType}UserName`}
                        inpValue={userNameValue}
                        inPlaceHolder="E.g., mimi67, Jack-Beats_Mera_99"
                        onChangeHandler={userNameOnChangeHandler}
                    ></MainInp>

                    <ul className="inpRequirementList">
                        {inpValidator.userNameRequirements.map((item, index) => {
                            return (
                                <li
                                    key={item.id}
                                    className={`inpRequirementItem ${inpValidator.userNameRequirements[index].validator.safeParse(userNameValue).success ? 'resolve' : 'unResolve'}`}
                                >
                                    {item.displayMessage}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {pageTypes[pageTypeId].type === 'logIn' && (
                    <div className="formInpWrapper">
                        <MainInp
                            inpType="password"
                            inpLabel="Password*"
                            inpId={`${formType}Pwd`}
                            inpValue={pwdValue}
                            inPlaceHolder="Your password"
                            onChangeHandler={pwdOnChangeHandler}
                        ></MainInp>

                        <ul className="inpRequirementList">
                            {inpValidator.pwdRequirement.map((item, index) => {
                                return (
                                    <li
                                        key={item.id}
                                        className={`inpRequirementItem ${inpValidator.pwdRequirement[index].validator.safeParse(pwdValue).success ? 'resolve' : 'unResolve'}`}
                                    >
                                        {item.displayMessage}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                {pageTypes[pageTypeId].type === 'signUp' && (
                    <div className="signUpPwdWrapper">
                        <div className="formInpWrapper">
                            <MainInp
                                inpType="password"
                                inpLabel="Password*"
                                inpId={`${formType}Pwd`}
                                inpValue={pwdValue}
                                inPlaceHolder="Your password"
                                onChangeHandler={pwdOnChangeHandler}
                            ></MainInp>

                            <ul className="inpRequirementList">
                                {inpValidator.pwdRequirement.map((item, index) => {
                                    return (
                                        <li
                                            key={item.id}
                                            className={`inpRequirementItem ${inpValidator.pwdRequirement[index].validator.safeParse(pwdValue).success ? 'resolve' : 'unResolve'}`}
                                        >
                                            {item.displayMessage}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="formInpWrapper">
                            <MainInp
                                inpType="password"
                                inpLabel="Retype password*"
                                inpId={`${formType}RetypePwd`}
                                inpValue={retypePwdValue}
                                inPlaceHolder="Retype your password"
                                onChangeHandler={retypePwdOnChangeHandler}
                            ></MainInp>

                            <ul className="inpRequirementList">
                                {inpValidator.retypePwdRequirements.map((item, index) => {
                                    return (
                                        <li
                                            key={item.id}
                                            className={`inpRequirementItem ${inpValidator.retypePwdRequirements[index].validator(pwdValue, retypePwdValue).success ? 'resolve' : 'unResolve'}`}
                                        >
                                            {item.displayMessage}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                )}

                <MainBtn btnOnClickHandler={formSubmitBtnOnClickHandler} btnClassName="authenFormBtn">
                    {pageTypes[pageTypeId].label}
                </MainBtn>
            </form>
        </>
    );
};

const UserAuthenticationPage = () => {
    const navigate = useNavigate();
    const [pageTypeId, setPageTypeId] = useState(0);

    const loginProps = pageTypeId === 0 ? FRONT : BACK;
    const signupProps = pageTypeId === 1 ? FRONT : BACK;

    const formTransition = { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] };

    const [userNameValue, setUserNameValue] = useState('');
    const [pwdValue, setPwdValue] = useState('');
    const [retypePwdValue, setRetypePwdValue] = useState('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { logIn, logOut } = useAuthenticate();

    const {
        badgeTypeList,
        isShowBadge,
        showBadge,
        badgeType,
        changeBadgeTypeAndMessageThenShowBadge,
        badgeMsg,
        changeBadgeMessage,
        retrieveBadgeIcon,
    } = useInfoBadge();

    const changeAuthenTypeBtnOnClickHandler = (typeId) => {
        setPageTypeId(typeId);
        setUserNameValue('');
        setPwdValue('');
        setRetypePwdValue('');
    };

    const userNameOnChangeHandler = (e) => {
        setUserNameValue(e.target.value.trim());
    };
    const pwdOnChangeHandler = (e) => {
        setPwdValue(e.target.value.trim());
    };
    const retypePwdOnChangeHandler = (e) => {
        setRetypePwdValue(e.target.value.trim());
    };

    const logInBtnOnClickHandler = async () => {
        setIsSubmitting(true);

        try {
            const userNameErr = inpValidator.userNameValidator.safeParse(userNameValue);
            const pwdErr = inpValidator.passwordValidator.safeParse(pwdValue);
            // console.log({ userNameErr });
            // console.log({ pwdErr });

            if (userNameErr.success === false || pwdErr.success === false)
                changeBadgeTypeAndMessageThenShowBadge(
                    badgeTypeList.warning.value,
                    'User name and password must meet their requirements to proceed.',
                );
            else {
                const data = await logIn(userNameValue, pwdValue);

                // console.log({ data });

                if (data.ok === false) {
                    changeBadgeTypeAndMessageThenShowBadge(badgeTypeList.error.value, data.msg[0].msg);
                    throw new Error(data.msg);
                }

                navigate('/');
            }
        } catch (err) {
            console.log({ err });
        }
    };

    const signUpBtnOnClickHandler = () => {
        console.log('signUpBtn');
    };

    return (
        <div className="authenPageWrapper">
            <InfoBadge badgeType={badgeType} isBadgeShow={isShowBadge} badgeMsg={badgeMsg}></InfoBadge>

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

                <div className="authenFormsWrapper">
                    <motion.div animate={loginProps} transition={formTransition} className="formCard logInCard">
                        <AuthenForm
                            pageTypeId={pageTypes[0].id}
                            userNameValue={userNameValue}
                            userNameOnChangeHandler={userNameOnChangeHandler}
                            pwdValue={pwdValue}
                            pwdOnChangeHandler={pwdOnChangeHandler}
                            retypePwdValue={retypePwdValue}
                            retypePwdOnChangeHandler={retypePwdOnChangeHandler}
                            formSubmitBtnOnClickHandler={logInBtnOnClickHandler}
                        ></AuthenForm>
                    </motion.div>

                    <motion.div animate={signupProps} transition={formTransition} className="formCard signUpCard">
                        <AuthenForm
                            pageTypeId={pageTypes[1].id}
                            userNameValue={userNameValue}
                            userNameOnChangeHandler={userNameOnChangeHandler}
                            pwdValue={pwdValue}
                            pwdOnChangeHandler={pwdOnChangeHandler}
                            retypePwdValue={retypePwdValue}
                            retypePwdOnChangeHandler={retypePwdOnChangeHandler}
                            formSubmitBtnOnClickHandler={signUpBtnOnClickHandler}
                        ></AuthenForm>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default UserAuthenticationPage;

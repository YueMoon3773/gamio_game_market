import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { useTheme } from '../../../hooks/useTheme';
import { useFetchGetData } from '../../../hooks/useFetchData';
import { useAuthenticate } from '../../../hooks/useAuthenticate';
import ValidatedComponent from '../../../utils/validateComponentProps';

import gameApiHelper from '../../../utils/gameApiHelper';

import { CartIcon, SunIcon, MoonIcon } from '../../../assets/svgIcons';
import LogoImg from '../../../assets/img/LogoImg.png';
import SearchInp from '../../base/SearchInp/SearchInp';
import UserControllerDropDown from '../../base/UserControllerDropDown/UserControllerDropDown';

import basePageStyles from '../../../styles/modules/basePageStyles.module.scss';
import './Header.scss';

// import searchSuggestListData from '../../../../search.json';
// const searchSuggestionListLoading = false;

const HEADER_SHOW_THRESHOLD = 360;
const HEADER_HIDE_THRESHOLD = 160;
const api = gameApiHelper();

const headerSchema = z.object({
    pageType: z.string(),
    isPageInBrightBg: z.boolean().default(false).optional(),
});

const Header = ({ pageType, isPageInBrightBg = false }) => {
    const navigate = useNavigate();
    const { theme, toggleTheme, changeToDarkTheme } = useTheme();
    const [isHeaderHidden, setIsHeaderHidden] = useState(false);

    const lastScrollY = useRef(0);
    const searchTimerRef = useRef(null);
    const searchInpRef = useRef(null);

    const [searchInpVal, setSearchInpVal] = useState('');
    const [searchSuggestionUrl, setSearchSuggestionUrl] = useState('');
    const [showSearchSuggestion, setShowSearchSuggestion] = useState(false);
    const [searchSuggestionList, setSearchSuggestionList] = useState(null);

    const controllerDropDownRef = useRef(null);
    const [openUserDropDownController, setOpenUserDropDownController] = useState(false);

    const {
        data: searchSuggestionListData,
        error: searchSuggestionListError,
        loading: searchSuggestionListLoading,
    } = useFetchGetData(searchSuggestionUrl);

    const { user: userAuthenData, loading: userAuthenLoading, logIn, logOut, fetchUserInfo } = useAuthenticate();

    // Set up hide/unhide header
    useEffect(() => {
        let accumulatedScrollUp = 0;
        let accumulatedScrollDown = 0;

        const scrollObserveHandle = () => {
            const currentScrollY = window.scrollY;
            const distanceDiff = currentScrollY - lastScrollY.current;

            if (currentScrollY <= 0) {
                // top of page => always show header
                setIsHeaderHidden(false);
                accumulatedScrollUp = 0;
                accumulatedScrollDown = 0;
            } else if (distanceDiff > 0) {
                // scrolling down => accumulate distance
                accumulatedScrollDown += distanceDiff;
                accumulatedScrollUp = 0; // reset opposite accumulator

                if (accumulatedScrollDown >= HEADER_HIDE_THRESHOLD) {
                    setIsHeaderHidden(true);
                }
            } else if (distanceDiff < 0) {
                // scrolling up → accumulate
                accumulatedScrollUp += Math.abs(distanceDiff);
                accumulatedScrollDown = 0; // reset opposite accumulator

                if (accumulatedScrollUp >= HEADER_SHOW_THRESHOLD) {
                    setIsHeaderHidden(false);
                }
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', scrollObserveHandle);
        return () => window.removeEventListener('scroll', scrollObserveHandle);
    }, []);

    // Change to dark theme in intro/error page
    useEffect(() => {
        if (pageType === 'introPage' || pageType === 'errorPage') {
            changeToDarkTheme();
        }
    }, [pageType]);

    // Set up suggestion list after fetch
    useEffect(() => {
        if (searchSuggestionListData !== null) {
            setShowSearchSuggestion(true);
            setSearchSuggestionList(searchSuggestionListData.results);
        }

        return () => setShowSearchSuggestion(false);
    }, [searchSuggestionListData]);

    // Hide search suggestion list when user click outside
    useEffect(() => {
        const checkClickOutSideSearchSuggestion = (e) => {
            if (searchInpRef.current && !searchInpRef.current.contains(e.target)) {
                setShowSearchSuggestion(false);
            }
        };

        document.addEventListener('mousedown', checkClickOutSideSearchSuggestion);

        return () => {
            document.removeEventListener('mousedown', checkClickOutSideSearchSuggestion);
        };
    }, []);

    // Hide drop down when click outside header controller
    useEffect(() => {
        const checkClickOutsideController = (e) => {
            if (controllerDropDownRef.current && !controllerDropDownRef.current.contains(e.target)) {
                setOpenUserDropDownController(false);
            }
        };

        document.addEventListener('mousedown', checkClickOutsideController);

        return () => {
            document.removeEventListener('mousedown', checkClickOutsideController);
        };
    }, []);

    // LOGGING
    // console.log({ showSearchSuggestion });
    console.log({ userAuthenData, userAuthenLoading });

    const searchInpOnChangeHandle = (e) => {
        const inpVal = e.target.value;

        setSearchInpVal(inpVal);
        clearTimeout(searchTimerRef.current);

        if (inpVal !== '') {
            setShowSearchSuggestion(true);
            searchTimerRef.current = setTimeout(() => {
                setSearchSuggestionUrl(api.searchSuggestionApiBasedOnGameName(inpVal.trim()));
            }, 500);
        } else if (inpVal === '') setShowSearchSuggestion(false);
    };

    const clearSearchInpBtnOnClickHandler = () => {
        setShowSearchSuggestion(false);
        setSearchInpVal('');
    };

    const searchBtnOnClickHandler = () => {
        setShowSearchSuggestion(false);
        navigate(`/games/search?game-name=${searchInpVal}`);
    };

    const searchInpOnEnterHandler = () => {
        setShowSearchSuggestion(false);
        navigate(`/games/search?game-name=${searchInpVal}`);
    };

    return (
        <header
            className={`${basePageStyles.pageHeader} header ${pageType === 'normalPage' || pageType === 'viewGamesPage' ? 'normalPageHeader' : ''} ${isHeaderHidden ? 'hidden' : ''}`}
        >
            <Link
                to="/"
                className={`headerLogo ${pageType === 'introPage' ? 'introPageHeader' : ''} ${pageType === 'errorPage' ? 'errorPageHeader' : ''}`}
            >
                <img src={LogoImg} alt="" className="headerLogoImg" />
                <span>Gamio</span>
            </Link>

            <SearchInp
                searchInpRef={searchInpRef}
                isHeaderSearchInp={true}
                isSearchInpInBrightBg={isPageInBrightBg}
                searchInpPlaceHolder={'Search game...'}
                searchInpVal={searchInpVal}
                searchInpOnChangeHandler={searchInpOnChangeHandle}
                searchInpOnEnterHandler={searchInpOnEnterHandler}
                clearSearchInpBtnOnClick={clearSearchInpBtnOnClickHandler}
                searchBtnOnClick={searchBtnOnClickHandler}
                showSearchSuggestion={showSearchSuggestion}
                searchSuggestionList={searchSuggestionList}
                searchSuggestionLoading={searchSuggestionListLoading}
            ></SearchInp>

            <div className="headerRightControllerWrapper">
                {pageType !== 'introPage' && pageType !== 'errorPage' && (
                    <button className="themeBtn" onClick={toggleTheme}>
                        {theme === 'light' && <MoonIcon iconClassName="moonHeaderIcon"></MoonIcon>}
                        {theme === 'dark' && <SunIcon iconClassName="sunHeaderIcon"></SunIcon>}
                    </button>
                )}

                <button className={`cartBtn ${pageType === 'introPage' ? 'introPage' : ''}`}>
                    <CartIcon></CartIcon>
                </button>

                {userAuthenData !== null && (
                    <div ref={controllerDropDownRef} className="headerUserInfoWrapper">
                        <div className="userController" onClick={() => setOpenUserDropDownController((prev) => !prev)}>
                            <div className="userAvatarWrapper">
                                <span className="userAvatar">{userAuthenData.user_name[0]}</span>
                            </div>
                            <span className="userInfoText">{userAuthenData.user_name}</span>
                        </div>
                        <UserControllerDropDown
                            isOpen={openUserDropDownController}
                            logOutOnClickHandler={() => {}}
                        ></UserControllerDropDown>
                    </div>
                )}

                {userAuthenData === null && (
                    <div className="headerAuthenControllerWrapper">
                        <Link to="/user/auth">Log in</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default ValidatedComponent(Header, headerSchema);

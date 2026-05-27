import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { useTheme } from '../../../hooks/useTheme';
import ValidatedComponent from '../../../utils/validateComponentProps';

import { CartIcon, SunIcon, MoonIcon } from '../../../assets/svgIcons';
import LogoImg from '../../../assets/img/LogoImg.png';
import SearchInp from '../../base/SearchInp/SearchInp';

import basePageStyles from '../../../styles/modules/basePageStyles.module.scss';
import './Header.scss';

const HEADER_SHOW_THRESHOLD = 360;
const HEADER_HIDE_THRESHOLD = 160;

const headerSchema = z.object({
    pageType: z.string(),
    isPageInBrightBg: z.boolean().default(false).optional(),
});

const Header = ({ pageType, isPageInBrightBg = false }) => {
    const navigate = useNavigate();
    const { theme, toggleTheme, changeToDarkTheme } = useTheme();
    const [isHeaderHidden, setIsHeaderHidden] = useState(false);
    const lastScrollY = useRef(0);

    const [searchInpVal, setSearchInpVal] = useState('');

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

    const searchInpOnChangeHandle = (e) => {
        setSearchInpVal(e.target.value);
    };

    const clearSearchInpBtnOnClickHandler = () => {
        setSearchInpVal('');
    };

    const searchBtnOnClickHandler = () => {
        navigate(`/games/search?game-name=${searchInpVal}`);
    };

    const searchInpOnEnterHandler = () => {
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
                isHeaderSearchInp={true}
                isSearchInpInBrightBg={isPageInBrightBg}
                searchInpPlaceHolder={'Search game...'}
                searchInpVal={searchInpVal}
                searchInpOnChangeHandler={searchInpOnChangeHandle}
                searchInpOnEnterHandler={searchInpOnEnterHandler}
                clearSearchInpBtnOnClick={clearSearchInpBtnOnClickHandler}
                searchBtnOnClick={searchBtnOnClickHandler}
            ></SearchInp>

            <div className="headerControllerWrapper">
                {pageType !== 'introPage' && pageType !== 'errorPage' && (
                    <button className="themeBtn" onClick={toggleTheme}>
                        {theme === 'light' && <MoonIcon iconClassName="moonHeaderIcon"></MoonIcon>}
                        {theme === 'dark' && <SunIcon iconClassName="sunHeaderIcon"></SunIcon>}
                    </button>
                )}

                <button className={`cartBtn ${pageType === 'introPage' ? 'introPage' : ''}`}>
                    <CartIcon></CartIcon>
                </button>
            </div>
        </header>
    );
};

export default ValidatedComponent(Header, headerSchema);

import { useEffect, useRef } from 'react';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import { ScrollToTopBtnIcon, ExpandMenuIcon, CloseMenuIcon } from '../../../assets/svgIcons';
import SideBar from '../SideBar/SideBar';

import basePageStyles from '../../../styles/modules/basePageStyles.module.scss';
import './PageContent.scss';
import MainBtn from '../../base/MainBtn/MainBtn';
import { useState } from 'react';

const pageContentSchema = z.object({
    pageType: z.string(),
    children: z.unknown().optional(),
});

const PageContent = ({ pageType, children }) => {
    const isScrollThrottledRef = useRef(false);
    let pageContentClassName;
    switch (pageType) {
        case 'normalPage':
            pageContentClassName = `${basePageStyles.pageBgHasColor} pageContentWrapper normalPage`;
            break;
        case 'viewGamesPage':
            pageContentClassName = `${basePageStyles.pageBgHasColor} pageContentWrapper viewGamesPage`;
            break;
        case 'introPage':
            pageContentClassName = `${basePageStyles.pageContent} pageContentWrapper introPage`;
            break;
        case 'errorPage':
            pageContentClassName = `${basePageStyles.pageContent} pageContentWrapper errorPage`;
            break;
        default:
            pageContentClassName = `${basePageStyles.pageContent} pageContentWrapper`;
    }

    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [isScrollBtnHover, setIsScrollBtnHover] = useState(false);

    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isChangeSideBar, setIsChangeSideBar] = useState(false);
    const isChangeSideBarRef = useRef(false);

    // check user current scroll to show scroll to top btn
    useEffect(() => {
        const checkUserScroll = () => {
            if (isScrollThrottledRef.current) return;

            isScrollThrottledRef.current = true;

            setShowScrollBtn(window.scrollY > (window.innerHeight / 3) * 2);

            setTimeout(() => (isScrollThrottledRef.current = false), 160);
        };

        window.addEventListener('scroll', checkUserScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', checkUserScroll);
        };
    }, []);

    const monitorSideBar = () => {
        const { innerWidth } = window;

        // console.log({ innerWidth });

        if (innerWidth < 960) {
            //check to prevent hiding side bar when it's open and user resize screen
            if (isChangeSideBarRef.current === true) return;

            isChangeSideBarRef.current = true;
            setIsChangeSideBar(true);
        } else {
            isChangeSideBarRef.current = false;
            setIsChangeSideBar(false);
        }
    };

    // change side bar's style based on screen size
    useEffect(() => {
        window.addEventListener('resize', monitorSideBar);

        return () => window.removeEventListener('resize', monitorSideBar);
    }, [isChangeSideBar]);
    useEffect(() => {
        monitorSideBar();
    }, []);

    const openMenuBtnOnClickHandler = () => {
        setIsShowMenu(true);
    };

    // LOGGING
    // console.log({ showScrollBtn });
    // console.log({ isChangeSideBar });

    return (
        <div className={pageContentClassName}>
            {pageType === 'viewGamesPage' && (
                <>
                    {!isChangeSideBar && <SideBar sideBarClassName="desktopSidebar"></SideBar>}

                    <div className="contentWrapper">
                        {children}

                        <div className="scrollToTopBtnWrapper">
                            <MainBtn
                                btnClassName={`scrollToTopBtn ${showScrollBtn ? 'show' : 'hidden'}`}
                                btnOnClickHandler={() => {
                                    window.scrollTo(0, 0);
                                    setIsScrollBtnHover(false);
                                }}
                                btnOnMouseEnterHandler={() => {
                                    if (showScrollBtn) setIsScrollBtnHover(true);
                                }}
                                btnOnMouseLeaveHandler={() => {
                                    if (showScrollBtn) setIsScrollBtnHover(false);
                                }}
                            >
                                <ScrollToTopBtnIcon></ScrollToTopBtnIcon>
                            </MainBtn>
                            <span
                                className={`scrollToTopBtnHelper ${isScrollBtnHover && showScrollBtn ? 'show' : 'hidden'}`}
                            >
                                Scroll to top
                            </span>
                        </div>

                        {isChangeSideBar && (
                            <div className="menuBtnWrapper">
                                <MainBtn
                                    btnClassName={`menuBtn ${isShowMenu ? 'hidden' : 'show'}`}
                                    btnOnClickHandler={openMenuBtnOnClickHandler}
                                >
                                    <ExpandMenuIcon></ExpandMenuIcon>
                                </MainBtn>
                            </div>
                        )}
                    </div>

                    {isChangeSideBar && (
                        <div className={`menuOverlayWrapper ${isShowMenu ? 'show' : 'hidden'}`}>
                            <div className={`overlayBg ${isShowMenu ? 'show' : 'hidden'}`}></div>
                            <div className={`menuSideBarWrapper ${isShowMenu ? 'show' : 'hidden'}`}>
                                {isShowMenu && (
                                    <>
                                        <button className="closeSideBarMenu" onClick={() => setIsShowMenu(false)}>
                                            <CloseMenuIcon></CloseMenuIcon>
                                        </button>
                                        <SideBar sideBarClassName={`menuSideBar`}></SideBar>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}

            {(pageType === 'introPage' || pageType === 'errorPage' || pageType === 'normalPage') && <>{children}</>}
        </div>
    );
};

export default ValidatedComponent(PageContent, pageContentSchema);

import { useEffect, useRef } from 'react';
import { z } from 'zod';

import { useInfoBadge } from '../../../hooks/useInfoBadge';

import ValidatedComponent from '../../../utils/validateComponentProps';

import { ScrollToTopBtnIcon } from '../../../assets/svgIcons';
import SideBar from '../SideBar/SideBar';
import InfoBadge from '../../base/InfoBadge/InfoBadge';

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

    const { isShowBadge, badgeType, badgeMsg } = useInfoBadge();
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [isScrollBtnHover, setIsScrollBtnHover] = useState(false);

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

    // console.log({ showScrollBtn });

    return (
        <div className={pageContentClassName}>
            {pageType === 'viewGamesPage' && (
                <>
                    <SideBar></SideBar>
                    <div className="contentWrapper">
                        {children}

                        <div className="scrollToTopBtnWrapper">
                            <MainBtn
                                btnClassName={`scrollToTopBtn ${showScrollBtn ? 'show' : 'hidden'}`}
                                btnOnClickHandler={() => window.scrollTo(0, 0)}
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
                    </div>
                    <InfoBadge badgeType={badgeType} isBadgeShow={isShowBadge} badgeMsg={badgeMsg}></InfoBadge>
                </>
            )}
            
            {(pageType === 'introPage' || pageType === 'errorPage' || pageType === 'normalPage') && (
                <>
                    {children}
                    <InfoBadge badgeType={badgeType} isBadgeShow={isShowBadge} badgeMsg={badgeMsg}></InfoBadge>
                </>
            )}
        </div>
    );
};

export default ValidatedComponent(PageContent, pageContentSchema);

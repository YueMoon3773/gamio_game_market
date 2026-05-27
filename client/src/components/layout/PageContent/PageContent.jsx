import { z } from 'zod';

import { useInfoBadge } from '../../../hooks/useInfoBadge';

import ValidatedComponent from '../../../utils/validateComponentProps';

import SideBar from '../SideBar/SideBar';
import InfoBadge from '../../base/InfoBadge/InfoBadge';

import basePageStyles from '../../../styles/modules/basePageStyles.module.scss';
import './PageContent.scss';

const pageContentSchema = z.object({
    pageType: z.string(),
    children: z.unknown().optional(),
});

const PageContent = ({ pageType, children }) => {
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

    return (
        <div className={pageContentClassName}>
            {pageType === 'viewGamesPage' && (
                <>
                    <SideBar></SideBar>
                    <div className="contentWrapper">{children}</div>
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

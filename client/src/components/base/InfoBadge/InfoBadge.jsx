import z from 'zod';

// import { InfoIcon, WarningIcon, ErrorIcon } from '../../../assets/svgIcon';
// import { badgeTypes } from '../../../hooks/useInfoBadge';
import { useInfoBadge } from '../../../hooks/useInfoBadge';
import ValidatedComponent from '../../../utils/validateComponentProps';

import './InfoBadge.scss';

const infoBadgeSchema = z.object({
    badgeType: z.string().nullable().optional(),
    isBadgeShow: z.boolean().default(false),
    badgeMsg: z.string().nullable(),
});

const InfoBadge = ({ isBadgeShow = false, badgeType, badgeMsg }) => {
    const { retrieveBadgeIcon } = useInfoBadge();
    return (
        <div className={`infoBadge ${badgeType} ${isBadgeShow ? 'show' : ''}`}>
            {/* {badgeType === 'info' && <InfoIcon></InfoIcon>}
            {badgeType === 'warning' && <WarningIcon></WarningIcon>}
            {badgeType === 'error' && <ErrorIcon></ErrorIcon>} */}
            {retrieveBadgeIcon(badgeType)}
            <span>{badgeMsg}</span>
        </div>
    );
};

export default ValidatedComponent(InfoBadge, infoBadgeSchema);

import { createContext, useContext, useState, useRef } from 'react';

import { InfoIcon, WarningIcon, ErrorIcon } from '../assets/svgIcons';

const ShowBadgeContext = createContext(null);

export const InfoBadgeProvider = ({ children }) => {
    const badgeTypeList = {
        info: {
            value: 'info',
            icon: <InfoIcon></InfoIcon>,
        },
        warning: {
            value: 'warning',
            icon: <WarningIcon></WarningIcon>,
        },
        error: {
            value: 'error',
            icon: <ErrorIcon></ErrorIcon>,
        },
    };

    const [isShowBadge, setIsShowBadge] = useState(false);
    const [badgeType, setBadgeType] = useState(null);
    const [badgeMsg, setBadgeMsg] = useState(null);

    // const [isShowBadge, setIsShowBadge] = useState(true);
    // const [badgeType, setBadgeType] = useState('warning');
    // const [badgeMsg, setBadgeMsg] = useState('null');

    const timerRef = useRef(null);

    const showBadge = () => {
        // Clear any existing timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        // Set badge to visible
        setIsShowBadge(true);

        // Schedule hide badge
        timerRef.current = setTimeout(() => {
            setIsShowBadge(false);
            timerRef.current = null;
        }, 6600);
    };

    const retrieveBadgeIcon = (badgeType) => {
        const ret = badgeTypeList[badgeType];

        return ret === undefined ? null : ret.icon;
    };

    const changeBadgeTypeAndMessageThenShowBadge = (badgeType, badgeMessage) => {
        const tmp = badgeTypeList[badgeType];

        if (tmp === undefined) {
            // setBadgeType(null);
            throw new Error('badgeType only accept "info", "waring" and "error".');
        }

        setBadgeType(tmp.value);
        setBadgeMsg(badgeMessage);
        showBadge();
    };

    const changeBadgeMessage = (badgeMessage) => {
        setBadgeMsg(badgeMessage);
    };

    return (
        <ShowBadgeContext.Provider
            value={{
                badgeTypeList,
                isShowBadge,
                showBadge,
                badgeType,
                changeBadgeTypeAndMessageThenShowBadge,
                badgeMsg,
                changeBadgeMessage,
                retrieveBadgeIcon,
            }}
        >
            {children}
        </ShowBadgeContext.Provider>
    );
};

export const useInfoBadge = () => {
    const context = useContext(ShowBadgeContext);

    if (!context) throw new Error('useInfoBadge must be used inside InfoBadgeProvider.');

    return context;
};

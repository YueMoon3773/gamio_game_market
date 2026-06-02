// import './svgIcon.scss';

export const LogoIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`logoIcon ${iconClassName}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="6" x2="10" y1="12" y2="12" />
            <line x1="8" x2="8" y1="10" y2="14" />
            <line x1="15" x2="15.01" y1="13" y2="13" />
            <line x1="18" x2="18.01" y1="11" y2="11" />
            <rect width="20" height="12" x="2" y="6" rx="2" />
        </svg>
    );
};

export const SearchIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
        </svg>
    );
};

export const CartIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    );
};

export const GithubIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 24 24">
            <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
        </svg>
    );
};

export const CrossEmptyIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 24 24">
            <path d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
        </svg>
    );
};

export const CrossFullIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 24 24">
            <path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
        </svg>
    );
};

export const StarIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
        </svg>
    );
};

export const SunIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <circle cx="12" cy="12" r="4" />
            <g className="sunRays">
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
            </g>
        </svg>
    );
};

export const MoonIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <g className="moonBody">
                <g className="starOfMoon">
                    <path d="M18 5h4" />
                    <path d="M20 3v4" />
                </g>
                <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
            </g>
        </svg>
    );
};

export const BackBtnIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <path d="m12 8-4 4 4 4" />
            <path d="M16 12H8" />
        </svg>
    );
};

export const BackBtnHoverIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m12 8-4 4 4 4" />
            <path d="M16 12H8" />
        </svg>
    );
};

export const PrevImgInMediaLibraryIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <path d="m14 16-4-4 4-4" />
        </svg>
    );
};

export const PrevImgInMediaLibraryHoverIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m14 16-4-4 4-4" />
        </svg>
    );
};

export const NextImgInMediaLibraryIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <path d="m10 8 4 4-4 4" />
        </svg>
    );
};

export const NextImgInMediaLibraryHoverIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m10 8 4 4-4 4" />
        </svg>
    );
};

export const ExpandInfoBtnIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
};

export const ArrowLeftIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>
    );
};

export const ArrowRightIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
};

export const InfoIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`svgIcon ${iconClassName}`}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    );
};

export const WarningIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`svgIcon ${iconClassName}`}
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    );
};

export const ErrorIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`svgIcon ${iconClassName}`}
        >
            <path d="m15 9-6 6" />
            <path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
            <path d="m9 9 6 6" />
        </svg>
    );
};

export const ScrollToTopBtnIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`svgIcon ${iconClassName}`}
        >
            <path d="M5 3h14" />
            <path d="m18 13-6-6-6 6" />
            <path d="M12 7v14" />
        </svg>
    );
};

export const ShowPwdIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`svgIcon ${iconClassName}`}
        >
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
};

export const HidePwdIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`svgIcon ${iconClassName}`}
        >
            <path d="m15 18-.722-3.25" />
            <path d="M2 8a10.645 10.645 0 0 0 20 0" />
            <path d="m20 15-1.726-2.05" />
            <path d="m4 15 1.726-2.05" />
            <path d="m9 18 .722-3.25" />
        </svg>
    );
};

export const ExpandMenuIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`svgIcon ${iconClassName}`}
        >
            <path d="M3 5h18" />
            <path d="M3 12h18" />
            <path d="M3 19h18" />
        </svg>
    );
};

/* SIDE BAR ICONS */
export const YourFavGamesIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        </svg>
    );
};

export const ShowAllButtonIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`customSvgIcon ${iconClassName}`}
        >
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
};

export const Last30DaysIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 24 24">
            <path d="M23.48 10.876a1.84 1.84 0 00.435-1.841c-.205-.656-.737-1.124-1.39-1.223l-5.811-.881a.762.762 0 01-.572-.434L13.544 1C13.252.384 12.66 0 12 0s-1.251.384-1.543 1.001L7.86 6.497a.763.763 0 01-.573.434l-5.81.882C.821 7.91.29 8.38.085 9.035a1.84 1.84 0 00.435 1.842l4.204 4.278c.18.182.262.445.22.702l-.992 6.04a1.814 1.814 0 00.375 1.457 1.69 1.69 0 002.122.437l5.197-2.852a.749.749 0 01.707 0l5.197 2.852c.253.139.523.209.8.209.509 0 .99-.236 1.322-.646.33-.408.463-.926.375-1.457l-.992-6.04a.816.816 0 01.219-.702l4.204-4.279z"></path>
        </svg>
    );
};

export const ThisWeekIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 19 26">
            <path d="M4.929 25.819C1.783 16.36 8.43 12.909 8.43 12.909c-.465 5.046 2.679 8.977 2.679 8.977 1.156-.318 3.363-1.805 3.363-1.805 0 1.805-1.165 5.735-1.165 5.735s4.077-2.875 5.36-7.65c1.281-4.776-2.441-9.57-2.441-9.57.224 3.38-1.03 6.704-3.485 9.244.123-.13.226-.273.305-.43.441-.804 1.15-2.896.735-7.741C13.197 2.868 6.442 0 6.442 0 7.024 4.144 5.28 5.098 1.19 12.964c-4.09 7.864 3.74 12.855 3.74 12.855z"></path>
        </svg>
    );
};

export const NextWeekIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 20 16">
            <path d="M19.788.212a.712.712 0 00-.503-.197h-1.428a.712.712 0 00-.502.197.619.619 0 00-.212.468v7.05a.669.669 0 00-.146-.198L9.073.15c-.141-.132-.26-.177-.357-.135-.097.042-.145.152-.145.333V7.73a.668.668 0 00-.145-.198L.502.15C.361.018.242-.027.145.015.048.057 0 .167 0 .348v15.304c0 .18.049.291.145.333.097.042.216-.004.357-.135l7.924-7.382a.906.906 0 00.145-.198v7.382c0 .18.049.291.145.333.097.041.216-.004.357-.136l7.924-7.381a.909.909 0 00.146-.198v7.05c0 .18.07.335.212.467a.712.712 0 00.502.197h1.429c.193 0 .36-.065.502-.197a.62.62 0 00.212-.468V.68a.62.62 0 00-.212-.468z"></path>
        </svg>
    );
};

export const BestOfYearIcon = ({ iconClassName = '' }) => {
    return (
        <svg viewBox="0 0 20 22" className={`customSvgIcon ${iconClassName}`} xmlns="http://www.w3.org/2000/svg">
            <g>
                <path d="M12.104 14.338c0-.2-.173-.324-.384-.273 0 0-.99.236-1.72.236s-1.72-.236-1.72-.236c-.21-.05-.384.072-.384.273v1.058c0 .2.179.365.397.365h3.414c.218 0 .397-.165.397-.365v-1.058zM16.033.73c0-.403-.355-.73-.794-.73H4.761c-.439 0-.794.327-.794.73v6.02c0 1.884.61 3.599 1.716 4.829A5.738 5.738 0 0010 13.499c1.67 0 3.202-.682 4.317-1.92 1.107-1.23 1.716-2.945 1.716-4.83V.73zM3.211 8.211C2.125 7.84 1.625 6.978 1.625 5.545V2.286h1.468V.827H.831c-.438 0-.794.327-.794.73v3.988c0 2.434 1.268 3.916 3.6 4.262a8.274 8.274 0 01-.426-1.596zm1.549 8.644c-.438 0-.793.327-.793.73v3.612c0 .402.355.73.794.73H15.24c.438 0 .793-.328.793-.73v-3.612c0-.403-.355-.73-.793-.73H4.76zM19.169.827h-2.262v1.46h1.468v3.258c0 1.433-.5 2.295-1.586 2.666a8.269 8.269 0 01-.426 1.596c2.332-.346 3.6-1.828 3.6-4.262V1.557c0-.403-.356-.73-.794-.73z"></path>
            </g>
        </svg>
    );
};

export const PopularInYearIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 24 16">
            <path d="M0 4h6v12H0V4zm9-4h6v16H9V0zm9 6h6v10h-6V6z"></path>
        </svg>
    );
};

export const AllTimeTopIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            viewBox="0 0 25 16"
            className={`customSvgIcon ${iconClassName}`}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <path d="M23.91 5.03a.636.636 0 01-.019.198l-1.535 5.867a.693.693 0 01-.673.505l-9.212.044H3.256c-.32 0-.6-.208-.677-.505L1.044 5.25a.637.637 0 01-.018-.204C.432 4.868 0 4.336 0 3.711c0-.772.657-1.4 1.465-1.4s1.466.628 1.466 1.4c0 .435-.209.824-.535 1.08l1.922 1.851c.486.468 1.16.736 1.85.736.815 0 1.592-.37 2.082-.99l3.159-3.999a1.365 1.365 0 01-.43-.989c0-.772.657-1.4 1.465-1.4.809 0 1.466.628 1.466 1.4 0 .374-.156.714-.407.966l.003.003 3.135 4.01c.49.625 1.27.999 2.088.999.696 0 1.35-.26 1.842-.73l1.935-1.847a1.375 1.375 0 01-.548-1.09c0-.772.657-1.4 1.465-1.4.809 0 1.466.628 1.466 1.4 0 .61-.41 1.127-.98 1.32zm-1.704 8.703c0-.368-.312-.666-.698-.666H3.458c-.385 0-.698.298-.698.666v1.6c0 .369.313.667.698.667h18.05c.386 0 .698-.298.698-.667v-1.6z"></path>
        </svg>
    );
};

export const ActionIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            className={`customSvgIcon ${iconClassName}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g>
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                    fillRule="nonzero"
                    d="M9.5 11l.144.007a1.5 1.5 0 0 1 1.35 1.349L11 12.5l-.007.144a1.5 1.5 0 0 1-1.349 1.35L9.5 14H6v2h3.5c1.7 0 3.117-1.212 3.434-2.819l.03-.18L19 13c.711 0 1.388-.149 2-.416V17a3.001 3.001 0 0 1-2 2.829V21a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1.17A3.001 3.001 0 0 1 3 17v-4a2 2 0 0 1 2-2h4.5zM22 7.5V8l-.005.176a3 3 0 0 1-2.819 2.819L19 11h-6.337a3.501 3.501 0 0 0-2.955-1.994L9.5 9H5c-.729 0-1.412.195-2.001.536L3 6a4 4 0 0 1 4-4h9.5A5.5 5.5 0 0 1 22 7.5z"
                ></path>
            </g>
        </svg>
    );
};

export const StrategyIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            className={`customSvgIcon ${iconClassName}`}
            x="0px"
            y="0px"
            viewBox="0 0 296.999 296.999"
            xmlSpace="preserve"
        >
            <g>
                <g>
                    <g>
                        <path d="M226.983,260.96c-1.498-4.201-5.476-7.007-9.936-7.007H57.231c-5.099,0-9.468,3.648-10.378,8.666l-4.773,26.333 c-0.218,1.204-0.173,2.458,0.247,3.607c1.005,2.749,3.556,4.44,6.306,4.44h181.553c1.363,0,2.726-0.345,3.854-1.109 c2.648-1.794,3.598-5.022,2.599-7.826L226.983,260.96z"></path>
                        <path d="M253.923,113.07L202.42,35.815l9.914-26.804c0.873-2.361,0.347-5.013-1.362-6.861c-1.71-1.851-4.314-2.584-6.733-1.896 l-48.56,13.733c-4.755-0.085-22.575,0.281-42.344,9.337c-20.892,9.57-47.981,30.99-58.39,78.68 c-14.367,65.826-0.383,116.08,8.295,138.569h137.528l12.276-12.276c2.226-2.227,2.598-5.703,0.895-8.351 c-11.321-17.596-38.038-61.909-48.365-89.48c3.783,1.293,8.071,2.127,12.604,1.89c6.445-0.337,12.327-2.696,17.551-7.028 l18.855,12.571c5.825,3.884,13.047,5.081,19.815,3.284s12.445-6.42,15.577-12.683l4.365-8.729 C255.415,117.625,255.255,115.067,253.923,113.07z M181.616,70.076h-9.094c-3.695,0-6.689-2.995-6.689-6.689 c0-3.695,2.995-6.689,6.689-6.689h9.094c3.695,0,6.689,2.995,6.689,6.689C188.305,67.082,185.311,70.076,181.616,70.076z"></path>
                    </g>
                </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
        </svg>
    );
};

export const RpgIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 332.441 332.44"
            xmlSpace="preserve"
            className={`customSvgIcon ${iconClassName}`}
        >
            <g>
                <g>
                    <g id="Layer_5_34_">
                        <g>
                            <g>
                                <path d="M260.777,217.262l-49.705,49.705c-0.658,0.658-0.658,1.738,0,2.398l14.825,14.824c0.658,0.656,1.738,0.656,2.396,0 l7.603-7.604c0.657-0.656,1.735-0.656,2.395,0.002l40.512,40.508c20.321,20.324,21.556,19.092,36.378,4.271 c14.821-14.822,16.057-16.057-4.269-36.379l-40.51-40.512c-0.658-0.656-0.661-1.732-0.003-2.393l7.601-7.602 c0.661-0.66,0.657-1.736,0-2.396l-14.824-14.828C262.513,216.604,261.436,216.604,260.777,217.262z M298.662,290.619 l-14.239,14.242c-1.842,1.84-4.826,1.84-6.666,0c-1.841-1.844-1.841-4.826,0-6.668l14.24-14.24c1.842-1.84,4.825-1.842,6.666,0 C300.503,285.793,300.503,288.778,298.662,290.619z M278.169,270.127l-14.24,14.242c-1.84,1.84-4.824,1.84-6.665,0 c-1.84-1.84-1.841-4.826-0.001-6.666l14.242-14.24c1.84-1.842,4.824-1.842,6.664-0.002 C280.012,265.303,280.012,268.287,278.169,270.127z"></path>
                                <g>
                                    <path d="M205.74,189.598c-10.196,8.846-19.131,16.229-28.599,23.863c-0.467,0.377-1.216,1.322-0.272,2.021 c16.28,12.842,28.107,21.561,33.939,25.824c2.174,1.594,3.363,2.434,4.822,0.977c4.895-4.896,14.315-14.318,19.578-19.58 c1.463-1.461,1.084-2.674-0.316-4.188c-4.26-4.602-14.407-15.562-26.838-28.982 C207.724,189.174,207.05,188.471,205.74,189.598z"></path>
                                    <path d="M125.765,170.701c10.861-11.724,20.655-22.288,31.522-33.999c0.535-0.711,0.053-1.865-0.364-2.314 c-8.375-9.016-15.716-16.908-20.923-22.48C110.686,84.803,45.448,2.472,45.448,2.472s-4.549-6.025-6.226,0.736 c-2.779,11.213-7.844,37.059,4.221,72.381c9.189,26.9,43.862,63.051,79.581,94.941 C123.553,171.004,124.738,171.576,125.765,170.701z"></path>
                                </g>
                            </g>
                            <g>
                                <path d="M293.214,3.209c-1.677-6.762-6.227-0.736-6.227-0.736s-65.236,82.33-90.552,109.436 c-22.774,24.381-86.349,93.055-98.892,106.606c-1.401,1.516-1.778,2.729-0.317,4.188c5.262,5.262,14.685,14.684,19.579,19.58 c1.458,1.457,2.65,0.617,4.823-0.977c22.286-16.305,148.499-110.501,167.362-165.719 C301.058,40.268,295.994,14.422,293.214,3.209z"></path>
                                <path d="M69.266,217.262L54.439,232.09c-0.658,0.658-0.659,1.734,0,2.396l7.601,7.602c0.659,0.658,0.656,1.734-0.002,2.394 l-40.509,40.511c-20.324,20.324-19.09,21.557-4.268,36.379c14.822,14.821,16.054,16.055,36.378-4.271l40.509-40.508 c0.659-0.658,1.737-0.658,2.395-0.002l7.602,7.604c0.657,0.656,1.737,0.656,2.396,0l14.826-14.824 c0.659-0.66,0.658-1.74,0-2.398l-49.706-49.705C71.004,216.604,69.924,216.604,69.266,217.262z M33.775,283.953 c1.841-1.842,4.826-1.84,6.667,0l14.241,14.24c1.84,1.842,1.84,4.824,0,6.668c-1.841,1.84-4.826,1.84-6.666,0l-14.241-14.242 C31.936,288.778,31.935,285.793,33.775,283.953z M54.268,263.461c1.84-1.84,4.826-1.84,6.667,0.002l14.241,14.24 c1.841,1.84,1.84,4.826,0,6.666c-1.84,1.84-4.825,1.84-6.666,0l-14.241-14.242C52.427,268.287,52.426,265.303,54.268,263.461z"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
        </svg>
    );
};

export const ShooterIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 307.296 307.296"
            xmlSpace="preserve"
            className={`customSvgIcon ${iconClassName}`}
        >
            <g>
                <g>
                    <path d="M301.395,84.292V62.356h-1.267v-7.789h-13.913v7.789c-18.645,0.022-137.869,0.152-195.067,0.196 l-7.555-15.637l-14.729-3.927v19.575h-1.485c-8.093,0-24.465,8.55-32.857,24.03c-5.417,9.997-9.105,26.184,4.096,46.493 l3.628,5.559l0.908-6.576c0.218-1.55,0.8-3.35,1.284-4.063c0.49,0.381,1.626,1.539,3.345,4.873 c0.044,0.098,4.324,9.698-14.604,33.064C12.646,191.289,0.555,255.802,0,258.973v5.336h82.222v-7.228 c14.658-16.459,23.616-48.712,28.724-74.711c1.664,0.299,3.323,0.441,4.944,0.441h24.476c16.089,0,37.66-16.709,37.66-33.804 c0-5.194-1.376-10.312-3.943-14.8h127.301v-21.941h5.912V84.286h-5.901V84.292z M140.371,177.855h-24.476 c-1.479,0-3.024-0.207-4.558-0.506l4.172-25.101c3.932,7.849,9.556,13.26,16.861,16.111c0.995,0.381,2.051,0.577,3.133,0.577 c3.535,0,6.772-2.208,8.05-5.515c1.724-4.444-0.49-9.464-4.922-11.215c-7.364-2.839-11.95-11.248-13.734-18.205h43.067 c3.296,4.368,5.102,9.518,5.102,15.001C173.066,162.935,153.882,177.855,140.371,177.855z"></path>
                </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
        </svg>
    );
};

export const AdventureIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 512.002 512.002"
            xmlSpace="preserve"
            className={`customSvgIcon ${iconClassName}`}
        >
            <g>
                <g>
                    <path d="M276.502,27.81c-4.051-7.562-11.935-12.281-20.515-12.281c-8.579,0-16.462,4.719-20.514,12.281l-81.861,152.808 c0.182,0.143,0.372,0.273,0.549,0.42l17.699,14.794l18.235,15.243l8.427,7.045l49.444-18.208 c5.193-1.911,10.896-1.91,16.088,0.003l49.402,18.204l8.424-7.036l18.24-15.235l17.741-14.818c0.164-0.14,0.344-0.258,0.512-0.391 L276.502,27.81z"></path>
                </g>
            </g>
            <g>
                <g>
                    <path d="M508.654,461.168L380.802,222.513l-18.239,15.235l-18.24,15.232l-11.363,9.492c-6.39,5.339-15.153,6.856-22.966,3.976 l-53.991-19.894l-54.035,19.896c-2.616,0.963-5.337,1.434-8.039,1.435c-5.376,0-10.675-1.862-14.928-5.416l-11.353-9.492 l-18.235-15.243l-18.234-15.243L2.759,462.211c-3.863,7.211-3.658,15.924,0.546,22.944c4.204,7.02,11.785,11.318,19.967,11.318 h465.428c0.012,0,0.023,0,0.031,0c12.854,0,23.271-10.421,23.271-23.271C512,468.797,510.778,464.681,508.654,461.168z"></path>
                </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
        </svg>
    );
};

export const PuzzleIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 206.185 206.185"
            xmlSpace="preserve"
            className={`customSvgIcon ${iconClassName}`}
        >
            <path d="M168.395,92.03c-3.313,0-6.574,0.492-9.687,1.44V51.833c0-4.142-3.357-7.5-7.5-7.5h-38.232 c1.241-3.513,1.888-7.253,1.888-11.104C114.864,14.906,99.958,0,81.635,0S48.405,14.906,48.405,33.229 c0,3.851,0.646,7.592,1.888,11.104H12.061c-4.143,0-7.5,3.358-7.5,7.5v49.721c0,2.515,1.261,4.863,3.357,6.252 c2.097,1.389,4.75,1.636,7.066,0.654c2.243-0.95,4.631-1.431,7.097-1.431c10.052,0,18.23,8.178,18.23,18.229 c0,10.051-8.178,18.229-18.23,18.229c-2.466,0-4.853-0.481-7.097-1.431c-2.316-0.982-4.97-0.735-7.066,0.654 c-2.097,1.389-3.357,3.737-3.357,6.252v49.721c0,4.142,3.357,7.5,7.5,7.5h45.687c0.007,0.001,0.015,0,0.02,0 c4.143,0,7.5-3.358,7.5-7.5c0-1.152-0.259-2.243-0.724-3.219c-0.756-2.032-1.139-4.163-1.139-6.341 c0-10.052,8.178-18.229,18.229-18.229s18.229,8.178,18.229,18.229c0,2.332-0.439,4.609-1.305,6.77 c-0.926,2.311-0.645,4.931,0.75,6.993c1.396,2.062,3.723,3.297,6.212,3.297h45.687c4.143,0,7.5-3.358,7.5-7.5v-41.636 c3.112,0.948,6.373,1.44,9.687,1.44c18.322,0,33.229-14.906,33.229-33.229S186.718,92.03,168.395,92.03z"></path>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
        </svg>
    );
};

export const RacingIcon = ({ iconClassName = '' }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1280.000000 1228.000000"
            preserveAspectRatio="xMidYMid meet"
            className={`customSvgIcon ${iconClassName}`}
        >
            <g transform="translate(0.000000,1228.000000) scale(0.100000,-0.100000)" stroke="none">
                <path d="M10249 12163 c-503 -432 -1098 -737 -1889 -968 -186 -54 -554 -148 -707 -181 -58 -12 -83 -21 -83 -31 0 -8 131 -499 291 -1091 159 -593 299 -1111 310 -1152 41 -153 35 -143 88 -135 132 19 411 95 643 174 223 76 289 103 285 115 -2 6 -163 445 -357 975 -280 767 -350 965 -339 972 8 5 32 14 54 19 103 27 455 147 590 200 300 120 650 307 933 499 67 46 127 81 134 79 15 -5 740 -1807 731 -1820 -11 -19 -326 -249 -468 -343 -344 -228 -683 -398 -1080 -542 -82 -30 -154 -58 -158 -63 -8 -7 746 -2114 762 -2133 9 -10 406 187 603 299 367 208 700 452 1002 733 60 56 114 100 119 98 6 -2 34 -64 63 -138 29 -73 177 -448 328 -833 152 -384 276 -706 276 -715 0 -35 -180 -237 -364 -410 -308 -288 -812 -643 -1231 -867 -105 -56 -129 -63 -138 -41 -2 6 -152 419 -332 917 -181 498 -331 909 -335 913 -4 5 -43 -9 -86 -31 -200 -100 -575 -249 -859 -341 -206 -67 -204 -67 -231 -11 -11 25 -585 1314 -1274 2865 -689 1551 -1259 2827 -1267 2835 -12 13 -81 15 -501 15 -480 0 -565 -4 -927 -41 -720 -74 -1443 -259 -2085 -534 -548 -234 -1101 -573 -1539 -941 -68 -57 -136 -113 -149 -125 -17 -14 -23 -27 -20 -40 3 -10 232 -593 508 -1294 276 -701 609 -1547 740 -1880 131 -333 531 -1350 890 -2260 358 -910 710 -1805 782 -1988 72 -182 134 -332 138 -332 4 0 40 40 79 89 287 364 788 857 1271 1252 971 792 2134 1489 2903 1738 201 65 343 92 477 93 170 0 258 -40 306 -139 25 -50 26 -61 21 -146 -10 -175 -117 -401 -325 -686 -176 -242 -477 -579 -498 -558 -2 1 38 70 87 152 254 424 326 688 216 792 -42 39 -85 53 -166 53 -308 0 -925 -340 -1343 -739 -42 -40 -68 -72 -68 -85 0 -12 18 -52 40 -90 168 -288 438 -456 845 -527 167 -29 507 -32 710 -5 791 102 1695 440 2560 959 722 432 1307 942 1544 1345 l31 53 -74 187 c-395 997 -575 1452 -1106 2792 -337 850 -754 1903 -927 2340 -173 437 -316 796 -317 798 -2 1 -54 -42 -117 -95z m-3842 -1347 c211 -457 379 -834 375 -838 -5 -5 -96 -18 -203 -29 -709 -72 -1379 -225 -2017 -460 -53 -20 -63 -27 -59 -44 8 -42 1002 -2325 1012 -2325 6 0 98 35 205 79 421 169 887 324 1285 426 337 87 725 159 745 139 17 -17 740 -1649 736 -1660 -2 -6 -41 -21 -86 -33 -490 -133 -1233 -498 -1889 -929 -120 -79 -145 -92 -156 -81 -7 8 -201 462 -430 1009 -229 547 -420 999 -425 1004 -15 15 -539 -259 -904 -472 -489 -284 -853 -535 -1297 -891 -21 -17 -33 -21 -40 -14 -12 12 -959 2469 -959 2489 0 16 377 299 580 436 420 281 936 562 1439 783 73 33 135 64 138 71 2 6 -165 435 -372 953 -208 518 -375 947 -372 955 10 26 398 128 647 170 391 66 782 93 1364 92 l300 -1 383 -829z"></path>
                <path d="M282 10350 c-145 -65 -265 -120 -267 -122 -1 -1 192 -559 430 -1238 421 -1202 1266 -3614 2520 -7195 339 -968 620 -1764 625 -1769 9 -9 926 349 935 365 3 3 -42 125 -99 270 -58 145 -398 1011 -756 1924 -644 1639 -1479 3766 -2370 6035 -251 641 -517 1319 -591 1507 -95 242 -138 343 -149 342 -8 0 -133 -54 -278 -119z"></path>
            </g>
        </svg>
    );
};

export const SportIcon = ({ iconClassName = '' }) => {
    return (
        <svg viewBox="-8 0 512 512" className={`customSvgIcon ${iconClassName}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M481.5 60.3c-4.8-18.2-19.1-32.5-37.3-37.4C420.3 16.5 383 8.9 339.4 8L496 164.8c-.8-43.5-8.2-80.6-14.5-104.5zm-467 391.4c4.8 18.2 19.1 32.5 37.3 37.4 23.9 6.4 61.2 14 104.8 14.9L0 347.2c.8 43.5 8.2 80.6 14.5 104.5zM4.2 283.4L220.4 500c132.5-19.4 248.8-118.7 271.5-271.4L275.6 12C143.1 31.4 26.8 130.7 4.2 283.4zm317.3-123.6c3.1-3.1 8.2-3.1 11.3 0l11.3 11.3c3.1 3.1 3.1 8.2 0 11.3l-28.3 28.3 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-28.3-28.3-22.6 22.7 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0L248 278.6l-22.6 22.6 28.3 28.3c3.1 3.1 3.1 8.2 0 11.3l-11.3 11.3c-3.1 3.1-8.2 3.1-11.3 0l-28.3-28.3-28.3 28.3c-3.1 3.1-8.2 3.1-11.3 0l-11.3-11.3c-3.1-3.1-3.1-8.2 0-11.3l28.3-28.3-28.3-28.2c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 22.6-22.6-28.3-28.3c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 22.6-22.6-28.3-28.3c-3.1-3.1-3.1-8.2 0-11.3l11.3-11.3c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3 28.3-28.5z"></path>
        </svg>
    );
};

/* PLATFORMS ICONS  */
export const PcIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 24 24">
            <path d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z" />
        </svg>
    );
};

export const PlayStationIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 21 16">
            <path d="M11.112 16L8 14.654V0s6.764 1.147 7.695 3.987c.931 2.842-.52 4.682-1.03 4.736-1.42.15-1.96-.748-1.96-.748V3.39l-1.544-.648L11.112 16zM12 14.32V16s7.666-2.338 8.794-3.24c1.128-.9-2.641-3.142-4.666-2.704 0 0-2.152.099-4.102.901-.019.008 0 1.51 0 1.51l4.948-1.095 1.743.73L12 14.32zm-5.024-.773s-.942.476-3.041.452c-2.1-.024-3.959-.595-3.935-1.833C.024 10.928 3.476 9.571 6.952 9v1.738l-3.693.952s-.632.786.217.81A11.934 11.934 0 007 12.046l-.024 1.5z"></path>
        </svg>
    );
};

export const XBoxIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 16 16">
            <path d="M3.564 1.357l-.022.02c.046-.048.11-.1.154-.128C4.948.435 6.396 0 8 0c1.502 0 2.908.415 4.11 1.136.086.052.324.215.446.363C11.4.222 7.993 2.962 7.993 2.962c-1.177-.908-2.26-1.526-3.067-1.746-.674-.185-1.14-.03-1.362.141zm10.305 1.208c-.035-.04-.074-.076-.109-.116-.293-.322-.653-.4-.978-.378-.295.092-1.66.584-3.342 2.172 0 0 1.894 1.841 3.053 3.723 1.159 1.883 1.852 3.362 1.426 5.415A7.969 7.969 0 0016 7.999a7.968 7.968 0 00-2.13-5.434zM10.98 8.77a55.416 55.416 0 00-2.287-2.405 52.84 52.84 0 00-.7-.686l-.848.854c-.614.62-1.411 1.43-1.853 1.902-.787.84-3.043 3.479-3.17 4.958 0 0-.502-1.174.6-3.88.72-1.769 2.893-4.425 3.801-5.29 0 0-.83-.913-1.87-1.544l-.007-.002s-.011-.009-.03-.02c-.5-.3-1.047-.53-1.573-.56a1.391 1.391 0 00-.878.431A8 8 0 0013.92 13.381c0-.002-.169-1.056-1.245-2.57-.253-.354-1.178-1.46-1.696-2.04z"></path>
        </svg>
    );
};

export const NintendoIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 21 16">
            <path d="M8 0h5a8 8 0 110 16H8A8 8 0 118 0zm-.135 1.935a6.065 6.065 0 000 12.13h5.12a6.065 6.065 0 000-12.13h-5.12zm-1.33 2.304h2.401l3.199 5.175V4.24h2.346v7.495H12.18L8.864 6.537v5.201H6.53l.005-7.499z"></path>
        </svg>
    );
};

export const AndroidIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 16 18">
            <path d="M1.168 5.86H1.12c-.614 0-1.115.482-1.115 1.07v4.665c0 .59.5 1.071 1.115 1.071h.049c.614 0 1.115-.482 1.115-1.071V6.93c0-.589-.502-1.072-1.116-1.072zm1.65 7.535c0 .541.46.983 1.025.983h1.095v2.519c0 .591.503 1.073 1.116 1.073h.048c.615 0 1.116-.482 1.116-1.073v-2.52H8.75v2.52c0 .591.504 1.073 1.117 1.073h.047c.615 0 1.116-.482 1.116-1.073v-2.52h1.096c.564 0 1.025-.44 1.025-.982V6.03H2.818v7.364zm7.739-11.83l.87-1.29a.173.173 0 00-.054-.246.188.188 0 00-.256.052l-.902 1.335A6.092 6.092 0 007.985 1a6.1 6.1 0 00-2.232.416L4.853.08a.19.19 0 00-.257-.05.173.173 0 00-.055.246l.871 1.29c-1.57.739-2.628 2.131-2.628 3.729 0 .098.006.195.015.29H13.17c.009-.095.014-.192.014-.29 0-1.598-1.059-2.99-2.628-3.73zM5.58 3.875a.489.489 0 01-.5-.48c0-.265.224-.478.5-.478.277 0 .5.213.5.478a.489.489 0 01-.5.48zm4.809 0a.489.489 0 01-.5-.48c0-.265.224-.478.5-.478s.498.213.498.478a.488.488 0 01-.498.48zm4.458 1.985h-.046c-.614 0-1.117.482-1.117 1.07v4.665c0 .59.503 1.071 1.117 1.071h.047c.615 0 1.115-.482 1.115-1.071V6.93c0-.589-.501-1.072-1.116-1.072z"></path>
        </svg>
    );
};

export const IosIcon = ({ iconClassName = '' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`customSvgIcon ${iconClassName}`} viewBox="0 0 24 24">
            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"></path>
        </svg>
    );
};

export const MacOsIcon = ({ iconClassName = '' }) => {
    return (
        <svg viewBox="0 0 32 32" className={`customSvgIcon ${iconClassName}`} xmlns="http://www.w3.org/2000/svg">
            <path d="M31,0H1A1,1,0,0,0,0,1V31a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V1A1,1,0,0,0,31,0ZM2,2H14.36C11.89,7.34,11,15.52,11,15.9a1,1,0,0,0,.25.77A1,1,0,0,0,12,17h4.89a29.9,29.9,0,0,0,.25,7c-.37,0-.75.05-1.14.05A14.07,14.07,0,0,1,5.78,19.38a1,1,0,0,0-1.4-.16,1,1,0,0,0-.16,1.41A15.87,15.87,0,0,0,16,26c.53,0,1.05,0,1.55-.08A18.35,18.35,0,0,0,19.07,30H2ZM30,30H21.39a15.57,15.57,0,0,1-1.86-4.42,15.91,15.91,0,0,0,8.25-4.95,1,1,0,1,0-1.56-1.25,14.13,14.13,0,0,1-7.09,4.24A27.91,27.91,0,0,1,19,16.15,1,1,0,0,0,18,15H13.13c.34-2.59,1.36-9.12,3.46-13H30Z" />
            <path d="M8,13a1,1,0,0,0,1-1V9A1,1,0,0,0,7,9v3A1,1,0,0,0,8,13Z" />
            <path d="M24,13a1,1,0,0,0,1-1V9a1,1,0,0,0-2,0v3A1,1,0,0,0,24,13Z" />
        </svg>
    );
};

export const LinuxIcon = ({ iconClassName = '' }) => {
    return (
        <svg viewBox="0 0 15 18" className={`customSvgIcon ${iconClassName}`} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.52 14.452c-.513-.216-.733-.503-.712-.93.022-.5-.254-.866-.385-1.01.079-.312.31-1.386 0-2.32-.334-.999-1.352-2.525-2.403-4.025-.43-.616-.45-1.285-.474-2.06-.022-.74-.048-1.579-.45-2.51C9.66.582 8.785 0 7.694 0a3.23 3.23 0 00-1.829.572c-1.05.744-.91 2.366-.819 3.44.013.147.024.286.031.404.061 1.052.006 1.606-.067 1.774-.047.11-.279.423-.524.755-.254.343-.541.732-.777 1.094-.281.436-.508 1.103-.728 1.747-.16.471-.312.917-.46 1.183-.28.512-.21.99-.152 1.21-.106.076-.259.225-.388.505-.156.342-.473.526-1.132.657-.303.063-.512.194-.621.388-.16.283-.073.638.006.881.117.357.044.583-.088.993-.03.095-.065.202-.1.32a.59.59 0 00.06.504c.248.391.974.529 1.722.62.447.054.935.237 1.408.415.463.173.942.353 1.377.408.066.008.131.012.195.012.657 0 .954-.447 1.048-.631a11.36 11.36 0 011.889-.23 8 8 0 011.878.199c.072.142.262.466.566.633.166.093.398.147.636.147.254 0 .737-.062 1.119-.475.38-.414 1.333-.944 2.029-1.33.155-.087.3-.167.427-.24.39-.223.604-.54.585-.872a.735.735 0 00-.463-.63zm-8.647-.08c-.049-.351-.49-.7-1-1.104-.417-.33-.89-.705-1.02-1.022-.27-.654-.057-1.804.313-2.396.183-.296.332-.746.477-1.18.156-.47.317-.956.497-1.168.286-.332.55-.978.597-1.486.267.262.682.595 1.066.595a.613.613 0 00.17-.024c.263-.078.649-.307 1.022-.528.322-.191.718-.426.868-.448.256.378 1.743 3.757 1.895 4.842a5.266 5.266 0 01-.071 1.847 1.289 1.289 0 00-.177-.013c-.414 0-.524.232-.552.37-.074.36-.082 1.512-.082 1.771-.15.195-.908 1.116-1.995 1.281-.443.066-.857.1-1.23.1-.318 0-.521-.026-.606-.039l-.546-.642c.215-.109.43-.34.374-.755zm.693-10.586a.863.863 0 00-.05.024 1.073 1.073 0 00-.011-.115c-.06-.353-.288-.609-.542-.609a.373.373 0 00-.058.005c-.151.026-.27.142-.335.308.057-.363.257-.631.495-.631.278 0 .514.385.514.842 0 .057-.004.115-.013.176zm2.166.272a.916.916 0 00.04-.268c0-.414-.256-.738-.583-.738-.319 0-.578.331-.578.738 0 .028 0 .056.003.084a10.386 10.386 0 00-.05-.02A1.156 1.156 0 017.51 3.5c0-.495.308-.898.686-.898.38 0 .687.403.687.898 0 .206-.055.403-.15.559zm-.28.963c-.005.025-.016.036-.145.105a3.894 3.894 0 00-.246.14l-.067.043c-.272.168-.907.564-1.079.587-.117.016-.19-.03-.352-.144a5.075 5.075 0 00-.118-.08c-.293-.198-.482-.416-.503-.501.095-.076.333-.266.454-.379.247-.235.495-.393.617-.393l.019.001c.144.027.5.172.76.279.12.049.224.092.297.118.23.082.35.185.364.224zM10.52 16.02c.13-.6.279-1.418.255-1.9-.006-.11-.015-.229-.024-.344-.017-.215-.043-.535-.017-.63a.11.11 0 01.018-.007c0 .276.06.825.487 1.017.128.057.273.086.433.086.429 0 .904-.216 1.1-.416a2.05 2.05 0 00.278-.376.465.465 0 01.02.177c-.026.406.166.945.532 1.144l.053.029c.13.07.477.257.482.345 0 0-.003.01-.022.03-.087.08-.392.24-.687.395-.524.275-1.117.586-1.384.874-.375.406-.8.678-1.056.678a.27.27 0 01-.084-.012c-.278-.09-.507-.502-.384-1.09zm-9.49-1.533c-.028-.136-.05-.244-.026-.348.017-.078.39-.16.548-.196.223-.05.454-.101.605-.195.204-.127.314-.361.412-.568.07-.15.143-.304.23-.354a.048.048 0 01.027-.007c.162 0 .503.351.7.665.05.08.142.238.248.421.32.55.757 1.3.985 1.553.206.226.54.661.457 1.035-.06.29-.379.525-.454.577a.454.454 0 01-.101.01c-.438 0-1.303-.374-1.768-.574l-.068-.03c-.26-.112-.684-.182-1.094-.25-.326-.055-.772-.129-.846-.196-.06-.069.01-.294.07-.492.045-.142.09-.29.115-.444a1.634 1.634 0 00-.04-.607z"
                fill="#FFF"
            />
        </svg>
    );
};

export const AtariIcon = ({ iconClassName = '' }) => {
    return (
        <svg className={`customSvgIcon ${iconClassName}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16">
            <path
                d="M11.042 16V0H8.75v16h2.292zM7.102 0h1.231c0 7.417-.19 9.224-1.325 11.412C5.87 13.599 2.698 15.762 0 16v-2.445c2.036-.333 3.883-1.43 5.492-3.855C7.102 7.275 7.15 1.52 7.102 0zm5.796 0h-1.231c0 7.417.19 9.224 1.325 11.412C14.13 13.599 17.302 15.762 20 16v-2.445c-2.036-.333-3.883-1.43-5.492-3.855-1.61-2.425-1.658-8.179-1.61-9.7z"
                fill="#FFF"
            />
        </svg>
    );
};

export const AmigaIcon = ({ iconClassName = '' }) => {
    return (
        <svg className={`customSvgIcon ${iconClassName}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 16">
            <g fill="#FFF">
                <path d="M3.673 7.498h2.993l5.629 8.413H9.329z" />
                <path d="M19.932.048h2.965L12.326 15.911H9.497zM.003 7.498h3.019l5.677 8.413H5.71z" />
                <path d="M16.401.048h2.991L8.73 15.911H5.878z" />
            </g>
        </svg>
    );
};

export const SegaIcon = ({ iconClassName = '' }) => {
    return (
        <svg className={`customSvgIcon ${iconClassName}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 16">
            <g fill="#FFF">
                <path d="M7.468 15.993c3.056 0 5.532-2.335 5.532-5.212 0-2.883-2.476-5.218-5.532-5.218l-1.94.01a.271.271 0 01-.276-.264c0-.146.124-.265.277-.265l7.454.001.003-2.212H5.527c-1.442 0-2.615 1.108-2.615 2.47 0 1.363 1.173 2.466 2.615 2.466l1.949.025c1.75 0 3.167 1.335 3.167 2.983 0 1.648-1.416 2.987-3.167 2.987H.003L0 16l7.468-.007z" />
                <path d="M.006 13.167h7.38c1.428 0 2.583-1.106 2.583-2.472 0-1.364-1.155-2.468-2.584-2.468l-1.924-.02c-1.726 0-3.126-1.34-3.126-2.993 0-1.65 1.4-2.989 3.126-2.989l7.366-.001L12.824 0H5.462C2.448 0 0 2.336 0 5.22c0 2.883 2.448 5.22 5.462 5.22l1.905.003c.145 0 .267.113.267.257 0 .14-.122.253-.267.253l-7.364.006.003 2.208" />
            </g>
        </svg>
    );
};

export const ThreeDOIcon = ({ iconClassName = '' }) => {
    return (
        <svg className={`customSvgIcon ${iconClassName}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 20">
            <g fill="#FFF" fill-rule="evenodd">
                <rect width="7.579" height="5.361" x=".211" y="8.041" rx="2.265" />
                <path d="M3.96.087l3.87 3.87-3.79 3.791-3.87-3.87z" />
                <ellipse cx="4.105" cy="16.907" rx="3.263" ry="3.093" />
            </g>
        </svg>
    );
};

export const WebPlatformIcon = ({ iconClassName = '' }) => {
    return (
        <svg className={`customSvgIcon ${iconClassName}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
                fill="#FFF"
                d="M15.98 7.467A7.998 7.998 0 008.534.018V0H7.467v.018A7.999 7.999 0 00.018 7.467H0v1.066h.018a7.998 7.998 0 007.449 7.448V16h1.066v-.02a7.997 7.997 0 007.448-7.447H16V7.467h-.02zM5.009 1.744c-.515.685-.943 1.543-1.254 2.523H2.156a6.97 6.97 0 012.852-2.523zm-3.41 3.59h1.875c-.143.673-.234 1.39-.262 2.133H1.087c.056-.751.234-1.47.51-2.134zm-.511 3.2H3.21c.028.743.12 1.459.262 2.133H1.598a6.873 6.873 0 01-.511-2.134zm1.069 3.2h1.597c.311.979.739 1.837 1.255 2.522a6.962 6.962 0 01-2.852-2.523zm5.31 3.131c-1.096-.293-2.04-1.47-2.613-3.132h2.614v3.132zm0-4.198H4.555a11.921 11.921 0 01-.277-2.134h3.19v2.134zm0-3.2H4.278c.031-.751.126-1.47.277-2.134h2.913v2.134zm0-3.2H4.854c.573-1.661 1.517-2.839 2.614-3.131v3.13zm6.378 0H12.25c-.313-.98-.74-1.838-1.257-2.523a6.977 6.977 0 012.852 2.523zm-5.31-3.131c1.095.292 2.04 1.47 2.613 3.13H8.533v-3.13zm0 4.197h2.911c.152.665.245 1.383.278 2.134h-3.19V5.333zm0 3.2h3.189c-.031.751-.126 1.47-.278 2.134H8.533V8.533zm0 6.332v-3.132h2.613c-.573 1.661-1.518 2.839-2.614 3.132zm2.458-.609c.515-.686.944-1.543 1.257-2.523h1.595a6.969 6.969 0 01-2.852 2.523zm3.41-3.59h-1.875c.143-.673.234-1.39.262-2.133h2.123a6.842 6.842 0 01-.51 2.134zm-1.613-3.2a12.682 12.682 0 00-.262-2.133h1.875c.277.665.455 1.383.511 2.134H12.79z"
            />
        </svg>
    );
};

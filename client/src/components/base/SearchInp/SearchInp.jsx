import { useState } from 'react';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import { SearchIcon, CrossEmptyIcon, CrossFullIcon } from '../../../assets/svgIcons';

import './SearchInp.scss';

const searchInpSchema = z
    .object({
        isHeaderSearchInp: z.boolean().optional(),
        isSearchInpInBrightBg: z.boolean().optional(),
        searchInpPlaceHolder: z.string(),
        searchInpVal: z.string(),
        searchInpOnChangeHandler: z.function(),
        searchInpOnEnterHandler: z.function(),
        clearSearchInpBtnOnClick: z.function(),
        searchBtnOnClick: z.function(),
    })
    .refine(
        (data) => {
            const bothHeaderVarsProvided =
                data.isHeaderSearchInp !== undefined && data.isSearchInpInBrightBg !== undefined;
            const neitherHeaderVarsProvided =
                data.isHeaderSearchInp === undefined && data.isSearchInpInBrightBg === undefined;
            return bothHeaderVarsProvided || neitherHeaderVarsProvided;
        },
        {
            message: 'isHeaderSearchInp and isSearchInpInBrightBg must be provided together or not at all',
        },
    );

const SearchInp = ({
    isHeaderSearchInp,
    isSearchInpInBrightBg,
    searchInpPlaceHolder,
    searchInpVal,
    searchInpOnChangeHandler,
    searchInpOnEnterHandler,
    clearSearchInpBtnOnClick,
    searchBtnOnClick,
}) => {
    const [isSearchInpInteracted, setIsSearchInpInteracted] = useState(false);
    const [isDeleteInpValBtnHover, setIsDeleteInpValBtnHover] = useState(false);

    return (
        <div
            className={`searchInpWrapper ${isHeaderSearchInp ? 'headerSearchInp' : ''} ${isSearchInpInBrightBg ? 'searchInpInBrightBg' : ''} ${isSearchInpInteracted ? 'interacted' : ''}`}
        >
            <input
                type="text"
                className={`searchInp ${isHeaderSearchInp ? 'headerSearchInp' : ''} ${isSearchInpInBrightBg ? 'searchInpInBrightBg' : ''}`}
                placeholder={searchInpPlaceHolder}
                value={searchInpVal}
                onFocus={() => setIsSearchInpInteracted(true)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') searchInpOnEnterHandler();
                }}
                onChange={(e) => {
                    searchInpOnChangeHandler(e);
                }}
            />
            <button
                className={`clearSearchInpValBtn ${isHeaderSearchInp ? 'headerSearchInp' : ''} ${isSearchInpInBrightBg ? 'searchInpInBrightBg' : ''}`}
                onMouseEnter={() => setIsDeleteInpValBtnHover(true)}
                onMouseLeave={() => setIsDeleteInpValBtnHover(false)}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearSearchInpBtnOnClick();
                }}
            >
                {isDeleteInpValBtnHover ? <CrossFullIcon></CrossFullIcon> : <CrossEmptyIcon></CrossEmptyIcon>}
            </button>
            <button
                className={`searchBtn ${isHeaderSearchInp ? 'headerSearchInp' : ''} ${isSearchInpInBrightBg ? 'searchInpInBrightBg' : ''}`}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    searchBtnOnClick();
                }}
            >
                <SearchIcon></SearchIcon>
            </button>
        </div>
    );
};

export default ValidatedComponent(SearchInp, searchInpSchema);

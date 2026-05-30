import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import { SearchIcon, CrossEmptyIcon, CrossFullIcon } from '../../../assets/svgIcons';
import loadingImg from '../../../assets/img/prj/loading.gif';
import noImgAvailable from '../../../assets/img/prj/no_image_found.png';

import './SearchInp.scss';

const searchInpSchema = z
    .object({
        searchInpRef: z.unknown().optional(),
        isHeaderSearchInp: z.boolean().optional(),
        isSearchInpInBrightBg: z.boolean().optional(),
        searchInpPlaceHolder: z.string(),
        searchInpVal: z.string(),
        searchInpOnChangeHandler: z.function(),
        searchInpOnEnterHandler: z.function(),
        clearSearchInpBtnOnClick: z.function(),
        searchBtnOnClick: z.function(),
        showSearchSuggestion: z.boolean().nullable().optional(),
        searchSuggestionList: z.array(z.looseObject({})).nullable().optional(),
        searchSuggestionLoading: z.boolean().nullable().optional(),
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
    searchInpRef,
    isHeaderSearchInp,
    isSearchInpInBrightBg,
    searchInpPlaceHolder,
    searchInpVal,
    searchInpOnChangeHandler,
    searchInpOnEnterHandler,
    clearSearchInpBtnOnClick,
    searchBtnOnClick,
    showSearchSuggestion,
    searchSuggestionList,
    searchSuggestionLoading,
}) => {
    const location = useLocation();
    const currentPageUrl = location.pathname;

    const [isSearchInpInteracted, setIsSearchInpInteracted] = useState(false);
    const [isDeleteInpValBtnHover, setIsDeleteInpValBtnHover] = useState(false);

    return (
        <div
            className={`searchWrapper ${isHeaderSearchInp ? 'headerSearchInp' : ''} ${isSearchInpInteracted ? 'interacted' : ''}`}
            ref={searchInpRef}
        >
            <div
                className={`searchInpWrapper ${isHeaderSearchInp ? 'headerSearchInp' : ''} ${isSearchInpInBrightBg ? 'searchInpInBrightBg' : ''}`}
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

            {showSearchSuggestion && searchSuggestionLoading === true && searchSuggestionList === null && (
                <div className={`searchSuggestionWrapper ${showSearchSuggestion ? 'expand' : 'hidden'}`}>
                    <div className="searchSuggestionLoadingImgWrapper">
                        <img src={loadingImg} alt="loading suggestion" className="searchSuggestionLoadingImg" />
                    </div>
                </div>
            )}

            {showSearchSuggestion &&
                searchSuggestionLoading === false &&
                searchSuggestionList !== null &&
                searchSuggestionList.length > 0 && (
                    <div className={`searchSuggestionWrapper ${showSearchSuggestion ? 'expand' : 'hidden'}`}>
                        <ul className={`suggestionItemsWrapper ${showSearchSuggestion ? 'expand' : 'hidden'}`}>
                            {searchSuggestionList.map((item, index) => {
                                return (
                                    <li className="suggestionItem" key={item.id + 'z' + index}>
                                        <img
                                            src={item.background_image == null ? noImgAvailable : item.background_image}
                                            alt="game suggestion image"
                                            onError={(e) => {
                                                e.target.src = noImgAvailable;
                                            }}
                                            className="suggestionItemImg"
                                        />
                                        <Link
                                            to={`/game-detail/${item.id}`}
                                            className="suggestionItemLink"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
        </div>
    );
};

export default ValidatedComponent(SearchInp, searchInpSchema);

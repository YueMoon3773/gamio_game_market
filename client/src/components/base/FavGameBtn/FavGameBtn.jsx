import { useState, useEffect } from 'react';
import { z } from 'zod';

import { YourFavGamesIcon } from '../../../assets/svgIcons';
import ValidatedComponent from '../../../utils/validateComponentProps';

import './FavGameBtn.scss';

const favGameBtnSchema = z.object({
    gameBtnStyleClassName: z.string().default('').optional(),
    isFavBtnActive: z.boolean().default(false),
    onClickHandler: z.function(),
});

const FavGameBtn = ({ gameBtnStyleClassName = '', isFavBtnActive = false, onClickHandler }) => {
    const GAME_FAV_BTN_DEFAULT_CLASS_NAME = `gameFavBtn ${gameBtnStyleClassName} ${isFavBtnActive ? 'active' : ''}`;
    const [favBtnClassName, setFavBtnClassName] = useState(GAME_FAV_BTN_DEFAULT_CLASS_NAME);
    const [isFavBtnClicked, setIsFavBtnClicked] = useState(false);

    useEffect(() => {
        let effect = null;

        if (isFavBtnClicked) {
            setFavBtnClassName(`${GAME_FAV_BTN_DEFAULT_CLASS_NAME} ${isFavBtnActive ? 'active' : ''} clickedAnimation`);
            effect = setTimeout(() => {
                setFavBtnClassName(`${GAME_FAV_BTN_DEFAULT_CLASS_NAME} ${isFavBtnActive ? 'active' : ''}`);
            }, 460);
        }
        if (!isFavBtnClicked) {
            setFavBtnClassName(`${GAME_FAV_BTN_DEFAULT_CLASS_NAME} ${isFavBtnActive ? 'active' : ''}`);
        }

        return () => {
            if (effect !== null) {
                clearTimeout(effect);
            }
        };
    }, [isFavBtnClicked]);

    return (
        <button
            className={favBtnClassName}
            onClick={() => {
                setIsFavBtnClicked((prev) => !prev);
                onClickHandler();
            }}
        >
            <YourFavGamesIcon></YourFavGamesIcon>
        </button>
    );
};

export default ValidatedComponent(FavGameBtn, favGameBtnSchema);

import { useState, useEffect, useRef } from 'react';
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
    const [isClickAnimation, setIsClickAnimation] = useState(false);

    const timerBtnRef = useRef(null);

    const btnClickAnimationHandler = () => {
        if (!isFavBtnActive) {
            setIsClickAnimation(true);

            clearTimeout(timerBtnRef.current);

            timerBtnRef.current = setTimeout(() => {
                setIsClickAnimation(false);
            }, 360);
        }
    };

    useEffect(() => {
        return () => {
            clearTimeout(timerBtnRef.current);
        };
    }, []);

    // console.log({ isFavBtnActive });
    // console.log({ isFavBtnClicked });
    // console.log({ favBtnClassName });
    // console.log({ isClickAnimation });

    return (
        <button
            className={`gameFavBtn ${gameBtnStyleClassName} ${isFavBtnActive ? 'active' : ''} ${isClickAnimation ? 'clickedAnimation' : ''}`}
            onClick={() => {
                btnClickAnimationHandler();

                onClickHandler();
            }}
        >
            <YourFavGamesIcon></YourFavGamesIcon>
        </button>
    );
};

export default ValidatedComponent(FavGameBtn, favGameBtnSchema);

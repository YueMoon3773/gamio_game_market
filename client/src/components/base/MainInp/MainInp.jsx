import { useState } from 'react';
import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import { ShowPwdIcon, HidePwdIcon } from '../../../assets/svgIcons';

import './MainInp.scss';

const mainInpSchema = z.object({
    inpType: z.string().default('text'),
    inpClass: z.string().optional(),
    isDisabled: z.boolean().optional(),
    inpLabel: z.string(),
    inpId: z.string(),
    inPlaceHolder: z.string().optional(),
    inpValue: z.string().nullable(),
    onChangeHandler: z.function().nullable(),
});

const MainInp = ({
    inpType = 'text',
    inpLabel,
    inpId,
    inpClass,
    inPlaceHolder,
    inpValue,
    onChangeHandler,
    isDisabled = false,
}) => {
    const [inputType, setInputType] = useState(inpType);
    const [isShowingPwd, setIsShowingPwd] = useState(false);

    const showPwdBtnOnClickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setInputType((prev) => {
            if (prev === 'password') {
                setIsShowingPwd(true);
                return 'text';
            }
            if (prev === 'text') {
                setIsShowingPwd(false);
                return 'password';
            }
        });
    };

    return (
        <div className="mainInpWrapper">
            <label className="mainInpLabel" htmlFor={inpId}>
                {inpLabel}
            </label>

            <div className="inpWrapper">
                <input
                    id={inpId}
                    name={inpId}
                    type={inputType}
                    className={`mainInpStyle ${inpClass}`}
                    value={inpValue}
                    onChange={onChangeHandler}
                    placeholder={inPlaceHolder}
                    disabled={isDisabled}
                />
            </div>

            {inpType === 'password' && (
                <button
                    onClick={showPwdBtnOnClickHandler}
                    className={`showPwdBtn ${isShowingPwd ? 'active' : ''}`}
                    disabled={isDisabled}
                >
                    {isShowingPwd ? <ShowPwdIcon></ShowPwdIcon> : <HidePwdIcon></HidePwdIcon>}
                </button>
            )}
        </div>
    );
};

export default ValidatedComponent(MainInp, mainInpSchema);

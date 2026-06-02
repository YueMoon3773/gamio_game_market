import { z } from 'zod';

import ValidatedComponent from '../../../utils/validateComponentProps';

import './UserControllerDropDown.scss';

const userControllerDropDownSchema = z.object({
    isOpen: z.boolean().default(false),
    logOutOnClickHandler: z.function(),
});

const UserControllerDropDown = ({ isOpen = false, logOutOnClickHandler }) => {
    // console.log({ isOpen });

    return (
        <ul className={`headerUsrDropDownList ${isOpen === true ? 'open' : ''}`}>
            <li className="usrDropDownItem">
                <span onClick={logOutOnClickHandler}>Log out</span>
            </li>
        </ul>
    );
};

export default ValidatedComponent(UserControllerDropDown, userControllerDropDownSchema);

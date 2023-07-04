import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

type Props = {
    open: boolean;
    anchorEl: any;
    setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
    options: string[];
    itemId: string;
};
const ITEM_HEIGHT = 48;
function ActionMenu({ open, anchorEl, setAnchorEl, options, itemId }: Props) {
    const navigate = useNavigate();
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSelectedMenuClose = (option: string) => {
        let doOption = '';
        if (option === 'Edit') {
            doOption = 'edit';
        } else if (option === 'View') {
            doOption = 'view';
        } else {
            doOption = 'download';
        }
        setAnchorEl(null);
        navigate(`${doOption}/${itemId}`);
    };
    return (
        <Menu
            id="long-menu"
            MenuListProps={{
                'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '11ch',
                },
            }}
        >
            {options.map((option) => (
                <MenuItem
                    key={option}
                    selected={option === 'Pyxis'}
                    onClick={() => handleSelectedMenuClose(option)}
                >
                    {option}
                </MenuItem>
            ))}
        </Menu>
    )
}

export default ActionMenu
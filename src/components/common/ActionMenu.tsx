import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  open: boolean;
  anchorEl: any;
  setAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>;
  options: string[];
  callback: (...args: any[]) => any;
};
const ITEM_HEIGHT = 48;
function ActionMenu({ open, anchorEl, setAnchorEl, options, callback }: Props) {
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectedMenuClose = (option: string) => {
    setAnchorEl(null);
    callback(option);
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
  );
}

export default ActionMenu;

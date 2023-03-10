import { AppBar, Toolbar } from '@mui/material';

function TopBar() {
  return (
    <AppBar
      position="fixed"
      className="w-full bg-stone-900 text-gray-50 shadow-none"
    >
      <Toolbar className="ml-80">
        <div className=""> </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

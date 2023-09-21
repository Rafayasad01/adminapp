import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
  return (
    <div className="flex h-full min-h-[400px] w-full items-center justify-center">
      <CircularProgress color="inherit" />
    </div>
  );
}
export default Loader;

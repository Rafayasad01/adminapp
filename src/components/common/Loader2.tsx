import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
  return (
    <>
      <div className="h-full w-full min-h-[400px] flex justify-center items-center" >
        <CircularProgress color="inherit" />
      </div>
    </>
  );
}
export default Loader;

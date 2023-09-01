import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
  return (
    <>
      <div className="h-full w-full" />
      <Backdrop open sx={{ color: '#F9FAFB', zIndex: 9999 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
export default Loader;

import CircularProgress from '@mui/material/CircularProgress';

function Loader({ minH }: any) {
  return (
    <div
      className={`flex h-full ${
        minH || 'min-h-[200px]'
      } w-full items-center justify-center`}
    >
      <CircularProgress size={15} color="inherit" />
    </div>
  );
}
export default Loader;

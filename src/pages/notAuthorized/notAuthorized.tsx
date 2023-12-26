import TopBar from '../../components/common/TopBar';

const notAuthorized = () => {
  return (
    <div className="flex">
      <div className="w-full pr-3">
        <TopBar />
        <div className="flex h-screen items-center justify-center">
          <p>Not Authorized</p>
        </div>
      </div>
    </div>
  );
};

export default notAuthorized;

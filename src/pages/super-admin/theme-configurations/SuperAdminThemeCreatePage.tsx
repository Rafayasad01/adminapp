import { memo, useState } from 'react';
import TopBar from '../../../components/common/TopBar';
import _ from 'lodash';
import Service from '../../../services/superadmin/systemConfig';
import { useNavigate } from 'react-router-dom';
import Notify from '../../../components/common/Notify';
import SuperAdminThemeForm from './SuperAdminThemeForm';

const SuperAdminThemeCreatePage = () => {
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const navigate = useNavigate();
  const [notifyMessage, setNotifyMessage] = useState({});

  /**
   * Handles the creation of a form.
   *
   * @param {any} data - The data from the form.
   * @returns {void}
   */
  const createFormHandler = (data: any) => {
    setIsLoader(true);
    if (data.key) {
      Service.createTheme(data)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
            navigate('../list');
          } else {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'error',
            });
          }
        })
        .catch((err) => {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
        });
    } else {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: 'All fields are required!',
        type: 'error',
      });
    }
  };

  return (
    <>
      <TopBar title="Theme" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                Add new Themes
              </span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <div className="Content p-5">
              <SuperAdminThemeForm
                onSubmit={createFormHandler}
                editMode={false}
                theme={null}
              />
            </div>
          </div>
        </div>
      </div>

      {isNotify && (
        <Notify
          isOpen={isNotify}
          setIsOpen={setIsNotify}
          displayMessage={notifyMessage}
        />
      )}
    </>
  );
};

export default memo(SuperAdminThemeCreatePage);

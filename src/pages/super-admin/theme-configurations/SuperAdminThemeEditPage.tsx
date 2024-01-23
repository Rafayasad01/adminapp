import { memo, useEffect, useState } from 'react';
import TopBar from '../../../components/common/TopBar';
import _ from 'lodash';
import Service from '../../../services/superadmin/systemConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Notify from '../../../components/common/Notify';
import SuperAdminThemeForm from './SuperAdminThemeForm';
import Loader from '../../../components/common/Loader';
import { Theme } from '../../../interfaces/superadmin/theme.interface';

const SuperAdminThemeEditPage = () => {
  const params = useParams();
  const Id = params.id ?? '';
  const [isLoader, setIsLoader] = useState(true);
  const [isNotify, setIsNotify] = useState(false);
  const navigate = useNavigate();
  const [notifyMessage, setNotifyMessage] = useState({});
  const [editThemeData, setEditThemeData] = useState<Theme | null>(null);

  /**
   * Fetches theme data from the server based on the provided ID.
   * If successful, updates state variables and displays success notification.
   * If unsuccessful, displays error notification and navigates to the theme list.
   */
  const getTheme = () => {
    setIsLoader(true);
    if (!_.isEmpty(Id)) {
      Service.getTheme(Id)
        .then((item: any) => {
          if (item.data.success) {
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: item.data.message,
              type: 'success',
            });
            setEditThemeData(item.data.data);
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
          navigate('../list');
        });
    } else {
      setIsLoader(false);
      setIsNotify(true);
      setNotifyMessage({
        text: 'Error in loading theme data.',
        type: 'error',
      });
      navigate('../list');
    }
  };

  /**
   * Handles the update of theme data on the server.
   * If successful, displays success notification and navigates to the theme list.
   * If unsuccessful, displays error notification.
   * @param {Object} data - The data to be updated.
   */
  const updateFormHandler = (data: any) => {
    setIsLoader(true);
    if (data.key) {
      Service.updateTheme(Id, data)
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

  useEffect(() => {
    getTheme();
  }, [Id]);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <TopBar title="Theme" />
      <div className="container m-auto mt-5">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                Edit Themes
              </span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-none">
            <div className="Content p-5">
              <SuperAdminThemeForm
                onSubmit={updateFormHandler}
                editMode={true}
                theme={editThemeData}
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

export default memo(SuperAdminThemeEditPage);

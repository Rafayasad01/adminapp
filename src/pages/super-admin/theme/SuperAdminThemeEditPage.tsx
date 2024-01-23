import { memo, useEffect, useState } from 'react';
import TopBar from '../../../components/common/TopBar';
import _ from 'lodash';
import Service from '../../../services/superadmin/theme';
import { useNavigate, useParams } from 'react-router-dom';
import Notify from '../../../components/common/Notify';
import SuperAdminThemeForm from './SuperAdminThemeForm';
import Loader from '../../../components/common/Loader';
import { Theme } from '../../../interfaces/superadmin/theme.interface';
import { useNotification } from '../../../components/Contexts/NotificationContext';

const SuperAdminThemeEditPage = () => {
  const params = useParams();
  const Id = params.id ?? '';
  const [isLoader, setIsLoader] = useState(true);
  const navigate = useNavigate();
  const [editThemeData, setEditThemeData] = useState<Theme | null>(null);
  // Notify
  const { notification, hideNotification, showNotification } =
    useNotification();

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
            setEditThemeData(item.data.data);
          } else {
            setIsLoader(false);
            showNotification(item.data.message, 'error');
          }
        })
        .catch((err) => {
          setIsLoader(false);
          showNotification(err.message, 'error');
          navigate('../list');
        });
    } else {
      setIsLoader(false);
      showNotification('Error in loading theme data.', 'error');
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
            showNotification(item.data.message, 'success');
            navigate('../list');
          } else {
            setIsLoader(false);
            showNotification(item.data.message, 'error');
          }
        })
        .catch((err) => {
          setIsLoader(false);
          showNotification(err.message, 'error');
        });
    } else {
      setIsLoader(false);
      showNotification('All fields are required!', 'error');
    }
  };

  useEffect(() => {
    getTheme();
  }, [Id]);

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <TopBar title="Theme" isNestedRoute={true} />
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

      {notification && (
        <Notify
          isOpen={true}
          setIsOpen={hideNotification}
          displayMessage={notification}
        />
      )}
    </>
  );
};

export default memo(SuperAdminThemeEditPage);

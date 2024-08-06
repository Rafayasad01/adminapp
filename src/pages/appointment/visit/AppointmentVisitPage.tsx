import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CustomBgDropdown from '../../../components/common/CustomBgDropdown';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import { AppointmentVisit } from '../../../interfaces/app.appointment';
import { useAppSelector } from '../../../redux/redux-hooks';
import appointmentService from '../../../services/adminapp/adminAppointment';
import employeeService from '../../../services/adminapp/adminStoreEmployee';
import {
  ALL_PERMISSIONS,
  APPOINTMENT_TYPE,
  NOT_AUTHORIZED_MESSAGE,
} from '../../../utils/constants';
import promiseHandler, { listingRolePermission } from '../../../utils/helper';
import AllAppointment from '../AllAppointment';
import AppointmentVisitUpdatePopup from './AppointmentVisitUpdatePopup';

function AppointmentVisitPage() {
  const navigate = useNavigate();
  const _authState = useAppSelector((state) => state.authState);
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const [search, _setSearch] = useState<any>('');
  const [page, _setPage] = useState(0);
  const [
    list,
    // setList
  ] = useState<any>([]);
  const [editDetails] = useState<any>();
  const [actionMenuItemId, _setActionMenuItemId] = useState<any>();
  const [openEditFormDialog, setOpenEditFormDialog] = useState(false);
  const [isLoader, setIsLoader] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(false);
  const [notifyMessage, setNotifyMessage] = React.useState({});
  const [selectedPriorityData, setSelectedPriorityData] = useState<any>([]);
  const [priorityData, setPriorityData] = useState<any>([]);

  // dropdown
  const [appointmentType, setAppointmentType] = useState({
    text: 'All Appointments',
    icon: GroupsOutlinedIcon,
  });

  const { reset } = useForm<AppointmentVisit>();

  const handleFormClickOpen = () => {
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storeAppointment.addAppointment
      )
    ) {
      navigate('./add-appointment');
      // setOpenFormDialog(true);
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  useEffect(() => {
    if (appointmentType?.text === 'All Appointments') {
      const getStoreEmployeeList = async () => {
        const storeEmployeeListPromise = employeeService.StoreEmployeeList(
          search,
          page,
          2000
        );
        const [
          storeEmployeeListResult,
          storeEmployeeListError,
          storeEmployeeListOk,
        ] = await promiseHandler(storeEmployeeListPromise);
        if (!storeEmployeeListOk) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: storeEmployeeListError.message,
            type: 'error',
          });
          return;
        }
        if (!storeEmployeeListResult.data.success) {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: storeEmployeeListResult.data.message,
            type: 'error',
          });
          return;
        }
        setIsLoader(false);
        // console.log('item', item);
        const temp = storeEmployeeListResult.data.data.list.map((el) => ({
          text: el.name,
          id: el.id,
          imageUrl: el.avatar,
        }));
        // console.log('🚀 ~ temp ~ temp:', temp);
        setPriorityData(temp);
      };
      if (
        listingRolePermission(
          dataRole,
          ALL_PERMISSIONS.storeAppointment.viewAppointment
        )
      ) {
        getStoreEmployeeList();
      } else {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: NOT_AUTHORIZED_MESSAGE,
          type: 'warning',
        });
      }
    }
  }, []);

  const updateFormHandler = (data: any) => {
    // console.log('datata', data);
    setIsLoader(true);
    appointmentService
      .VisitUpdate(data)
      .then((item) => {
        if (item.data.success) {
          // console.log('UPDATED', item.data.data);
          setOpenEditFormDialog(false);
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'success',
          });
          for (let i = 0; i < list.length; i += 1) {
            if (list[i].id === actionMenuItemId?.id) {
              list[i].name = item.data.data.name;
              list[i].note = item.data.data.note;
              list[i].phone = item.data.data.phone;
              list[i].appointmentTime = item.data.data.appointmentTime;
              list[i].appointmentDate = item.data.data.appointmentDate;
              list[i].appointmentService = item.data.data.appointmentService;
              list[i].appointmentProvider = item.data.data.appointmentProvider;
            }
          }
          reset();
        } else {
          setOpenEditFormDialog(false);
          reset();
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: item.data.message,
            type: 'error',
          });
        }
      })
      .catch((err) => {
        reset();
        setOpenEditFormDialog(false);
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  return isLoader ? (
    <Loader />
  ) : (
    <>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Appointment" />
      <div className="main--custom container m-auto mt-5">
        <div className="sub--cs w-full rounded-lg bg-white shadow-lg ">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="flex xl:col-span-7 2xl:col-span-9">
              <div className="mr-6">
                <span className="font-open-sans text-xl font-semibold text-[#252733]">
                  All Appointments
                </span>
              </div>
              <div>
                <CustomBgDropdown
                  appointmentType={appointmentType}
                  setAppointmentType={(event: any) => {
                    if (event.text === 'All Appointments') {
                      setAppointmentType(event);
                      return;
                    }
                    setSelectedPriorityData([priorityData[0] ?? {}]);
                    setAppointmentType(event);
                  }}
                  options={APPOINTMENT_TYPE}
                />
              </div>
            </div>
            <div className="grid justify-end xl:col-span-5 2xl:col-span-3">
              <div className="flex gap-3">
                <div className="flex">
                  <Button
                    variant="contained"
                    className="btn-black-fill btn-icon"
                    onClick={handleFormClickOpen}
                  >
                    <AddOutlinedIcon /> Add New Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <AllAppointment
              appointmentType={appointmentType?.text}
              priorityData={priorityData.length ? priorityData : [{}]}
              selectedPriorityData={selectedPriorityData}
              setSelectedPriorityData={setSelectedPriorityData}
              setAppointmentType={setAppointmentType}
            />
          </div>
        </div>
      </div>
      {openEditFormDialog && (
        <AppointmentVisitUpdatePopup
          setIsNotify={setIsNotify}
          setNotifyMessage={setNotifyMessage}
          openFormDialog={openEditFormDialog}
          setOpenFormDialog={setOpenEditFormDialog}
          callback={updateFormHandler}
          formData={editDetails}
        />
      )}
    </>
  );
}

export default AppointmentVisitPage;

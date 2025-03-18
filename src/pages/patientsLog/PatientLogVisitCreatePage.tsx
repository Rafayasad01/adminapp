import {
  Button,
  FormControl,
  TablePagination,
  TextareaAutosize,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import TopBar from '../../components/common/Md-Alder/TopBar';
import PatientProfileInfo from '../../components/common/Md-Alder/PatientLog/PatientProfileInfo';
import Tabs, { Tab } from '../../components/common/Tab';
import PatientPresenting from './PatientLogVisitCreateComponents/PatientPresenting';
import PatientPrescription from './PatientLogVisitCreateComponents/PatientPrescription';
import PatientLabTest from './PatientLogVisitCreateComponents/PatientLabTest';
import PatientScan from './PatientLogVisitCreateComponents/PatientScan';
import EyeIcon from '../../components/icons/EyeIcon';
import service from '../../services/adminapp/adminPatient';
import { useSnackbar } from '../../components/hooks/useSnackbar';
import { PATTERN } from '../../utils/constants';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader2';

const PatientLogVisitCreatePage = () => {
  const { state } = useLocation();
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();
  const methods = useForm();
  const { handleSubmit, register } = methods;

  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [search, setSearch] = useState('');
  // const { register, handleSubmit, formState: { errors } } = useForm();

  const tabs: Tab[] = [
    { label: 'Presenting Complaints' },
    { label: 'Prescription' },
    { label: 'Lab Test' },
    { label: 'Scan' },
    { label: 'Previous Visits' },
  ];

  const onSave = (data: any) => {
    // console.log('Data', data);
    setIsLoader(true);
    const formData = new FormData();
    formData.append('patient', state.id);
    formData.append('medicalNote', data.medicalNote);
    formData.append('chiefComplaint', data.complaintName);
    formData.append('complaintType', data.complaintType);
    formData.append('symptoms', data.symptoms);
    formData.append('diagnose', data.diagnose);
    formData.append('differentialDiagnose', data.differentialDiagnose);
    formData.append(
      'complaintDurationStartTime',
      data.durationStartTime
        ? dayjs(data.durationStartTime).format('YYYY-MM-DD HH:mm:ss')
        : ''
    );
    formData.append(
      'complaintDurationEndTime',
      data.durationEndTime
        ? dayjs(data.durationEndTime).format('YYYY-MM-DD HH:mm:ss')
        : ''
    );
    formData.append(
      'complaintFollowUpTime',
      data.followupTime
        ? dayjs(data.followupTime).format('YYYY-MM-DD HH:mm:ss')
        : ''
    );
    if (data.prescriptions)
      formData.append('prescriptions', JSON.stringify(data.prescriptions));
    formData.append('cbc', data.cbc || false);
    formData.append('uce', data.uce || false);
    formData.append('lft', data.lft || false);
    formData.append('urineDr', data.urineDr || false);
    formData.append('biopsy', data.biopsy || false);
    formData.append('radiology', data.radiology || false);
    formData.append('otherLabsDesc', data.otherLabsDesc || '');
    if (data?.scanMedia) {
      data.scanMedia.forEach(
        (item: { image: File | null; caption: string }, index: number) => {
          if (item.image) {
            formData.append(`avatar`, item.image);
          }
          if (item.caption) {
            formData.append(`imgCaption${index + 1}`, item.caption);
          }
        }
      );
    }
    service
      .createVisit(formData)
      .then((item) => {
        if (item.data.success) {
          showMessage(item.data.message, 'success');
          setIsLoader(false);
        } else {
          showMessage(item.data.message, 'error');
          setIsLoader(false);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        showMessage(err.message, 'error');
      });
  };

  useEffect(() => {
    service
      .getListVisit({ search, page, size: rowsPerPage, patient: state.id })
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setList(item.data.data.list);
          setTotal(item.data.data.total);
        } else {
          showMessage(item.data.message, 'error');
          setIsLoader(false);
        }
      })
      .catch((err) => {
        showMessage(err.message, 'error');
      });
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
    service
      .getListVisit({
        search,
        page: newPage,
        size: rowsPerPage,
        patient: state.id,
      })
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newRowperPage = parseInt(event.target.value, 10);
    const newPage = 0;
    setRowsPerPage(newRowperPage);
    setPage(newPage);
    service
      .getListVisit({
        search,
        page: newPage,
        size: newRowperPage,
        patient: state.id,
      })
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  return (
    <FormProvider {...methods}>
      <TopBar title="Patient Profile" />
      <div className="mt-10 pr-5">
        <PatientProfileInfo data={state} />

        <div className="alder-content alder-patient-visit-logs mt-10 p-5">
          <div className="justify-between md:flex">
            <div className="">
              <h4 className="alder-content-title capitalize">
                description/medical note
              </h4>
            </div>
          </div>
          <FormControl className="mt-5 w-full" variant="standard">
            <TextareaAutosize
              {...register('medicalNote', {
                required: 'this is required',
                pattern: PATTERN.CHAR_NUM_DASH,
                validate: (value) => value.length <= 100,
              })}
              className=" FormInput alder-form-control text-sm"
              placeholder="Type Here"
              minRows={4}
            />
          </FormControl>

          <div className="mt-8">
            <div className="flex justify-end">
              <Button
                variant="outlined"
                className="rounded-xl border-background px-10 font-bold text-background"
                onClick={handleSubmit(onSave)}
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        <div className="alder-content alder-patient-info-tabs my-5 p-5">
          <Tabs tabs={tabs}>
            <PatientPresenting />
            <PatientPrescription />
            <PatientLabTest />
            <PatientScan />
            <div>
              <div className="alder-revisit-table-container">
                {isLoader ? (
                  <Loader />
                ) : (
                  <>
                    <div className="table-responsive mt-2">
                      <table>
                        <thead className="capitalize">
                          <tr>
                            <th className="font-an-gurmukhi text-secondary2">
                              Visit
                            </th>
                            <th className="font-an-gurmukhi text-secondary2">
                              Medical note
                            </th>
                            <th>{}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {list?.map((e: any, i: number) => (
                            <tr key={i}>
                              <td className="py-1 font-an-gurmukhi text-base font-medium text-secondary2">
                                {dayjs(e.createdAt).format('DD MMMM, YYYY')}
                              </td>
                              <td className="py-1 font-an-gurmukhi text-base font-medium text-secondary2">
                                {e.medicalNote}
                              </td>
                              <td className="py-1 font-an-gurmukhi text-base font-medium text-secondary2">
                                <Button
                                  onClick={() =>
                                    navigate(`../visit-details/${state.id}`, {
                                      state: { data: list[i], user: state },
                                    })
                                  }
                                >
                                  <EyeIcon className="h-[25px]" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {list?.length < 1 ? (
                      <CustomText text="No Records Found" />
                    ) : null}
                    <div className="mt-3 flex w-[100%] justify-center py-3">
                      <TablePagination
                        component="div"
                        count={total}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </div>
                  </>
                )}
              </div>
              {/* <div>
                <table>
                  <thead>
                    <tr>
                      <th className="font-an-gurmukhi text-base font-medium text-secondary2">
                        Visit
                      </th>
                      <th className="font-an-gurmukhi text-base font-medium text-secondary2">
                        Medical note
                      </th>
                      <th>{}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-an-gurmukhi font-normal  text-secondary2">
                        24, Apr, 2023
                      </td>
                      <td className="font-an-gurmukhi font-normal text-secondary2">
                        I have screen allergy for 2 - 3 months
                      </td>
                      <td>
                        <Button>
                          <EyeIcon className="h-[25px]" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> */}
            </div>
          </Tabs>
        </div>
      </div>
    </FormProvider>
  );
};

export default PatientLogVisitCreatePage;

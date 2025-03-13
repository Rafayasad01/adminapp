import { Button, TablePagination } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import TopBar from '../../components/common/Md-Alder/TopBar';
import PatientProfileInfo from '../../components/common/Md-Alder/PatientLog/PatientProfileInfo';
import EyeIcon from '../../components/icons/EyeIcon';
import service from '../../services/adminapp/adminPatient';
import { useSnackbar } from '../../components/hooks/useSnackbar';
import CustomText from '../../components/common/CustomText';
import Loader from '../../components/common/Loader2';

const PatientLogProfilePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { showMessage } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [isLoader, setIsLoader] = useState(true);

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
    // offset? ,limit rowsperpage hoga ofset page * rowsperPage
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
    <>
      <TopBar title="Patient Profile" />
      <div className="mt-10 pr-5">
        <PatientProfileInfo data={state} />

        <div className="alder-content alder-patient-visit-logs my-5 py-10">
          <div className="justify-between md:flex">
            <div className="">
              <h4 className="alder-content-title capitalize">patient Visits</h4>
            </div>
            <Button
              variant="contained"
              onClick={() => navigate(`../revisit/${state.id}`, { state })}
              className="mx-1 rounded-xl border-primary bg-background text-primary"
            >
              <AddIcon className="mr-2" />
              Create New {list?.length ? 'Revisit' : 'Visit'}
            </Button>
          </div>

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
                          Presenting complaint
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
                            {dayjs(e.createdAt).format('YYYY-MM-DD HH:mm A')}
                          </td>
                          <td className="py-1 font-an-gurmukhi text-base font-medium text-secondary2">
                            {e.chiefComplaint}
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
        </div>
      </div>
    </>
  );
};

export default PatientLogProfilePage;

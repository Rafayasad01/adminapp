import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, TablePagination } from '@mui/material';
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import TopBar from '../../components/common/Md-Alder/TopBar';
import photo from '../../assets/images/Photo.png';
import EyeIcon from '../../components/icons/EyeIcon';
import CustomText from '../../components/common/CustomText';
import service from '../../services/adminapp/adminPatient';
import { useSnackbar } from '../../components/hooks/useSnackbar';
import Loader from '../../components/common/Loader2';

const PatientsLogPage = () => {
  const navigate = useNavigate();
  const { showMessage } = useSnackbar();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState<any>([]);
  const [search, setSearch] = useState('');
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    service
      .getList({ search, page, size: rowsPerPage })
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
      .getList({ search, page: newPage, size: rowsPerPage })
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
      .getList({ search, page: newPage, size: newRowperPage })
      .then((item) => {
        setList(item.data.data.list);
        setTotal(item.data.data.total);
      });
  };

  return (
    <>
      <TopBar title="Patient Log" />
      <div className="mt-10 py-5 pr-5">
        <div className="alder-content">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="alder-content-title font-an-gurmukhi">
                Patient Data
              </h4>
            </div>
            <div>
              <button
                onClick={() => navigate('../create')}
                className="flex h-[40px] w-[117px] items-center justify-center rounded-[10px] border-primary bg-background px-2 text-center text-primary shadow-md"
              >
                <AddOutlinedIcon fontSize="small" className="mr-0" />
                <span className="mt-[5px] font-an-gurmukhi">Add</span>
              </button>
            </div>
          </div>

          {isLoader ? (
            <Loader />
          ) : (
            <>
              <div className="table-responsive mt-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="font-an-gurmukhi text-secondary2">
                        Patient Name
                      </th>
                      <th className="font-an-gurmukhi text-secondary2">Age</th>
                      <th className="font-an-gurmukhi text-secondary2">
                        Phone
                      </th>
                      <th className="font-an-gurmukhi text-secondary2">
                        Gender
                      </th>
                      <th className="font-an-gurmukhi text-secondary2">
                        Created Date
                      </th>

                      <th className="w-[30px]">{}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list?.map((e: any, i: number) => (
                      <tr key={i}>
                        <td>
                          <div className="flex align-middle">
                            <img
                              src={e.avatar ? e.avatar : photo}
                              alt=""
                              height={32}
                              width={32}
                              className="rounded-[8px] "
                            />
                            <span className="ml-4 self-center font-an-gurmukhi font-medium text-secondary2">
                              {e.name}
                            </span>
                          </div>
                        </td>
                        <td className="font-an-gurmukhi text-secondary2">
                          {e.age || '--'}
                        </td>
                        <td className="font-an-gurmukhi text-secondary2">
                          {e.phone}
                        </td>
                        <td className="font-an-gurmukhi text-secondary2">
                          {e.gender}
                        </td>
                        <td className="font-an-gurmukhi text-secondary2">
                          {dayjs(e.createdAt).format('YYYY-MM-DD, hh:mm A')}
                        </td>
                        <td className="font-an-gurmukhi text-secondary2">
                          <Button
                            onClick={() =>
                              navigate(`../profile/${e.id}`, {
                                state: list[i],
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
              {list?.length < 1 ? <CustomText text="No Records Found" /> : null}
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
        {/* <div className="mt-10">
          <div className="mt-3 flex w-[100%] justify-center py-3">
            <Pagination count={10} page={1} />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default PatientsLogPage;

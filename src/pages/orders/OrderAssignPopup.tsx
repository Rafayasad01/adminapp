import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import popupStyle from './OrderAssignPopup.module.css';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import driver from '../../services/adminapp/adminDriver';
import dayjs from 'dayjs';
import { useAppSelector } from '../../redux/redux-hooks';
import assets from '../../assets';
import TablePagination from '@mui/material/TablePagination';

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    callback: Function;

};

function OrderAssignPopup({ open, setOpen, callback }: Props) {
    const authState: any = useAppSelector((state) => state.authState);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('status');
    const [time, setTime] = useState('time');
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [list, setList] = useState<any>([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const STATUS_ONLINE = 'Online';
    const onCloseHandler = (event: object, reason: string) => {
        // if (reason !== 'backdropClick') {
        setOpen(false);
        callback('0123456789')
        //}
    };
    const handleClickSearch = (event: any) => {
        const searchTxt = event.target.value as string;
        console.log('searchTxt:::::::', searchTxt)
        const newPage = 0;
        setSearch(searchTxt);
        setPage(newPage);
        driver.searchService(authState.user.tenant, searchTxt, newPage, rowsPerPage).then(item => {
            console.log('item::::::', item)
            setList(item.data.data.list);
            setTotal(item.data.data.total);
        })

    };
    const assignDriverClickHandler = (appUser: string) => {
        callback(appUser)
    }
    useEffect(() => {
        driver.getListService(authState.user.tenant, page, rowsPerPage).then((rsp) => {
            console.log('rsp:::::::', rsp)
            setList(rsp.data.data.list);
            setTotal(rsp.data.data.total)
        }).catch(err => {
            console.log('err::::::', err)
        })
    }, []);
    const getBadgeColor = (status: string) => {
        let badge = 'primary';
        if (status === 'Online') {
            badge = 'success';
        } else if (status === 'Offline') {
            badge = 'danger'
        }
        return badge;
    }
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        //offset? ,limit rowsperpage hoga ofset page * rowsperPage
        if (search === "" || search === null || search === undefined) {
            driver.getListService(authState.user.tenant, newPage, rowsPerPage).then(item => {
                setList(item.data.data.list);
                setTotal(item.data.data.total);
            });
        } else {
            driver.searchService(authState.user.tenant, search, newPage, rowsPerPage).then(item => {
                setList(item.data.data.list);
                setTotal(item.data.data.total);
            });
        }
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const newRowperPage = parseInt(event.target.value, 10);
        const newPage = 0;
        setRowsPerPage(newRowperPage);
        setPage(newPage);
        if (search === "" || search === null || search === undefined) {
            driver.getListService(authState.user.tenant, newPage, rowsPerPage).then(item => {
                setList(item.data.data.list);
                setTotal(item.data.data.total);
            });
        } else {
            driver.searchService(authState.user.tenant, search, newPage, rowsPerPage).then(item => {
                setList(item.data.data.list);
                setTotal(item.data.data.total);
            });
        }
    };
    return (
        <Dialog
            onClose={onCloseHandler}
            open={open}
            PaperProps={{
                className: popupStyle.Dialog,
                style: { maxWidth: '100%', maxHeight: 'auto' },
            }}
        >
            <div className={popupStyle.Content}>
                <div className={popupStyle.Row}>
                    <div className={popupStyle.Column8}>
                        <span className="font-open-sans text-xl font-semibold text-[#252733]">
                            Select Driver
                        </span>
                    </div>
                    <div className={popupStyle.Column4}>
                        <div className="flex flex-row justify-end gap-3">
                            <FormControl
                                className="search-grey-outline placeholder-grey w-60"
                                variant="filled"
                            >
                                <Input
                                    className="input-with-icon after:border-b-neutral-900"
                                    id="search"
                                    type="text"
                                    placeholder="Search"
                                    onKeyDown={(
                                        event: React.KeyboardEvent<
                                            HTMLInputElement | HTMLTextAreaElement
                                        >
                                    ) => {
                                        handleClickSearch(event);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <Divider
                                                sx={{ height: 28, m: 0.5 }}
                                                orientation="vertical"
                                            />
                                            <IconButton aria-label="toggle password visibility">
                                                <SearchIcon className="text-[#6A6A6A]" />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    disableUnderline
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="mt-3 grid grid-cols-none">
                    <table className="table-border table-auto">
                        <thead>
                            <tr>
                                <th>Drivers</th>
                                <th>Phone</th>
                                <th>Working Hours</th>
                                <th>License Number</th>
                                <th>Status</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.map((item: any) => {
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="avatar flex flex-row items-center">
                                                {/* <img src={assets.images.avatarUser} alt="" /> */}

                                                <Avatar sx={{ bgcolor: '#1D1D1D', width: 50, height: 50, textTransform: 'uppercase' }}>{item.firstName.charAt(0)}{item.lastName.charAt(0)}</Avatar>
                                                <div className="flex flex-col items-start justify-start">
                                                    <span className="text-sm font-semibold">
                                                        {item.firstName} {item.lastName}
                                                    </span>
                                                    <span className="text-xs font-normal text-[#6A6A6A]">
                                                        {dayjs(item.createdDate).format('MMMM DD, YYYY')}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.phone}</td>
                                        <td>4:00 to 8:00PM</td>
                                        <td>03 141 633</td>
                                        <td>
                                            <span className={`badge badge-${getBadgeColor(item.status)}`}>{item.status}</span>
                                        </td>
                                        <td>
                                            <Button
                                                variant="contained"
                                                className="btn-black-fill btn-icon"
                                                disableRipple
                                                onClick={() => { item.status === STATUS_ONLINE ? "" : assignDriverClickHandler(item.id) }}
                                            >
                                                Assign
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                <div className='w-[100%] mt-3 flex justify-center py-3'>
                    <TablePagination
                        component="div"
                        count={total}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>

            </div>
        </Dialog >
    );
}

export default OrderAssignPopup;

import SettingsIcon from '@mui/icons-material/Settings';
import ViewListIcon from '@mui/icons-material/ViewList';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomCard from '../../components/common/CustomCard';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import TopBar from '../../components/common/TopBar';
import StarBadgeGreen from '../../components/icons/StarBadgeGreen';
import StarBadgeRed from '../../components/icons/StarBadgeRed';
import Service from '../../services/adminapp/adminBranch';
import { formatName } from '../../utils/helper';
import BranchCategoryPopup from './BranchCategoryPopup';
import BranchSettingPopup from './BranchSettingPopup';

function BranchDetailPage() {
  const { branchId } = useParams();
  const [userDetail, setUserDetail] = useState<any>();
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [categories, setCategories] = useState<any>([]);
  const [subCategories, setSubCategories] = useState<any>([]);
  const [settingDetail, setSettingDetail] = useState<any>(null);
  const [openCategoryDialog, setOpenCategoryDialog] = useState<boolean>(false);
  const [openSettingDialog, setOpenSettingDialog] = useState(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [emptyVariable] = useState(null);

  const getSettingById = () => {
    setIsLoader(true);
    Service.getSettingService(branchId)
      .then((item: any) => {
        if (item.data.success) {
          setSettingDetail(item.data.data.tenantConfig);
          setOpenSettingDialog(true);
          setIsLoader(false);
        } else {
          setIsLoader(false);
        }
      })
      .catch((err) => {
        setIsLoader(false);
        setOpenSettingDialog(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  const getCategoryById = () => {
    setIsLoader(true);
    Service.getCategoryService(branchId)
      .then((item: any) => {
        if (item.data.success) {
          setCategories(item.data.data);
          setSubCategories(item.data.data[0].homeCatItem);
          setOpenCategoryDialog(true);
          setIsLoader(false);
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
        // console.log(err);
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  useEffect(() => {
    Service.getDetailService(branchId)
      .then((item) => {
        if (item.data.success) {
          setIsLoader(false);
          setUserDetail(item.data.data);
          // console.log('item', item.data);
          // console.log('item', item.data.data)
        } else {
          setIsLoader(false);
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
  }, [emptyVariable]);

  return isLoader ? (
    <Loader />
  ) : (
    userDetail && (
      <>
        <Notify
          isOpen={isNotify}
          setIsOpen={setIsNotify}
          displayMessage={notifyMessage}
        />
        <TopBar title="Branch User Detail" isNestedRoute />
        <div className="px-5">
          <div className="grid w-full grid-cols-12 rounded-lg bg-foreground  p-3">
            <div className="col-span-4 my-5">
              <div className="flex justify-between">
                <div className="">
                  <p className="text-sm font-semibold text-secondary">
                    Branch Owner
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="">
                    <IconButton
                      title="Branch Setting"
                      className="mx-2 p-0"
                      onClick={() => getSettingById()}
                    >
                      <SettingsIcon className="text-faded" />
                    </IconButton>
                  </div>
                  <IconButton
                    title="Branch Category"
                    className="mr-3 p-0 "
                    onClick={() => getCategoryById()}
                  >
                    <ViewListIcon className="text-faded" />
                  </IconButton>
                </div>
              </div>
              <div className="flex h-[92%] items-center justify-center">
                <div className="flex items-center">
                  <div>
                    {userDetail.avatar ? (
                      <Avatar
                        className=""
                        sx={{
                          bgcolor: '#1D1D1D',
                          width: 75,
                          height: 75,
                        }}
                        alt=""
                        src={userDetail.avatar}
                      />
                    ) : (
                      <Avatar
                        className="avatar flex flex-row items-center"
                        sx={{
                          bgcolor: '#1D1D1D',
                          width: 75,
                          height: 75,
                          textTransform: 'uppercase',
                          fontSize: '26px',
                        }}
                      >
                        {userDetail.firstName?.charAt(0)}
                        {userDetail.lastName?.charAt(0)}
                      </Avatar>
                    )}
                  </div>
                  <div className="px-5">
                    <div className="flex items-center justify-center">
                      <p className="text-sm font-semibold text-secondary">
                        {formatName(userDetail.firstName, userDetail.lastName)}
                      </p>
                      <div className="pl-2">
                        {userDetail.isActive ? (
                          <StarBadgeGreen />
                        ) : (
                          <StarBadgeRed />
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium lowercase text-secondary">
                        {userDetail.email}
                      </p>
                      <span className="text-sm font-medium text-secondary">
                        {dayjs(userDetail.createdDate).isValid() &&
                          dayjs(userDetail.createdDate)?.format(
                            'MMMM DD, YYYY'
                          )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-8 my-5 border-l-[1px] border-secondary px-10">
              <p className="text-sm font-semibold text-secondary">
                Branch Users
              </p>
              <div className="my-5 max-h-[100%] overflow-y-scroll">
                <div className="grid grid-cols-12 gap-6">
                  {userDetail.branchUsers?.map((item: any, index: number) => {
                    return (
                      <div key={index} className="col-span-6 2xl:col-span-4">
                        <CustomCard
                          title={`${item.firstName} ${item.lastName}`}
                          avatar={item.avatar}
                          email={item.username}
                          createdDate={item.createdDate}
                          status={item.isActive}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {openCategoryDialog && (
          <BranchCategoryPopup
            setOpenFormDialog={setOpenCategoryDialog}
            openFormDialog={openCategoryDialog}
            categories={categories}
            subCategories={subCategories}
            setSubCategories={setSubCategories}
            setCategories={setCategories}
          />
        )}

        {openSettingDialog && (
          <BranchSettingPopup
            setOpenFormDialog={setOpenSettingDialog}
            openFormDialog={openSettingDialog}
            detail={settingDetail}
          />
        )}
      </>
    )
  );
}

export default BranchDetailPage;

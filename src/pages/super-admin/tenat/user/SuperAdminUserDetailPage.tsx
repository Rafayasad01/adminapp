import Avatar from '@mui/material/Avatar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomAvatarWithName from '../../../../components/common/CustomAvatarWithName';
import Loader from '../../../../components/common/Loader';
import TopBar from '../../../../components/common/TopBar';
import StarBadgeGreen from '../../../../components/icons/StarBadgeGreen';
import StarBadgeRed from '../../../../components/icons/StarBadgeRed';
import Service from '../../../../services/superadmin/Tenant';
import { formatName } from '../../../../utils/helper';

function ShopAdminUserDetailPage() {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<any>();
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [emptyVariable] = useState(null);

  useEffect(() => {
    Service.getUserById(id).then((item) => {
      if (item.data.success) {
        setIsLoader(false);
        setUserDetail(item.data.data);
        // console.log('item', item.data);
        // console.log('item', item.data.data)
      } else {
        setIsLoader(false);
      }
    });
  }, [emptyVariable]);

  return isLoader ? (
    <Loader />
  ) : (
    userDetail && (
      <>
        <TopBar title="User Detail" isNestedRoute />
        <div className="px-5">
          <div className="grid w-full grid-cols-12 rounded-lg bg-[#F0F0F0] p-3">
            <div className="col-span-4">
              <p className="text-sm font-semibold text-secondary">Shop Owner</p>
              <div className="flex h-full items-center justify-center py-5">
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
                      <p className="text-sm font-medium lowercase text-[#6A6A6A]">
                        {userDetail.roleName}
                      </p>
                      <p className="text-sm font-medium lowercase text-[#6A6A6A]">
                        {userDetail.email}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center justify-center font-open-sans text-sm font-normal text-[#6A6A6A]">
                      <span className="badge badge-primary">
                        {userDetail.maxUserLimit} - {userDetail.userCounts}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-8 border-l-[1px] border-secondary px-10">
              <p className="text-sm font-semibold text-secondary">
                Shop Branches
              </p>
              <div className="my-5">
                {userDetail?.branchUsers?.length <= 0 && (
                  <p className="text-center text-sm">
                    This shop has no branches.
                  </p>
                )}
                <div className="grid grid-cols-4 xl:gap-4 2xl:gap-6">
                  {userDetail.branchUsers?.map((item: any, index: number) => {
                    return (
                      <div key={index} className="xl:col-span-2 2xl:col-span-1">
                        <CustomAvatarWithName
                          isactive={item.isActive}
                          center
                          customHeight="h-[60px]"
                          customWidth="w-[60px]"
                          avatarIcon={item.avatar}
                          firstname={item.firstName}
                          lastname={item.lastName}
                          title={formatName(item.firstName, item.lastName)}
                          details={{ role: item.roleName, email: item.email }}
                          badgeText={`${item.maxUserLimit} - ${item.userCounts}`}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default ShopAdminUserDetailPage;

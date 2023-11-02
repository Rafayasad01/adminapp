import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import assets from '../../../../assets';
import CustomAvatarWithName from '../../../../components/common/CustomAvatarWithName';
import TopBar from '../../../../components/common/TopBar';
import StarBadgeIcon from '../../../../components/icons/StarBadge';
import Service from '../../../../services/superadmin/Tenant';
import Loader from '../../../../components/common/Loader';
import { formatName } from '../../../../utils/helper';
import StarBadgeGreen from '../../../../components/icons/StarBadgeGreen';
import StarBadgeRed from '../../../../components/icons/StarBadgeRed';

function ShopAdminUserDetailPage() {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState<any>();
  const [isLoader, setIsLoader] = useState<boolean>(true);

  useEffect(() => {
    Service.getUserById(id).then((item) => {
      if (item.data.success) {
        setIsLoader(false);
        setUserDetail(item.data.data);
        console.log('item', item.data);
        // console.log('item', item.data.data)
      } else {
        setIsLoader(false);
      }
    });
  }, [id]);

  return isLoader ? (
    <Loader />
  ) : (
    userDetail && (
      <>
        <TopBar title="User Detail" isNestedRoute />
        <div className="px-5">
          <div className="grid h-[400px] w-full grid-cols-12 rounded-lg bg-[#F0F0F0] p-3">
            <div className="col-span-4">
              <p className="text-sm font-semibold text-[#1A1A1A]">Shop Owner</p>
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
                      <p className="text-sm font-semibold text-[#1A1A1A]">
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
            <div className="col-span-8 border-l-[1px] border-[#949EAE] px-10">
              <p className="text-sm font-semibold text-[#1A1A1A]">
                Shop Branches
              </p>
              <div className="my-5 max-h-[100%] overflow-y-scroll">
                <div className="grid grid-cols-4 gap-6">
                  {userDetail.branchUsers?.map((item: any, index: number) => {
                    return (
                      <div key={index} className="col-span-1">
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

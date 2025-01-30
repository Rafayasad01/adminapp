import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import TopBar from '../../components/common/TopBar';
import { useAppSelector } from '../../redux/redux-hooks';
import { ALL_PERMISSIONS } from '../../utils/constants';
import { listingRolePermission } from '../../utils/helper';
import VideoPage from './videos/VideoPage';
import ImagePage from './images/ImagePage';

function ProjectAttachment() {
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const { projectId } = useParams();
  const [selectedTab, setSelectedTab] = useState('IMAGE/VIDEOS');

  const handleTabChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storePlans.viewProjectAttachments
      )
    ) {
      setSelectedTab('IMAGE/VIDEOS');
      return;
    }
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storePlans.viewProjectAttachments
      )
    ) {
      setSelectedTab('IMAGES');
      return;
    }
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storePlans.viewProjectAttachments
      )
    ) {
      setSelectedTab('DOCS');
    }
  }, []);
  return (
    <>
      <TopBar title="Attachments" />
      <div className="cs-dialog container mx-auto mt-2 w-full px-3">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-7">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                Project Assets/Media
              </span>
            </div>
          </div>
          <div>
            <Tabs
              className={`${
                listingRolePermission(
                  dataRole,
                  ALL_PERMISSIONS.storePlans.viewProjectAttachments
                )
                  ? 'inline-block'
                  : 'hidden'
              } `}
              value={selectedTab}
              onChange={handleTabChange}
            >
              {listingRolePermission(
                dataRole,
                ALL_PERMISSIONS.storePlans.viewProjectAttachments
              ) && (
                <Tab
                  hidden={listingRolePermission(
                    dataRole,
                    !!ALL_PERMISSIONS.storePlans.viewProjectAttachments
                  )}
                  label="project images / videos"
                  value="IMAGE/VIDEOS"
                />
              )}
              {listingRolePermission(
                dataRole,
                ALL_PERMISSIONS.storePlans.viewProjectAttachments
              ) && (
                <Tab
                  hidden={listingRolePermission(
                    dataRole,
                    !!ALL_PERMISSIONS.storePlans.viewProjectAttachments
                  )}
                  label="3D-renders / blue print"
                  value="IMAGES"
                />
              )}
            </Tabs>
            {selectedTab === 'IMAGE/VIDEOS' && (
              <VideoPage projectId={projectId ?? null} />
            )}
            {selectedTab === 'IMAGES' && (
              <ImagePage projectId={projectId ?? null} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectAttachment;

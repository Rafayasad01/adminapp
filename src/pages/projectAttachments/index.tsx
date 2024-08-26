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
import DocsPage from './docs/DocsPage';

function ProjectAttachment() {
  const dataRole = useAppSelector(
    (state: any) => state?.persistedReducer?.roleState?.role?.permissions
  );
  const { projectId } = useParams();
  const [selectedTab, setSelectedTab] = useState('VIDEOS');

  const handleTabChange = (event: any, newValue: any) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.viewVideoPlans)
    ) {
      setSelectedTab('VIDEOS');
    }
    if (
      listingRolePermission(
        dataRole,
        ALL_PERMISSIONS.storePlans.viewImagesPlans
      )
    ) {
      setSelectedTab('IMAGES');
    }
    if (
      listingRolePermission(dataRole, ALL_PERMISSIONS.storePlans.viewDocsPlans)
    ) {
      setSelectedTab('DOCS');
    }
  }, []);
  return (
    <>
      <TopBar title="Attachments" />
      <div className="container m-auto mt-5">
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
                  ALL_PERMISSIONS.storePlans.viewPlans
                )
                  ? 'inline-block'
                  : 'hidden'
              } `}
              value={selectedTab}
              onChange={handleTabChange}
            >
              {listingRolePermission(
                dataRole,
                ALL_PERMISSIONS.storePlans.viewVideoPlans
              ) && (
                <Tab
                  hidden={listingRolePermission(
                    dataRole,
                    !!ALL_PERMISSIONS.storePlans.viewVideoPlans
                  )}
                  label="project videos"
                  value="VIDEOS"
                />
              )}
              {listingRolePermission(
                dataRole,
                ALL_PERMISSIONS.storePlans.viewImagesPlans
              ) && (
                <Tab
                  hidden={listingRolePermission(
                    dataRole,
                    !!ALL_PERMISSIONS.storePlans.viewImagesPlans
                  )}
                  label="3D-renders / blue print"
                  value="IMAGES"
                />
              )}
              {listingRolePermission(
                dataRole,
                ALL_PERMISSIONS.storePlans.viewDocsPlans
              ) && (
                <Tab
                  hidden={listingRolePermission(
                    dataRole,
                    !!ALL_PERMISSIONS.storePlans.viewDocsPlans
                  )}
                  label="approval and reports"
                  value="DOCS"
                />
              )}
            </Tabs>
            {selectedTab === 'VIDEOS' && (
              <VideoPage projectId={projectId ?? null} />
            )}
            {selectedTab === 'IMAGES' && (
              <ImagePage projectId={projectId ?? null} />
            )}
            {selectedTab === 'DOCS' && (
              <DocsPage projectId={projectId ?? null} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectAttachment;

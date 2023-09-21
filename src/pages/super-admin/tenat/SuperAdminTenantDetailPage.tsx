import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TopBar from '../../../components/common/TopBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SuperAdminTenantTabPage from './SuperAdminTenantTabPage';
import SuperAdminSettingTabPage from './SuperAdminSettingTabPage';
import SuperAdminUserTabPage from './SuperAdminUserTabPage';
import SuperAdminCategoryTabPage from './SuperAdminCategoryTabPage';

const SuperAdminTenantDetailPage = () => {
    const [tabPanel, setTabPanel] = React.useState(0);

    const params = useParams();
    const tenantId = params.id ?? '';

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabPanel(newValue);
    };
    return <>
        <TopBar isNestedRoute title="Tenant Detail" />
        <div className="container mt-5">
            <div className="grid w-full grid-cols-12 gap-3">
                <div className="col-span-12 min-h-[500px] rounded-lg bg-white py-3 shadow-lg">
                    <div className="custom-tab">
                        <Tabs value={tabPanel} aria-label="basic tabs example" TabIndicatorProps={{}} onChange={handleChange}>
                            <Tab
                                label="Tenant"
                                value={0}
                                disableRipple
                            />
                            <Tab
                                label="Settings"
                                value={1}
                                disableRipple
                            />
                            <Tab
                                label="User"
                                value={2}
                                disableRipple
                            />
                            <Tab
                                label="Category"
                                value={3}
                                disableRipple
                            />
                        </Tabs>
                    </div>
                    <div className="flex">
                        {tabPanel === 0 && (
                            <SuperAdminTenantTabPage tenant={tenantId} />
                        )}
                        {tabPanel === 1 && (
                            <SuperAdminSettingTabPage tenant={tenantId} />
                        )}
                        {tabPanel === 2 && (
                            <SuperAdminUserTabPage tenant={tenantId} />
                        )}
                        {tabPanel === 3 && (
                            <SuperAdminCategoryTabPage tenant={tenantId} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>;
}

export default SuperAdminTenantDetailPage;
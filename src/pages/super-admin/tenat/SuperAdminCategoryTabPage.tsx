import React, { useState, useEffect } from 'react';
import Loader2 from '../../../components/common/Loader2';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
//import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import assets from '../../../assets';
import Avatar from '@mui/material/Avatar';
import Service from '../../../services/superadmin/Tenant';

type Props = {
    tenant: string;
};

const SuperAdminCategoryTabPage = ({ tenant }: Props) => {
    const [isLoader, setIsLoader] = useState(true);
    const [expanded, setExpanded] = React.useState<string | false>('category0');
    const [expanded2, setExpanded2] = React.useState<string | false>('subCategory0');
    const [categories, setCategories] = useState<any>([]);
    const [subCategories, setSubCategories] = useState<any>([]);

    const handleChange =
        (panel: string, item: any) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
            setSubCategories(item);
            setExpanded2('subCategory0');
        };

    const handleChange2 =
        (panel: string, item: any) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded2(isExpanded ? panel : false);
        };

    useEffect(() => {
        Service.detailCategory(tenant).then((item: any) => {
            if (item.data.success) {
                setCategories(item.data.data);
                setIsLoader(false);
                setSubCategories(item.data.data[0].homeCatItem);
            }
        })
    }, [tenant]);

    return isLoader ? (
        <Loader2 />
    ) : (
        <div className="category-tab-content grid w-full grid-cols-12 gap-3">
            <div className="col-span-6">
                <div className='flex flex-col py-4 px-5'>Category Names</div>
                <div className='flex flex-col pt-2 pb-[2rem] px-5'>
                    {categories && categories.map((item: any, index: number) => (
                        <Accordion key={index} expanded={expanded === `category${index}`} onChange={handleChange(`category${index}`, item.homeCatItem)}
                            sx={{ border: expanded === `category${index}` ? '1px solid #C4C4C4 !important' : 'none', borderRadius: '8px !important' }}>
                            <AccordionSummary
                                className='accordian-summary'
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`category${index}bh-content`}
                                id={`category${index}bh-header`}
                            >
                                <div className="flex flex-row items-center w-full justify-between">
                                    <div className='flex flex-row items-center'>
                                        {item.icon ? (
                                            <Avatar
                                                className="avatar flex flex-row items-center"
                                                alt="Remy Sharp"
                                                src={item.icon}
                                                sx={{
                                                    width: 35,
                                                    height: 35,
                                                    textTransform: 'uppercase',
                                                    fontSize: '14px',
                                                    marginRight: '10px',
                                                }}
                                            />
                                        ) : (
                                            <Avatar
                                                className="avatar flex flex-row items-center"
                                                alt="Remy Sharp"
                                                src={assets.images.categoryIcon}
                                                sx={{
                                                    width: 35,
                                                    height: 35,
                                                    textTransform: 'uppercase',
                                                    fontSize: '14px',
                                                    marginRight: '10px',
                                                }}
                                            />
                                        )}
                                        <span className='text-[#1A1A1A] font-open-sans text-base font-semibold'>{item.name}</span>
                                    </div>
                                    {item.isActive ? (
                                        <span className="badge badge-success mr-1">Active</span>
                                    ) : (
                                        <span className="badge badge-danger mr-1">Inactive</span>
                                    )}
                                </div>
                            </AccordionSummary>
                            <AccordionDetails className='accordian-detail'>
                                <div className='flex flex-col'>
                                    <span className='text-[#1A1A1A] font-open-sans text-base font-semibold'>Description</span>
                                    <span className='text-[#6A6A6A] font-open-sans text-sm font-normal'>{item.desc}</span>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
            <div className="col-span-6">
                <div className='flex flex-col py-4 px-5'>Sub-Category</div>
                <div className='sub-category flex flex-col pt-2 pb-[2rem] px-5'>
                    {subCategories && subCategories.map((item: any, index: number) => (
                        <Accordion key={index} expanded={expanded2 === `subCategory${index}`} onChange={handleChange2(`subCategory${index}`, item)}
                            sx={{ border: expanded2 === `subCategory${index}` ? '1px solid #C4C4C4 !important' : 'none', background: expanded2 === `subCategory${index}` ? '#F0F0F0 !important' : 'none', borderRadius: '8px !important' }}>
                            <AccordionSummary
                                className='accordian-summary'
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`subCategory${index}bh-content`}
                                id={`subCategory${index}bh-header`}
                            >
                                <div className='flex flex-col w-full'>
                                    <div className="flex flex-row items-center">
                                        {item.icon ? (
                                            // <img src={item.icon} alt="" style={{ width: "35px", height: "35px", borderRadius: '50%', objectFit: "cover" }} />
                                            <Avatar
                                                className="avatar flex flex-row items-center mr-3"
                                                alt="Remy Sharp"
                                                src={item.icon}
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                    textTransform: 'uppercase',
                                                    fontSize: '14px',
                                                    marginRight: '10px',
                                                }}
                                            />
                                        ) : (
                                            <Avatar
                                                className="avatar flex flex-row items-center mr-3"
                                                alt="Remy Sharp"
                                                src={assets.images.subCategoryIcon}
                                                sx={{
                                                    width: 25,
                                                    height: 25,
                                                    textTransform: 'uppercase',
                                                    fontSize: '14px',
                                                    marginRight: '10px',
                                                }}
                                            />
                                        )}
                                        <span className='text-[#1A1A1A] text-sm font-semibold font-open-sans mr-3'>{item.name}</span>
                                        {item.isActive ? (
                                            <span className="badge badge-success">Active</span>
                                        ) : (
                                            <span className="badge badge-danger">Inactive</span>
                                        )}
                                    </div>
                                    <div className="item-detail flex flex-row items-center justify-between w-full mt-1">
                                        <span className='ml-8 text-[#1A1A1A] font-semibold text-sm font-open-sans'>${item.price}</span>
                                        <div className=''>
                                            <span className='text-[#6A6A6A] font-normal text-sm'>Quantity</span>
                                            <span className='mr-1 ml-3 text-[#1A1A1A] font-semibold text-sm font-open-sans'>{item.quantity}</span>
                                        </div>
                                    </div>
                                </div>

                            </AccordionSummary>
                            <AccordionDetails className='accordian-detail'>
                                <div className='flex w-full'>
                                    <span className='text-[#6A6A6A] font-normal text-sm font-open-sans'>{item.desc}</span>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SuperAdminCategoryTabPage;
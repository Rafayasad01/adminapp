import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import assets from '../../assets';

type Props = {
  setOpenFormDialog: any;
  openFormDialog: any;
  categories: any;
  subCategories: any;
  setSubCategories: any;
  setCategories: any;
};

function BranchCategoryPopup({
  setOpenFormDialog,
  openFormDialog,
  categories,
  subCategories,
  setSubCategories,
}: Props) {
  // const [isLoader, setIsLoader] = useState(true);
  const [expanded, setExpanded] = React.useState<string | false>('category0');
  const [expanded2, setExpanded2] = React.useState<string | false>(
    'subCategory0'
  );

  const handleChange =
    (panel: string, item: any) =>
    (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      setSubCategories(item);
      setExpanded2('subCategory0');
    };

  const handleChange2 =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded2(isExpanded ? panel : false);
    };

  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  return (
    <Dialog
      open={openFormDialog}
      onClose={handleFormClose}
      scroll="paper"
      PaperProps={{
        className: 'custom-width-80',
        style: { maxWidth: '100%', maxHeight: '80%' },
      }}
    >
      <div className="Content p-2">
        <div className="category-tab-content grid w-full grid-cols-12 gap-3">
          <div className="col-span-6">
            <div className="flex flex-col py-4 px-5 font-semibold">
              Category Names
            </div>
            <div className="flex max-h-[600px] flex-col px-5 py-3">
              {categories &&
                categories.map((item: any, index: number) => (
                  <Accordion
                    className=""
                    key={index}
                    expanded={expanded === `category${index}`}
                    onChange={handleChange(
                      `category${index}`,
                      item.homeCatItem
                    )}
                    sx={{
                      border:
                        expanded === `category${index}`
                          ? '1px solid #C4C4C4 !important'
                          : 'none',
                      borderRadius: '8px !important',
                    }}
                  >
                    <AccordionSummary
                      className="accordian-summary"
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`category${index}bh-content`}
                      id={`category${index}bh-header`}
                    >
                      <div className="flex w-full flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
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
                          <span className="font-open-sans text-base font-semibold text-secondary">
                            {item.name}
                          </span>
                        </div>
                        {item.isActive ? (
                          <span className="badge badge-success mr-1">
                            Active
                          </span>
                        ) : (
                          <span className="badge badge-danger mr-1">
                            Inactive
                          </span>
                        )}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className="accordian-detail">
                      <div className="flex flex-col">
                        <span className="font-open-sans text-base font-semibold text-secondary">
                          Description
                        </span>
                        <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                          {item.desc}
                        </span>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
          </div>
          <div className="col-span-6">
            <div className="flex flex-col py-4 px-5 font-semibold">
              Sub-Category
            </div>
            <div className="sub-category flex max-h-[600px] flex-col px-5 pt-2 pb-[2rem]">
              {subCategories &&
                subCategories.map((item: any, index: number) => (
                  <Accordion
                    key={index}
                    expanded={expanded2 === `subCategory${index}`}
                    onChange={handleChange2(`subCategory${index}`)}
                    sx={{
                      border:
                        expanded2 === `subCategory${index}`
                          ? '1px solid #C4C4C4 !important'
                          : 'none',
                      background:
                        expanded2 === `subCategory${index}`
                          ? '#F0F0F0 !important'
                          : 'none',
                      borderRadius: '8px !important',
                    }}
                  >
                    <AccordionSummary
                      className="accordian-summary"
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`subCategory${index}bh-content`}
                      id={`subCategory${index}bh-header`}
                    >
                      <div className="flex w-full flex-col">
                        <div className="flex flex-row items-center">
                          {item.icon ? (
                            // <img src={item.icon} alt="" style={{ width: "35px", height: "35px", borderRadius: '50%', objectFit: "cover" }} />
                            <Avatar
                              className="avatar mr-3 flex flex-row items-center"
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
                              className="avatar mr-3 flex flex-row items-center"
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
                          <span className="mr-3 font-open-sans text-sm font-semibold text-secondary">
                            {item.name}
                          </span>
                          {item.isActive ? (
                            <span className="badge badge-success">Active</span>
                          ) : (
                            <span className="badge badge-danger">Inactive</span>
                          )}
                        </div>
                        <div className="item-detail mt-1 flex w-full flex-row items-center justify-between">
                          <span className="ml-8 font-open-sans text-sm font-semibold text-secondary">
                            ${item.price}
                          </span>
                          <div className="">
                            <span className="text-sm font-normal text-[#6A6A6A]">
                              Quantity
                            </span>
                            <span className="mr-1 ml-3 font-open-sans text-sm font-semibold text-secondary">
                              {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className="accordian-detail">
                      <div className="flex w-full">
                        <span className="font-open-sans text-sm font-normal text-[#6A6A6A]">
                          {item.desc}
                        </span>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default BranchCategoryPopup;

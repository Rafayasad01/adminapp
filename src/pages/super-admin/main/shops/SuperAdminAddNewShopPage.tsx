import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import SuperAdminTopBar from '../../../../components/super-admin/common/SuperAdminTopbar';
import { Marker } from '../../../../interfaces/map.interface';
import SuperAdminMarkersMap from '../../../../components/super-admin/common/SuperAdminMap';
import SuperAdminDragDropFile from '../../../../components/super-admin/common/SuperAdminDragDropFile';

const data = [
  { name: 'Address1', lat: -33.890542, lng: 151.274856 },
  { name: 'Address2', lat: -33.923036, lng: 151.259052 },
];
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && children}
    </div>
  );
}

function SuperAdminAddNewShopPage() {
  const [markers, setMarkers] = useState<Marker[]>(data);
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };
  return (
    <>
      <SuperAdminTopBar title="Add New Shop" />
      <div className="container mt-5">
        <div className="grid w-full grid-cols-12 gap-3">
          <div className="col-span-6 min-h-[32rem] rounded-lg bg-gray-50 py-3 shadow-lg">
            <Tabs value={tab} onChange={handleTabChange} aria-label="tabs">
              <Tab
                sx={{
                  '&.MuiTab-root': {
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                    color: '#737373',
                  },
                  '&.Mui-selected': {
                    color: '#171717',
                  },
                }}
                label="Shop Info"
                id="tab-0"
                aria-controls="tabpanel-0"
              />
              <Tab
                sx={{
                  '&.MuiTab-root': {
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                    color: '#737373',
                  },
                  '&.Mui-selected': {
                    color: '#171717',
                  },
                }}
                label="Social Links"
                id="tab-1"
                aria-controls="tabpanel-1"
              />
              <Tab
                sx={{
                  '&.MuiTab-root': {
                    fontSize: '1rem',
                    lineHeight: '1.5rem',
                    fontWeight: '600',
                    fontFamily: 'Open Sans',
                    color: '#737373',
                  },
                  '&.Mui-selected': {
                    color: '#171717',
                  },
                }}
                label="Shop Settings"
                id="tab-2"
                aria-controls="tabpanel-2"
              />
            </Tabs>
            <TabPanel value={tab} index={0}>
              <div className="w-full p-4">
                <SuperAdminDragDropFile />
                <div className="mt-4 grid grid-cols-12 gap-1">
                  <div className="col-span-12 ">
                    <div className="w-full">
                      <label
                        htmlFor="shopName"
                        className="ml-1.5 font-open-sans text-sm font-normal text-neutral-900 opacity-70"
                      >
                        Shop Name
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="shopName"
                          type="text"
                          name="shopName"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-span-6 ">
                    <div className="w-full">
                      <label
                        htmlFor="email"
                        className="ml-1.5 font-open-sans text-sm font-normal text-neutral-900 opacity-70"
                      >
                        Email
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="email"
                          type="email"
                          name="email"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="w-full">
                      <label
                        htmlFor="phone"
                        className="ml-1.5 font-open-sans text-sm font-normal text-neutral-900 opacity-70"
                      >
                        Phone
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="phone"
                          type="text"
                          name="phone"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="w-full">
                      <label
                        htmlFor="location1"
                        className="ml-1.5 flex items-center justify-between  opacity-70"
                      >
                        <div className="font-open-sans text-sm font-normal text-neutral-900">
                          Location 1
                        </div>
                        <IconButton className="p-0 text-emerald-400">
                          <AddCircleOutlineOutlinedIcon color="inherit" />
                        </IconButton>
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="location1"
                          type="text"
                          name="location1"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="w-full">
                      <label
                        htmlFor="location2"
                        className="ml-1.5 flex items-center justify-between  opacity-70"
                      >
                        <div className="font-open-sans text-sm font-normal text-neutral-900">
                          Location 2
                        </div>
                        <IconButton className="p-0 text-red-400">
                          <RemoveCircleOutlineOutlinedIcon color="inherit" />
                        </IconButton>
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="location2"
                          type="text"
                          name="location2"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="py-3" />
                <div className="flex items-center justify-end gap-4">
                  <Button
                    variant="outlined"
                    className="w-28 border-neutral-900 text-neutral-900"
                  >
                    Cancel
                  </Button>
                  <Button className="w-28 bg-neutral-900 text-gray-50">
                    Next
                  </Button>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <div className="w-full p-4">
                <div className="mt-4 grid grid-cols-12 gap-1">
                  <div className="col-span-12">
                    <div className="w-full">
                      <label
                        htmlFor="facebookURL"
                        className="ml-1.5 flex items-center justify-between  opacity-70"
                      >
                        Facebook
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          placeholder="URL"
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="facebookURL"
                          type="text"
                          name="facebookURL"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="w-full">
                      <label
                        htmlFor="instagramURL"
                        className="ml-1.5 flex items-center justify-between  opacity-70"
                      >
                        Instagram
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          placeholder="URL"
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="instagramURL"
                          type="text"
                          name="instagramURL"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="w-full">
                      <label
                        htmlFor="linkedInURL"
                        className="ml-1.5 flex items-center justify-between  opacity-70"
                      >
                        LinkedIn
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          placeholder="URL"
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="linkedInURL"
                          type="text"
                          name="linkedInURL"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="w-full">
                      <label
                        htmlFor="twitterURL"
                        className="ml-1.5 flex items-center justify-between  opacity-70"
                      >
                        Twitter
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          placeholder="URL"
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="twitterURL"
                          type="text"
                          name="twitterURL"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="w-full">
                      <label
                        htmlFor="youTubeURL"
                        className="ml-1.5 flex items-center justify-between  opacity-70"
                      >
                        YouTube
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          placeholder="URL"
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="youTubeURL"
                          type="text"
                          name="youTubeURL"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="w-full">
                      <label
                        htmlFor="whatsAppURL"
                        className="ml-1.5 flex items-center justify-between  opacity-70"
                      >
                        WhatsApp
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          placeholder="URL"
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="whatsAppURL"
                          type="text"
                          name="whatsAppURL"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                </div>
                <div className="py-3" />
                <div className="flex items-center justify-end gap-4">
                  <Button
                    variant="outlined"
                    className="w-28 border-neutral-900 text-neutral-900"
                  >
                    Cancel
                  </Button>
                  <Button className="w-28 bg-neutral-900 text-gray-50">
                    Next
                  </Button>
                </div>
              </div>
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <div className="w-full p-4">
                <div className="mt-4 grid grid-cols-12 gap-1">
                  <div className="col-span-12">
                    <div className="w-full">
                      <label
                        htmlFor="userLimit"
                        className="ml-1.5 flex items-center justify-between opacity-70"
                      >
                        User Limit
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          placeholder="Amount"
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="userLimit"
                          type="number"
                          inputMode="numeric"
                          name="userLimit"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="w-full">
                      <label
                        htmlFor="status"
                        className="ml-1.5 flex items-center justify-between  opacity-70"
                      >
                        Status
                      </label>
                      <FormControl
                        sx={{
                          '&.MuiFormControl-root': {
                            margin: '0px',
                            padding: '0px',
                          },
                        }}
                        className="m-1 w-full"
                        variant="standard"
                      >
                        <Input
                          sx={{
                            '&.MuiInputBase-root': {
                              padding: '0px',
                              margin: '0px',
                              borderRadius: '0.5rem',
                              borderWidth: '1px',
                              borderStyle: 'solid',
                              borderColor: '#E5E5E5',
                              backgroundColor: 'transparent',
                            },
                          }}
                          placeholder="URL"
                          className="mx-0 rounded-xl border-2 bg-gray-50 py-1.5 px-2 font-open-sans text-sm font-normal  text-neutral-900  after:border-b-neutral-900"
                          id="status"
                          type="text"
                          name="status"
                          disableUnderline
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div className="ml-1.5">
                      <div className="opacity-70">Theme Color</div>
                      <div className="aspect-square w-10 rounded-full bg-neutral-900" />
                    </div>
                  </div>
                </div>
                <div className="pb-3 pt-32" />
                <div className="flex items-center justify-end gap-4">
                  <Button
                    variant="outlined"
                    className="w-28 border-neutral-900 text-neutral-900"
                  >
                    Cancel
                  </Button>
                  <Button className="w-28 bg-neutral-900 text-gray-50">
                    Next
                  </Button>
                </div>
              </div>
            </TabPanel>
          </div>
          <div className="col-span-6 min-h-[32rem] rounded-lg bg-white shadow-lg">
            <SuperAdminMarkersMap markers={markers} zoom={15} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SuperAdminAddNewShopPage;

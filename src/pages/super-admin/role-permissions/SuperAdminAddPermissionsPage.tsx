import '../../../index.css';
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../../components/common/TopBar';
import CustomButton from '../../../components/common/CustomButton';
import Service from '../../../services/superadmin/RolePermissions';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import { setText } from '../../../utils/constants';
import { Permissions } from '../../../interfaces/superadmin/permissions.interface';
import CustomInputBox from '../../../components/common/CustomInputBox';
import CustomCheckBox from '../../../components/common/CustomCheckBox';
import { useAppSelector } from '../../../redux/redux-hooks';
import assets from '../../../assets';

function SuperAdminAddPermissionsPage() {
  const authState: any = useAppSelector((state) => state.authState);
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [count, setCount] = useState(0);

  const {
    register,
    unregister,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Permissions>();

  const inputFieldsData = [
    {
      fieldName: 'Permission Name',
      id: `name${count}`,
      register,
      error: errors.name,
      type: 'text',
    },
    {
      fieldName: 'Permission Description',
      id: `desc${count}`,
      register,
      error: errors.desc,
      type: 'text',
    },
    {
      fieldName: 'Permission Sequence',
      id: `permission_sequence${count}`,
      register,
      error: errors.permissionSequence,
      type: 'number',
      typeImportant: true,
    },
    {
      fieldName: 'Action',
      id: `action${count}`,
      register,
      error: errors.action,
      type: 'text',
    },
    {
      fieldName: 'Show on menu',
      id: `show_on_menu${count}`,
      register,
      error: errors.showOnMenu,
      type: 'boolean',
    },
  ];

  const [permissionList, setPermissionList] = useState<any>([
    {
      id: 0,
      fields: inputFieldsData,
    },
  ]);

  const handleAddMore = () => {
    const tempCount = count + 1;
    setCount(tempCount);
    const newId = tempCount;
    const newPermissionSet = {
      id: newId,
      fields: [
        {
          fieldName: 'Permission Name',
          id: `name${tempCount}`,
          register,
          error: errors.name,
          type: 'text',
        },
        {
          fieldName: 'Permission Description',
          id: `desc${tempCount}`,
          register,
          error: errors.desc,
          type: 'text',
        },
        {
          fieldName: 'Permission Sequence',
          id: `permission_sequence${tempCount}`,
          register,
          error: errors.permissionSequence,
          type: 'number',
          typeImportant: true,
        },
        {
          fieldName: 'Action',
          id: `action${tempCount}`,
          register,
          error: errors.action,
          type: 'text',
        },
        {
          fieldName: 'Show on menu',
          id: `show_on_menu${tempCount}`,
          register,
          error: errors.showOnMenu,
          type: 'boolean',
        },
      ],
    };
    setPermissionList((prevPermissionList: any) => [
      ...prevPermissionList,
      newPermissionSet,
    ]);
  };

  const unRegisterValues = (id: any) => {
    return unregister(id);
  };

  const handleRemovePermission = (id: any, index: number) => {
    const temp: any = [...permissionList];
    temp
      .find((item: any) => item.id === id)
      ?.fields.forEach((field: any) => {
        unRegisterValues(`${field.id}`);
      });
    const filteredData = temp.filter(
      (item: any, filterIndex: number) => filterIndex !== index
    );
    setPermissionList(filteredData);
  };

  const onSubmit = (data: any) => {
    // console.log("DDDDDDDDDDDD", data)

    const parent: any = {
      name: data.moduleName || '',
      desc: data.moduleDesc || '',
      permissionType: data.permissionType || '',
      createdBy: authState.user.id,
      data: [],
    };
    const dataKeys = Object.keys(data).filter((key) => key.includes('name'));

    const indexPattern: any = /\d+$/; // Regular expression to match the index at the end of keys

    dataKeys.forEach((nameKey: any) => {
      const index = nameKey.match(indexPattern)[0];
      const dataItem = {
        name: data[nameKey],
        desc: data[`desc${index}`],
        action: data[`action${index}`],
        permissionType: data.permissionType,
        permission_sequence: data[`permission_sequence${index}`],
        show_on_menu: data[`show_on_menu${index}`],
      };
      parent.data.push(dataItem);
    });

    // console.log("PARENT", parent);

    Service.createPermissionService(parent)
      .then((item: any) => {
        if (item.data.success) {
          console.log('CREATED', item.data);
          reset();
          setText(item.data.message);
          navigate('../list');
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
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: err.message,
          type: 'error',
        });
      });
  };

  return isLoader ? (
    <Loader />
  ) : (
    <div>
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar isNestedRoute title="Add Permissions" />
      <div className="m-auto mx-5 mt-5">
        <div className="w-full rounded-lg bg-white py-5 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="FormBody m-5">
            <div className="FormField flex">
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="pb-2 font-bold">Module Name</label>
                  <Input
                    className="FormInput m-0 h-[40px] w-[350px] rounded-lg border-2 border-[#949EAE] px-3 outline-none"
                    {...register('moduleName', { required: true })}
                    type="text"
                    id="moduleName"
                    placeholder="Enter Module name"
                    disableUnderline
                  />
                  {errors.moduleName?.type === 'required' && (
                    <span role="alert">Role name is required</span>
                  )}
                </FormControl>
              </div>
              <div className="FormFields px-5">
                <FormControl className="FormControl" variant="standard">
                  <label className="pb-2 font-bold">Permission Type</label>
                  <Input
                    disabled
                    className="FormInput m-0 h-[40px] w-[135px] rounded-lg border-2 border-[#949EAE] px-3 outline-none"
                    {...register('permissionType', {
                      required: true,
                      value: 'backend',
                    })}
                    type="text"
                    id="permissionType"
                    placeholder="Enter Permission Type"
                    disableUnderline
                  />
                  {errors.permissionType?.type === 'required' && (
                    <span role="alert">Permission type is required</span>
                  )}
                </FormControl>
              </div>
            </div>

            <div className="FormField">
              <FormControl className="FormControl my-5" variant="standard">
                <label className="pb-2 font-bold">Module Description</label>
                <TextareaAutosize
                  minRows={3}
                  maxRows={6}
                  {...register('moduleDesc')}
                  placeholder="Enter Module description"
                  className="w-[507px] rounded-lg border-2 border-[#949EAE] p-3 outline-none"
                />
              </FormControl>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {permissionList?.map((mainEl: any, mainIndex: number) => {
                return (
                  <div key={mainIndex} className="col-span-1">
                    <div className="">
                      <div className="grid-col-12 relative grid rounded-lg border-2 p-5">
                        {mainIndex > 0 && (
                          <div
                            onClick={() =>
                              handleRemovePermission(mainEl.id, mainIndex)
                            }
                            className="absolute right-[-10px] top-[-10px] cursor-pointer"
                          >
                            <img src={assets.images.removeIcon} alt="cancel" />
                          </div>
                        )}
                        {mainEl.fields?.map((item: any, index: number) => {
                          return (
                            <FormControl
                              key={index}
                              className="FormControl"
                              variant="standard"
                            >
                              {item.type === 'boolean' ? (
                                <div className="flex h-full items-end">
                                  <CustomCheckBox
                                    item={item}
                                    control={control}
                                    index={mainIndex}
                                  />
                                </div>
                              ) : (
                                <CustomInputBox
                                  customFontClass="font-bold"
                                  customClass="border-2 rounded-lg px-4"
                                  register={item.register}
                                  id={`${item.id}`}
                                  inputTitle={item.fieldName}
                                  inputType={item.type}
                                  error={`${item.error}`}
                                  typeImportant={item.typeImportant}
                                />
                              )}
                            </FormControl>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                onClick={() => handleAddMore()}
                className="col-span-1 flex h-[326px] cursor-pointer items-center justify-center rounded-lg bg-[#F0F0F0]"
              >
                <img alt="add" src={assets.images.addImg} />
              </div>
            </div>
            <div className="mt-5">
              <CustomButton
                sx={{ backgroundColor: 'black' }}
                buttonType="button"
                type="submit"
                title="add"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminAddPermissionsPage;

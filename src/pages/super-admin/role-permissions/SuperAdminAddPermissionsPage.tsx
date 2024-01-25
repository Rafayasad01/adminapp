import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import CustomButton from '../../../components/common/CustomButton';
import CustomCheckBox from '../../../components/common/CustomCheckBox';
import CustomInputBox from '../../../components/common/CustomInputBox';
import ErrorSpanBox from '../../../components/common/ErrorSpanBox';
import Loader from '../../../components/common/Loader';
import Notify from '../../../components/common/Notify';
import TopBar from '../../../components/common/TopBar';
import '../../../index.css';
import { Permissions } from '../../../interfaces/superadmin/permissions.interface';
import { useAppSelector } from '../../../redux/redux-hooks';
import Service from '../../../services/superadmin/RolePermissions';
import {
  INVALID_CHAR,
  MAX_LENGTH_EXCEEDED,
  PATTERN,
  setText,
} from '../../../utils/constants';

function SuperAdminAddPermissionsPage() {
  const authState: any = useAppSelector((state) => state?.authState);
  const navigate = useNavigate();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [count, setCount] = useState<any>(0);

  const {
    register,
    unregister,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Permissions>();

  const inputFieldsData: any = [
    {
      fieldName: 'Permission Name',
      id: `name${count}`,
      register,
      error: errors,
      type: 'text',
      pattern: PATTERN.CHAR_SPACE_DASH,
      maxLetterLimit: 150,
    },
    {
      fieldName: 'Permission Description',
      id: `desc${count}`,
      register,
      error: errors,
      type: 'text',
      pattern: PATTERN.CHAR_SPACE_DASH,
      maxLetterLimit: 150,
    },
    {
      fieldName: 'Action',
      id: `action${count}`,
      register,
      error: errors,
      type: 'text',
      pattern: PATTERN.ACTION_WITHOUT_SPACE,
      maxLetterLimit: 150,
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
          pattern: PATTERN.CHAR_SPACE_DASH,
          maxLetterLimit: 150,
        },
        {
          fieldName: 'Permission Description',
          id: `desc${tempCount}`,
          register,
          error: errors.desc,
          type: 'text',
          pattern: PATTERN.CHAR_SPACE_DASH,
          maxLetterLimit: 150,
        },
        {
          fieldName: 'Action',
          id: `action${tempCount}`,
          register,
          error: errors.action,
          type: 'text',
          pattern: PATTERN.ACTION_WITHOUT_SPACE,
          maxLetterLimit: 150,
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

  const hasDuplicates = (array: any) => {
    return new Set(array).size !== array.length;
  };

  const onSubmit = (data: any) => {
    // console.log("DDDDDDDDDDDD", data)
    setIsLoader(true);
    const parent: any = {
      name: data.moduleName || '',
      desc: data.moduleDesc || '',
      permissionType: data.permissionType || '',
      createdBy: authState.user.id,
      data: [],
    };
    let hasDuplicate = false;
    let displayText: any = '';
    const duplicateNames: string[] = [];
    const dataKeys = Object.keys(data).filter((key) => key.includes('name'));

    const indexPattern: any = /\d+$/; // Regular expression to match the index at the end of keys

    dataKeys.forEach((nameKey: any) => {
      const index = nameKey.match(indexPattern)[0];
      const newName: any = data[nameKey] || '';

      const dataItem = {
        name: data[nameKey],
        desc: data[`desc${index}`],
        action: data[`action${index}`],
        permissionType: data.permissionType,
        // permission_sequence: data[`permission_sequence${index}`],
        show_on_menu: data[`show_on_menu${index}`],
      };

      const nameExists = parent.data.some((item: any) => item.name === newName);
      if (nameExists) {
        if (!duplicateNames.includes(newName)) {
          duplicateNames.push(newName);
        }
        // duplicateNames.push(newName);
        hasDuplicate = true;
      } else if (dataKeys.some((name: any) => data[name] === data.moduleName)) {
        hasDuplicate = true;
        displayText = 'Module name must not be the same as permission names';
      } else {
        hasDuplicate = false;
      }

      parent.data.push(dataItem);
    });

    if (duplicateNames.length > 0) {
      displayText = `Permission name (${duplicateNames.join(
        '\n'
      )}) already existss`;
    }
    if (hasDuplicate) {
      // console.log('run1');
      setIsNotify(true);
      setNotifyMessage({
        text: displayText,
        type: 'error',
      });
    } else {
      const allNames = parent.data.map((item: any) => item.name);
      if (hasDuplicates(allNames)) {
        // console.log('run2');
        setIsNotify(true);
        setNotifyMessage({
          text: displayText,
          type: 'error',
        });
      } else {
        Service.createPermissionService(parent)
          .then((item: any) => {
            if (item.data.success) {
              // console.log('CREATED', item.data);
              reset();
              setText(item.data.message);
              navigate('../list');
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
            setIsLoader(false);
            setIsNotify(true);
            setNotifyMessage({
              text: err.message,
              type: 'error',
            });
          });
      }
    }
  };

  // console.log('EERORR', errors);

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
                    className="FormInput m-0 h-[40px] w-[350px] rounded-lg border-2 border-secondary px-3 outline-none"
                    {...register('moduleName', {
                      required: true,
                      pattern: PATTERN.CHAR_SPACE_DASH,
                      validate: (value) => value.length <= 150,
                    })}
                    type="text"
                    id="moduleName"
                    placeholder="Enter Module name"
                    disableUnderline
                  />
                  {errors.moduleName?.type === 'required' && (
                    <ErrorSpanBox error="Module name is required" />
                  )}
                  {errors.moduleName?.type === 'pattern' && (
                    <ErrorSpanBox error={INVALID_CHAR} />
                  )}
                  {errors.moduleName?.type === 'validate' && (
                    <ErrorSpanBox error={MAX_LENGTH_EXCEEDED} />
                  )}
                </FormControl>
              </div>
              <div className="FormFields px-5">
                <FormControl className="FormControl" variant="standard">
                  <label className="pb-2 font-bold">Permission Type</label>
                  <Input
                    disabled
                    className="FormInput m-0 h-[40px] w-[135px] rounded-lg border-2 border-secondary px-3 outline-none"
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
                  {...register('moduleDesc', {
                    minLength: {
                      value: 1,
                      message: 'Minimum Five Characters',
                    },
                    maxLength: {
                      value: 250,
                      message: MAX_LENGTH_EXCEEDED,
                    },
                  })}
                  placeholder="Enter Module description"
                  className="w-[507px] rounded-lg border-2 border-secondary p-3 outline-none"
                />
                {errors.moduleDesc && (
                  <ErrorSpanBox error={errors.moduleDesc?.message} />
                )}
              </FormControl>
            </div>
            <div className="grid gap-4 xl:grid-cols-4 2xl:grid-cols-3">
              {permissionList?.map((mainEl: any, mainIndex: number) => {
                return (
                  <div key={mainIndex} className="xl:col-span-2 2xl:col-span-1">
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
                          // console.log(item);
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
                                  pattern={item.pattern}
                                  maxLetterLimit={item.maxLetterLimit}
                                  value={item.value}
                                  customFontClass="font-bold"
                                  customClass="border-2 rounded-lg px-4"
                                  register={item.register}
                                  id={`${item.id}`}
                                  inputTitle={item.fieldName}
                                  inputType={item.type}
                                  error={errors[item.id]}
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
                className="flex h-[266px] cursor-pointer items-center justify-center rounded-lg bg-faded xl:col-span-2 2xl:col-span-1"
              >
                <img alt="add" src={assets.images.addImg} />
              </div>
            </div>
            <div className="mt-5">
              <CustomButton
                buttonType="button"
                type="submit"
                title="add"
                className="bg-[black]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminAddPermissionsPage;

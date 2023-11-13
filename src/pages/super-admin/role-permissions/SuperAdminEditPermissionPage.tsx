import '../../../index.css';
import { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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

function SuperAdminEditPermissionsPage() {
  const { id } = useParams();
  const authState: any = useAppSelector((state) => state?.authState);
  const navigate = useNavigate();
  const [dataObj, setDataObj] = useState<any>();
  const [isLoader, setIsLoader] = useState<boolean>(true);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const [count, setCount] = useState(0);
  const [emptyVariable] = useState(null);

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<Permissions>();

  const [permissionList, setPermissionList] = useState<any>([]);

  const handleAddMore = () => {
    const tempId = count + 1;
    setCount(tempId);
    const newPermissionSet = {
      id: tempId,
      fields: {
        action: '',
        desc: '',
        fieldId: tempId,
        id: '',
        name: '',
        // permission_sequence: null,
        showOnMenu: false,
      },
    };
    const tempList = [...permissionList];
    tempList.push(newPermissionSet);
    setPermissionList(tempList);
  };

  const unRegisterValues = (unregId: any) => {
    return unregister(unregId);
  };

  const handleRemovePermission = (
    removePermissionId: number,
    index: number
  ) => {
    // console.log('TEMPid', id);
    const updatedPermissions = permissionList.filter(
      (item: any) => item.id !== removePermissionId
    );
    setPermissionList(updatedPermissions);
    // console.log('TEMPLIST', updatedPermissions);
    unRegisterValues(`action${removePermissionId}`);
    unRegisterValues(`desc${removePermissionId}`);
    unRegisterValues(`fieldIndexId${removePermissionId}`);
    unRegisterValues(`id${removePermissionId}`);
    unRegisterValues(`name${removePermissionId}`);
    // unRegisterValues(`permissionSequence${removePermissionId}`);
    unRegisterValues(`show_on_menu${removePermissionId}`);
    unRegisterValues(`createdBy${removePermissionId}`);
    unRegisterValues(`createdDate${removePermissionId}`);
    unRegisterValues(`isActive${removePermissionId}`);
    unRegisterValues(`permissionParent${removePermissionId}`);
    unRegisterValues(`updatedBy${removePermissionId}`);
    unRegisterValues(`updatedDate${removePermissionId}`);
  };

  useEffect(() => {
    // setIsLoader(true);
    Service.getPermissionById(id).then((item: any) => {
      if (item.data.success) {
        setIsLoader(false);
        setDataObj({
          name: item.data.data.name,
          desc: item.data.data.desc,
          permissionType: item.data.data.permissionType,
        });
        const updatedPermissionList = item.data.data.data.map(
          (dataItem: any, index: number) => {
            const tempCount = count + index + 1;
            setCount(tempCount);
            return {
              id: tempCount,
              fields: {
                fieldId: tempCount,
                id: dataItem.id,
                name: dataItem.name,
                desc: dataItem.desc,
                // permissionSequence: dataItem.permissionSequence,
                action: dataItem.action,
                showOnMenu: dataItem.showOnMenu,
                createdBy: dataItem.createdBy,
                createdDate: dataItem.createdDate,
                isActive: dataItem.isActive,
                permissionParent: dataItem.permissionParent,
                updatedBy: dataItem.updatedBy,
                updatedDate: dataItem.updatedDate,
              },
            };
          }
        );
        setPermissionList(updatedPermissionList);
        // console.log('updatedPermissionList', updatedPermissionList);
      } else {
        setIsLoader(false);
        setIsNotify(true);
        setNotifyMessage({
          text: 'All fields are required!',
          type: 'error',
        });
      }
    });
  }, [emptyVariable]);

  const hasDuplicates = (array: any) => {
    return new Set(array).size !== array.length;
  };

  const onSubmit = (data: any) => {
    const parent: any = {
      name: data.moduleName || '',
      desc: data.moduleDesc || '',
      permissionType: data.permissionType || '',
      updatedBy: authState.user.id,
      data: [],
    };

    let hasDuplicate = false;
    let displayText: any = '';
    const duplicateNames: string[] = [];
    const dataKeys = Object.keys(data).filter((key) => key.includes('name'));
    // Regular expression to match the index at the end of keys
    const indexPattern: any = /\d+$/;

    dataKeys.forEach((nameKey: any) => {
      const index = nameKey.match(indexPattern)[0];
      const newName: any = data[nameKey] || '';

      const dataItem = {
        id: data[`id${index}`] || null,
        name: data[nameKey] || '',
        desc: data[`desc${index}`] || '',
        // permissionSequence: Number(data[`permissionSequence${index}`]) || '',
        action: data[`action${index}`] || '',
        showOnMenu: data[`show_on_menu${index}`] || false,
        createdBy: authState.user.id,
        updatedBy: authState.user.id,
        createdDate: data[`createdDate${index}`] || null,
        updatedDate: data[`updatedDate${index}`] || null,
        permissionParent: data[`permissionParent${index}`] || null,
        isActive: data[`isActive${index}`] || true,
      };
      const nameExists = parent.data.some((item: any) => item.name === newName);
      if (data[`permissionParent${index}`] === '') {
        delete dataItem.permissionParent;
        delete dataItem.isActive;
        delete dataItem.createdDate;
        delete dataItem.updatedDate;
      }
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
      console.log('run1');
      setIsNotify(true);
      setNotifyMessage({
        text: displayText,
        type: 'error',
      });
    } else {
      const allNames = parent.data.map((item: any) => item.name);
      if (hasDuplicates(allNames)) {
        console.log('run2');
        setIsNotify(true);
        setNotifyMessage({
          text: displayText,
          type: 'error',
        });
      } else {
        Service.updatePermissionService(id, parent)
          .then((item: any) => {
            if (item.data.success) {
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
      }
    }
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
      <TopBar isNestedRoute title="Edit Permissions" />
      <div className="m-auto mx-5 mt-5">
        <div className="w-full rounded-lg bg-white py-5 shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="FormBody m-5">
            <div className="FormField flex">
              <div className="FormFields">
                <FormControl className="FormControl" variant="standard">
                  <label className="pb-2 font-bold">Module Name</label>
                  <Input
                    disabled
                    className="FormInput m-0 h-[40px] w-[350px] rounded-lg border-2 border-[#949EAE] px-3 outline-none"
                    {...register('moduleName', {
                      required: true,
                      value: dataObj?.name,
                    })}
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
                  {...register('moduleDesc', { value: dataObj?.desc })}
                  placeholder="Enter Module description"
                  className="w-[507px] rounded-lg border-2 border-[#949EAE] p-3 outline-none"
                />
              </FormControl>
            </div>
            <div className="grid gap-4 xl:grid-cols-4 2xl:grid-cols-3">
              {permissionList?.map((mainEl: any, mainIndex: number) => {
                return (
                  <div key={mainIndex} className="xl:col-span-2 2xl:col-span-1">
                    <div className="">
                      <div className="grid-col-12 relative grid rounded-lg border-2 p-5">
                        {/* {mainIndex > 0 && */}
                        <div
                          onClick={() =>
                            handleRemovePermission(mainEl.id, mainIndex)
                          }
                          className="absolute right-[-10px] top-[-10px] cursor-pointer"
                        >
                          <img src={assets.images.removeIcon} alt="cancel" />
                        </div>
                        {/* } */}
                        <FormControl className="FormControl" variant="standard">
                          <CustomInputBox
                            register={register}
                            id={`id${mainEl.id}`}
                            typeImportant
                            inputType="hidden"
                            value={mainEl.fields.id}
                          />
                        </FormControl>
                        <FormControl className="FormControl" variant="standard">
                          <CustomInputBox
                            register={register}
                            id={`permissionParent${mainEl.id}`}
                            typeImportant
                            inputType="hidden"
                            value={mainEl.fields.permissionParent}
                          />
                        </FormControl>
                        <FormControl className="FormControl" variant="standard">
                          <CustomInputBox
                            register={register}
                            id={`isActive${mainEl.id}`}
                            typeImportant
                            inputType="hidden"
                            value={mainEl.fields.isActive}
                          />
                        </FormControl>
                        <FormControl className="FormControl" variant="standard">
                          <CustomInputBox
                            register={register}
                            id={`createdBy${mainEl.id}`}
                            typeImportant
                            inputType="hidden"
                            value={mainEl.fields.createdBy}
                          />
                        </FormControl>
                        <FormControl className="FormControl" variant="standard">
                          <CustomInputBox
                            register={register}
                            id={`updatedBy${mainEl.id}`}
                            typeImportant
                            inputType="hidden"
                            value={mainEl.fields.updatedBy}
                          />
                        </FormControl>
                        <FormControl className="FormControl" variant="standard">
                          <CustomInputBox
                            register={register}
                            id={`createdDate${mainEl.id}`}
                            typeImportant
                            inputType="hidden"
                            value={mainEl.fields.createdDate}
                          />
                        </FormControl>
                        <FormControl className="FormControl" variant="standard">
                          <CustomInputBox
                            register={register}
                            id={`updatedDate${mainEl.id}`}
                            typeImportant
                            inputType="hidden"
                            value={mainEl.fields.updatedDate}
                          />
                        </FormControl>
                        <FormControl className="FormControl" variant="standard">
                          <CustomInputBox
                            customFontClass="font-bold"
                            customClass="border-2 rounded-lg px-4"
                            register={register}
                            id={`name${mainEl.id}`}
                            inputTitle="Permission Name"
                            inputType="text"
                            error={errors}
                            value={mainEl.fields.name}
                          />
                        </FormControl>
                        <FormControl className="FormControl" variant="standard">
                          <CustomInputBox
                            customFontClass="font-bold"
                            customClass="border-2 rounded-lg px-4"
                            register={register}
                            id={`desc${mainEl.id}`}
                            inputTitle="Permission Description"
                            inputType="text"
                            error={errors}
                            value={mainEl.fields.desc}
                          />
                        </FormControl>
                        {/* <FormControl className="FormControl" variant="standard">
                          <CustomInputBox
                            customFontClass="font-bold"
                            customClass="border-2 rounded-lg px-4"
                            register={register}
                            id={`permissionSequence${mainEl.id}`}
                            inputTitle="Permission Sequence"
                            inputType="number"
                            typeImportant
                            error={errors}
                            value={mainEl.fields.permissionSequence}
                          />
                        </FormControl> */}
                        <FormControl className="FormControl" variant="standard">
                          <CustomInputBox
                            customFontClass="font-bold"
                            customClass="border-2 rounded-lg px-4"
                            register={register}
                            id={`action${mainEl.id}`}
                            inputTitle="Action"
                            inputType="text"
                            error={errors}
                            value={mainEl.fields.action}
                          />
                        </FormControl>
                        <div className="flex h-full items-end">
                          <CustomCheckBox
                            item={{
                              fieldName: 'Show on menu',
                              id: `show_on_menu${mainEl.id}`,
                              value: mainEl.fields.showOnMenu,
                            }}
                            control={control}
                            index={mainIndex}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div
                onClick={handleAddMore}
                className="flex h-[266px] cursor-pointer items-center justify-center rounded-lg bg-[#F0F0F0] xl:col-span-2 2xl:col-span-1"
              >
                <img alt="add" src={assets.images.addImg} />
              </div>
            </div>
            <div className="mt-5">
              <CustomButton
                buttonType="button"
                type="submit"
                title="update"
                className="bg-[black]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminEditPermissionsPage;

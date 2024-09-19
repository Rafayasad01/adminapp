import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useForm } from 'react-hook-form';
import '../../assets/css/PopupStyle.css';
import {
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import ErrorSpanBox from '../../components/common/ErrorSpanBox';
import TopBar from '../../components/common/TopBar';
import Loader from '../../components/common/Loader';
import Notify from '../../components/common/Notify';
import CustomDropDown from '../../components/common/CustomDropDown';
import {
  ALL_PERMISSIONS,
  CURRENCY_PREFIX,
  NOT_AUTHORIZED_MESSAGE,
  VALIDATE_NON_NEGATIVE_NUM,
} from '../../utils/constants';
// import adminAppUser from '../../services/adminapp/adminAppUser';
import projectService from '../../services/adminapp/adminProjectAttachments';
import { listingRolePermission } from '../../utils/helper';
import { useAppSelector } from '../../redux/redux-hooks';
import adminVendors from '../../services/adminapp/adminVendors';
import adminProjectProducts from '../../services/adminapp/adminProjectProducts';
import Product, { ProductCustomization } from '../../interfaces/Product';
import adminQuotation from '../../services/adminapp/adminQuotation';

type Row = {
  vendor: string;
  product: string;
  color: string;
  quantity: number;
  unitPrice: number;
  total: number;
  products: Product[];
};

const QuotationsAddPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // quote_number: '',
      project_completion_days: '',
      exp_date: '',
      items: [],
    },
    mode: 'onSubmit',
  });

  const [rows, setRows] = useState<Row[]>([
    {
      vendor: '',
      product: '',
      color: '',
      quantity: 0,
      unitPrice: 0,
      total: 0,
      products: [],
    },
  ]);

  const [discount, setDiscount] = useState({ type: 'percentage', value: 0 });
  const [serviceCharge, setServiceCharge] = useState({
    type: 'percentage',
    value: 0,
  });
  const [isLoader, setIsLoader] = useState(false);
  const [projects, setProjects] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [
    totalProjectCostWithServiceCharge,
    setTotalProjectCostWithServiceCharge,
  ] = useState(0);
  const [isNotify, setIsNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState({});
  const navigate = useNavigate();
  const authState: any = useAppSelector((state) => state?.authState);
  const dataRole = useAppSelector(
    (state) => state?.persistedReducer?.roleState?.role?.permissions
  );

  const handleFormClose = () => {
    navigate('../');
  };

  const handlePermissionCheck = (permission: string, callback: () => void) => {
    if (listingRolePermission(dataRole, permission)) {
      callback();
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: NOT_AUTHORIZED_MESSAGE,
        type: 'warning',
      });
    }
  };

  const fetchClients = () => {
    handlePermissionCheck(ALL_PERMISSIONS.quotations.add, () => {
      setIsLoader(true);
      projectService
        .getListProjectLovService(authState.user.tenant)
        .then((item: any) => {
          setProjects(item.data.data.list);
        })
        .finally(() => {
          setIsLoader(false);
        });
    });
  };

  const fetchVendors = () => {
    handlePermissionCheck(ALL_PERMISSIONS.quotations.add, () => {
      setIsLoader(true);
      adminVendors
        .getVendorLovService()
        .then((item: any) => {
          setVendors(item.data.data);
        })
        .finally(() => {
          setIsLoader(false);
        });
    });
  };

  const fetchVendorProducts = async (id: string) => {
    setIsLoader(true);
    const p = adminProjectProducts
      .getByVendorService(id)
      .then((item: any) => {
        return item.data.data ?? [];
      })
      .catch(() => {
        return [];
      })
      .finally(() => {
        setIsLoader(false);
      });
    return p;
  };

  useEffect(() => {
    fetchClients();
    fetchVendors();
  }, []);

  const onSubmit = async (data: any) => {
    // Prepare items from rows
    const items = rows.map((row) => ({
      vendorId: row.vendor,
      productId: row.product,
      quantity: row.quantity,
      unitPrice: row.unitPrice,
      color: row.color,
      total: row.total,
    }));

    const areFieldsValid = items.every((x: any) => {
      return (
        x.vendorId !== 'none' &&
        x.productId !== 'none' &&
        x.quantity >= 1 &&
        x.color !== 'none' &&
        x.color !== ''
      );
    });

    // Construct payload for submission
    const payload = {
      projectId: data.clientName,
      // quoteNumber: data.quote_number,
      // expiryDate: data.exp_date,
      expiryDate: dayjs().add(3, 'day').format('YYYY-MM-DD'),
      projectCompletionDays: Number(data.project_completion_days),
      discount: discount.value,
      discountType: discount.type,
      serviceCharges: serviceCharge.value,
      serviceChargesType: serviceCharge.type,
      total: grandTotal,
      totalProjectServiceCost: totalProjectCostWithServiceCharge,
      subtotal: items.reduce((acc, item) => acc + item.total, 0),
      items,
    };
    // console.log('🚀 ~ onSubmit ~ data:', payload);
    if (areFieldsValid) {
      setIsLoader(true);
      const success = await adminQuotation
        .createQuotationService(payload)
        .then((res) => {
          setIsLoader(false);
          if (res.data.success === false) {
            setIsNotify(true);
            setNotifyMessage({
              text: res.data.message,
              type: 'error',
            });
            return false;
          }

          setIsNotify(true);
          setNotifyMessage({
            text: res.data.message,
            type: 'success',
          });
          return true;
        })
        .catch((err) => {
          setIsLoader(false);
          setIsNotify(true);
          setNotifyMessage({
            text: err.message,
            type: 'error',
          });
          return false;
        });
      if (success) {
        reset();
        navigate('../');
      }
    } else {
      setIsNotify(true);
      setNotifyMessage({
        text: 'All Fields Must Be Required',
        type: 'error',
      });
    }
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        vendor: '',
        product: '',
        color: '',
        quantity: 0,
        unitPrice: 0,
        total: 0,
        products: [],
      },
    ]);
  };

  const totalConstructionCost =
    rows?.length > 0 ? rows?.reduce((acc, row) => acc + row.total, 0) : 0;

  const calculateGrandTotal = (
    r: any[],
    dis: typeof discount = discount,
    servCharge: typeof serviceCharge = serviceCharge
  ) => {
    let total = r.reduce((acc, row) => acc + row.total, 0);

    // Apply discount to the total
    if (dis.type === 'percentage') {
      total -= (total * Number(dis.value)) / 100;
    } else {
      total -= Number(dis.value);
    }

    // Calculate service charge based on the original total (before discount)
    let totalWithServiceCharge = r.reduce((acc, row) => acc + row.total, 0); // Start with the original total
    if (servCharge.type === 'percentage') {
      totalWithServiceCharge +=
        (totalWithServiceCharge * Number(servCharge.value)) / 100;
    } else {
      totalWithServiceCharge += Number(servCharge.value);
    }

    // Grand total is now the total after discount plus the service charge
    let gTotal = total;
    if (servCharge.type === 'percentage') {
      gTotal += (total * Number(servCharge.value)) / 100;
    } else {
      gTotal += Number(servCharge.value);
    }

    setGrandTotal(gTotal);
    setTotalProjectCostWithServiceCharge(totalWithServiceCharge);
  };

  const handleDeleteRow = (index: number) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
    calculateGrandTotal(newRows);
  };

  const handleVendorChange = (index: number, vendor: string) => {
    const newRows = [...rows];
    newRows[index].vendor = vendor;
    newRows[index].product = 'none'; // Clear product when vendor changes
    setRows(newRows);

    // Fetch products specific to the selected vendor
    fetchVendorProducts(vendor).then((prod: Product[]) => {
      const updatedRows = [...newRows];
      updatedRows[index].products = prod; // Store products specific to this row
      setRows(updatedRows);
    });
  };

  const handleProductChange = (index: number, product: string) => {
    const newRows = [...rows];
    newRows[index].product = product;
    setRows(newRows);
  };

  const handleProductColorChange = (index: number, c: string) => {
    const newRows = [...rows];
    if (newRows[index] && newRows[index].product.length > 0) {
      newRows[index].color = c;
      const prod = newRows[index].products.find(
        (x) => x.id === newRows[index].product
      );
      if (prod) {
        newRows[index].unitPrice =
          Number(
            prod?.productCustomization.find((x) => x.color === c)?.price
          ) ?? 0;
      }
    }
    setRows(newRows);
  };

  const handleChange = (index: number, field: string, value: any) => {
    let newRows = [...rows];
    newRows = newRows.map((x: any, i) => {
      if (i === index) {
        x[field] = value;
      }
      return x;
    });
    if (field === 'quantity' || field === 'unitPrice') {
      newRows[index].total = newRows[index].quantity * newRows[index].unitPrice;
    }
    setRows(newRows);
    calculateGrandTotal(newRows);
  };

  const handleDiscountChange = (type: string, value: number | any) => {
    setDiscount({ type, value });
    calculateGrandTotal(rows, { type, value }, serviceCharge);
  };

  const handleServiceChargeChange = (type: string, value: number | any) => {
    setServiceCharge({ type, value });
    calculateGrandTotal(rows, discount, { type, value });
  };

  return (
    <>
      {isLoader && <Loader />}
      <Notify
        isOpen={isNotify}
        setIsOpen={setIsNotify}
        displayMessage={notifyMessage}
      />
      <TopBar title="Projects" />
      <div className="cs-dialog container mx-auto mt-2 w-full px-3">
        <div className="w-full rounded-lg bg-white shadow-lg">
          <div className="grid grid-cols-12 px-4 py-5">
            <div className="col-span-12">
              <span className="font-open-sans text-xl font-semibold text-[#252733]">
                Quotation Information
              </span>
            </div>
            <div className="Content col-span-12 p-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="FormBody">
                  <div className="mb-4 grid grid-cols-4">
                    {/* Customer Selection */}
                    <FormControl className="FormControl" variant="standard">
                      <CustomDropDown
                        validateRequired
                        id="clientName"
                        control={control}
                        error={errors}
                        register={register}
                        options={{ roles: projects }}
                        customClassInputTitle="font-bold"
                        inputTitle="Project Name"
                        defaultValue="Select Project"
                      />
                    </FormControl>
                    {/* Quotation Number */}
                    <div className="mx-5">
                      <FormControl className="FormControl" variant="standard">
                        <label className="FormLabel">
                          Project Completion Days
                        </label>
                        <Input
                          type="number"
                          className="FormInput"
                          placeholder="Enter Days in numebr"
                          disableUnderline
                          {...register('project_completion_days', {
                            required: 'Days is required',
                            validate: (value: any) =>
                              VALIDATE_NON_NEGATIVE_NUM(value),
                            maxLength: {
                              value: 10,
                              message:
                                'Length should not be excceed from 10 numbers.',
                            },
                          })}
                        />
                        {errors.project_completion_days && (
                          <ErrorSpanBox
                            error={errors.project_completion_days.message}
                          />
                        )}
                      </FormControl>
                    </div>

                    {/* Expiry Date */}
                    {/* <FormControl className="FormControl" variant="standard">
                      <label className="FormLabel">Expiry</label>
                      <Input
                        className="FormInput"
                        type="date"
                        disableUnderline
                        {...register('exp_date', {
                          required: 'Expiry date required',
                        })}
                      />
                      {errors.exp_date && (
                        <ErrorSpanBox error={errors.exp_date.message} />
                      )}
                    </FormControl> */}
                  </div>

                  {/* Products Table */}
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Vendor</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <FormControl
                              className="FormControl"
                              variant="standard"
                            >
                              <Select
                                value={row.vendor || 'none'}
                                defaultValue="none"
                                disableUnderline
                                className="FormInput"
                                placeholder="Select Vendor"
                                onChange={(e) =>
                                  handleVendorChange(index, e.target.value)
                                }
                              >
                                <MenuItem value="none">
                                  -- Select Vendor --
                                </MenuItem>
                                {vendors.map((vendor: any, i) => {
                                  return (
                                    <MenuItem key={i} value={vendor?.id}>
                                      {vendor?.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <FormControl
                              className="FormControl"
                              variant="standard"
                            >
                              <Select
                                value={row.product || 'none'}
                                className="FormInput"
                                disableUnderline
                                onChange={(e) =>
                                  handleProductChange(index, e.target.value)
                                }
                                disabled={!row.vendor}
                              >
                                <MenuItem value="none">
                                  -- Select Product --
                                </MenuItem>
                                {row.products?.map((product: Product) => (
                                  <MenuItem key={product.id} value={product.id}>
                                    {product.name}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <FormControl
                              className="FormControl"
                              variant="standard"
                            >
                              <Select
                                value={row.color ? row.color : 'none'}
                                className="FormInput"
                                disableUnderline
                                onChange={(e) =>
                                  handleProductColorChange(
                                    index,
                                    e.target.value
                                  )
                                }
                                disabled={!row.vendor}
                              >
                                <MenuItem value="none">
                                  -- Select Color --
                                </MenuItem>
                                {row.products
                                  ?.find((x) => x.id === row.product)
                                  ?.productCustomization?.map(
                                    (color: ProductCustomization) => (
                                      <MenuItem
                                        key={color.color}
                                        value={color.color}
                                      >
                                        {color.color}
                                      </MenuItem>
                                    )
                                  )}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              placeholder="Quantity"
                              className="FormInput"
                              value={row.quantity}
                              onChange={(e) =>
                                handleChange(index, 'quantity', e.target.value)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              placeholder="Unit Price"
                              value={row.unitPrice}
                              onChange={(e) =>
                                handleChange(index, 'unitPrice', e.target.value)
                              }
                            />
                          </TableCell>
                          <TableCell>{row.total}</TableCell>
                          <TableCell>
                            <IconButton onClick={() => handleDeleteRow(index)}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={7}>
                          <Button onClick={handleAddRow} startIcon={<Add />}>
                            Add Product
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <hr className="mt-5" />
                <div className="mt-5">
                  <div className="DiscountTotalSection">
                    {/* Discount and Total */}
                    <div className="flex w-full items-center justify-end">
                      <div className="">
                        {/* <FormControl className="FormControl" variant="standard">
                          <CustomDropDown
                            id="vendorId"
                            control={control}
                            customClassInputTitle="font-normal"
                            error={errors}
                            register={register}
                            options={{ roles: vendors }}
                            inputTitle="Service Charge"
                            customDDcss="mb-2"
                            defaultValue="Select Service Charge"
                            validateRequired
                          />
                        </FormControl> */}
                        <FormControl
                          className="FormControl mt-4 w-full"
                          variant="outlined"
                        >
                          <label className="FormLabel font-bold">
                            Service Charge Type
                          </label>
                          <Select
                            value={serviceCharge.type}
                            className="FormInput mb-3"
                            onChange={(e) =>
                              handleServiceChargeChange(
                                e.target.value as 'percentage' | 'fixed',
                                serviceCharge.value
                              )
                            }
                          >
                            <MenuItem value="percentage">Percentage</MenuItem>
                            <MenuItem value="fixed">Fixed Amount</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl
                          className="FormControl mt-4 w-full"
                          variant="standard"
                        >
                          <label className="FormLabel font-bold">
                            Service Charge
                          </label>
                          <Input
                            type="number"
                            className="FormInput"
                            disableUnderline
                            value={serviceCharge.value}
                            onChange={(e) =>
                              handleServiceChargeChange(
                                serviceCharge.type,
                                Number(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        <FormControl
                          className="FormControl mt-4 w-full"
                          variant="outlined"
                        >
                          <label className="FormLabel font-bold">
                            Discount Type
                          </label>
                          <Select
                            value={discount.type}
                            className="FormInput mb-3"
                            onChange={(e) =>
                              handleDiscountChange(
                                e.target.value as 'percentage' | 'fixed',
                                discount.value
                              )
                            }
                          >
                            <MenuItem value="percentage">Percentage</MenuItem>
                            <MenuItem value="fixed">Fixed Amount</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl
                          className="FormControl mt-4 w-full"
                          variant="standard"
                        >
                          <label className="FormLabel font-bold">
                            Discount Value
                          </label>
                          <Input
                            type="number"
                            className="FormInput"
                            disableUnderline
                            value={discount.value}
                            onChange={(e) =>
                              handleDiscountChange(
                                discount.type,
                                Number(e.target.value)
                              )
                            }
                          />
                        </FormControl>
                        {/* <hr className="mt-5" /> */}
                        <div className="FormTotal pt-3">
                          <span className="text-sm font-semibold">
                            Cost of Construction:{' '}
                          </span>
                          <span>
                            {CURRENCY_PREFIX} {totalConstructionCost.toFixed(2)}
                          </span>
                        </div>
                        <div className="FormTotal pb-2">
                          <span className="text-sm font-semibold">
                            Total Cost of Project (including service charges):{' '}
                          </span>
                          <span>
                            {CURRENCY_PREFIX}{' '}
                            {totalProjectCostWithServiceCharge.toFixed(2)}
                          </span>
                        </div>
                        <div className="FormTotal pb-3">
                          <span className="font-bold">Grand Total: </span>
                          <span>
                            {' '}
                            {CURRENCY_PREFIX} {grandTotal.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12">
                  <Button
                    className="btn-black-outline col-span-4"
                    onClick={handleFormClose}
                    sx={{
                      marginRight: '0.5rem',
                      padding: '0.375rem 1.5rem !important',
                    }}
                  >
                    Cancel
                  </Button>
                  <Input
                    type="submit"
                    value="Submit"
                    className="btn-black-fill col-span-8"
                    sx={{ padding: '0.175rem 2rem !important' }}
                    disableUnderline
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuotationsAddPage;

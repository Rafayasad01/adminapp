import network from '../../utils/network';

const listVouchers = (
  tenant: string,
  page: number,
  size: number,
  search = ''
) => {
  const searchParams = new URLSearchParams({
    limit: size.toString(),
    offset: (page * size).toString(),
  });
  if (search) searchParams.append('search', search);
  return network.get(`voucher/list/${tenant}?${searchParams}`);
};

const createVoucher = (tenant: string, data: any) => {
  return network.post(`voucher/create/${tenant}`, data);
};
const updateVoucher = (tenant: string, id: string, data: any) => {
  return network.post(`voucher/update/${tenant}/${id}`, data);
};
const deleteVoucher = (tenant: string, id: string) => {
  return network.post(`voucher/delete/${tenant}/${id}`, {});
};
const updateStatus = (data: any) => {
  return network.post(`voucher/update/status`, data);
};
const orderVoucherPromotionList = (tenantId: string, appUserId: string) => {
  return network.get(`voucher/promotion/${tenantId}/${appUserId}`);
};

export default {
  listVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
  updateStatus,
  orderVoucherPromotionList,
};

import React from 'react';
import { Dialog, Grid, Button } from '@mui/material';
import { Vendor } from '../../interfaces/Vendor';
import MapAddressReadOnly from '../../components/common/MapAddressReadOnly';

type VendorDetailsProps = {
  open: boolean;
  onClose: () => void;
  openEdit: () => void;
  vendor: Vendor | undefined;
};

const VendorDetailsPopup: React.FC<VendorDetailsProps> = ({
  open,
  onClose,
  openEdit,
  vendor,
}) => {
  const handleEdit = () => {
    onClose();
    openEdit();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        className: 'Dialog Width-60',
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
      maxWidth="md"
      fullWidth
    >
      <div className="Content">
        <h2 className="py-5 font-bold">Vendor Information</h2>
        <div className="grid grid-cols-12">
          <div className="xs:col-span-12 col-span-10 grid grid-cols-12">
            <div className="xs:col-span-12 col-span-3 p-3">
              <h6 className="text-sm ">Vendor Name:</h6>
              <p className="font-semibold">{vendor?.name}</p>
            </div>
            <div className="xs:col-span-12 col-span-3 p-3">
              <h6 className="text-sm ">Vendor Type:</h6>
              <p className="font-semibold">{vendor?.vendorType}</p>
            </div>
            <div className="xs:col-span-12 col-span-3 p-3">
              <h6 className="text-sm ">Add Service Type:</h6>
              <p className="font-semibold">{vendor?.serviceType}</p>
            </div>

            <div className="xs:col-span-12 col-span-3 p-3">
              <h6 className="text-sm ">Vendor Contact Email:</h6>
              <p className="font-semibold">{vendor?.email}</p>
            </div>
            <div className="xs:col-span-12 col-span-3 p-3">
              <h6 className="text-sm ">Vendor Contact WhatsApp:</h6>
              <p className="font-semibold">{vendor?.contact}</p>
            </div>
            <div className="xs:col-span-12 col-span-3 p-3">
              <h6 className="text-sm ">Vendor Bank Name:</h6>
              <p className="font-semibold">{vendor?.bankName}</p>
            </div>
            <div className="xs:col-span-12 col-span-3 p-3">
              <h6 className="text-sm ">IBAN #:</h6>
              <p className="font-semibold">{vendor?.iban}</p>
            </div>

            <div className="xs:col-span-12 col-span-3 p-3">
              <h6 className="text-sm ">Vendor Delivery TAT:</h6>
              <p className="font-semibold">{vendor?.deliveryTime}</p>
            </div>
            <div className="xs:col-span-12 col-span-5 p-3">
              <h6 className="text-sm ">Vendor Location:</h6>
              <p className="font-semibold">{vendor?.location}</p>
            </div>
          </div>
          <div className="xs:col-span-12 col-span-2">
            <MapAddressReadOnly address={vendor?.location ?? ''} zoom={10} />
          </div>
        </div>
        <div className="grid grid-cols-12">
          <div className="xs:col-span-12 col-span-6 p-3">
            <h6 className="text-sm ">Vendor Payment Terms:</h6>
            <p className="font-semibold">{vendor?.paymentTerms}</p>
          </div>

          <div className="xs:col-span-12 col-span-6 p-3">
            <h6 className="text-sm ">Delivery Terms:</h6>
            <p className="font-semibold">{vendor?.deliveryTerms}</p>
          </div>
        </div>

        <Grid container justifyContent="center" spacing={2} sx={{ mt: 2 }}>
          <Button
            className="btn-black-outline"
            onClick={onClose}
            sx={{
              marginRight: '0.5rem',
              padding: '0.375rem 1.5rem !important',
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleEdit}
            variant="outlined"
            className="btn-black-fill"
          >
            Edit
          </Button>
        </Grid>
      </div>
    </Dialog>
  );
};

export default VendorDetailsPopup;

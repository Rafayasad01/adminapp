import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import Link from '@mui/material/Link';
import assets from '../../assets';
import {
  DOMAIN_PREFIX,
  DOMAIN_PROTOCOL,
  FACEBOOK,
  INSTAGRAM,
  LINKEDIN,
  TWITTER,
  WHATSAPP,
  YOUTUBE,
} from '../../utils/constants';

type Props = {
  setOpenFormDialog: any;
  openFormDialog: any;
  detail: any;
};

type AssetsImages = keyof typeof assets.images;

function Item(props: { value: any; name: AssetsImages }) {
  const { value, name } = props;
  return (
    <Link href={value} underline="none" target="_blank">
      <img src={assets.images[name]} alt="" />
    </Link>
  );
}

function BranchSettingPopup({
  openFormDialog,
  setOpenFormDialog,
  detail,
}: Props) {
  const handleFormClose = () => {
    setOpenFormDialog(false);
  };

  return (
    detail && (
      <Dialog
        open={openFormDialog}
        onClose={handleFormClose}
        scroll="paper"
        PaperProps={
          {
            // className: 'Dialog',
            // style: { maxWidth: '100%', maxHeight: 'auto' },
          }
        }
      >
        <div className="Content p-5">
          <span className="font-open-sans text-xl font-semibold not-italic text-secondary">
            Setting Details
          </span>
          <div className="grid w-full grid-cols-12 gap-3">
            <div className="col-span-4">
              <div className="flex flex-col py-[2rem] px-5">
                <div className="flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Logo
                  </span>
                  <div className="mt-2 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.logo ? (
                      <Avatar
                        className="avatar flex flex-row items-center"
                        alt="Remy Sharp"
                        src={detail.logo}
                        sx={{
                          width: 50,
                          height: 50,
                          textTransform: 'uppercase',
                          fontSize: '14px',
                          marginRight: '10px',
                        }}
                      />
                    ) : (
                      <Avatar
                        className="avatar flex flex-row items-center"
                        alt="Remy Sharp"
                        src={assets.images.tenantIcon}
                        sx={{
                          width: 50,
                          height: 50,
                          textTransform: 'uppercase',
                          fontSize: '14px',
                          marginRight: '10px',
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Theme Name
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.name ? detail.name : '--'}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-row gap-3">
                  <div className="flex w-full flex-col">
                    <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                      Theme Color
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      <span
                        style={{
                          background: `${
                            detail.color1 ? detail.color1 : '#1A1A1A'
                          }`,
                        }}
                        className="block h-[25px] w-[25px] rounded-full border border-foreground"
                      />
                    </div>
                  </div>
                  <div className="flex w-full flex-col">
                    <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                      Text Color
                    </span>
                    <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                      <span
                        style={{
                          background: `${
                            detail.color2 ? detail.color2 : '#1A1A1A'
                          }`,
                        }}
                        className="block h-[25px] w-[25px] rounded-full border border-foreground"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    GST Percentage
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.gstPercentage ? detail.gstPercentage : '0.00'}%
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Email
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.email ? detail.email : '--'}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Description
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.desc ? detail.desc : '--'}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col py-[2rem] px-5">
                <div className="flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Minimum Order Amount
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.minOrderAmount ? detail.minOrderAmount : '--'}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Delivery Fee
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.deliveryFee ? detail.deliveryFee : '--'}
                  </div>
                </div>

                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Development Domain
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.developmentDomain
                      ? DOMAIN_PROTOCOL +
                        detail.developmentDomain +
                        DOMAIN_PREFIX
                      : '--'}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Live Domain
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    {detail.liveDomain
                      ? DOMAIN_PROTOCOL + detail.liveDomain + DOMAIN_PREFIX
                      : '--'}
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <span className="font-open-sans text-base font-semibold not-italic text-secondary">
                    Social Media Icons
                  </span>
                  <div className="mt-1 font-open-sans text-sm font-normal not-italic text-[#6A6A6A]">
                    <div className="mt-2 flex flex-row items-center gap-3">
                      {detail.facebook !== 'null' && (
                        <Item
                          key={detail.facebook}
                          value={detail.facebook}
                          name={FACEBOOK as AssetsImages}
                        />
                      )}
                      {detail.instagram !== 'null' && (
                        <Item
                          key={detail.instagram}
                          value={detail.instagram}
                          name={INSTAGRAM as AssetsImages}
                        />
                      )}
                      {detail.linkedin !== 'null' && (
                        <Item
                          key={detail.linkedin}
                          value={detail.linkedin}
                          name={LINKEDIN as AssetsImages}
                        />
                      )}
                      {detail.twitter !== 'null' && (
                        <Item
                          key={detail.twitter}
                          value={detail.twitter}
                          name={TWITTER as AssetsImages}
                        />
                      )}
                      {detail.youtube !== 'null' && (
                        <Item
                          key={detail.youtube}
                          value={detail.youtube}
                          name={YOUTUBE as AssetsImages}
                        />
                      )}
                      {detail.whatsapp !== 'null' && (
                        <Item
                          key={detail.whatsapp}
                          value={detail.whatsapp}
                          name={WHATSAPP as AssetsImages}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    )
  );
}

export default BranchSettingPopup;

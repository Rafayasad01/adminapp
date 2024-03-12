import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DashboardAppointments = () => {
  return (
    <div className="mt-10">
      <div className="time-line-container border-l border-dashed px-2">
        <div className="alder-time-line">
          <div className="alder-timeline-dot relative left-[-13px] inline-block h-[11px] w-[11px]  rounded-full border-gray-50 bg-primary" />
          <div className="inline-block text-sm">Today, 8:30 am - 10:30 am</div>
          <div className="timeline-content px-3 py-5">
            <h5 className="text-sm font-medium">Nurse Visit 20</h5>
            <div className="mt-5 flex justify-between text-sm font-medium text-[#A9A9A9]">
              <span> Dr. Carol D. Pollack-rundle</span>
              <span>
                <ArrowForwardIosIcon className="h-[15px] text-black" />{' '}
              </span>
            </div>
          </div>
        </div>
        <div className="alder-time-line">
          <div className="alder-timeline-dot relative left-[-13px] inline-block h-[11px] w-[11px]  rounded-full border-gray-50 bg-primary" />
          <div className="inline-block text-sm">Today, 8:30 am - 10:30 am</div>
          <div className="timeline-content px-3 py-5">
            <h5 className="text-sm font-medium">Nurse Visit 20</h5>
            <div className="mt-5 flex justify-between text-sm font-medium text-[#A9A9A9]">
              <span> Dr. Carol D. Pollack-rundle</span>
              <span>
                <ArrowForwardIosIcon className="h-[15px] text-black" />{' '}
              </span>
            </div>
          </div>
        </div>
        <div className="alder-time-line">
          <div className="alder-timeline-dot relative left-[-13px] inline-block h-[11px] w-[11px]  rounded-full border-gray-50 bg-primary" />
          <div className="inline-block text-sm">Today, 8:30 am - 10:30 am</div>
          <div className="timeline-content px-3 py-5">
            <h5 className="text-sm font-medium">Nurse Visit 20</h5>
            <div className="mt-5 flex justify-between text-sm font-medium text-[#A9A9A9]">
              <span> Dr. Carol D. Pollack-rundle</span>
              <span>
                <ArrowForwardIosIcon className="h-[15px] text-black" />{' '}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAppointments;

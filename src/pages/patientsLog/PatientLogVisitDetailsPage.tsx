import { IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import TopBar from '../../components/common/Md-Alder/TopBar';
import PatientProfileInfo from '../../components/common/Md-Alder/PatientLog/PatientProfileInfo';
// import ScanImage from '../../assets/images/scan-image.png';
import PdfIcon from '../../components/icons/PdfIcon';

const PatientLogVisitDetailsPage = () => {
  const { state } = useLocation();
  const { data } = state;

  return (
    <>
      <TopBar title="Patient Profile" />
      <div className="mt-10 pr-5">
        <PatientProfileInfo data={state.user} />

        <div className="alder-content alder-patient-visit-logs mt-10 py-10">
          <div className="grid grid-cols-12">
            <div className="col-span-10">
              <h4 className="alder-content-title capitalize  underline underline-offset-2">
                Presenting Complains
              </h4>
              <div className="mt-3 grid grid-cols-12">
                <div className="col-span-3">
                  <p className="text-sm text-[#A9A9A9]">
                    Chief Presenting Complaints
                  </p>
                  <p>{data?.chiefComplaint}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-sm text-[#A9A9A9]">Type Of Complaint</p>
                  <p>{data?.complaintType}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#A9A9A9]">Symptoms</p>
                  <p>{data?.symptoms || 'none'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#A9A9A9]">Diagnosis</p>
                  <p>{data?.diagnose}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#A9A9A9]">
                    Differential Diagnosis
                  </p>
                  <p>{data?.differentialDiagnose}</p>
                </div>
              </div>
            </div>
            <div className="col-span-2 text-right">
              <IconButton className="rounded-lg border border-solid border-primary">
                <PdfIcon className="h-[35px]" />
              </IconButton>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-12">
            <div className="col-span-2">
              <p className="text-sm text-[#A9A9A9]">Duration Start</p>
              <p>
                {data?.complaintDurationStartTime
                  ? dayjs(data?.complaintDurationStartTime).format('YYYY-MM-DD')
                  : 'none'}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-[#A9A9A9]">Duration End</p>
              <p>
                {data?.complaintDurationEndTime
                  ? dayjs(data?.complaintDurationEndTime).format('YYYY-MM-DD')
                  : 'none'}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-[#A9A9A9]">Follow Up</p>
              <p>
                {data?.complaintFollowUpTime
                  ? dayjs(data?.complaintFollowUpTime).format('YYYY-MM-DD')
                  : 'none'}
              </p>
            </div>
          </div>

          {/* Prescriptions */}

          <div className="mt-5">
            <h4 className="alder-content-title capitalize  underline underline-offset-2">
              Prescriptions
            </h4>
            {data?.prescriptions?.length
              ? data?.prescriptions?.map((e: any, i: number) => {
                  return (
                    <div key={i} className="mt-5 grid grid-cols-12">
                      <div className="col-span-1">
                        <p className="text-sm text-[#A9A9A9]">S.No#</p>
                        <p>{i + 1}.</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-[#A9A9A9]">Drug Name</p>
                        <p>{e.drugName}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-[#A9A9A9]">Dosage Form</p>
                        <p>{e.dosageForm}</p>
                      </div>
                      <div className="col-span-1">
                        <p className="text-sm text-[#A9A9A9]">Strength</p>
                        <p>{e.strength}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-[#A9A9A9]">Dose</p>
                        <p>{e.dose}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-[#A9A9A9]">Duration Start</p>
                        <p>
                          {e?.presDurationStartTime
                            ? dayjs(e?.presDurationStartTime).format(
                                'YYYY-MM-DD'
                              )
                            : '--'}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-[#A9A9A9]">Duration End</p>
                        <p>
                          {' '}
                          {e?.presDurationEndTime
                            ? dayjs(e?.presDurationEndTime).format('YYYY-MM-DD')
                            : '--'}
                        </p>
                      </div>
                    </div>
                  );
                })
              : 'Prescriptions not available'}
          </div>

          {/* Lab Test */}
          <div className="mt-5">
            <h4 className="alder-content-title capitalize underline underline-offset-2">
              Lab Test
            </h4>
            <div className="mt-5 grid grid-cols-12">
              {!data?.uce &&
                !data?.cbc &&
                !data?.urineDr &&
                !data?.radiology &&
                !data?.lft &&
                !data?.biopsy &&
                !data?.otherLabsDesc && (
                  <div className="col-span-12 text-secondary2">
                    No lab test needed
                  </div>
                )}
              {data?.uce ? (
                <div className="col-span-1 text-secondary2">
                  <p>UCE</p>
                </div>
              ) : (
                ''
              )}
              {data?.cbc ? (
                <div className="col-span-1 text-secondary2">
                  <p>CBC</p>
                </div>
              ) : (
                ''
              )}
              {data?.urineDr ? (
                <div className="col-span-1 text-secondary2">
                  <p>Urine DR</p>
                </div>
              ) : (
                ''
              )}
              {data?.radiology ? (
                <div className="col-span-1 text-secondary2">
                  <p>Radiology</p>
                </div>
              ) : (
                ''
              )}
              {data?.lft ? (
                <div className="col-span-1 text-secondary2">
                  <p>LFT</p>
                </div>
              ) : (
                ''
              )}
              {data?.biopsy ? (
                <div className="col-span-1 text-secondary2">
                  <p>Biopsy</p>
                </div>
              ) : (
                ''
              )}
              {data?.otherLabsDesc ? (
                <div className="col-span-1 text-secondary2">
                  <p>{data?.otherLabsDesc}</p>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>

          {/* Scan Images */}
          <div className="mt-5 ">
            <h4 className="alder-content-title capitalize  underline underline-offset-2">
              Scan Images
            </h4>
            <div className="mt-5 grid grid-cols-12 gap-9">
              {data?.scanMedia?.length
                ? data?.scanMedia?.map((e: any, i: number) => {
                    return (
                      <div key={i} className="col-span-2">
                        <span className="mb-5 block text-sm font-medium capitalize text-[#A9A9A9]">
                          {e.caption}
                        </span>
                        <img
                          src={e.url}
                          alt="scanImage"
                          className="h-[150px] w-[140px] object-contain"
                        />
                      </div>
                    );
                  })
                : 'No Images'}
            </div>
          </div>

          {/* Previous Visit */}
          <div className="mt-5">
            <h4 className="alder-content-title capitalize  underline underline-offset-2">
              Previous Visit
            </h4>
            <div className="mt-5 grid grid-cols-12 gap-9">
              <div className="col-span-2">
                <p className="text-sm text-[#A9A9A9]">Visit Date</p>
                <p>02/24/2024</p>
              </div>
              <div className="col-span-5">
                <p className="text-sm text-[#A9A9A9]">Medical Note</p>
                <p>I have skin allergy for 2 3 months</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientLogVisitDetailsPage;

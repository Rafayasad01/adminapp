import { IconButton } from '@mui/material';
import TopBar from '../../components/common/Md-Alder/TopBar';
import PatientProfileInfo from '../../components/common/Md-Alder/PatientLog/PatientProfileInfo';
import ScanImage from '../../assets/images/scan-image.png';
import PdfIcon from '../../components/icons/PdfIcon';

const PatientLogVisitDetailsPage = () => {
  return (
    <>
      <TopBar title="Patient Profile" />
      <div className="mt-10 pr-5">
        <PatientProfileInfo showReset />

        <div className="alder-content alder-patient-visit-logs mt-10 py-10">
          <div className="grid grid-cols-12">
            <div className="col-span-10">
              <h4 className="alder-content-title capitalize">
                Presenting Complains
              </h4>
              <div className="mt-3 grid grid-cols-12">
                <div className="col-span-3">
                  <p className="text-sm text-[#A9A9A9]">
                    Chief Presenting Complaints
                  </p>
                  <p>Lorem Ipsum is simply</p>
                </div>
                <div className="col-span-3">
                  <p className="text-sm text-[#A9A9A9]">Type Of Complaint</p>
                  <p>Remission</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#A9A9A9]">Symptoms</p>
                  <p>Skin Rash</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#A9A9A9]">Diagnosis</p>
                  <p>Skin Peeling</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-[#A9A9A9]">
                    Differential Diagnosis
                  </p>
                  <p>Skin Peeling</p>
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
              <p>01/02/2023</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-[#A9A9A9]">Duration End</p>
              <p>02/02/2023</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-[#A9A9A9]">Follow Up</p>
              <p>02/02/2023</p>
            </div>
          </div>

          {/* Prescriptions */}

          <div className="mt-5">
            <h4 className="alder-content-title capitalize">Prescriptions</h4>

            <div className="mt-5 grid grid-cols-12">
              <div className="col-span-2">
                <p className="text-sm text-[#A9A9A9]">Drug Name</p>
                <p>Lorem Ipsum is simply</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-[#A9A9A9]">Dosage Form</p>
                <p>Liquid</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-[#A9A9A9]">Strength</p>
                <p>Lorem</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-[#A9A9A9]">Dose</p>
                <p>02</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-12">
              <div className="col-span-2">
                <p className="text-sm text-[#A9A9A9]">Duration Start</p>
                <p>01/02/2023</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-[#A9A9A9]">Duration End</p>
                <p>02/02/2023</p>
              </div>
            </div>
          </div>

          {/* Lab Test */}
          <div className="mt-5">
            <h4 className="alder-content-title capitalize">Lab Test</h4>
            <div className="mt-5 grid grid-cols-12">
              <div className="col-span-1 text-primary">
                <p>UCE</p>
              </div>
              <div className="col-span-1 text-primary">
                <p>Urine DR</p>
              </div>
              <div className="col-span-1 text-primary">
                <p>Biopsy</p>
              </div>
            </div>
          </div>

          {/* Scan Images */}
          <div className="mt-5">
            <h4 className="alder-content-title capitalize">Scan Images</h4>
            <div className="mt-5 grid grid-cols-12 gap-9">
              <div className="col-span-2">
                <p className="mb-2 text-sm font-medium text-[#A9A9A9]">
                  Image 01
                </p>
                <img src={ScanImage} alt="scanImage" className="w-[140px]" />
              </div>
              <div className="col-span-2">
                <p className="mb-2 text-sm font-medium text-[#A9A9A9]">
                  Image 02
                </p>
                <img src={ScanImage} alt="scanImage" className="w-[140px]" />
              </div>
              <div className="col-span-2">
                <p className="mb-2 text-sm font-medium text-[#A9A9A9]">
                  Image 03
                </p>
                <img src={ScanImage} alt="scanImage" className="w-[140px]" />
              </div>
            </div>
          </div>

          {/* Previous Visit */}
          <div className="mt-5">
            <h4 className="alder-content-title capitalize">Previous Visit</h4>
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

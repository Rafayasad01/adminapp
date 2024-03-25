import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import TopBar from '../../components/common/Md-Alder/TopBar';
import Photo from '../../assets/images/PhotoLessRounded.png';
import Map from '../../assets/images/map.png';
import DoctorsDetailsCard from './profile/DoctorsDetailsCard';
import assets from '../../assets/index';

const DoctorsProfilePage = () => {
  return (
    <>
      <TopBar title="Doctor Profile" />
      <div className="mt-10 pr-5">
        <div className="alder-content alder-doctor-profile mt-10 p-5">
          <div className="grid grid-cols-12">
            <div className="col-span-3 px-3">
              <img src={Photo} alt="profile" className="w-100 h-[333px]" />
            </div>
            <div className="col-span-9">
              <div className="flex justify-between">
                <h3 className="alder-content-title">Profile Info</h3>
                <div className="mr-4">
                  <IconButton>
                    <StarIcon className="text-[#FA8F21]" />
                  </IconButton>
                  <h3 className="inline-block p-2 text-lg font-medium">
                    4.5/5
                  </h3>
                  <IconButton>
                    <EditIcon className="text-primary" />
                  </IconButton>
                </div>
              </div>

              <div>
                <div className="mt-5">
                  <p className="text-sm text-primary">Doctor</p>
                  <p>James Cameron</p>
                </div>
                <div className="mt-5">
                  <p className="text-sm text-primary">Expertise</p>
                  <p>Dermatologist</p>
                </div>
                <div className="mt-5">
                  <p className="text-sm text-primary">About The Doctor</p>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum is simply dummy text of
                    the printing and typesetting industry. Lorem Ipsum has been
                    the industrys standard dummy text ever since the 1500s, when
                    an unknown printer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="alder-doctor-details-section mt-5">
          <div className="grid grid-cols-12 gap-5">
            <div className="alder-content alder-doctor-details-section-card col-span-4 ">
              <div className="h-[400px] overflow-y-scroll">
                <div className="flex justify-between">
                  <h3 className="alder-content-title">Profile Info</h3>
                  <div className="mr-4">
                    <IconButton>
                      <EditIcon className="text-primary" />
                    </IconButton>
                  </div>
                </div>
                <DoctorsDetailsCard
                  label="Board Certification"
                  value="Medical Oncology & Hermatology"
                />
                <DoctorsDetailsCard
                  label="College"
                  value="Maryland Medical College"
                />
                <DoctorsDetailsCard
                  label="University"
                  value="University of Pennsylvania"
                />
                <DoctorsDetailsCard
                  label="Fellowship"
                  value="Columbia University Medical Center, Medical Oncology & Hermatology"
                />
                <h3 className="alder-content-title mt-4">Experience</h3>

                <DoctorsDetailsCard
                  label="Hospital 1"
                  value="+3 Years of experience as a Cardiologist in MACY GENERAL HOSPITAL"
                />

                <DoctorsDetailsCard
                  label="Hospital 2"
                  value="+2 Years of experience as a Cardiologist in MACY GENERAL HOSPITAL"
                />
              </div>
            </div>
            <div className="alder-content alder-doctor-details-section-card col-span-4">
              <div className="h-[400px] overflow-y-scroll">
                <div className="flex justify-between">
                  <h3 className="alder-content-title">Specialties</h3>
                  <div className="mr-4">
                    <IconButton>
                      <EditIcon className="text-primary" />
                    </IconButton>
                  </div>
                </div>
                <DoctorsDetailsCard label="Skill 1" value="Pediatric" />
                <DoctorsDetailsCard label="Skill 2" value="Endoscopic" />
                <DoctorsDetailsCard label="Skill 3" value="Thoracoscopy" />

                <h3 className="alder-content-title mt-4">Available Slots</h3>

                <DoctorsDetailsCard
                  label="Monday 24 Apr 2024"
                  value="1:00 pm till 4:00 pm"
                />
                <DoctorsDetailsCard
                  label="Saturday 30 Apr 2024"
                  value="1:00 pm till 4:00 pm"
                />
                <h3 className="alder-content-title mt-4">Languages Spoken</h3>

                <DoctorsDetailsCard label="Language 1" value="English (UK)" />
              </div>
            </div>
            <div className="alder-content alder-doctor-details-section-card col-span-4">
              <div className="h-[400px] overflow-y-scroll">
                <div className="flex justify-between">
                  <h3 className="alder-content-title">Contact Details</h3>
                  <div className="mr-4">
                    <IconButton>
                      <EditIcon className="text-primary" />
                    </IconButton>
                  </div>
                </div>
                <DoctorsDetailsCard label="Contact Details" value="" />
                <div className="flex py-3">
                  <img src={assets.images.facebook} alt="" className="m-3" />
                  <img src={assets.images.instagram} alt="" className="m-3" />
                  <img src={assets.images.linkedin} alt="" className="m-3" />
                  <img src={assets.images.whatsapp} alt="" className="m-3" />
                </div>
                <DoctorsDetailsCard label="Phone" value="123 456 789" />
                <DoctorsDetailsCard label="Email" value="abc@gmail.com" />
                <DoctorsDetailsCard label="Address" value="" />
                <img src={Map} alt="map" className="mt-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsProfilePage;

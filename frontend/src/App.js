import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from "react";
import Home from './components/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import TrainingCompLogin from './components/login/TrainingCompLogin';
import TrainingCompanyDashboard from './components/company/TrainingCompanyDashboard';
import AllPrograms from './components/student/academics/AllPrograms';
import AdminTrainingProgs from './components/admin/AdminTrainingProgs';
import MaterialUpload from './components/company/MaterialUpload';
import AttendanceTable from './components/admin/AttendanceTable';

import CompanyLogIn from './components/login/CompanyLogIn';
import CompanyRegister from './components/register/CompanyRegister'
import TreningRegister from './components/register/TreningRegister';
import CompanyHome from './components/company/CompanyHome';
import CompanyJobPosting from './components/company/CompanyJobPosting';
import ViewCandidateResume from './components/ResumeViewCompany'
import InterviewCompany from './components/InteviewCompany'
import AdminCompany from './components/admin/AdminCompany'
import CompanyInterview from './components/company/CompanyInterview'

import StudentLogIn from './components/login/StudentLogIn';
import StudentRegister from './components/register/StudentRegister';
import StudentProfile from './components/student/profile/StudentProfile';
import EditStudentProfile from './components/student/profile/EditStudentProfile';
import StudentHiringView from './components/student/companies/StudentHiringView';
import HiringCompanies from './components/student/companies/HiringCompanies';
import LOSA from './components/company/ListOfStudentApplied'
import Createresume from './components/student/resume/createResume';
import Resume from './components/student/resume/Resume'
import StudentSlotSelection from './components/student/StudentSlotSelection'
import StudentSchedule from './components/student/schedule/StudentSchedule'
import StudentScheduled from './components/student/schedule/StudentScheduled'
import StudentHome from './components/student/StudentHome'
import StudentAnalyticsandRepo from './components/student/StudentAnalyticsandRepo';
import StudentsAcademics from './components/student/academics/StudentsAcademics';
import StudentResume from './components/PdfViewer';
import ResumeDetail from './components/student/resume/ResumeDetail'
import StudentCoverLetter from './components/student/coverLetter/StudentCoverLetter';
import CoverLetter from './components/student/coverLetter/CoverLetter';
import ChatPage from './chat/Chat';
import FeedbackTable from './components/student/Feedback';
import BestJob from './components/student/bestjob/bestjob';

import AdminPlacedStudent from './components/admin/AdminPlacedStudent'
import AdminCompanyView from './components/admin/AdminCompanyView';
import AdminStudentApplied from './components/admin/AdminStudentsApplied'
import AdminStudent from './components/admin/AdminStudent'
import AdminLogin from './components/login/AdminLogIn';
import AdminRegister from './components/register/AdminRegister';
import AdminHome from './components/admin/AdminHome';
import AdminJobPosting from './components/admin/AdminJobPosting';
import AdminJobDetails from './components/admin/AdminJobDetails';

import AllJobPosted from './components/company/AllJobPosted';
import InterviewForm from './components/InterviewForm';

import CareerCounselling from './components/student/career counselling/CareerCounselling'
import SystemEngineering from './components/student/career counselling/field/SystemEngineer'
import ElecticalEngineering from './components/student/career counselling/field/ElectricalEngineer'
import ChemicalEngineering from './components/student/career counselling/field/ChemicalEngineer'
import BigDataEngineering from './components/student/career counselling/field/BigDataEngineer'
import AerospaceEngineering from './components/student/career counselling/field/AerospaceEngineer'
import SoftwareDeveloper from './components/student/career counselling/field/SoftwareDeveloper'
import Uiux from './components/student/career counselling/field/UiUxDesigner'
import CHEngineer from './components/student/career counselling/field/ComputerHardwareEngineer'
import StructuralEngineer from './components/student/career counselling/field/StructuralEngineer'

import AboutUs from './components/home/about/AboutUs';
// import Courses from './components/home/course/Courses';
import Team from './components/home/team/Team';
import Placement from './components/home/placement/Placement';
import ContactUs from './components/home/contactUs/ContactUs';
import StudentAttendance from './components/student/academics/StudentAttendance';
import NotFound from './components/common/NotFound';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/ResumeCreate' element={<ResumeDetail />} />
          <Route path='/createResume' element={<Createresume />} />
          <Route path='/adminCompanyView' element={<AdminCompanyView />} />
          <Route path='/Feedback' element={<FeedbackTable />} />
          <Route path='/StudentResume' element={<StudentResume />} />
          <Route path='/CompanyInterview' element ={<CompanyInterview/>}/>
          <Route path='/StudentCoverLetter' element={<StudentCoverLetter />} />
          <Route path='/CoverLetter' element={<CoverLetter />} />
          <Route path='/Resume' element={<Resume />} />
          <Route path='/admin/companies' element={<AdminCompany />} />

          <Route path='/admin/trainingPrograms' element={<AdminTrainingProgs />} />
          <Route path='/admin/companies/add-job' element={<CompanyJobPosting />} />
          <Route path='/student-attendance' element={<StudentAttendance />} />


          <Route path='/admin/jobPosting' element={<AdminJobPosting />} />
          <Route path='/admin/students' element={<AdminStudent />} />
          <Route path='/admin/studentapplied' element={<AdminStudentApplied />} />
          <Route path='/admin/placedStudent' element={<AdminPlacedStudent />} />
          <Route path='/admin/jobDetails' element={<AdminJobDetails  />} />
          <Route path='/CareerCounselling' element={<CareerCounselling />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/admin/home' element={<AdminHome />} />
          <Route path='/StudentHome' element={<StudentHome />} />
          <Route path='/CompanyLogIn' element={<CompanyLogIn />} />
          <Route path='/TrainingCompLogin' element={<TrainingCompLogin />} />
          <Route path='/StudentLogin' element={<StudentLogIn />} />
          <Route path='/StudentRegister' element={<StudentRegister />} />
          <Route path='/CompanyRegister' element={<CompanyRegister />} />
          <Route path='/TreningRegister' element={<TreningRegister />} />
          <Route path='/AdminLogIn' element={<AdminLogin />} />
          <Route path='/AdminRegister' element={<AdminRegister />} />
          <Route path='/CompanyHome' element={<CompanyHome />} />
          <Route path='/trainingHome' element={<TrainingCompanyDashboard />} />
          <Route path="/attendance/:programId" element={<AttendanceTable />} />
          <Route path='/AllPrograms' element={<AllPrograms />} />
          <Route path='/material-upload/:programId' element={<MaterialUpload />} />

          <Route path='/StudentProfile' element={<StudentProfile />} />
          <Route path='/EditStudentProfile' element={<EditStudentProfile />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/NewJobPosting' element={<CompanyJobPosting />} />


          <Route path='/ALLJobRole' element={<HiringCompanies />} />
          <Route path='/JobDescription' element={<StudentHiringView />} />
          <Route path='/ViewJobPosting' element={<AllJobPosted />} />
          <Route path='/LOSA' element={<LOSA />} />
          <Route path='/scheduleInterview' element={<InterviewForm />} />
          <Route path='/StudentSlotSelection' element={<StudentSlotSelection />} />
          <Route path='/StudentSchedule' element={<StudentSchedule />} />
          <Route path='/StudentScheduled' element={<StudentScheduled />} />
          <Route path='/CompanyInterviewSchedule' element={<InterviewCompany />} />
          <Route path="/system-engineering" element={<SystemEngineering/>} />
          <Route path="/electrical-engineering" element={<ElecticalEngineering/>} />
          <Route path="/chemical-engineering" element={<ChemicalEngineering/>} />
          <Route path="/big-data-engineering" element={<BigDataEngineering/>} />
          <Route path="/aerospace-engineering" element={<AerospaceEngineering/>} />
          <Route path="/software-developer" element={<SoftwareDeveloper/>} />
          <Route path="/ui-ux-designer" element={<Uiux/>} />
          <Route path="/computer-hardware-engineer" element={<CHEngineer/>} />
          <Route path="/structural-engineer" element={<StructuralEngineer/>} />
          <Route path="/analytics-reporting" element={<StudentAnalyticsandRepo/>} />    
          <Route path="/student-academics" element={<StudentsAcademics/>}/>      
          <Route path='/viewCandidateResume' usn={localStorage.getItem('usn')} element={<ViewCandidateResume />} />
          <Route path="/AdminHome" element={<AdminHome/>}/>      
          <Route path="/AdminJobPosting" element={<AdminJobPosting/>}/>   
          <Route path="/AdminPlacedStudent" element={<AdminPlacedStudent/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
          {/* <Route path="/courses" element={<Courses />} /> */}
          <Route path="/team" element={<Team />} />
          <Route path="/placement" element={<Placement />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/bestjob" element={<BestJob />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )

}

export default App;

import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import BgColorAnimation from "../../animations/BgColorAnimation";

const StudentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usn: "",
    firstName: "",
    lastName: "",
    currentSemester: "", // Dropdown
    department: "", // Dropdown
    collegeName: "", // Dropdown
    email: "",
    password: "",
    dateOfBirth: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    contactNumber: "",
    address: "",
    careerObjective: "",
    schoolName1: "",
    education1: "",
    course1: "",
    address1: "",
    score1: "",
    yearOfCompletion1: "",
    schoolName2: "",
    education2: "",
    course2: "",
    address2: "",
    score2: "",
    yearOfCompletion2: "",
    score3: '',
    keySkills: "",
    careerPreferences: "",
  });
  const [showPswd, setShowPswd] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/studentRegister`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.message === "ok") {
        navigate("/StudentLogIn");
      }
      console.log(data); // Handle the response from the backend
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordVisibility = () => {
    setShowPswd(!showPswd);
  };

  const handleReset = () => {
    setFormData({
      usn: "",
      firstName: "",
      lastName: "",
      currentSemester: "", // Dropdown
      department: "", // Dropdown
      collegeName: "", // Dropdown
      email: "",
      password: "",
      dateOfBirth: "",
      country: "",
      state: "",
      city: "",
      zip: "",
      contactNumber: "",
      address: "",
      careerObjective: "",
      schoolName1: "",
      education1: "",
      course1: "",
      address1: "",
      score1: "",
      yearOfCompletion1: "",
      schoolName2: "",
      education2: "",
      course2: "",
      address2: "",
      score2: "",
      yearOfCompletion2: "",
      score3: '',
      keySkills: "",
      careerPreferences: "",
    });
    setShowPswd(false);
    setCheckboxValue(false);
  };

  const handleNavigateLogin = () => {
    navigate("/StudentLogIn");
  };

  return (
    <BgColorAnimation
      child={
        <Form
          onSubmit={handleSubmit}
          className="flex items-center justify-center h-screen px-2 overflow-auto "
        >
          <div
            className={`container bg-[#b7b7b748] shadow-md rounded h-[96vh] overflow-y-auto py-3`}
          >
            <p className=" text-[1.7rem] md:text-4xl font-mooli tracking-wider text-violet-300 font-bold mb-6 text-center">
              Register as Student
            </p>

            {/* personal details */}
            <div className="mb-4 space-y-3 ">
              <p className=" font-k2d text-yellow-200 text-[1.5rem]">
                Personal Details
              </p>

              <Row className=" gap-y-3">
                <Form.Group as={Col} xs={12} lg={4} controlId="formGridUSN">
                  <input
                    type="text"
                    name="usn"
                    placeholder="USN"
                    required
                    value={formData.usn}
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.usn ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={12}
                  lg={4}
                  controlId="formGridFirstname"
                >
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    required
                    value={formData.firstName}
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.firstName ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={12}
                  lg={4}
                  controlId="formGridLastname"
                >
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.lastName ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className=" gap-y-3">
                <Form.Group
                  as={Col}
                  xs={12}
                  md={4}
                  lg={4}
                  controlId="formGridCurrentSem"
                >
                  <input
                    type="number"
                    name="currentSemester"
                    placeholder="Current Semester"
                    required
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.currentSemester ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.currentSemester}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={12}
                  md={8}
                  lg={4}
                  controlId="formGridEmail"
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    required
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.email ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={12}
                  lg={4}
                  controlId="formGridPassword"
                  className="relative "
                >
                  <input
                    type={showPswd ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    required
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.password ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <div className="absolute cursor-pointer top-3 right-4">
                    {showPswd ? (
                      <MdOutlineVisibility
                        className="text-xl text-blue-300"
                        onClick={handlePasswordVisibility}
                      />
                    ) : (
                      <MdOutlineVisibilityOff
                        className="text-xl text-blue-300"
                        onClick={handlePasswordVisibility}
                      />
                    )}
                  </div>
                </Form.Group>
              </Row>

              <Row className="gap-y-3">
                <Form.Group as={Col} xs={6} lg={4} controlId="formGridCountry">
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    required
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.country ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.country}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={6} lg={4} controlId="formGridState">
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    required
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.state ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.state}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} lg={4} controlId="formGridCity">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    required
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.city ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={6} lg={4} controlId="formGridZip">
                  <input
                    type="number"
                    name="zip"
                    placeholder="Zip"
                    required
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.zip ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={6} lg={4} controlId="formGridDOB">
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 ${
                      formData.dateOfBirth
                        ? "border-indigo-400 text-green-300"
                        : "text-blue-300"
                    } focus:border-indigo-400 w-full`}
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridContactNumber">
                  <input
                    type="number"
                    name="contactNumber"
                    placeholder="Contact Number"
                    required
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.contactNumber ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="">
                <Form.Group as={Col} controlId="formGridAddress">
                  <textarea
                    name="address"
                    placeholder="Address"
                    required
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.address ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>

              <Row className="">
                <Form.Group as={Col} controlId="formGridCareerObjective">
                  <textarea
                    name="careerObjective"
                    placeholder="Career Objective"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.careerObjective ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.careerObjective}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
            </div>

            {/* educational details 1 */}
            <div className="w-full mb-4">
              <p className="font-k2d text-yellow-200 text-[1.5rem]">
                Educational Details 1
              </p>

              <Row className="gap-y-3">
                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGridSchoolName1"
                >
                  <input
                    type="text"
                    name="schoolName1"
                    placeholder="Institute Name"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.schoolName1 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.schoolName1}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGridEducation1"
                >
                  <input
                    type="text"
                    name="education1"
                    placeholder="Education"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.education1 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.education1}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={12} md={4} controlId="formGridCourse1">
                  <input
                    type="text"
                    name="course1"
                    placeholder="Course"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.course1 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.course1}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={6} md={4} controlId="formGridScore1">
                  <input
                    type="number"
                    name="score1"
                    placeholder="Score"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.score1 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.score1}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={6}
                  md={4}
                  controlId="formGridYearOfCompletion1"
                >
                  <input
                    type="number"
                    name="yearOfCompletion1"
                    placeholder="Completion Year"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.yearOfCompletion1 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.yearOfCompletion1}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={12} controlId="formGridAddress1">
                  <textarea
                    name="address1"
                    placeholder="Location"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.address1 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.address1}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
            </div>

            {/* educational details 2 */}
            <div className="w-full mb-4">
              <p className="font-k2d text-yellow-200 text-[1.5rem]">
                Educational Details 2
              </p>

              <Row className="gap-y-3">
                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGridSchoolName2"
                >
                  <input
                    type="text"
                    name="schoolName2"
                    placeholder="Institute Name"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.schoolName2 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.schoolName2}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  controlId="formGridEducation2"
                >
                  <input
                    type="text"
                    name="education2"
                    placeholder="Education"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.education2 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.education2}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={12} md={4} controlId="formGridCourse2">
                  <input
                    type="text"
                    name="course2"
                    placeholder="Course"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.course2 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.course2}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={6} md={4} controlId="formGridScore2">
                  <input
                    type="number"
                    name="score2"
                    placeholder="Score"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.score2 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.score2}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  xs={6}
                  md={4}
                  controlId="formGridYearOfCompletion2"
                >
                  <input
                    type="number"
                    name="yearOfCompletion2"
                    placeholder="Completion Year"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.yearOfCompletion2 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.yearOfCompletion2}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} xs={12} controlId="formGridAddress2">
                  <textarea
                    name="address2"
                    placeholder="Location"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.address2 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.address2}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
            </div>

            {/* college qualification */}
            <div className="space-y-3">
              <p className="font-k2d text-yellow-200 text-[1.5rem]">
                College Qualification
              </p>

              <Row className="gap-y-3">
                {/* College Dropdown */}
                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  xl={4}
                  controlId="formGridCollege"
                >
                  <select
                    name="collegeName"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.collegeName ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.collegeName}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select College
                    </option>
                    <option value="Government engineering college idukki">
                      Government engineering college idukki
                    </option>
                    <option value="other">Other</option>
                  </select>
                </Form.Group>
                {/* Department Dropdown */}
                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  xl={4}
                  controlId="formGridDepartment"
                >
                  <select
                    name="department"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.department ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    <option value="ELECTRICAL AND ELECTRONICS ENGINEERING">
                      ELECTRICAL AND ELECTRONICS ENGINEERING
                    </option>
                    <option value="COMPUTER SCIENCE AND ENGINEERING">
                      COMPUTER SCIENCE AND ENGINEERING
                    </option>
                    <option value="INFORMATION TECHNOLOGY">
                      INFORMATION TECHNOLOGY
                    </option>
                    <option value="MECHANICAL ENGINEERING">
                      MECHANICAL ENGINEERING
                    </option>
                    <option value="ELECTRONICS AND COMMUNICATION ENGINEERING">
                      ELECTRONICS AND COMMUNICATION ENGINEERING
                    </option>
                  </select>
                </Form.Group>
                {/* Semester Dropdown */}
                <Form.Group
                  as={Col}
                  xs={12}
                  md={6}
                  xl={4}
                  controlId="formGridSemester"
                >
                  <select
                    name="currentSemester"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.currentSemester ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.currentSemester}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Semester
                    </option>
                    {[...Array(8)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </Row>
              <Row className="">
                <Form.Group as={Col} xs={12} lg={6} controlId="formGridScore3">
                  <input
                    type="number"
                    name="score3"
                    placeholder="Current CGPA"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.score3 ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.score3}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridKeySkills">
                  <input
                    type="text"
                    name="keySkills"
                    placeholder="Key Skills"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.keySkills ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.keySkills}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
              <Row className="">
                <Form.Group as={Col} controlId="formGridCareerPreferences">
                  <textarea
                    rows={3}
                    name="careerPreferences"
                    placeholder="Career Preferences"
                    className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${
                      formData.careerPreferences ? "border-indigo-400" : ""
                    } focus:border-indigo-400 w-full`}
                    value={formData.careerPreferences}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Row>
            </div>

            {/* checkbox input field */}
            <Form.Group className="flex mt-2">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  className="cursor-pointer w-7 h-[1.3rem] appearance-none border-[.2rem] border-yellow-500 rounded-full checked:border-yellow-300 checked:bg-green-800 checked:scale-90 checked:rounded-md focus:outline-none transition-all"
                  onClick={() => setCheckboxValue(!checkboxValue)}
                  required
                />
              </div>

              {/* Checkbox text */}
              <label className="flex items-center w-full ml-2 text-sm font-medium text-cyan-200 font-robotoMono gap-x-2">
                I agree with the{" "}
                <a
                  href="#"
                  className="flex flex-wrap transition-all text-cyan-200 hover:underline hover:text-blue-800 hover:font-bold hover:bg-blue-300 hover:rounded-md hover:px-2"
                >
                  terms and conditions
                </a>
              </label>
            </Form.Group>

            {/* submit button */}
            <div className="flex flex-col items-center justify-between mt-8 sm:flex-row gap-y-4">
              <button
                className=" text-md font-bold bg-slate-800 text-blue-400 hover:text-indigo-400 font-robotoMono ring-2 ring-violet-400 w-full sm:w-[7rem] h-9 sm:h-8 rounded-full active:ring-green-300 active:text-green-300 transition-all"
                type="submit"
              >
                Register
              </button>

              <button
                className=" text-md font-bold bg-slate-800 text-blue-400 hover:text-indigo-400 font-robotoMono ring-2 ring-violet-400 w-full sm:w-[7rem] h-9 sm:h-8 rounded-full active:ring-green-300 active:text-green-300 transition-all"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>

            {/* Login */}
            <div className="flex items-center mt-2 gap-x-2 ">
              <span className="font-mooli text-cyan-200">
                Already have an account?
              </span>

              <button
                className=" text-cyan-200 bg-slate-800 rounded-md font-robotoMono px-2.5 py-.5 underline hover:text-blue-800 hover:font-bold hover:bg-blue-300 hover:rounded-md hover:px-2 transition-all flex flex-wrap"
                onClick={handleNavigateLogin}
              >
                LogIn
              </button>
            </div>
          </div>
        </Form>
      }
    />
  );
};

export default StudentRegister;

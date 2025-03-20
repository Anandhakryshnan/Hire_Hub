import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TiHomeOutline } from "react-icons/ti";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { TbDatabaseSearch } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
// import trainingImage from "../../images/banner/training.jpg"; // Replace with your image
import "../companies/hiringCompany.css";

const AllPrograms = () => {
  const [approvedPrograms, setApprovedPrograms] = useState([]);
  const [appliedMaterials, setAppliedMaterials] = useState([]);
  const [appliedPrograms, setAppliedProgramsState] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const usn = localStorage.getItem("token");

  useEffect(() => {
    // Fetch student profile
    fetch(`${process.env.REACT_APP_API_URL}/api/StudentProfile/${usn}`)
      .then((response) => response.json())
      .then((data) => {
        let fullName = `${data?.firstName} ${data?.lastName}`;
        setName(fullName);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch approved programs
    fetch(`${process.env.REACT_APP_API_URL}/api/trainingPrograms/approved`)
      .then((response) => response.json())
      .then((data) => setApprovedPrograms(data))
      .catch((error) => console.error("Error fetching programs:", error));

    // Fetch applied programs and materials
    fetch(`${process.env.REACT_APP_API_URL}/api/students/${usn}/appliedPrograms`)
      .then((response) => response.json())
      .then((data) => {
        const validAppliedPrograms = data.filter(
          (program) => program && program._id
        );
        setAppliedProgramsState(validAppliedPrograms);

        const materialsPromises = validAppliedPrograms.map((appliedProgram) =>
          fetch(`${process.env.REACT_APP_API_URL}/api/materials/${appliedProgram._id}?studentId=${usn}`)
            .then((response) => (response.ok ? response.json() : []))
            .catch((error) => {
              console.error("Error fetching materials:", error);
              return [];
            })
        );

        Promise.all(materialsPromises).then((allMaterials) => {
          const programsWithMaterials = validAppliedPrograms.map(
            (program, index) => ({
              ...program,
              materials: allMaterials[index],
            })
          );
          setAppliedMaterials(programsWithMaterials);
        });
      })
      .catch((error) =>
        console.error("Error fetching applied programs:", error)
      );
  }, []);

  const handleApply = (programId) => {
    const studentId = localStorage.getItem("token");

    fetch(`${process.env.REACT_APP_API_URL}/api/trainingPrograms/${programId}/apply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Applied successfully!");
          setAppliedProgramsState((prevState) => [
            ...prevState,
            { _id: programId }, // Ensure the new entry has an `_id`
          ]);
        } else {
          console.error("Error applying for program:", response.statusText);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  // const handleKnowMore = (program) => {
  //   navigate("/ProgramDetails", { state: { programData: program } });
  // };

  return (
    <div>
      <NavBar name={name} />

      {/* Approved Programs Section */}
      <div className="flex flex-wrap items-center justify-center">
        {approvedPrograms.map((program, index) => (
          <div
            className="lsm:min-w-[30rem] lsm:max-w-[30rem] bg-gradient-to-br from-blue-300 to-green-200 rounded overflow-hidden shadow-lg m-4"
            key={index}
          >
            <div className="flex flex-col lsm:flex-row">
              <div className="lsm:max-w-[15rem] lsm:min-w-[15rem] min-h-[16rem] max-h-[16rem] lsm:min-h-[10rem] lsm:max-h-[10rem] mx-2 lsm:ml-2 mt-2 rounded-lg overflow-hidden flex items-center justify-center">
                <img
                  className="w-full h-full"
                  // src={trainingImage} // Replace with your image
                  alt="Training Program"
                />
              </div>

              <div className="px-2 pt-2">
                <div className="mb-1 text-xl font-extrabold text-blue-800 font-k2d">
                  {program.title}
                </div>

                <div className="mb-3 font-bold text-green-900 font-k2d">
                  {program.venue}
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">From:</span>{" "}
                  {new Date(program.fromDate).toLocaleDateString()} <br />
                  <span className="font-medium">To:</span>{" "}
                  {new Date(program.toDate).toLocaleDateString()}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Time:</span> {program.time}
                </p>
              </div>
            </div>

            <div className="pl-3 mt-2 font-bold font-robotoMono text-md text-slate-800">
              {program.description}
            </div>

            <div className="w-full px-2 mt-3 mb-2">
              {appliedPrograms.some((applied) => applied._id === program._id) ? (
                <span className="w-full lsm:w-fit px-3 text-md font-bold bg-green-100 text-green-700 font-robotoMono py-[.2rem] rounded-md">
                  Applied
                </span>
              ) : (
                <button
                  className="w-full lsm:w-fit px-3 text-md font-bold bg-slate-800 text-blue-300 hover:text-indigo-300 font-robotoMono py-[.2rem] rounded-md"
                  onClick={() => handleApply(program._id)}
                >
                  Apply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Downloadable Materials Section */}
      <h2 className="text-2xl font-bold text-center my-8 text-blue-800">
        Downloadable Materials
      </h2>
      <div className="flex flex-wrap items-center justify-center">
        {appliedMaterials.map((program, index) => (
          <div
            className="lsm:min-w-[30rem] lsm:max-w-[30rem] bg-gradient-to-br from-blue-300 to-green-200 rounded overflow-hidden shadow-lg m-4"
            key={index}
          >
            <div className="px-2 pt-2">
              <div className="mb-1 text-xl font-extrabold text-blue-800 font-k2d">
                {program.title}
              </div>

              <ul className="space-y-2">
                {program.materials.length > 0 ? (
                  program.materials.map((material) => (
                    <li
                      key={material._id}
                      className="flex justify-between items-center bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition duration-300"
                    >
                      <span className="text-sm text-gray-700">
                        {material.filename}
                      </span>
                      <a
                        href={material.downloadLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Download
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500">
                    No materials available
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPrograms;

// NavBar and other components remain the same as in the HiringCompanies component

const tabs = [
    {text: 'Home', icon: <TiHomeOutline/>, path: '/StudentHome'},
    {text: 'Schedule', icon: <AiOutlineSchedule/>, path: '/StudentSchedule'},
    {text: 'Resume', icon: <MdOutlineAccountCircle/>, path: '/createResume'},
];

const NavBar = ({ name }) => {
    const [selected, setSelected] = useState(tabs[0].text);
    const [typedText, setTypedText] = useState('');
    const [hamburgerActive, setHamburgerActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSearchBarHanging, setIsSearchBarHanging] = useState(false);

    const loginOptions = [
        { href: '/', text: 'LogOut', icon: <CiLogout/> },
    ];

    const handleInputText = (e) => {
        setTypedText(e.target.value);
    };

    return (
        <div className=' flex items-center justify-between w-full h-[4rem] bg-slate-900 px-4 sm:px-3 xl:px-8'>
            {/* hamburger icon in less than 1024 screen width */}
            <div className="relative block lg:hidden">
                <div onClick={() => setIsDropdownOpen((pv) => !pv)}>
                    <AnimatedHamburgerButton
                        hamburgerActive={hamburgerActive}
                        setHamburgerActive={setHamburgerActive}
                    />
                </div>

                <div className="absolute flex items-center justify-center -right-11">
                    <motion.div animate={isDropdownOpen ? "open" : "closed"} className="relative">
                        <motion.ul
                        className="flex flex-col gap-2 p-2 rounded-lg bg-slate-900 shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden z-30 ring-1 ring-blue-400"
                        initial={wrapperVariants.closed}
                        variants={wrapperVariants}
                        style={{ originY: "top", translateX: "-50%" }}>
                            {tabs.map((tab, indx) => (
                                <Option 
                                    key={tab.text+indx}
                                    setIsDropdownOpen={setIsDropdownOpen}
                                    Icon={tab.icon}
                                    text={tab.text}
                                    path={tab.path}
                                />
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </div>

            {/* main menu in more than 1024 screen width */}
            <div className="flex-wrap items-center hidden bg-slate-900 lg:gap-x-2 xl:gap-x-3 lg:flex">
                {tabs.map((tab) => (
                    <Chip
                        text={tab.text}
                        icon={tab.icon}
                        path={tab.path}
                        selected={selected === tab.text}
                        setSelected={setSelected}
                        key={tab.text}
                    />
                ))}
            </div>

            {/* search field */}
            <>
                <div className='fixed z-10 block w-10 h-10 p-2 overflow-hidden transition-all rounded-full cursor-pointer bottom-3 right-3 active:scale-110 bg-slate-700 text-cyan-300'
                onClick={() => setIsSearchBarHanging(!isSearchBarHanging)}>
                    <GoSearch className='text-2xl font-bold ' />
                </div>

                {isSearchBarHanging && (
                    <motion.div className='w-[80%] h-[2.6rem] fixed bottom-3 left-3 text-white z-40'
                    initial={{x: -300, opacity: 0}}
                    animate={{x: 0, opacity: 1}}>
                        <form className="flex w-full h-full overflow-hidden rounded-full">
                            <input 
                                type="search"
                                placeholder="Search"
                                className="w-full h-full pl-4 pr-2 border-none outline-none bg-slate-700 text-cyan-200"
                                aria-label="Search"
                                onChange={handleInputText}
                                value={typedText}
                            />
                            
                            <button 
                            type='submit'
                            className='bg-slate-700 border-l border-slate-500 text-slate-200 pl-1 pr-2.5 lg:px-3 flex items-center justify-center'>
                                <TbDatabaseSearch className=' text-[1.4rem] text-green-300' />
                            </button>
                        </form>
                    </motion.div>
                )}
            </>

            {/* account section */}
            <div className='flex items-center gap-x-8 sm:gap-x-5 lg:gap-x-5 xl:gap-x-10'>
                <div className="flex justify-center cursor-pointer lg:text-lg">
                    <FlyoutLink FlyoutContent={userActions} array={loginOptions}>
                        <div className='flex items-center justify-center gap-x-2'>
                            <FaRegUser/>
                            {name.split(' ')[0]}
                        </div>
                    </FlyoutLink>
                </div>
            </div>
        </div>
    );
};

const Chip = ({ text, icon, selected, setSelected, path }) => {
    const navigate = useNavigate();
    
    const handleClick = (text, path) => {
        setSelected(text)
        navigate(path)
    };
    
    return (
        <button
        onClick={() => handleClick(text, path)}
        className={`${
        selected
            ? "text-white"
            : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
        } transition-colors px-3 py-1.5 rounded-md relative flex items-center`}>
            <span className="relative z-10 flex items-center justify-center gap-x-2">
                <span className='font-robotoMono lg:text-[1.05rem]'>{text}</span>
                <span className=' text-[1.3rem]'>{icon}</span>
            </span>

            {selected && (
                <motion.span
                    layoutId="pill-tab"
                    transition={{ type: "sp", duration: 0.2 }}
                    className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600"
                />
            )}
        </button>
    );
};

const AnimatedHamburgerButton = ({ hamburgerActive, setHamburgerActive }) => {
    return (   
        <button
        className="relative w-10 h-20 transition-colors"
        onClick={() => setHamburgerActive((pv) => !pv)}>
            <div className={`flex items-center justify-center flex-col gap-y-[.4rem] rounded-full w-9 h-9 transition-all cursor-pointer`}>
                <div className={`w-7 md:w-8 h-[2px] md:h-[3px] transition-all ${hamburgerActive ? 'rotate-45 translate-y-[4px]' : 'rotate-0'}  bg-blue-300`}/>
                <div className={`w-7 md:w-8 h-[2px] md:h-[3px] ${!hamburgerActive ? 'block' : 'hidden'} bg-blue-300 `}/>
                <div className={`w-7 md:w-8 h-[2px] md:h-[3px] bg-blue-300 ${hamburgerActive ? '-rotate-45 -translate-y-[4px]' : 'rotate-0'}  transition-all`}/>
            </div> 
        </button>
    );
};

const Option = ({ text, Icon, setIsDropdownOpen, path }) => {
    const navigate = useNavigate();
    
    const handleClick = (path) => {
        setIsDropdownOpen(false)
        navigate(path)
    };
    
    return (
        <motion.li
        variants={itemVariants}
        className="flex items-center w-full gap-3 p-2 text-xs font-medium transition-colors rounded-md cursor-pointer whitespace-nowrap hover:bg-indigo-600 text-cyan-100 hover:text-indigo-100"
        onClick={() => handleClick(path)}>
            <motion.span 
            className='text-xl font-robotoMono'
            variants={actionIconVariants}>
                {Icon}
            </motion.span>

            <span className='text-[1rem] font-robotoMono'>{text}</span>
        </motion.li>
    );
};

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};
  
const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};
  
const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};

const FlyoutLink = ({ children, FlyoutContent, array }) => {
    const [open, setOpen] = useState(false);

    const showFlyout = FlyoutContent && open;
  
    return (
        <div
        className="relative w-fit h-fit"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}>
            <span className="relative text-violet-300 font-onest">
                {children}
                <span
                    style={{ transform: showFlyout ? "scaleX(1)" : "scaleX(0)" }}
                    className="absolute h-1 transition-transform duration-300 ease-out origin-left scale-x-0 bg-indigo-300 rounded-full -bottom-2 -left-2 -right-2"
                />
            </span>

            <AnimatePresence>
                {showFlyout && (
                    <motion.div
                    className="absolute -right-[6rem] lg:-right-[8rem] top-[3.2rem] z-30"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    style={{ translateX: "-50%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}>
                        <div className="absolute left-0 right-0 h-6 bg-transparent -top-6 " />
                        <div className="absolute w-4 h-4 rotate-45 -translate-x-1/2 -translate-y-1/2 right-1 bg-violet-800" />
                        <FlyoutContent selectedArray={array} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const userActions = ({selectedArray}) => {
    return (
        <div className=" bg-gradient-to-b from-violet-800 to-indigo-900 rounded-lg py-2.5 lg:py-4 shadow-xl">
            {selectedArray.map((item, index) => (
                <a 
                className='w-[12rem] lg:w-[15rem] pl-4 xl:pl-6 no-underline flex items-center py-2 gap-x-3 hover:bg-gradient-to-l hover:from-violet-600 hover:to-indigo-600'
                href={item.href}
                key={item.text+index}>
                    <span className='text-violet-200 text-[1.2rem] xl:text-[1.3rem]'>
                        {item.icon}
                    </span>
                    <span className='flex flex-wrap text-violet-200'>
                        {item.text}
                    </span>
                </a>
            ))}
        </div>
    );
};
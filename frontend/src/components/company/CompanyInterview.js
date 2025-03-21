import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { TiHomeOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { CiLogout } from 'react-icons/ci';
import { GoSearch } from 'react-icons/go';
import { TbDatabaseSearch } from 'react-icons/tb';
import { FaRegUser } from 'react-icons/fa';
import { FaPeopleArrows } from "react-icons/fa6";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const data = [
    {
        jobId: '2734',
        jobRole: 'Software Developer',
        studentName: 'Vinayak V',
        usn: '1CD19CV078',
        ctc: '9LPA',
        phoneNumber: '2734937482',
        email: 'vinayak.19CV078@cambridge.edu.in',
        dateOfSelection: '09/04/23',
        selectedBy: 'Amole'
    },
    {
        jobId: '2735',
        jobRole: 'Software Developer',
        studentName: 'Manasa C',
        usn: '1CD19CS118',
        ctc: '9LPA',
        phoneNumber: '2938470682',
        email: 'manasa.19CS118@cambridge.edu.in',
        dateOfSelection: '09/04/23',
        selectedBy: 'Amole'
    },
    {
        jobId: '2289',
        jobRole: 'Software Developer',
        studentName: 'Veena Priya',
        usn: '1CD19CS182',
        ctc: '9LPA',
        phoneNumber: '7298394882',
        email: 'veena.19CS182@cambridge.edu.in',
        dateOfSelection: '09/04/23',
        selectedBy: 'Kiran'
    },
    {
        jobId: '2738',
        jobRole: 'Software Developer',
        studentName: 'Guru P',
        usn: '1CD19CS102',
        ctc: '9LPA',
        phoneNumber: '9302839882',
        email: 'guru.19CS102@cambridge.edu.in',
        dateOfSelection: '10/04/23',
        selectedBy: 'Bhanu'
    },
    {
        jobId: '8394',
        jobRole: 'Software Developer',
        studentName: 'Harish B',
        usn: '1CD19CS202',
        ctc: '9LPA',
        phoneNumber: '9308294882',
        email: 'harish.19CS202@cambridge.edu.in',
        dateOfSelection: '10/04/23',
        selectedBy: 'Bhanu'
    },
    {
        jobId: '8398',
        jobRole: 'Software Developer',
        studentName: 'Shivani N',
        usn: '1CD19CS089',
        ctc: '9LPA',
        phoneNumber: '9303948821',
        email: 'shivani.19CS089@cambridge.edu.in',
        dateOfSelection: '10/04/23',
        selectedBy: 'Kiran'
    }
];

const CompanyInterview = () => {
    const [interviews, setInterviews] = useState([]);
    const cemail = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/companySechdule/${cemail}`)
            .then(response => response.json())
            .then(data => {
                setInterviews(data);
                console.log(data)
            })
            .catch(error => {
                console.error('Error fetching interview data:', error);
            });
    }, []);

    const handleJoinMeeting = (meetingLink) => {
        window.open(meetingLink, '_blank');
    };

    const openResume = (usn) => {
        navigate('/StudentResume',{ state: { usn: usn } })
    };

    return (
        <div>
            <NavBar/>

            <div className=" text-center mt-3 font-robotoMono text-2xl font-bold text-slate-800">Interview Schedule</div>

            <div className="flex justify-center mt-5">
                <TableContainer component={Paper} sx={{ margin: '10px', width: '95%', borderBottom: '1px solid black', backgroundColor: '#EFFDF5' }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#216C34', color: '#F2FEFF', fontSize: '16px' }}>
                                {['Date', 'Time', 'Candidate Name', 'Student Email', 'Company Email', 'Resume'].map((header, index) => (
                                    <TableCell key={index} sx={{ fontSize: '18px', fontWeight: 'bold', color: '#F2FEFF', border: '2px solid #3E8C5F' }}>
                                        <span className='text-green-700'>
                                            {header}
                                        </span>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {interviews.map((interview, index) => (
                                <TableRow key={index}>
                                    <TableCell>{interview.date}</TableCell>
                                    <TableCell>{interview.time}</TableCell>
                                    <TableCell>{interview.studentName}</TableCell>
                                    <TableCell>{interview.studentEmail}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" onClick={() => handleJoinMeeting(interview.meetingLink)}>
                                            Join
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => openResume(interview.usn)}>
                                            Resume
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default CompanyInterview;



const tabs = [
    {text: 'Home', icon: <TiHomeOutline/>, path: '/CompanyHome'},
    {text: 'Job Posting', icon: <HiOutlineBuildingOffice2/>, path: '/NewJobPosting'},
    {text: 'Interviews', icon: <FaPeopleArrows/>, path: '/CompanyInterview'},
];

export const NavBar = ({name = 'Company'}) => {
    const [selected, setSelected] = useState(tabs[2].text);
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
                        className="flex flex-col gap-2 p-2 rounded-lg bg-slate-900 shadow-xl absolute top-[120%] w-fit overflow-hidden z-30 ring-1 ring-blue-400"
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
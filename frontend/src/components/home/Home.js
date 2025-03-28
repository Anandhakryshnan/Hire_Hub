import { FaGithub, FaInstagram, FaLinkedin, FaMeta, FaXTwitter } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import { FaBuildingUser } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";
import { TbDatabaseSearch } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import banner from '../../images/banner/homeback.jpg';
import aboutUs from '../../images/banner/aboutUs.jpg';
import { buttonsData, coursesCard, tabs } from '../common/DummyData';

const ButtonWithCard = ({ imgSrc, alt, text, bgColor, textColor, titleColor }) => {
    return (
        <div className={` cursor-pointer max-w-[38rem] md:h-[14.5rem] xl:h-[14rem] ${bgColor} px-4 py-3 rounded-lg overflow-hidden group/bento hover:shadow-xl transition duration-200 shadow-input `}>
            <div className='flex flex-col items-start justify-between transition duration-200 gap-y-6 group-hover/bento:translate-x-2'>
                <div className='space-y-2 '>
                    <div className=' w-16 h-16 rounded-lg p-[.3rem] overflow-hidden bg-slate-'>
                        <img 
                            src={imgSrc} 
                            alt={alt} 
                            className={` w-full h-full`}
                        />
                    </div>
                    <p className={`${titleColor} text-lg font-robotoMono font-bold`}>{alt}</p>
                </div>

                <p className={`${textColor} font-bold md:text-justify sm:text-[1rem] lg:text-[1.1rem] font-lato tracking-wide`}>{text}</p>
            </div>
        </div>
    );
};

export const AboutUsCard = ({ link, title, details }) => {
    return (
        <div className='w-full  space-y-5 xl:space-y-9 3xl:space-y-7 xl:mt-16'>
            <div className={` flex items-center justify-between gap-x-10 bg-[#e7fff3] hover:bg-[#e5f5fc] ring-[1px] ring-green-700 hover:ring-blue-700 hover:shadow-md hover:shadow-blue-700 rounded-md overflow-hidden p-3 cursor-pointer group`}>

                <div className={` flex flex-col gap-y-1 text-green-800 hover:text-blue-900`}>
                    <div className='text-2xl font-bold capitalize font-mavenPro'>
                        Our Vision
                    </div>

                    <div className=' font-mavenPro xl:text-lg'>
                        To be a premier technical institution imparting knowledge, to carve technically competent and research minded professionals with social responsibilities
                    </div>
                </div>
                
            </div>
            <div className={` flex items-center justify-between gap-x-10 bg-[#e7fff3] hover:bg-[#e5f5fc] ring-[1px] ring-green-700 hover:ring-blue-700 hover:shadow-md hover:shadow-blue-700 rounded-md overflow-hidden p-3 cursor-pointer group`}>

                <div className={` flex flex-col gap-y-1 text-green-800 hover:text-blue-900`}>
                    <div className='text-2xl font-bold capitalize font-mavenPro'>
                        Our MIssion
                    </div>

                    <div className='p-2 font-mavenPro xl:text-lg'>
                        1. Facilitate quality engineering education through state-of-the-art facilities and qualified vibrant teachers
                    </div>
                    <div className='p-2 font-mavenPro xl:text-lg'>
                        2. Transform students to responsible professionals with ethical and social values capable of providing innovative solutions to the problems faced by the country and to enhance the quality of life of the people
                    </div>
                    <div className='p-2 font-mavenPro xl:text-lg'>
                        3. Accomplish a conducive learning environment to equip students for higher education and life-long learning
                    </div>
                    <div className='p-2 font-mavenPro xl:text-lg'>
                        4. Instill managerial skills and entrepreneurial capabilities
                    </div>
                </div>
                
            </div>
        </div>
    );
};


const StudentHome = () => {
    const [isSearchBarHanging, setIsSearchBarHanging] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [courseDisplay, setCourseDisplay] = useState(3);

    const handleInputText = (e) => {
        setTypedText(e.target.value);
    };

    const handleNext = () => {
        if (courseDisplay < coursesCard.length) {
            setCourseDisplay(prevVal => prevVal + 1);
        }
    };

    const handlePrevious = () => {
        if (courseDisplay > coursesCard.length/3) {
            setCourseDisplay(prevVal => prevVal - 1);
        }
    };
    
    return (
        <div className='relative h-screen scroll-smooth'>
            {/* banner */}
            <div
            className={`h-full flex flex-col items-start justify-center pl-4 pr-4 sm:pl-12 md:pl-32 bg-fixed bg-cover`}
            style={{
                backgroundImage: `url('${banner}')`,
            }}>
                <div className='text-[1rem] lg:text-[1.3rem] font-montserrat font-bold text-white uppercase'>
                    Welcome to Hire Hub
                </div>

                <div className='mt-3 font-bold text-[2.3rem] md:text-[3rem] xl:text-[4.2rem] leading-[50px] xl:leading-[70px] font-jaldi text-white text-wrap flex flex-wrap sm:w-[35rem] md:w-[43rem]'>
                    Your Gateway To Academic Excellence!
                </div>

                <div className='mt-3 mb-4 text-[1.1rem] sm:text-xl font-mavenPro font-bold text-black'>
                    "The roots of education are bitter, but the fruit is sweet."
                </div>

                <div className='flex flex-col mb-2 sm:flex-row gap-x-4 gap-y-4 sm:items-center'>
                    <button class="uppercase px-4 py-2 bg-slate-800 text-yellow-300 rounded-sm font-mavenPro flex gap-x-3 items-center justify-center">
                        Get started now
                        <FaArrowRightLong/>
                    </button>
                    
                    <button class="uppercase px-4 py-2 bg-yellow-400 text-slate-900 ring-[1px] ring-slate-900 rounded-sm font-mavenPro flex gap-x-3 items-center justify-center">
                        view Courses
                        <FaArrowRightLong/>
                    </button>
                </div>
            </div>

            {/* navbar */}
            <div className='absolute flex flex-col items-center w-full top-10 gap-y-4'>
                <div className='rounded-lg w-[96%] bg-[#0f172a25] backdrop-blur-md'>
                    <NavBar selectedTab={tabs[0].text}/>
                </div>
            </div>               

            {/* search field */}
            <>
                <div className='fixed z-10 block w-10 h-10 p-2 overflow-hidden transition-all rounded-full cursor-pointer bottom-3 right-3 active:scale-110 bg-slate-800 text-cyan-300 ring-[1px] ring-yellow-300'
                onClick={() => setIsSearchBarHanging(!isSearchBarHanging)}>
                    <GoSearch className='text-2xl font-bold ' />
                </div>

                {isSearchBarHanging && (
                    <motion.div className='w-[80%] h-[2.8rem] fixed bottom-3 left-3 text-white'
                    initial={{x: -300, opacity: 0}}
                    animate={{x: 0, opacity: 1}}>
                        <form className="flex w-full h-full overflow-hidden rounded-full ring-[1px] ring-yellow-300 font-onest md:tracking-wide">
                            <input 
                                type="search"
                                placeholder="Search"
                                className="w-full h-full pl-4 pr-2 border-none shadow-xl outline-none bg-slate-800 text-cyan-300"
                                aria-label="Search"
                                onChange={handleInputText}
                                value={typedText}
                            />
                            
                            <button 
                            type='submit'
                            className='bg-slate-800 border-l border-slate-500 text-slate-200 pl-1 pr-2.5 lg:px-3 flex items-center justify-center'>
                                <TbDatabaseSearch className=' text-[1.4rem] text-green-300' />
                            </button>
                        </form>
                    </motion.div>
                )}
            </>

            {/* about us */}
            <div className='px-10 my-12 sm:px-24 Lmd:px-10 3xl:px-32'>
                <div className='flex gap-x-7 lg:gap-x-12 xl:gap-x-16 3xl:gap-x-36'>
                    {/* image */}
                    <div 
                    className=' rounded-md overflow-hidden shadow-xl
                        min-h-[55rem] max-h-[55rem] 
                        Lmd:min-h-[40rem] Lmd:max-h-[40rem]
                        Lmd:min-w-[21rem] Lmd:max-w-[21rem]

                        lg:min-w-[25rem] lg:max-w-[25rem]
                        xl:min-h-[48rem] xl:max-h-[48rem]
                        xl:min-w-[30rem] xl:max-w-[30rem]

                        3xl:min-h-[51rem] 3xl:max-h-[51rem] 
                        3xl:min-w-[35rem] 3xl:max-w-[35rem] 
                        hidden Lmd:block cursor-pointer
                    '>
                        <img 
                            src={aboutUs} 
                            className='w-full h-full transition-all hover:scale-105'
                            alt="about us"
                        />
                    </div>

                    {/* cards */}
                    <div>
                        <AboutUsCard />
                    </div>
                </div>
            </div>

            {/* cards */}
            <div className="w-full px-3 pb-5 mt-16">
                <div className='flex flex-col items-center space-y-3 '>
                    <div className='text-[1.6rem] xl:text-[2rem] font-bold font-montserrat bg-gradient-to-br from-indigo-700 via-violet-700 to-blue-800 bg-clip-text text-transparent mb-4 capitalize'>
                    our provided facilities 
                    </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3 place-items-center">
                    {buttonsData.map((button, index) => (
                        <ButtonWithCard 
                            key={index} 
                            imgSrc={button.imgSrc} 
                            alt={button.alt} 
                            text={button.text} 
                            bgColor={button.bgColor}
                            textColor={button.textColor}
                            titleColor= {button.titleColor}
                            className={(index === 3 || index === 6) ? 'lg:col-span-2' : ''}
                        />
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default StudentHome;




export const NavBar = ({selectedTab }) => {
    const [selected, setSelected] = useState(selectedTab);
    const [hamburgerActive, setHamburgerActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const loginOptions = [
        { href: '/StudentLogIn', text: 'Student LogIn', icon: <PiStudentDuotone/> },
        { href: '/CompanyLogIn', text: 'Company LogIn', icon: <MdOutlineAdminPanelSettings/> },
        { href: '/AdminLogIn', text: 'Admin LogIn', icon: <FaBuildingUser/> },
        { href: '/TrainingCompLogin', text: 'Training Company LogIn', icon: <MdOutlineAdminPanelSettings/> },
    ];
    
    const registerOptions = [
        { href: '/StudentRegister', text: 'Student Register', icon: <PiStudentDuotone/> },
        { href: '/CompanyRegister', text: 'Company Register', icon: <MdOutlineAdminPanelSettings/> },
        { href: '/TreningRegister', text: 'Training Register', icon: <MdOutlineAdminPanelSettings/> }

    ];

    return (
        <div className=' flex items-center justify-between w-full h-[4rem] bg-[#0f172ab4 backdrop-blur pl-4 sm:pl-3 xl:pl-8'>
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
            <div className="flex-wrap items-center hidden lg:gap-x-2 xl:gap-x-3 lg:flex">
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

            {/* account section */}
            <div className='relative flex items-center h-full px-4 rounded-r-lg bg-slate-800 gap-x-8 sm:gap-x-5 lg:gap-x-5 xl:gap-x-10 sm:px-3 xl:px-8'>
                {/* Login Section */}
                <div className="flex justify-center cursor-pointer lg:text-lg">
                    <FlyoutLink FlyoutContent={userActions} array={loginOptions}>
                        Sign In
                    </FlyoutLink>
                </div>

                {/* Register Section */}
                <div className="flex justify-center cursor-pointer lg:text-lg">
                    <FlyoutLink FlyoutContent={userActions} array={registerOptions}>
                        Sign Up
                    </FlyoutLink>
                </div>

                <div className='absolute top-0 w-5 h-full -left-4 bg-slate-800 actionBtnBend'/>
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
        } transition-colors px-3 py-1.5 rounded-md relative flex items-center group`}>
            <span className="relative z-10 flex items-center justify-center gap-x-2">
                <span className='font-robotoMono lg:text-[1rem] text-white hidden Cxl:block'>{text}</span>
                <span className=' text-[1.3rem] text-white'>{icon}</span>
            </span>

            {selected && (
                <motion.span
                    layoutId="pill-tab"
                    className="absolute inset-0 z-0 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600"
                    transition={{ type: "sp", duration: 0.2 }}
                />
            )}

            <span className='z-20 hidden ml-1 group-hover:block Cxl:group-hover:hidden'>
                {text}
            </span>
        </button>
    );
};

const AnimatedHamburgerButton = ({ hamburgerActive, setHamburgerActive }) => {
    return (   
        <button
        className="relative w-10 h-20 transition-colors"
        onClick={() => setHamburgerActive((pv) => !pv)}>
            <div className={`flex items-center justify-center flex-col gap-y-[.4rem] rounded-full w-10 h-[2.4rem] p-1 bg-slate-800 transition-all cursor-pointer`}>
                <div className={`w-7 h-[2px] transition-all ${hamburgerActive ? 'rotate-45 translate-y-[4px]' : 'rotate-0'}  bg-cyan-300`}/>
                <div className={`w-7 h-[2px] ${!hamburgerActive ? 'block' : 'hidden'} bg-cyan-300`}/>
                <div className={`w-7 h-[2px] ${hamburgerActive ? '-rotate-45 -translate-y-[4px]' : 'rotate-0'}  transition-all bg-cyan-300`}/>
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
            <span className="relative text-yellow-300 font-onest">
                {children}
                <span
                    style={{ transform: showFlyout ? "scaleX(1)" : "scaleX(0)" }}
                    className="absolute h-1 transition-transform duration-300 ease-out origin-left scale-x-0 bg-yellow-300 rounded-full -bottom-2 -left-2 -right-2"
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



export const Footer = () => {

    const iconArray = [
        {icon: <FaMeta/>, className: 'text-2xl text-blue-500', href: '#'},
        {icon: <FaGithub/>, className: 'text-2xl text-gray-400', href: '#'},
        {icon: <FaInstagram/>, className: 'text-2xl text-pink-500', href: '#'},
        {icon: <FaXTwitter/>, className: 'text-2xl text-slate-400', href: '#'},
        {icon: <FaLinkedin/>, className: 'text-2xl text-blue-600', href: '#'},
    ];

    
    return (
        <footer className=" bg-slate-900">
            <div className="px-4 pt-2 pb-6 mx-auto sm:px-6 lg:px-8">
                {/* upper part */}
                <div className="">
                    {/* icon and form */}
                    
                    
                    {/* content */}
                    {/* <div className="grid w-full mt-14 xsm:grid-cols-2 md:grid-cols-3 Lmd:grid-cols-5 gap-x-16 gap-y-14 place-content-center">
                        {footerLists.map((list, index) => (
                            <div 
                            className={`max-w-[10rem]`}
                            key={index}>
                                <p className="text-[1.2rem] border-b-2 border-slate-400 text-yellow-200 ">
                                    {list.title}
                                </p>

                                <div className="flex flex-col items-start justify-between mt-2 space-y-3 lg:text-md">
                                    {list.items.map((item, itemIndex) => (
                                        <span key={itemIndex}>
                                            <a href={item.href}
                                            className='text-blue-400 no-underline hover:text-green-400 hover:underline font-k2d'>
                                                {item.name}
                                            </a>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div> */}
                    
                    {/* social media icons */}
                    <div className='flex items-center justify-center w-full mt-10 sm:justify-end gap-x-5'>
                        {iconArray.map((item, indx) => (
                            <a 
                            key={indx} 
                            className={` rounded-full overflow-hidden ${item.className}`}
                            href={item.href}>
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* lower part */}
                <div className="pt-8 mt-8 border-t border-gray-100">
                    <div className="flex flex-col items-center justify-center md:flex-row sm:justify-between gap-y-6">
                        <span className="text-[.9rem] sm:text-sm text-gray-300">&copy; 2024. Hire Hub. All rights reserved.</span>
                        
                        <div className=" flex items-center gap-4 text-xs text-[.9rem] sm:text-sm">
                            <a className='no-underline text-violet-400 hover:text-blue-300 hover:underline' href="#">Terms & Conditions</a>
                            <a className='no-underline text-violet-400 hover:text-blue-300 hover:underline' href="#">Privacy Policy</a>
                            <a className='no-underline text-violet-400 hover:text-blue-300 hover:underline' href="#">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
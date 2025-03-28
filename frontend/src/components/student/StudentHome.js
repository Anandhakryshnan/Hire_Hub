import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TiHomeOutline } from "react-icons/ti";
import { AiOutlineSchedule } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { TbDatabaseSearch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { buttonsData } from "../common/DummyData";
import studentHome from "../../images/banner/studentHome.jpg";
import QrScanner from "react-qr-scanner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

const ButtonWithCard = ({
  imgSrc,
  alt,
  text,
  bgColor,
  textColor,
  titleColor,
  link,
}) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(link);
  };

  return (
    <div
      className={` cursor-pointer max-w-[38rem] md:h-[14.5rem] xl:h-[14rem] ${bgColor} px-4 py-3 rounded-lg overflow-hidden group/bento hover:shadow-xl transition duration-200 shadow-input `}
      onClick={handleRedirect}
    >
      <div className="flex flex-col items-start justify-between transition duration-200 gap-y-6 group-hover/bento:translate-x-2">
        <div className="space-y-2 ">
          <div className=" w-16 h-16 rounded-lg p-[.3rem] overflow-hidden">
            <img src={imgSrc} className={` w-full h-full`} alt={alt} />
          </div>
          <p className={`${titleColor} text-lg font-robotoMono font-bold`}>
            {alt}
          </p>
        </div>

        <p
          className={`${textColor} font-bold md:text-justify sm:text-[1rem] lg:text-[1.1rem] font-lato tracking-wide`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

const StudentHome = () => {
  const usn = localStorage.getItem("token");
  const [data, setData] = useState({
    orgName: "",
    greeting: "",
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/StudentProfile/${usn}`)
      .then((response) => response.json())
      .then((data) => {
        let fullName = `${data?.firstName} ${data?.lastName}`;
        let greeting = `Welcome Back! ${fullName}`;
        setData({ orgName: fullName, greeting });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <NavBar name={data.orgName} />

      <div
        className={` h-[50vh] lg:h-[80vh] flex flex-col items-start justify-center pl-4 pr-4 sm:pl-12 md:pl-32 bg-fixed bg-cover`}
        style={{
          backgroundImage: `url('${studentHome}')`,
        }}
      >
        <div className="mt-3 font-bold text-[2.3rem] md:text-[3rem] xl:text-[4.2rem] leading-[50px] xl:leading-[70px] font-jaldi text-white text-wrap flex flex-wrap">
          {data.greeting}
        </div>
      </div>

      <div className="w-full px-3 pb-5 mt-5">
        <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3 place-items-center">
          {buttonsData.map((button, index) => (
            <ButtonWithCard
              key={index}
              imgSrc={button.imgSrc}
              alt={button.alt}
              text={button.text}
              bgColor={button.bgColor}
              textColor={button.textColor}
              titleColor={button.titleColor}
              className={index === 3 || index === 6 ? "lg:col-span-2" : ""}
              link={button.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentHome;

const tabs = [
  { text: "Home", icon: <TiHomeOutline />, path: "/StudentHome" },
  { text: "Schedule", icon: <AiOutlineSchedule />, path: "/StudentSchedule" },
  { text: "Resume", icon: <MdOutlineAccountCircle />, path: "/createResume" },
  {text: "Attendence", icon: <AiOutlineSchedule />, path: "/student-attendance"},
];

const NavBar = ({ name }) => {
  const [selected, setSelected] = useState(tabs[0].text);
  const [typedText, setTypedText] = useState("");
  const [hamburgerActive, setHamburgerActive] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchBarHanging, setIsSearchBarHanging] = useState(false);
  const [showScanner, setShowScanner] = useState(false); // Toggle QR scanner visibility
  const [isScanning, setIsScanning] = useState(false); // Prevent multiple scans
  const loginOptions = [{ href: "/", text: "LogOut", icon: <CiLogout /> }];

  const handleInputText = (e) => {
    setTypedText(e.target.value);
  };
  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };
  const handleScan = (data) => {
    if (data && !isScanning) {
      setIsScanning(true); // Prevent further scans

      const qrToken = data.text;
      const studentId = localStorage.getItem("token");

      fetch(`${process.env.REACT_APP_API_URL}/api/markAttendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qrToken, studentId }),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            alert("Attendance marked successfully!");
          } else {
            alert(result.error || "Error marking attendance");
          }
        })
        .catch((err) => console.error("Error:", err))
        .finally(() => {
          setTimeout(() => setIsScanning(false), 3000); // Allow new scan after 3 seconds
        });
    }
  };

  return (
    <div className="flex items-center justify-between w-full h-[4rem] bg-slate-900 px-4 sm:px-3 xl:px-8">
      {/* hamburger icon in less than 1024 screen width */}
      <div className="relative block lg:hidden">
        <div onClick={() => setIsDropdownOpen((pv) => !pv)}>
          <AnimatedHamburgerButton
            hamburgerActive={hamburgerActive}
            setHamburgerActive={setHamburgerActive}
          />
        </div>

        <div className="absolute flex items-center justify-center -right-11">
          <motion.div
            animate={isDropdownOpen ? "open" : "closed"}
            className="relative"
          >
            <motion.ul
              className="flex flex-col gap-2 p-2 rounded-lg bg-slate-900 shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden z-30 ring-1 ring-blue-400"
              initial={wrapperVariants.closed}
              variants={wrapperVariants}
              style={{ originY: "top", translateX: "-50%" }}
            >
              {tabs.map((tab, indx) => (
                <Option
                  key={tab.text + indx}
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
        <div
          className="fixed z-10 block w-10 h-10 p-2 overflow-hidden transition-all rounded-full cursor-pointer bottom-3 right-3 active:scale-110 bg-slate-700 text-cyan-300"
          onClick={() => setIsSearchBarHanging(!isSearchBarHanging)}
        >
          <GoSearch className="text-2xl font-bold " />
        </div>

        {isSearchBarHanging && (
          <motion.div
            className="w-[80%] h-[2.6rem] fixed bottom-3 left-3 text-white z-40"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
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
                type="submit"
                className="bg-slate-700 border-l border-slate-500 text-slate-200 pl-1 pr-2.5 lg:px-3 flex items-center justify-center"
              >
                <TbDatabaseSearch className=" text-[1.4rem] text-green-300" />
              </button>
            </form>
          </motion.div>
        )}
      </>

      {/* account section */}
      <div className="flex items-center gap-x-8 sm:gap-x-5 lg:gap-x-5 xl:gap-x-10">
        <div className="flex justify-center cursor-pointer lg:text-lg">
          <FlyoutLink FlyoutContent={userActions} array={loginOptions}>
            <div className="flex items-center justify-center gap-x-2">
              <FaRegUser />
              {name.split(" ")[0]}
            </div>
          </FlyoutLink>
        </div>

        {/* QR Scan Button */}
        <div className="relative text-center">
          <Popover>
            <PopoverTrigger asChild>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
                Scan QR
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-4 bg-white shadow-lg rounded-lg w-[320px]">
              <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                constraints={{
                  video: { facingMode: "environment" }, // Tries to use the back camera
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

const Chip = ({ text, icon, selected, setSelected, path }) => {
  const navigate = useNavigate();

  const handleClick = (text, path) => {
    setSelected(text);
    navigate(path);
  };

  return (
    <button
      onClick={() => handleClick(text, path)}
      className={`${
        selected
          ? "text-white"
          : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
      } transition-colors px-3 py-1.5 rounded-md relative flex items-center`}
    >
      <span className="relative z-10 flex items-center justify-center gap-x-2">
        <span className="font-robotoMono lg:text-[1.05rem]">{text}</span>
        <span className=" text-[1.3rem]">{icon}</span>
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
      onClick={() => setHamburgerActive((pv) => !pv)}
    >
      <div
        className={`flex items-center justify-center flex-col gap-y-[.4rem] rounded-full w-9 h-9 transition-all cursor-pointer`}
      >
        <div
          className={`w-7 md:w-8 h-[2px] md:h-[3px] transition-all ${
            hamburgerActive ? "rotate-45 translate-y-[4px]" : "rotate-0"
          }  bg-blue-300`}
        />
        <div
          className={`w-7 md:w-8 h-[2px] md:h-[3px] ${
            !hamburgerActive ? "block" : "hidden"
          } bg-blue-300 `}
        />
        <div
          className={`w-7 md:w-8 h-[2px] md:h-[3px] bg-blue-300 ${
            hamburgerActive ? "-rotate-45 -translate-y-[4px]" : "rotate-0"
          }  transition-all`}
        />
      </div>
    </button>
  );
};

const Option = ({ text, Icon, setIsDropdownOpen, path }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  return (
    <motion.li
      variants={itemVariants}
      className="flex items-center w-full gap-3 p-2 text-xs font-medium transition-colors rounded-md cursor-pointer whitespace-nowrap hover:bg-indigo-600 text-cyan-100 hover:text-indigo-100"
      onClick={() => handleClick(path)}
    >
      <motion.span
        className="text-xl font-robotoMono"
        variants={actionIconVariants}
      >
        {Icon}
      </motion.span>

      <span className="text-[1rem] font-robotoMono">{text}</span>
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
      onMouseLeave={() => setOpen(false)}
    >
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
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="absolute left-0 right-0 h-6 bg-transparent -top-6 " />
            <div className="absolute w-4 h-4 rotate-45 -translate-x-1/2 -translate-y-1/2 right-1 bg-violet-800" />
            <FlyoutContent selectedArray={array} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const userActions = ({ selectedArray }) => {
  return (
    <div className=" bg-gradient-to-b from-violet-800 to-indigo-900 rounded-lg py-2.5 lg:py-4 shadow-xl">
      {selectedArray.map((item, index) => (
        <a
          className="w-[12rem] lg:w-[15rem] pl-4 xl:pl-6 no-underline flex items-center py-2 gap-x-3 hover:bg-gradient-to-l hover:from-violet-600 hover:to-indigo-600"
          href={item.href}
          key={item.text + index}
        >
          <span className="text-violet-200 text-[1.2rem] xl:text-[1.3rem]">
            {item.icon}
          </span>
          <span className="flex flex-wrap text-violet-200">{item.text}</span>
        </a>
      ))}
    </div>
  );
};

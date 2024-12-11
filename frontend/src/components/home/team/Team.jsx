import banner from '../../../images/courses/coursesBanner.jpg';
import { tabs, teamMember } from '../../common/DummyData';
import './nameCard.css';
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineIdentification } from "react-icons/hi2";
import { FiGithub } from "react-icons/fi";
import { RiLinkedinBoxLine } from "react-icons/ri";

import { Footer, NavBar } from '../Home';

const Team = () => {
    return (
        <div className='relative h-screen scroll-smooth'>
            {/* banner */}
            <div
            className={`h-full flex flex-col items-start justify-center pl-4 pr-4 sm:pl-12 md:pl-32 bg-fixed bg-center bg-cover`}
            style={{
                backgroundImage: `url('${banner}')`,
            }}>
                <div className='text-[1rem] lg:text-[1.3rem] font-montserrat font-bold text-blue-900 uppercase'>
                    Welcome to Hire Hub
                </div>

                <div className='mt-3 font-bold text-[2.3rem] md:text-[3rem] xl:text-[4.2rem] leading-[50px] xl:leading-[70px] font-jaldi text-blue-900 text-wrap flex flex-wrap sm:w-[35rem] md:w-[43rem] capitalize'>
                    Together we built it!😎
                </div>

                <div className='mt-3 mb-4 text-[1.1rem] sm:text-xl font-mavenPro font-bold text-black'>
                    "The roots of education are bitter, but the fruit is sweet."
                </div>
            </div>

            {/* navbar */}
            <div className='absolute flex flex-col items-center w-full top-10 gap-y-4'>
                <div className='rounded-lg w-[96%] bg-[#0f172a25] backdrop-blur-md'>
                    <NavBar selectedTab={tabs[2].text}/>
                </div>
            </div>

            <div className='grid nameCardHolder lg:grid-cols-2 place-items-center place-content-center gap-y-16'>
                {teamMember.map((member, indx) => (
                    <div className="cardContainer group" key={indx + member.name}>
                        {/* image */}
                        <div className="profileDiv">
                            <img 
                                src={member.image}
                                alt={member.name} 
                            />
                        </div>
                        
                        {/* behind card */}
                        <div className="infoDiv">
                            {/* description */}
                            <div className="nameDiv">
                                <p className="font-bold text-green-800 name font-onest">
                                    {member.name}
                                </p>
                                
                                <p className="role font-montserrat">
                                    {member.role}
                                </p>
                            </div>
                            
                            {/* icons */}
                            <div className="socialDiv">
                                <a href={member.socialLinks.github}  target="_blank" rel="noopener noreferrer">
                                    <FiGithub className='transition-all socialMediaIcon github'/>
                                </a>
                            
                                <a href={member.socialLinks.linkedin}  target="_blank" rel="noopener noreferrer">
                                    <RiLinkedinBoxLine className='transition-all socialMediaIcon linkedin'/>
                                </a>

                                <a href={`mailto:${member.socialLinks.mail}`}  target="_blank" rel="noopener noreferrer">
                                    <MdOutlineEmail className='transition-all socialMediaIcon mail'/>
                                </a>

                                <a href={member.socialLinks.portfolio}  target="_blank" rel="noopener noreferrer">
                                    <HiOutlineIdentification className='transition-all socialMediaIcon portfolio'/>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* footer */}
            <div className='mt-16'>
                <Footer/>
            </div>
        </div>
    )
}

export default Team;


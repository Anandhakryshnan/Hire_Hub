import banner from '../../../images/courses/coursesBanner.jpg';
import { tabs } from '../../common/DummyData';
import aboutUs from '../../../images/banner/aboutUs.jpg';

import { AboutUsCard, Footer, NavBar } from '../Home';



const AboutUs = () => {
    return (
        <div className='relative h-screen scroll-smooth'>
            {/* banner */}
            <div
            className={`h-full flex flex-col items-start justify-center pl-4 pr-4 sm:pl-12 md:pl-32 bg-fixed bg-cover bg-left`}
            style={{
                backgroundImage: `url('${banner}')`,
            }}>
                <div className='text-[1rem] lg:text-[1.3rem] font-montserrat font-bold text-blue-900 uppercase'>
                    Welcome to Hire Hub
                </div>

                <div className='mt-3 font-bold text-[2.3rem] md:text-[3rem] xl:text-[4.2rem] leading-[50px] xl:leading-[70px] font-jaldi text-blue-900 text-wrap flex flex-wrap sm:w-[35rem] md:w-[43rem] capitalize'>
                    this is what we do
                </div>

                <div className='mt-3 mb-4 text-[1.1rem] sm:text-xl font-mavenPro font-bold text-black'>
                    "The roots of education are bitter, but the fruit is sweet."
                </div>
            </div>

            {/* navbar */}
            <div className='absolute flex flex-col items-center w-full top-10 gap-y-4'>
                <div className='rounded-lg w-[96%] bg-[#0f172a25] backdrop-blur-md'>
                    <NavBar selectedTab={tabs[1].text}/>
                </div>
            </div>

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
            <Footer/>
        </div>
    )
}

export default AboutUs;





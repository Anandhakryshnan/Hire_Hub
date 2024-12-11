import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import banner from '../../../images/courses/coursesBanner.jpg';
import { faq, tabs } from '../../common/DummyData';
import { MdExpandMore } from "react-icons/md";
import BarChart from './Barchart';
import './placement.css'

import { Footer, NavBar } from '../Home';

const Placement = () => {
    return (
        <div className='relative h-screen scroll-smooth'>
            {/* banner */}
            <div
            className={`h-full flex flex-col items-start justify-center pl-4 pr-4 sm:pl-12 md:pl-32 bg-fixed bg-cover bg-top`}
            style={{
                backgroundImage: `url('${banner}')`,
            }}>
                <div className='text-[1rem] lg:text-[1.3rem] font-montserrat font-bold text-blue-900 uppercase'>
                    Welcome to Hire Hub
                </div>

                <div className='mt-3 font-bold text-[2.3rem] md:text-[3rem] xl:text-[4.2rem] leading-[50px] xl:leading-[70px] font-jaldi text-blue-900 text-wrap flex flex-wrap sm:w-[35rem] md:w-[43rem] capitalize'>
                    our placement rate is here
                </div>

                <div className='mt-3 mb-4 text-[1.1rem] sm:text-xl font-mavenPro font-bold text-black'>
                    "The roots of education are bitter, but the fruit is sweet."
                </div>
            </div>

            {/* navbar */}
            <div className='absolute flex flex-col items-center w-full top-10 gap-y-4'>
                <div className='rounded-lg w-[96%] bg-[#0f172a25] backdrop-blur-md'>
                    <NavBar selectedTab={tabs[3].text}/>
                </div>
            </div>

            {/* bar chart */}
            <div className='mt-14 barChart'>
                <div className='mt-10 mb-6 font-bold font-jaldi text-blue-900 text-center capitalize chartHeading'>
                    get a view of our placement history
                </div>

                <BarChart/>
            </div>

            {/* faq */}
            <>
                <div className='mt-10 font-bold text-[2.3rem] md:text-[3rem] font-jaldi text-blue-900 text-center capitalize'>
                    most asked questions
                </div>

                <div className='faq max-h-[20rem] overflow-y-auto mt-6 space-y-2'>
                    {faq.map((faq, i) => (
                        <Accordion 
                        key={i}>
                            <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{
                                backgroundColor: '#E8FFF5',
                                color: 'green',
                            }}>
                                <p className='font-semibold font-onest text-[18px] md:text-[20px] md:tracking-wide'>
                                    Q:{i+1} {faq.question}
                                </p>
                            </AccordionSummary>

                            <AccordionDetails
                            sx={{
                                backgroundColor: '#D3F9FF',
                                color: '#003C45',
                            }}>
                                <p className='font-semibold font-mavenPro text-[17px] md:tracking-wide'>
                                    {faq.answer}
                                </p>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </>

            {/* footer */}
            <div className='mt-10'>
                <Footer/>
            </div>
        </div>
    )
}

export default Placement;

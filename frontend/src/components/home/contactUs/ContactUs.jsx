import { useState } from 'react';
import banner from '../../../images/courses/coursesBanner.jpg';
import { tabs } from '../../common/DummyData';
import './contactUs.css';
import { Form, Row, Col } from 'react-bootstrap';

import { Footer, NavBar } from '../Home';

const ContactUs = () => {
    const map = ' https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d904726.6131739549!2d88.3953!3d26.7271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1652535615693!5m2!1sen!2snp" allowfullscreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" '

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, 
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e)  => {
        e.preventDefault()
    };

    const handleReset = () => {
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

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
                    get in touch with us
                </div>

                <div className='mt-3 mb-4 text-[1.1rem] sm:text-xl font-mavenPro font-bold text-black'>
                    "The roots of education are bitter, but the fruit is sweet."
                </div>
            </div>

            {/* navbar */}
            <div className='absolute flex flex-col items-center w-full top-10 gap-y-4'>
                <div className='rounded-lg w-[96%] bg-[#0f172a25] backdrop-blur-md'>
                    <NavBar selectedTab={tabs[4].text}/>
                </div>
            </div>

            {/* content */}
            <>
                <div className='relative flex flex-col items-center justify-center text-blue-900 mx-6 mt-16 mb-8 text-2xl font-bold text-center capitalize font-onest gap-y-2 md:text-4xl'>
                    We are located here!
                </div>

                <div className=' flex items-center justify-center w-full px-3'>
                    <div className='shadow contentContainer'>
                        {/* map */}
                        <div>
                            <iframe src={map} className='map'></iframe>
                        </div>

                        {/* form */}
                        <div className='formContainer space-y-16'>
                            <div className=' space-y-2'>
                                <div className='text-3xl font-mavenPro font-bold text-blue-900'>
                                Contact us
                                </div>
                                <div className='text-lg font-mavenPro font-bold text-indigo-500'>
                                    We're 24x7 open for any suggestion or having a chat
                                </div>
                            </div>

                            <Form onSubmit={handleSubmit} className='flex flex-col items-center justify-center h-fit overflow-auto w-fit py-2'>
                                <Row className="gap-y-3">
                                    <Form.Group as={Col} sm={6} controlId="formGridCountry">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full name"
                                            required
                                            className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${formData.name ? 'border-indigo-400' : ''} focus:border-indigo-400 w-full`}
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} sm={6} controlId="formGridState">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            required
                                            className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${formData.email ? 'border-indigo-400' : ''} focus:border-indigo-400 w-full`}
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            required
                                            className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 h-full font-robotoMono placeholder:text-blue-300 text-green-300 ${formData.subject ? 'border-indigo-400' : ''} focus:border-indigo-400 w-full`}
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>

                                    <Form.Group as={Col} xs={12} controlId="formGridAddress">
                                        <textarea
                                            rows={'12'}
                                            name="message"
                                            placeholder="Message"
                                            required
                                            className={`border-y-2 pt-2.5 pb-2 px-2 focus:border-b-2 transition-colors focus:outline-none bg-slate-800 font-robotoMono placeholder:text-blue-300 text-green-300 ${formData.message ? 'border-indigo-400' : ''} focus:border-indigo-400 w-full`}
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Row>

                                {/* submit button */}
                                <div className="flex flex-col items-center justify-between mt-3 sm:flex-row gap-y-4 w-full">
                                    <button 
                                    className=" text-md font-bold bg-slate-800 text-cyan-300 hover:text-indigo-300 font-robotoMono ring-2 ring-violet-400 w-full sm:w-[7rem] h-9 sm:h-8 rounded-md active:ring-green-300 active:text-green-300 transition-all" 
                                    type="submit">
                                        Register
                                    </button>
                                    
                                    <button 
                                    className=" text-md font-bold bg-slate-800 text-cyan-300 hover:text-indigo-300 font-robotoMono ring-2 ring-violet-400 w-full sm:w-[7rem] h-9 sm:h-8 rounded-md active:ring-green-300 active:text-green-300 transition-all" 
                                    onClick={handleReset}>
                                        Reset
                                    </button>
                                </div> 
                            </Form>
                        </div>
                    </div>
                </div>
            </>

            {/* footer */}
            <div className='mt-10'>
                <Footer/>
            </div>
        </div>
    )
}

export default ContactUs;

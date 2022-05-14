 // eslint-disable-next-line
  /* eslint-disable */
import React, { useEffect, useState, useContext} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { CountUp } from 'use-count-up'
import NavBar from '../layouts/partials/Navbar';


import AOS from 'aos';
import 'aos/dist/aos.css';




const Home = (props) => {


    useEffect(() => {
            
    }, [])
    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };




    return(
        <>

    

            <NavBar isFixed={true} doScroll={scrollTop} />



            <section className="hero hero-home ui-full-bg-norm  bg-white hero-pos " >

                <div className="ui-wrapper-large">

                    <div className="container">

                        <div className="row " >

                            <div className="col-lg-6 col-md-8">


                            <div className="hero-sect"  >
                        
                             
                                    <h1 className="font-matterbold onblack fs-50 mrgb mrgt ui-hide-mobile-only">
                                    I deployed this app as a <br />   <span className="on-tech font-matterbold fs-50 mrgb mrgt1">Techchak Project</span>
                                        </h1>
                                        <div className="py-line"></div>
                                      

                                    <div className="ui-group-button mrgt2 ">
                                        <Link className="btn lg bg-white font-mattermedium bg-tech onwhite">Get Started</Link>
                                    </div>

                                    <div className='d-flex mrgt3'>
                                        <div className='str'>
                                            <div className='d-flex align-items-center'>
                                                 <img src="../../../images/icons/cap.svg" alt="blob" style={{    position: 'relative', top: '-8px'}} />
                                                 <p className='font-mattersemibold fs-16  onblack ml-3' style={{lineHeight: '20px'}}>Complete Real life Projects <br />at your own Pace</p>
                                            </div>
                                        </div>

                                        <div className='str ml-6'>
                                            <div className='d-flex align-items-center'>
                                                 <img src="../../../images/icons/card.svg" alt="blob" style={{    position: 'relative', top: '-8px'}} /> 
                                                 <p className='font-mattersemibold fs-16  onblack ml-3' style={{lineHeight: '20px'}}>Get Exposed to Industry<br />astandard tasks</p>
                                            </div>
                                        </div>
                                    </div>

                             

                                 


                                </div>

                            </div>
                            <div className="col-lg-5 offset-lg-1 ui-hide-mobile-only">
                            <div class=''>
                                    

                                    <div className="mrgt1">
                                        {/* <img src="../../../images/assets/img@blob-04.png" alt="blob" className="round said-img img-blob mb-1 " /> */}

                                        <div className="img-blob said-img-third  round ui-relative">
                                            <img src="../../../images/icons/img.png" alt="blob" />
                                        </div>

                                    </div>

                            

                            </div>
                            </div>


                        </div>

                    </div>

                </div>

            </section>

                         
        </>
    )

}

export default withRouter(Home);



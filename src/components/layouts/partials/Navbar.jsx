/* eslint-disable */
// eslint-disable-next-line
import React, {useEffect, useContext, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import storage from '../../helpers/storage'
import body from '../../helpers/body'

import "react-modal-video/scss/modal-video.scss"



const TopBar = ({ isFixed, backgroundColor, doScroll }) => {

    const [showNotify, setShowNotify] = useState(false);
    let history = useHistory();

    const [show, setShow] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [showJoin, setShowJoin] = useState(false)

    useEffect(() => {

        body.fixNav();

    }, []);


      const goto = (e, url, t) => {

        if(e){
            e.preventDefault()
        }

        history.push(url);
  
    }

    const toggleLogin = (e) => {
        if(e) e.preventDefault()
        setShow(!show);
    }

    const scrollTo = (e, t) => {
        if(e) e.preventDefault();
        doScroll(e, t);
    }

    const toggleJoin = (e) => {
        if(e) e.preventDefault()
        setShowJoin(!showJoin)
    }

    // this: used in pushing
    return (
        <>
         
            <header id="header" className={` header header-nav ${isFixed && isFixed === true ? 'stick' : 'transparent blocked flat'}`} style={{ backgroundColor: backgroundColor ? backgroundColor : '' }}>
                
                <div className="nav-body">
                
                    <div className="navigation bg-brandcox-firefly">
                        <div className="container-fluid">

                            <nav className="main-nav navbar navbar-right navbar-expand-md">

                                <Link to="/" className="navbar-brand logo brand-blue font-matterbold"><img className="logo" src="../../../images/assets/logo.png" alt="" /> </Link>
                            
                                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar-collapse">
                                    <span className="menu_toggle">
                                    <span className="hamburger">
                                        <span />
                                        <span />
                                        <span />
                                    </span>
                                    <span className="hamburger-cross">
                                        <span />
                                        <span />
                                    </span>
                                    </span>
                                </button>
                            
                            <div id="navbar-collapse" className="navbar-collapse collapse">
                                {/* left */}
                                <ul className="nav left-nav navbar-nav mx-auto">
                                    <li className="nav-item link"><Link to="/" className="nav-link onblack font-matterregular fs-15">Home</Link></li>
                                    <li className="nav-item link"><Link to="/courses" className="nav-link onblack font-matterregular fs-15">About</Link></li>
                                    <li className="nav-item link"><Link to="/instructors" className="nav-link onblack font-matterregular fs-15">Resources</Link></li>
                                    <li className="nav-item link"><Link to="/events" className="nav-link onblack font-matterregular fs-15">Contact</Link></li>
                                    <li className="nav-item link"><Link   to="/coming-soon"  className="nav-link onblack font-matterregular fs-15">Fellows</Link></li>

                                </ul>

                                
                                {/* Right */}
                                <ul class="nav navbar-nav right-nav ml-auto " >
                                    <li className="nav-item link">
                                        <Link className="nav-link nav-btn onblack font-matterregular btn ui-hide-mobile-only  xsm btn-outlinee " to="/login">Get Started</Link>
                                    </li>
                                    <li className="nav-item link ui-show-mobile-only">
                                        <Link className="nav-link onblack font-mattersemibold fs-16"to="/login">Log in</Link>
                                    </li>
                                </ul>
                                
                            </div>
                            </nav>
                        </div>
                    </div>
                    
                </div>

                {/* {
                    !isFixed &&
                    <div className="ui-line bg-silverlight"></div>
                } */}
            
            </header>
            
        
        </>
    )
}

export default TopBar;
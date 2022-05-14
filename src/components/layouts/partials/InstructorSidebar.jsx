/* eslint-disable */
// eslint-disable-next-line
import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import Axios from 'axios'

import storage from '../../helpers/storage'


import UserContext from '../../../context/user/userContext';
import InstructorContext from '../../../context/instructor/instructorContext';

import { useNetworkDetect } from '../../helpers/hooks'

const ISidebar = ({ barState }) => {

    const startRef = useRef(null)

    const history = useHistory();
    const params = useParams();


    const { id } = params;

    const userContext = useContext(UserContext);
    const instructorContext = useContext(InstructorContext);

    const [dropType, setType] = useState('');
    const [active, setActive] = useState('dashboard');

    const [start, setStart] = useState(false);

    useEffect(() => {

        redirectToLogin();
        // setActive(storage.fetch('menu') ? storage.fetch('menu') : 'overview');
        // userContext.getUser();
        // userContext.getStatus(); 
        instructorContext.getInstructor(id);
        userContext.getUser(storage.getUserID());
    }, [])

    useNetworkDetect()


    const config = {
        headers: {
            ContentType: 'application/json',
            lg: "en",
            ch: "web"
        }
            
    }

    const goTo = (e, url) => {
        if(e) e.preventDefault()
        storage.keep('biztab', 'two')
        history.push(url)
    }

    const redirectToLogin = () => {

        if(!storage.checkToken() && !storage.checkUserID()){
            logout()
        }

    }

    const logout = async (e) => {

        if(e) e.preventDefault();

        storage.clearAuth();
        history.push('/');
        await Axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/logout`,{}, config);
    }

    const openDrop = (e,type, t) => {
        if(e) e.preventDefault()
  
        if(dropType === type){
          setType('');
          
        }else{
          setType(type);
          setActive(t);
        }
        
    }

    const goto = (e, url, t) => {

        if(e){
            e.preventDefault()
        }
  
        // storage.keep('menu', t);
        // setActive(t);
        history.push(url);
  
    }

    return (

        <>
        
        {/* <Link onClick={initializeModal} ref={startRef} className='ui-hide'></Link> */}

          <div className='ui-monitor'>
            <div className='d-flex'>
              <div />
              <div className='ml-auto'>
                <Link to='/' className='pullin--btn onblack'>
                  <span
                    className='fe fe-arrow-left fs-20'
                    style={{ color: '#2F80ED' }}
                  />
                </Link>
              </div>
            </div>
          </div>

          <section id="ui-sidebar" className={`ui-sidebar ssbar--open`}>

            <div className='ui-sidebar-primary ssbar--open'>

                <div className="ui-sidebar-primary-header">
                <Link to="/dashboard/student" ><img className="logo" src="../../../images/assets/logo-sd.svg" alt="" /></Link>

                    {/* <Link to="/dashboard/student" to=""><img className="logo" src="../../../images/assets/logo-white.svg" alt="" /></Link> */}

                </div>

                <div className='ui-sidebar-primary-body'>

                    <div className="ui-separate-small ui-show-mobile-only"></div>

                    <ul id="ui-sidebar-primary-links" className={`ui-sidebar-primary-links primary-nav`}>

                        <li className={ `${active === 'overview' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/instructors/home', 'overview')} to='' className='ui-icon-animate link' title='Home'>
                                <span style={{position: 'relative', left: '-3px', lineHeight: '0px'}} className='saidatech-icon sl'><img src={`../../../images/icons/${active === 'overview' ? '': 'd'}home.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '-2px'}} className='lnk--text sb-text font-matterlight fs-13'>
                                    Home
                                </span>
                            </Link>
                        </li>

                        {/* <li className={ `${active === 'courses' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/student/courses', 'courses')} to='' className='ui-icon-animate link' title='Courses'>
                                <span className='saidatech-icon sl ' style={{position: 'relative', left: '-4px'}}><img src={`../../../images/icons/${active === 'notification' ? '': 'd'}notification.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '-4px'}} className='lnk--text sb-text font-matterlight fs-13'>
                                    Notification
                                </span>
                            </Link>
                        </li> */}

                        <li className={ `${active === 'group' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/instructors/profile', 'profile')} to='' className='ui-icon-animate link' title='Group'>
                                <span style={{position: 'relative', left: '-4px'}} className='saidatech-icon md'><img src={`../../../images/icons/${active === 'profile' ? '': 'd'}profile.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '-4px'}} className='lnk--text sb-text font-matterlight fs-13'>
                                    Profile
                                </span>
                            </Link>
                        </li>
                        <li className={ `${active === 'group' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/instructors/students', 'paymenthistory')} to='' className='ui-icon-animate link' title='History'>
                                <span style={{position: 'relative', left: '-4px'}} className='saidatech-icon md'><img src={`../../../images/icons/${active === 'cards' ? '': 'd'}cards.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '-4px'}} className='lnk--text sb-text font-matterlight fs-13'>
                                    Students
                                </span>
                            </Link>
                        </li>

                        <li className={ `${active === 'mentor' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/contracts/contract', 'contract')} to='' className=' disabled ui-icon-animate link' title='Contract'>
                                <span style={{position: 'relative', left: '-3px'}} className='saidatech-icon xsl'><img src={`../../../images/icons/${active === 'contracts' ? '': 'd'}receipt.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '1px'}} className='lnk--text sb-text font-matterlight fs-13'>
                                        Tasks
                                </span>
                            </Link>
                        </li>

                        <li className={ ` disabled ${active === 'settings' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/certificates/certificate', 'certificate')} to='' className=' disabled ui-icon-animate link' title='Certificate'>
                                <span style={{position: 'relative', left: '-4px', lineHeight: '0px'}} className='saidatech-icon md'><img src={`../../../images/icons/${active === 'certificate' ? '': 'd'}book.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '-4px'}} className='lnk--text sb-text font-matterlight fs-13'>
                                    Assignments
                                </span>
                            </Link>
                        </li>

                        {/* <li className={ `${active === 'settings' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/course/course-mateials', 'materials')} to='' className='ui-icon-animate link' title='Material'>
                                <span style={{position: 'relative', left: '-4px', lineHeight: '0px'}} className='saidatech-icon md'><img src={`../../../images/icons/${active === 'homework' ? '': 'd'}award.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '-4px'}} className='lnk--text sb-text font-matterlight fs-13'>
                                    Course material
                                </span>
                            </Link>
                        </li> */}


                        <li className={ `${active === 'settings' ? 'active' : ''} nav-list` }>
                            <Link onClick={(e) => goto(e, '/dashboard/student', 'settings')} to='' className='ui-icon-animate link' title='settings'>
                                <span style={{position: 'relative', left: '-4px', lineHeight: '0px'}} className='saidatech-icon md'><img src={`../../../images/icons/${active === 'settings' ? '': 'd'}settings.svg`} alt="icon" /></span>
                                <span style={{position: 'relative', left: '-4px'}} className='lnk--text sb-text font-matterlight fs-13'>
                                    Settings
                                </span>
                            </Link>
                        </li>

                       

                        {/* <li className={`drop ${ active === 'settings' ? 'active' : '' }`}>
                            <Link onClick={ (e) => {
                                openDrop(e,'settings', 'settings');
                                }} className='ui-icon-animate' title='Launch' >
                                <span className='saidatech-icon'><img src="../../../images/icons/dsettings.svg" alt="icon" /></span>
                                <span className='lnk--text font-matterlight fs-15'>Settings</span>
                                <span className="ml-auto fe fs-24" style={{position: 'relative', top: '3px', left: '8px'}}></span>
                            </Link>

                            <div className={`ui-sidebar-dropdown ${dropType === 'trade' ? 'is-open' : ''}`}>

                                <ul className='ui-sidebar-primary-links'>

                                    <li>
                                        <Link onClick={(e) => goto(e, '/salex/launch', 'launch')} to='' className='ui-icon-animate' title='Basic info'>
                                        <span className='lnk--text fs-13 font-montserrat'>
                                            Dashboard
                                        </span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link onClick={(e) => goto(e, '/salex/launch/start-sale', 'launch')} to='' className='ui-icon-animate' title='Basic info'>
                                        <span className='lnk--text  fs-13 font-montserrat'>
                                            Start Sale
                                        </span>
                                        </Link>
                                    </li>

                                    <li>
                                        <Link onClick={(e) => goto(e, '/salex/launch/manage', 'launch')} to='' className='ui-icon-animate' title='Basic info'>
                                        <span className='lnk--text  fs-13 font-montserrat'>
                                            Manage Presale
                                        </span>
                                        </Link>
                                    </li>

                                </ul>

                            </div>
                        </li> */}

                    </ul>

                    <div className="ui-line bg-silverlight"></div>

                    <ul id="ui-sidebar-primary-links" className={`ui-sidebar-primary-links`}>

                        <li className={ `nav-list` }>
                            <Link onClick={(e) => logout(e) } to='' className='ui-icon-animate link' title='Logout'>
                                <span className='saidatech-icon smd'><img src="../../../images/icons/dlogin.svg" alt="icon" /></span>
                                <span className='lnk--text sb-text font-matterlight fs-13'>
                                    Logout
                                </span>
                            </Link>
                        </li>

                    </ul>

                </div>
            
            </div>
          
          </section>
        
        </>

    )

}

export default ISidebar;
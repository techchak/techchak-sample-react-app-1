/* eslint-disable */
// eslint-disable-next-line
import React, {  useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import Axios from 'axios'

import PanelBox from './PanelBox'
import storage from '../../helpers/storage'
import UserContext from '../../../context/user/userContext'
import Toast from '../../layouts/partials/Toast'

const TopBar = ({ isFixed, pageTitle, showBack, barType }) => {

    const history = useHistory();
    const params = useParams();

    const userContext = useContext(UserContext)

    const [showPanel, setShowPanel] = useState(false);
    const [icon, setIcon] = useState('menu')

    const [toast, setToast] = useState({
        type: 'success',
        show: false,
        message: '',
        title: '',
        position: 'top-right'
    })

    useEffect(() => {
        userContext.getAStudent(storage.getUserID())
    }, [])

    const copyCode = (e, code) => {
        if(e) e.preventDefault();
        const cpy = storage.copyCode(code);

        if(cpy){
            
            setToast({ ...toast, show: true, title: 'Success', type: 'success', message: 'Store url copied!', position: 'top-right'})
            setTimeout(() => {
                setToast({ ...toast, show: false })
            }, 6000)
        }else{
            setToast({ ...toast, show: true, title: 'Error', type: 'error', message: 'There is nothing to copy', position: 'top-right'})
            
            setTimeout(() => {
                setToast({ ...toast, show: false })
            }, 6000)
        }

    } 

    const toggleToast = (e) => {
        if(e) e.preventDefault();
        setToast({ ...toast, show: !toast.show });
    }

    const config = {
        headers: {
            ContentType: 'application/json',
            lg: "en",
            ch: "web"
        }
            
    }

    const togglePanel = (e) => {
        if(e) e.preventDefault();
        setShowPanel(!showPanel);
    }

    const back = (e) => {
        if(e) e.preventDefault();
        history.goBack();
    }

    const logout = async (e) => {

        if(e) e.preventDefault();

        storage.clearAuth();
        history.push('/');

        await Axios.post(`${process.env.REACT_APP_AUTH_URL}/auth/logout`,{}, config);
    }

    const openSidebar = (e) => {
        e.preventDefault();
        const sd = document.querySelector('.ui-sidebar');
        
        if(sd){
            if(sd.classList.contains('pull-icons')){
                sd.classList.remove('pull-icons');
                setIcon('menu')
            }else{
                sd.classList.add('pull-icons');
                setIcon('x')
            }
        }

      }

    return (

        <>

        <Toast 
            show={toast.show} 
            title={toast.title} 
            message={toast.message} 
            position={toast.position}
            type={toast.type}
            close={toggleToast} />

            <div className={`ui-dashboard-topbar pt-2 pb-2 bg-white ${ isFixed ? '' : '' }`}>

                {/* {
                    !showBack &&
                    <><img src="../../../images/assets/logo-icon.svg" width="30px" className="ui-show-mobile-only" alt="logo"/> <span className="pdr1"></span></>
                } */}


                {
                    showBack && 
                    <Link className="pdr2" onClick={(e) => back(e)}>
                        <span style={{ position: 'relative', top: '3px' }} className="fe fe-chevron-left fs-18 brandcc-purple"></span>
                    </Link>
                }

                <h1 className="page-title font-matterbold brandcc-purple">{ pageTitle ? pageTitle : 'Home'}</h1>

            
                <div className="options">

                
                    <ul className="ui-topbar-nav">

                    <li className='ui-hide-mobile-only'>
                            <Link className="topbar-dp notif mr-2">
                             
                                    <img src="../../../images/assets/Notification.svg" />
                                
                            </Link>

                         

                        </li>

                        <li className='ui-hide-mobile-only'>
                            <Link className="topbar-dp">
                                    <img
                                        src={
                                            userContext?.user?.student?.photo === 'no-photo.jpg'
                                            ? `https://ui-avatars.com/api/?name=${userContext?.user?.student?.firstName}+${userContext?.user?.student?.lastName}`
                                            : userContext?.user?.student?.photo
                                        }
                                        alt="profile"
                                    />
                              
                                            {/* <img src={userContext?.user?.student?.photo} alt="dp"/> */}
                             
                            </Link>

                         

                        </li>

                 

                        <li className="ui-hide">
                            <Link onClick={(e) => togglePanel(e)} className="panel-btn">
                                <span className="sidatech-icon"><img src= {userContext?.user?.student?.phone}/></span>
                            </Link>
                        </li>

                        <li className="pdl1 ui-show-mobile-only">
                            <Link onClick={(e) => openSidebar(e)} className="sd-menu brandcc-red" style={{position: 'relative', top: '5px'}}><span className={`fe fe-${icon} fs-23`}></span></Link>
                        </li>

                    </ul>

                </div>

            </div>

            <PanelBox show={showPanel} close={togglePanel} />
        
        </>

    )

}

export default TopBar;
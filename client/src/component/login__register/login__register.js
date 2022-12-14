import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import './login__register.css';
import Login from './login/login';
import Register from './register/register';
import VerifyPhoneNumber from './verify_phone_number/verify_phone_number';
import axios from 'axios';
import FeedBack from './feedback/feedback';

class LoginRegister extends Component {   
    constructor(props) {
        super(props);
        this.state={
            data_toggle_news:'modal',
            data_target_news:'#modalLoginForm',
            data_toggle_news_fb:'modal',
            data_target_news_fb:'#modalLoginForm',
            result_infor_user:false,
            result_logout_user:false,
            username:"",
            role:"",
            number_phone:""
        }
    }
    async componentDidMount(){
    await  axios.get("/nguoi-dung/thong-tin")
        .then(res => {
            this.setState({
                    result_infor_user:res.data.result,
                    username:res.data.username,
                    role:res.data.role,
                    number_phone:res.data.number_phone,
            });
            if(res.data.result){
                this.setState({
                    data_toggle_news_fb:'modal',
                    data_target_news_fb:'#modalFeedBack',
            })
            }
            if(res.data.role==="MEMBER"){
                this.setState({
                    data_toggle_news:'modal',
                    data_target_news:'#modalVerifyPhone_Nb_Form',
            })
            }else if(res.data.role==="CHUNHATRO"){
                this.setState({
                    data_toggle_news:'',
                    data_target_news:'',
            })
            }
        
        
        })
        .catch( (error) => console.log(error));
    }
   
    callApiGetUser=async ()=>{
    await  axios.get("/nguoi-dung/thong-tin")
    .then(res => {
        this.setState({
            result_infor_user:res.data.result,
            username:res.data.username,
            role:res.data.role,
            number_phone:res.data.number_phone
            });
            if(res.data.result){
                this.setState({
                    data_toggle_news_fb:'modal',
                    data_target_news_fb:'#modalFeedBack',
            })
            }
        })
        
    .catch( (error) => console.log(error));  
    if(this.state.role==="MEMBER"){
        this.setState({
            data_toggle_news:'modal',
            data_target_news:'#modalVerifyPhone_Nb_Form',
    })
    }else if(this.state.role==="CHUNHATRO"){
        this.setState({
            data_toggle_news:'',
            data_target_news:'',
    })
    }
   }
   getVerifyPhoneNumber=(result)=>{
       this.props.clickPostNewstoApp(result);
   }
   clickPostNewstoApp=()=>{
      if(this.state.username && this.state.role==="CHUNHATRO")
        {  
            this.props.clickPostNewstoApp(true);
        }
    }

    ClickLogout = async ()=>{
    await axios.get("/nguoi-dung/dang-xuat")
    .then(res => {
        this.setState({
            result_logout_user:res.data.result,
            data_toggle_news:'modal',
            data_target_news:'#modalLoginForm',
            data_toggle_news_fb:'modal',
            data_target_news_fb:'#modalLoginForm',
            result_infor_user:false,
            username:"",
            role:"",
            number_phone:""
        });
        })
    .catch( (error) => console.log(error));
    }
    OpenModalChangePassword=()=>{
        const close = document.getElementById("HiddenChangePassword");
        close.click();
    }
    render() {
      
        return (
            <div className="navbar navbar-expand-sm header1_info_right__div-login_register">
                {!this.state.result_infor_user ?
                    <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink to='/nguoi-dung/dang-nhap'  className="nav-link" data-toggle="modal" data-target="#modalLoginForm">????ng nh???p</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink  to='/nguoi-dung/dang-ky' className="nav-link" data-toggle="modal" data-target="#modalRegisterForm">????ng k??</NavLink>
                                </li>
                    </ul>
                    :
                    <div className="btn-group">
                        {/* Menu Website if User login success (Menu website n???u user ????ng nh???p th??nh c??ng)*/}
                        <button type="button" className="btn dropdown-toggle bnt_btuserprofile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         {this.state.username}
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                                <button className="dropdown-item dropdown-menu_btn" type="button">
                                <NavLink  to='/nguoi-dung/sua-thong-tin' 
                                onClick={this.props.clickMovedOnUsertoApp}
                                >Th??ng tin c?? b???n</NavLink>
                                </button>
                                <button className="dropdown-item dropdown-menu_btn" 
                                onClick={this.OpenModalChangePassword} type="button">
                                ?????i m???t kh???u</button>
                                <button className="dropdown-item dropdown-menu_btn" 
                                type="button"
                                onClick={this.ClickLogout}>
                                 ????ng xu???t</button>
                                 <button className="dropdown-item dropdown-menu_btn hidden-change-password" 
                                type="button" id="HiddenChangePassword" data-toggle="modal" data-target="#modalChangePassword"
                                >
                                 HiddenChangePassWord</button>
                        </div>
                    </div>
                } 
                {/* Link post news of menu Website (Link ????ng k?? tin m???i c???a website)*/}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink  to='/nguoi-dung/dang-tin-moi' className="nav-link" data-toggle={this.state.data_toggle_news} data-target={this.state.data_target_news}
                        onClick={this.clickPostNewstoApp}>????ng tin m???i</NavLink>
                    </li>
                </ul>
               
                   
                <div>
                {/* Modal Login of Website (Form ????ng nh???p c???a website)*/}
                    <Login callApiGetUser={this.callApiGetUser}/>
                </div>
                {/* Modal Register of Website (Form ????ng k?? t??i kho???n c???a website)*/}
                <div className="modal fade" id="modalRegisterForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <Register/>
                </div>
                {/* Modal Verify PhoneNumber Member want post news 
                (Form modal cho kh??ch h??ng member ????ng tin c???n x??c th???c s??? ??i???n tho???i) */}
                <VerifyPhoneNumber getVerifyPhoneNumber={this.getVerifyPhoneNumber}/>
                {/* Button feedback (Kh??ch h??ng ????nh gi?? cho website) */}
                <div className="btn-feedback" onClick={this.ClickBntFeedback} 
                data-toggle={this.state.data_toggle_news_fb} data-target={this.state.data_target_news_fb}>????nh gi??</div>  
                <FeedBack/>          
            </div>
        );
    }
}

export default LoginRegister;
import React from "react"
import { graphql ,compose } from 'react-apollo'
import {connect } from 'react-redux'
import NotificationBell from './NotificationBell.js'
import NotificationBox from './NotificationBox.js'
import { JWTDecryption } from '../Encryption'
import { checkNotification , allNotification} from '../GraphQLQueries/Queries.js'

 class CenterHeader extends React.Component{
  constructor(){
    super();
    this.state = {
      isNotification : false

    };
    // this.getNotificationData = this.getNotificationData.bind(this);
    this.onNotificationBellClicked = this.onNotificationBellClicked.bind(this);

  }

   async componentDidMount(){

    if(localStorage.getItem('token')){
      const DecodedtokenObject = await JWTDecryption(localStorage.getItem('token'));

          this.props.checkNotification.refetch({
            userID : DecodedtokenObject._id
          }).then(res => {
            if(res.data.checkNotification.length > 0){

              this.setState({
                isNotification : true
              });
              this.NotificationData = res.data.checkNotification;
            }else{
              console.log("no need",res.data.checkNotification);
            }
          })


    }

    this.props.ioSocket.on("NEW_NOTIFICATION",async Data => { // // NOTE: Notification logic goes here use switch case of data
        const DecodedtokenObject = await JWTDecryption(localStorage.getItem('token'));
        if(Data._userID == DecodedtokenObject._id){
          // now there will be a notication
          this.NotificationData = Data;
          this.setState({
            isNotification : true
          })
        }else{
          // nothing
        }
        //

    })
  }

   onNotificationBellClicked(){
    this.setState({
      noOfNotification : 0,
      isNotification : false
    });
    $('.notification-box').toggleClass('open');
    $('.tria').toggleClass('open');



  }
  render(){
    return (
      <div className="container header-div">
        <div className="side-menu-icon">
          <span onClick={(e) => {
            e.preventDefault(e);
            $('.right-Bar').toggleClass('open');
          }}>
            &#8285;
          </span>
        </div>
        <div className="Notification-menu-icon">
          <NotificationBell
            onClickHandler = {this.onNotificationBellClicked}
            isOn={this.state.isNotification}
          />
        </div>
        <NotificationBox data = {this.NotificationData || ""} />

      </div>
    )
  }
}
  const mapStateToProps = (state) => {
      return {
        io : state.io
     }
   }

  const mapDepatchToProps = (dispatch) => {
    return {

    }
  }

CenterHeader =  connect(
    mapStateToProps,
    mapDepatchToProps
  )(CenterHeader);

  // export default (CenterHeader);
export default compose(
  graphql(checkNotification,{
      name:"checkNotification",
      options : (value ) => ({
        variables : {
          userID : value
        }
      })
    })
)(CenterHeader)
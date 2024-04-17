import React, { Component } from 'react'
import Journal from './Journal/Journal'
import MoodRating from './MoodRating/MoodRating'
import './Profile.css'
import UserInfo from './UserInfo/UserInfo'



class Profile extends Component {  
    render() {
        const { state } = this.props
        return (
            <div className = 'containerProfile'>
                <div className="leftColumnContainer">
                    <div className = 'bodyMoodRatingBar'>
                        <div className='topLeftContainer'>
                            <h4 className = 'styleIntroText'>Hi {state.userInfo.username}, <br/> Welcome Back</h4>
                            <MoodRating state={state}/>
                        </div>
                    </div>
                    <div className="bottomLeftContainer">
                        <UserInfo userInfo={state.userInfo}></UserInfo>
                    </div>
                </div>
                <div className = 'bodyJournal'>
                    <div className='journalContainer'>
                        <Journal state={state}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile

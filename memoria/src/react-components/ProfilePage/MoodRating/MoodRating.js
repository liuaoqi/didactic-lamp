import React, { Component } from 'react'
import './MoodRating.css'
import Sadface from './Image/Sadface.png'
import Happyface from './Image/Happyface.png'
import '../Profile.css'
import {moodRatingTextStyle, subtitleRatingTextStyle} from './MoodRatingStyles'


 class MoodRating extends Component {
    render() {
       const {state} = this.props;
       const rating = state.rating

       if (parseInt(rating) < 5 && rating !== ""){
            return (
            <div className = 'containerMoodRating'>
                <h3 className = 'textMoodRating'>Your daily Mood Rating: {rating} </h3>
                <img  className = 'styleImage' src = {Sadface} alt = '' />
                <p style={moodRatingTextStyle}>You rated a {rating} out of 10. Are you okay?</p>
                <p className = 'styleText'>Please check out the Mental Health Resources on the Homepage.</p>
            </div>
            )
        }
        if (rating === "") {
           return (
             <div className = 'containerMoodRating'>
                  <h3 className = 'textMoodRating'>Your daily Mood Rating: N/A </h3>
                  <p style = {subtitleRatingTextStyle}>Please fill out the survey to recieve your daily rating</p>
            </div>
           )
        }

        return (
           <div className = 'containerMoodRating'> 
            <h3 className = 'textMoodRating'>Your daily Mood Rating: {rating} </h3>
            <img className = 'styleImage' src = {Happyface} alt = ''/>
            <p style = {{color:'black', fontWeight:'bold', fontSize: '20px'}}>Keep up the good work!</p>
        </div>

        )
       
      
    }
}

export default MoodRating

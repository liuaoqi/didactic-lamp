import React from "react";
import "./styles.css";
import happyImg from "./Image/icons8-happy-16.png";
import sadImg from "./Image/icons8-sad-16.png";
import { mapStyles, mapWrapper, mapContainerStyles, mapElementStyle, loadingElement } from "./styles.js";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';

class MapElement extends React.Component {

    state = {
        defaultLat: 43.6532,
        defaultLng: -79.3832,
        ratings: []
    }

    // Get the actual ratings from the backend
    getRatings = () => {
        const url = '/api/homepage-ratings'
        fetch (url).then((res) => {
            if (res.status === 200) {
                return res.json()
            }
            else {
                alert('Could not get ratings')
            }
        }).then((json) => {
            this.setState({
                ratings: json.ratings
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getRatings();
    }

    render() {
        /* Customized Google Map API Component */
        const MapComponent = withScriptjs(withGoogleMap(props => {
            const ratings = props.markerRatings
            return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: this.state.defaultLat, lng: this.state.defaultLng }}
                clickableIcons={ true }
                >
                { ratings.map((rating) => (
                    <MarkerWithInfo key={rating.location} rating={rating}/>
                )) }
            </GoogleMap>
        )}))

        return (
            <div>
                <div id="MapContainer" style={ mapWrapper }>
                    <MapComponent style={mapStyles}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBUGSwYalH1f_Tgom090syq-pbifetoQTY"
                        loadingElement={<div style={loadingElement} />}
                        containerElement={<div style={ mapContainerStyles } />}
                        mapElement={<div style={mapElementStyle} />}
                        markerRatings={this.state.ratings}
                    />
                </div>
            </div>
        );
    }
}

class MarkerWithInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            rating: props.rating
        }
    }

    handleRating = (rating) => {
        if (rating > 5) {
            return(
                <img alt="happy face" src={happyImg} className="moodImg"/>
            )
        } else {
            return(
                <img alt="sad face" src={sadImg} className="moodImg"/>
            )
        }
    }

    render () {
        const {open, rating} = this.state
        return (
            <Marker 
            key={rating.location}
            position={{ lat:rating.lat, lng:rating.lng }}
            onClick={() => {this.setState({open: true})} }
            icon={{ url:`/marker_100px.png`, scaledSize: new window.google.maps.Size(75, 75) }}>
                {open ? <InfoWindow>
                    <div className="infoWindowContent">
                        { rating.location }: {  rating.ratings }
                        { this.handleRating(rating.ratings) }
                    </div>
                </InfoWindow> : null}
            </Marker>
        )
    }

    
}

export default MapElement;

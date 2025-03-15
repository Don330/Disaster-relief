import React, {useEffect, useState} from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import {collection, doc, getDocs} from "firebase/firestore";
import {db} from "./firebase";

import changeTHISimage from "./asset/cat_stare.png"

const mapContainerStyle = {
    width: "100%",
    height: "100%",
};

const center = {
    lat: -33.8688,
    lng: 151.2093,
};

const MapComponent = () => {
    const [disasters, setDisasters] = useState([]);
    const [selectedDisaster, setSelectedDisaster] = useState(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    
    // just so that it loads...
    const disasterIcons = mapLoaded ? {
        hurricane: {
            url: changeTHISimage, 
            scaledSize: new window.google.maps.Size(40, 40),
        },
        cyclone: {
            url: changeTHISimage,
            scaledSize: new window.google.maps.Size(40, 40),
        },
        earthquake: {
            url: changeTHISimage,
            scaledSize: new window.google.maps.Size(40, 40),
        },
        default: {
            url: changeTHISimage,
            scaledSize: new window.google.maps.Size(40, 40),
        },
    } : null;

    useEffect(() => {
        const fetchDisasters = async () => {
            const querySnapshot = await getDocs(collection(db, "disasters"));
            let disasterList = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.location) {
                    let formattedTime = "Unknown Time";
                    if(data.time && data.time.seconds){
                        formattedTime = new Date(data.time.seconds * 1000).toLocaleString("en-AU", {
                            timeZone: "Australia/Sydney",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                        });
                    }

                    disasterList.push({
                        id: doc.id,
                        type: data.type,
                        location: {
                            lat: data.location.latitude,
                            lng: data.location.longitude,
                        },
                        severity: data.severity,
                        time: formattedTime,
                    });
                }
            });
            setDisasters(disasterList);
        };
        fetchDisasters();
    }, []);

    // Handle map load event
    const handleMapLoad = () => {
        setMapLoaded(true);
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} onLoad={() => setMapLoaded(true)}>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                center={center} 
                zoom={8}
                onLoad={handleMapLoad}
            >
                {mapLoaded && disasters.map((disaster) => (
                    <Marker
                        key={disaster.id}
                        position={disaster.location}
                        title={`${disaster.type} - Severity: ${disaster.severity}`}
                        onClick={() => setSelectedDisaster(disaster)}
                        icon={disasterIcons[disaster.type.toLowerCase()] || disasterIcons.default}
                    />
                ))}

                {mapLoaded && selectedDisaster && (
                    <InfoWindow
                        position={selectedDisaster.location}
                        onCloseClick={() => setSelectedDisaster(null)}
                    >
                        <div>
                            <h3>{selectedDisaster.type}</h3>
                            <p><strong>Severity:</strong> {selectedDisaster.severity}</p>
                            <p><strong>Time:</strong> {selectedDisaster.time}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;
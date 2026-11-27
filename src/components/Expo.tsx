import * as Location from "expo-location"
import { View } from "react-native"
import { useState, useEffect } from "react"
import React from 'react'

export default function RootLayout(){
   const [location, setLocation] = useState<Location.LocationObject | null>(null)

    useEffect(()=>{
    getLocation()

}, [])

 const getLocation = async() => {
     let {status} = await Location.requestForegroundPermissionsAsync()

    if(status !== 'granted'){
        console.error("Permissions required")
    }

    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
 }

 useEffect(()=>{

    console.log({location:location})
 },[location])
   

  return (
    <View>

    </View>
  )
}

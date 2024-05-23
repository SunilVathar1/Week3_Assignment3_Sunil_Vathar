import axios from "axios";

export interface Coordinates {
    latitude: number;
    longitude: number;
  }
  
 export interface WeatherDataInformations{
     city:string;
    country:string;
    temprature:number;
    wind:number;
    humidity:number;
    condition:string;
    time:string
    longitude:number;
    latitude:number;
  }


export interface WeatherData{
    id:number;
    city:string;
    country:string  
    Weather:WeatherDataInformations
    latitude:string,
    longitude:string
    
}

 async function getCoordinates(city:string,country:string):Promise<Coordinates|any>{
try {
    const apiKey="jyl8/qQ+yhuZbHJTVXPY9A==0LDjj5OwJpf0jl5Y"
    let response=await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`,{
        headers:{
            'X-Api-Key':apiKey
        }
    })

    let responsedata=response.data

    if (responsedata.length>0) {
        const {latitude,longitude}=responsedata[0]
        return {latitude,longitude}
    }else{
        console.log("could not found the coordinates for the city and country");  
    }
} catch (error) {
    console.log("error in getting the coordinates",error);
    throw error
}
}


const getWeatherData=async(city:string,country:string,coordinates:Coordinates)=> {
    const rapidApiKey="423dfd0733mshfbd9000ce064f12p186a23jsn6153aa02ae0c";

    try {
        const response=await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json?q=${coordinates.latitude},${coordinates.longitude}`,{
            headers:{
                'X-RapidAPI-Key':rapidApiKey,
                'X-RapidAPI-Host':'weatherapi-com.p.rapidapi.com'
            }
        })

       let weatherapiData=response.data.current;  


       return {
        city:city,
        country:country,
        weather:{
        temprature: weatherapiData.temp_c,
        wind:weatherapiData.wind_degree,
        humidity: weatherapiData.humidity,
        condition: weatherapiData.condition.text,
        },
        time:weatherapiData.last_updated,
        longitude: coordinates.latitude,
        latitude: coordinates.latitude,
      };

    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

export {getCoordinates,getWeatherData,}
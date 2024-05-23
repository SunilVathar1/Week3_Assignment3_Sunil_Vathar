import express, { response } from 'express';
import { getCoordinates, getWeatherData} from './Logics';
import { Request,Response } from 'express';
// import { WeatherData } from './WeatherModels';
import { createInsert, getAllCityWeatherDataFromDB, getCityWeatherDataFromDB, sendWeatherEmail } from './sevice';
import { WeatherData } from './WeatherModels';



const app = express();
app.use(express.json()); 

interface CityObject {
  city: string;
  country: string;
}

app.post('/api/SaveWeatherMapping', async (req: Request, res: Response) => {
  // console.log("hello Guys "+req.body);
  
  const cities: CityObject[] = req.body;

  try {
    const coordinateData = await Promise.all(
      cities.map(async (city) => {
        const coordinates = await getCoordinates(city.city, city.country);
        return { coordinates };
      })
    );

    try {
      const weatherDataInfo = await Promise.all(
          cities.map(async (city) => {
              const coOrdinates = await getCoordinates(city.city, city.country);
                  const weatherData = await getWeatherData(city.city, city.country, coOrdinates);
                  return weatherData
          })
      );
      console.log(weatherDataInfo);

      try {
       const data= await createInsert(weatherDataInfo)
       if (data) {

        return res.json(data)
       }
      } catch (error) {
        throw error
      }
     
  } catch (error) {
      console.error('Error saving weather data:', error);
  }
  
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    res.status(500).json({ error: 'Failed to fetch coordinates' });
  }
});

app.get("/api/weatherDashboard/:city",async(req:Request,res:Response)=>{

  try {
    const city=req.params.city
    let cityDeatils=await getCityWeatherDataFromDB(city)
    // console.log(cityDeatils);
    res.json(cityDeatils)
  } catch (error) {
    throw error
  }

})


app.get("/getAllCitiesWeatherDetails",async(req:Request,res:Response)=>{
  try {
    let cityDeatils=await getAllCityWeatherDataFromDB()
    res.json(cityDeatils)
  } catch (error) {
    throw error
  }
})




app.get("/api/mailSender", async (req: Request, res: Response) => {
  try {
    const recipientEmail = req.body.email; 
    const getCityWeatherData=req.body.citydetails 
    const response = await sendWeatherEmail(recipientEmail,getCityWeatherData);
     if (response) {
      res.json({
        message:"mail sent sucessfully"
      })
     }
  } catch (error) {
    console.error('Error:', error);
  }
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
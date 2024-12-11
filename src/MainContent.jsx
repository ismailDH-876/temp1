import { useEffect, useState } from "react";
import Prayears from "./Prayears";
import SelectRegion from "./Selectregion";
import axios from "axios";
import moment from "moment";
import imagePray from './assets/unnamed.jpg'
import "moment/dist/locale/ar-dz";




export default function MainContent() {
  //Strat  Get API prayersTime
  const getTiming = async () => {
    const requectData = await axios.get(
      "https://api.aladhan.com/v1/timingsByCity?country=" +
        apiCity.countryISo +
        "&city=" +
        apiCity.Cityyy
    );
    setTiming(requectData.data.data.timings);
  };
  
  const [trans, setTrans] = useState(true);
  let icontans = trans ? "EN" : "AR";
  const [city, setCity] = useState("Damascus");

  
  
  useEffect(() => {
    getTiming();
  }, [city]);

  const [timing, setTiming] = useState({
    Fajr: "05:34",
    Sunrise: "06:58",
    Dhuhr: "12:18",
    Asr: "15:17",
    Maghrib: "17:43",
    Isha: "19:03",
  });
  // End Get  API prayersTime
  // select ctiy
  const onChange = (event) => {
    setCity(event.target.value);
  };

  const apiCity =
    (city == "دمشق" | "Damascus")
      ? { Cityyy: "Damascus", countryISo: "SY" }
      : (city == "دبي" | "Dubai")
      ? { Cityyy: "Dubai", countryISo: "UAE" }
      : (city == "القاهرة" | "Cairo")
      ? { Cityyy: "Cairo", countryISo: "EG" }
      : (city == "الرياض" | "Riyadh")
      ? { Cityyy: "Riyadh", countryISo: "SAU" }
      : "";
  // End select ctiy
  // Start time now  and remini
  const timeLocale = trans ? "en" : "ar";
  moment.locale(timeLocale);
  let x = moment().format("MMMM Do YYYY, h:mm a");
  let remaining = moment(moment(timing["Dhuhr"], "hh:mm")).diff();
  const momentNow = moment();
  let nextPrayer = null;

  if (
    momentNow.isAfter(moment(timing["Fajr"], "hh:mm")) &
    momentNow.isBefore(moment(timing["Dhuhr"], "hh:mm"))
  ) {
    nextPrayer = trans ? "Dhuhr" : "الظهر";
    remaining = moment(moment(timing["Dhuhr"], "hh:mm")).diff();
  } else if (
    momentNow.isAfter(moment(timing["Dhuhr"], "hh:mm")) &
    momentNow.isBefore(moment(timing["Asr"], "hh:mm"))
  ) {
    nextPrayer = trans ? "Asr" : "العصر";
    remaining = moment(moment(timing["Asr"], "hh:mm")).diff();
  } else if (
    momentNow.isAfter(moment(timing["Asr"], "hh:mm")) &
    momentNow.isBefore(moment(timing["Maghrib"], "hh:mm"))
  ) {
    nextPrayer = trans ? "Maghrib" : "المغرب";
    remaining = moment(moment(timing["Maghrib"], "hh:mm")).diff();
  } else if (
    momentNow.isAfter(moment(timing["Maghrib"], "hh:mm")) &
    momentNow.isBefore(moment(timing["Isha"], "hh:mm"))
  ) {
    nextPrayer = trans ? "Isha" : "العشاء";
    remaining = moment(moment(timing["Isha"], "hh:mm")).diff();
  } else {
    nextPrayer = trans ? "Fajr" : "الفجر";
    remaining = moment(moment(timing["Fajr"], "hh:mm")).diff();
  }

  let diffTime = moment.duration(remaining);
  let remainingTime =
    diffTime.hours() + ":" + diffTime.minutes() + ":" + diffTime.seconds();

  //   <   الفجر   >
  if ((nextPrayer === "الفجر") | "Fajr" && diffTime.hours() < 0) {
    remaining = moment().diff(moment(timing["Fajr"], "hh:mm"));
    remainingTime =
      24 +
      diffTime.hours() +
      ":" +
      (diffTime.minutes() + 60) +
      ":" +
      (diffTime.seconds() + 60);
  }

  const [sa, setSa] = useState();

  useEffect(() => {
    let interval = setInterval(() => {
      setSa(remainingTime);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
  //  End time now

  return (
    <div style={{ direction: trans ? "ltr" : "rtl" }}>
        <div className="trans" style={{ textAlign: trans ? "start" : "end" }}>
          <button onClick={() => setTrans(!trans)}>{icontans}</button>
        </div>
      <div className="header">
        <div>
          <h2>{x}</h2>
          <h1>
            {trans ? " timing :" : "التوقيت :"}  {city}
          </h1>
        </div>

        <div>
          <h2>
            {trans ? "The rest is until prayer " : " متبقي حتى صلاة" }
            <span style={{ color: "gold" }}> {nextPrayer}</span>
          </h2>
          <h1>{sa}</h1>
        </div>
      </div>
      <hr />
      <div className="prayears">
        <Prayears
          timing={timing.Fajr}
          pray={trans ? "Fajr" : "الفجر"}
          image={imagePray}
        />
        <Prayears
          timing={timing.Dhuhr}
          pray={trans ? "Dhuhr" : "الظهر"}
          image={imagePray}
        />
        <Prayears
          timing={timing.Asr}
          pray={trans ? "Asr" : "العصر"}
          image={imagePray}
        />
        <Prayears
          timing={timing.Maghrib}
          pray={trans ? "Maghrib" : "المغرب"}
          image={imagePray}
        />
        <Prayears
          timing={timing.Isha}
          pray={trans ? "Isha" : "العشاء"}
          image={imagePray}
        />
      </div>
      <SelectRegion value={city} onChange={onChange} trans={trans} />
    </div>
  );
}

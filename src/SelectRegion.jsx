

export default function SelectRegion({onChange , value ,trans}) {
  return (
    <div className="selectRegion">
      <h2>{trans?"Select city:":"اختر المدينة :"}</h2>
      <select name="" id="" value={value} onChange={onChange} >
        <option>{trans?"Damascus":"دمشق"}</option>
        <option>{trans?"Dubai":"دبي"}</option>
        <option>{trans?"Cairo":"القاهرة"}</option>
        <option>{trans?"Riyadh":"الرياض"}</option>
      </select>
    </div>
  )
}

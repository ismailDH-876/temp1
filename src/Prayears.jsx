export default function Prayears({timing , pray , image}) {
 
  return (
// test

          <div className="card" >
            <img src={image} alt="" />
            <div className="card-in">
              <h1>{pray}</h1>
              <h2>{timing}</h2>
            </div>
          </div>

  );
}

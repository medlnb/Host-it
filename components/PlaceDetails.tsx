import "@styles/PlaceDetails.css";

interface props {
  Bedrooms: number;
  Bathrooms: number;
  Guests: number;
  Beds: number;
  HandleChangeInputs: any;
}

function PlaceDetails({
  Bedrooms,
  Bathrooms,
  Guests,
  Beds,
  HandleChangeInputs,
}: props) {
  const handleIncrement = (
    item: "Bedrooms" | "Bathrooms" | "Beds" | "Guests"
  ) => {
    HandleChangeInputs((prevInputs: any) => ({
      ...prevInputs,
      [item]: prevInputs[item] + 1,
    }));
  };

  const handleDecrement = (
    item: "Bedrooms" | "Bathrooms" | "Beds" | "Guests"
  ) => {
    HandleChangeInputs((prevInputs: any) => ({
      ...prevInputs,
      [item]: Math.max(0, prevInputs[item] - 1),
    }));
  };

  return (
    <div className="placedetails--container" style={{ margin: "5rem auto" }}>
      <h1 className="createpost--title">Share some basics about your place</h1>
      <div className="details--container">
        <div className="detail">
          <p>Bedrooms</p>
          <div className="calc">
            <button
              className={`calc--button ${Bedrooms === 0 && "calc--disabled"}`}
              onClick={() => handleDecrement("Bedrooms")}
            >
              -
            </button>
            <p>{Bedrooms}</p>
            <button
              className="calc--button"
              onClick={() => handleIncrement("Bedrooms")}
            >
              +
            </button>
          </div>
        </div>
        {/* {---} */}
        <div className="detail">
          <p>Bathrooms</p>
          <div className="calc">
            <button
              className={`calc--button ${Bathrooms === 0 && "calc--disabled"}`}
              onClick={() => handleDecrement("Bathrooms")}
            >
              -
            </button>
            <p>{Bathrooms}</p>
            <button
              className="calc--button"
              onClick={() => handleIncrement("Bathrooms")}
            >
              +
            </button>
          </div>
        </div>
        {/* {---} */}
        <div className="detail">
          <p>Beds</p>
          <div className="calc">
            <button
              className={`calc--button ${Beds === 0 && "calc--disabled"}`}
              onClick={() => handleDecrement("Beds")}
            >
              -
            </button>
            <p>{Beds}</p>
            <button
              className="calc--button"
              onClick={() => handleIncrement("Beds")}
            >
              +
            </button>
          </div>
        </div>
        {/* {---} */}
        <div className="detail">
          <p>Guests</p>
          <div className="calc">
            <button
              className={`calc--button ${Guests === 0 && "calc--disabled"}`}
              onClick={() => handleDecrement("Guests")}
            >
              -
            </button>
            <p>{Guests}</p>
            <button
              className="calc--button"
              onClick={() => handleIncrement("Guests")}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;

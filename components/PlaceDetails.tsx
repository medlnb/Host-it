import "@styles/PlaceDetails.css";

interface props {
  basics: {
    Bedrooms: number;
    Bathrooms: number;
    Guests: number;
    Beds: number;
  };
  HandleChangeInputs: any;
}

function PlaceDetails({ basics, HandleChangeInputs }: props) {
  const detailtsTitles: ("Bedrooms" | "Bathrooms" | "Beds" | "Guests")[] = [
    "Bedrooms",
    "Bathrooms",
    "Beds",
    "Guests",
  ];

  const handleIncrement = (
    item: "Bedrooms" | "Bathrooms" | "Beds" | "Guests"
  ) => {
    HandleChangeInputs((prevInputs: any) => ({
      ...prevInputs,
      basics: { ...prevInputs["basics"], [item]: prevInputs.basics[item] + 1 },
    }));
  };

  const handleDecrement = (
    item: "Bedrooms" | "Bathrooms" | "Beds" | "Guests"
  ) => {
    HandleChangeInputs((prevInputs: any) => ({
      ...prevInputs,
      basics: {
        ...prevInputs["basics"],
        [item]: Math.max(0, prevInputs.basics[item] - 1),
      },
    }));
  };

  return (
    <div className="placedetails--container" style={{ margin: "5rem auto" }}>
      <h1 className="createpost--title">Share some basics about your place</h1>
      <div className="details--container">
        {detailtsTitles.map((item) => (
          <div className="detail" key={item}>
            <p>{item}</p>
            <div className="calc">
              <button
                className={`calc--button ${
                  basics[item] === 0 && "calc--disabled"
                }`}
                onClick={() => handleDecrement(item)}
              >
                -
              </button>
              <p>{basics[item]}</p>
              <button
                className="calc--button"
                onClick={() => handleIncrement(item)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaceDetails;

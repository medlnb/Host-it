import "@styles/PlaceInfo.css";

interface props {
  info: {
    title: string;
    description: string;
  };
  HandleChangeInputs: any;
}

function PlaceInfo({ info, HandleChangeInputs }: props) {
  return (
    <div style={{ margin: "5rem 0", width: "100%" }}>
      <h1 className="createpost--title">
        Now, let{"'"}s give your dome a title Short titles work best.
      </h1>
      <div className="placeinfo--container">
        <input
          className={`placeinfo--title ${
            info.title.length > 0 ? "active--input" : ""
          }`}
          placeholder="Title..."
          value={info.title}
          onChange={(e) =>
            HandleChangeInputs((prev: any) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
      </div>

      <h1 className="createpost--title">Create your description</h1>
      <h2 className="createpost--subtitle">
        Share what makes your place special.
      </h2>
      <div className="placeinfo--container">
        <textarea
          className={`placeinfo--description ${
            info.description.length > 0 ? "active--input" : ""
          }`}
          placeholder="Description..."
          value={info.description}
          onChange={(e) =>
            HandleChangeInputs((prev: any) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>

      <br></br>
    </div>
  );
}

export default PlaceInfo;

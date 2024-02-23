import "@styles/Prices.css";

interface props {
  price: {
    perday: number;
    permonth: number;
  };
  HandleChangeInputs: any;
}

function Prices({ price, HandleChangeInputs }: props) {
  return (
    <div className="pricing--container">
      <h1 className="createpost--title">Prices</h1>
      <div className="prices--container">
        <div className="price--inputs--container">
          <input
            placeholder="00.00"
            value={price.perday}
            onChange={(e: any) => {
              if (/^[0-9\s]*$/.test(e.target.value)) {
                HandleChangeInputs((prev: any) => ({
                  ...prev,
                  price: {
                    perday: e.target.value,
                    permonth: Number(e.target.value.replace(/\s/g, "")) * 30,
                  },
                }));
              }
            }}
          />
          <p>DZD/per day</p>
        </div>
        <div className="price--inputs--container">
          <input
            placeholder="00.00"
            value={price.permonth}
            onChange={(e) => {
              if (/^[0-9\s]*$/.test(e.target.value))
                HandleChangeInputs((prev: any) => ({
                  ...prev,
                  price: { ...prev["price"], permonth: e.target.value },
                }));
            }}
          />
          <p>DZD/per month</p>
        </div>
      </div>
    </div>
  );
}

export default Prices;

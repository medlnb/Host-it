import "@styles/Prices.css";
import CurrencyInput from "react-currency-input-field";

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
          <CurrencyInput
            value={price.perday}
            allowDecimals={false}
            onValueChange={(value) =>
              HandleChangeInputs((prev: any) => ({
                ...prev,
                price: { perday: value, permonth: Number(value) * 30 },
              }))
            }
          />
          <p>DZD/per day</p>
        </div>
        <div className="price--inputs--container">
          <CurrencyInput
            value={price.permonth}
            allowDecimals={false}
            onValueChange={(value) =>
              HandleChangeInputs((prev: any) => ({
                ...prev,
                price: { ...prev["price"], permonth: value },
              }))
            }
          />
          <p>DZD/per month</p>
        </div>
      </div>
    </div>
  );
}

export default Prices;

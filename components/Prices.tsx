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
    <div className="w-full my-5">
      <h1 className="text-center font-medium text-2xl my-10">Prices</h1>
      <div className="mt-4 flex items-center md:flex-row flex-col gap-3 md:justify-between">
        <div className="flex items-center w-full  md:w-60 md:w-max-1/2 p-2 rounded-md border border-black">
          <CurrencyInput
            value={price.perday}
            className="w-full border-none focus:outline-none"
            allowDecimals={false}
            onValueChange={(value) =>
              HandleChangeInputs((prev: any) => ({
                ...prev,
                price: { perday: value, permonth: Number(value) * 30 },
              }))
            }
          />
          <p className="whitespace-nowrap">DZD/per day</p>
        </div>
        <div className="flex items-center w-full  md:w-60 md:w-max-1/2 p-2 rounded-md border border-black">
          <CurrencyInput
            value={price.permonth}
            allowDecimals={false}
            className="w-full border-none focus:outline-none"
            onValueChange={(value) =>
              HandleChangeInputs((prev: any) => ({
                ...prev,
                price: { ...prev["price"], permonth: value },
              }))
            }
          />
          <p className="whitespace-nowrap">DZD/per month</p>
        </div>
      </div>
    </div>
  );
}

export default Prices;

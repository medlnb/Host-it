import CurrencyInput from "react-currency-input-field";

function Price({
  value,
  onChange,
}: {
  value: { perday: number; permonth: number };
  onChange: (value: number, key: "perday" | "permonth") => void;
}) {
  return (
    <div className="my-5">
      <h1 className="text-center font-medium text-2xl my-10">Prices</h1>
      <div className="mt-4 flex items-center md:flex-row flex-col gap-3 md:justify-between">
        <div className="flex items-center w-full  md:w-60 md:w-max-1/2 p-2 rounded-md border border-black">
          <CurrencyInput
            value={value.perday}
            className="w-full border-none focus:outline-none"
            allowDecimals={false}
            onValueChange={(value) => {
              onChange(Number(value), "perday");
            }}
          />
          <p className="whitespace-nowrap">DZD/per day</p>
        </div>
        <div className="flex items-center w-full  md:w-60 md:w-max-1/2 p-2 rounded-md border border-black">
          <CurrencyInput
            value={value.permonth}
            allowDecimals={false}
            className="w-full border-none focus:outline-none"
            onValueChange={(value) => onChange(Number(value), "permonth")}
          />
          <p className="whitespace-nowrap">DZD/per month</p>
        </div>
      </div>
    </div>
  );
}

export default Price;

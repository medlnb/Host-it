import Slider from "@mui/material/Slider";
function PriceFilter({
  HighPrice,
  LowPrice,
  onChange,
}: {
  HighPrice: number;
  LowPrice: number;
  onChange: (HighPrice: number, LowPrice: number) => void;
}) {
  const handleChange = (event: Event, newValue: any) => {
    onChange(newValue[1], newValue[0]);
  };

  function valuetext(value: number) {
    return `${value}DZ`;
  }

  return (
    <div>
      <h1 className="text-center text-2xl font-medium my-3">
        Pick the Price Range
      </h1>
      <div className="border border-gray-400 mb-8 py-8 px-4 relative rounded-md">
        <p>price per night</p>
        <Slider
          className="mt-12"
          getAriaLabel={() => "Temperature range"}
          value={[HighPrice, LowPrice]}
          onChange={handleChange}
          getAriaValueText={valuetext}
          valueLabelDisplay="on"
          step={500}
          marks
          min={100}
          max={10000}
        />
      </div>
    </div>
  );
}

export default PriceFilter;

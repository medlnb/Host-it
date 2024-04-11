import Slider from "@mui/material/Slider";
function PriceFilter({
  HighPrice,
  LowPrice,
  setQuerries,
}: {
  HighPrice: number;
  LowPrice: number;
  setQuerries: React.Dispatch<
    React.SetStateAction<{
      LowPrice: number;
      HighPrice: number;
      amenties: any;
      wilaya: any;
      baladia: any;
      bedrooms: any;
      bathrooms: any;
      beds: any;
    }>
  >;
}) {
  const handleChange = (event: Event, newValue: any) => {
    setQuerries((prev) => ({
      ...prev,
      HighPrice: newValue[1],
      LowPrice: newValue[0],
    }));
  };

  function valuetext(value: number) {
    return `${value}DZ`;
  }
  return (
    <div className="border border-gray-400 my-8 py-8 px-4 relative rounded-md">
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
  );
}

export default PriceFilter;

"use client";
import AlgerianCities from "@public/AlgerianCities.json";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import PriceFilter from "./PriceFilter";
import LocationFilter from "./LocationFilter";
import AmentiesFilter from "./AmentiesFilter";
import InfoFilter from "./InfoFilter";
import { useRouter, useSearchParams } from "next/navigation";

const Navs = ["Price", "Location", "Amenties", "Guests"];

function SearchBar() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const {
    wilaya,
    baladia,
    bedrooms,
    bathrooms,
    beds,
    amenties,
    HighPrice,
    LowPrice,
  } = {
    wilaya: params.get("wilaya") ?? "0",
    baladia: params.get("baladia") ?? "0",
    bedrooms: params.get("bedrooms") ?? "0",
    bathrooms: params.get("bathrooms") ?? "0",
    beds: params.get("beds") ?? "0",
    amenties: params.get("amenties") ? params.get("amenties")!.split(",") : [],
    HighPrice: Number(params.get("HighPrice") ?? 10000),
    LowPrice: Number(params.get("LowPrice") ?? 100),
  };
  const { replace } = useRouter();
  const [Step, setStep] = useState<string>();
  const [querries, setQuerries] = useState({
    LowPrice,
    HighPrice,
    amenties,
    wilaya,
    baladia,
    bedrooms,
    bathrooms,
    beds,
  });

  const HandleFilterChange = () => {
    params.delete("p");

    if (querries.baladia != "0") params.set("baladia", querries.baladia);
    else params.delete("baladia");

    if (querries.amenties.length !== 0)
      params.set("amenties", querries.amenties.join(","));
    else params.delete("amenties");

    if (querries.wilaya != "0") params.set("wilaya", querries.wilaya);
    else params.delete("wilaya");

    if (querries.beds != "0") params.set("beds", querries.beds);
    else params.delete("beds");

    if (querries.bedrooms != "0") params.set("bedrooms", querries.bedrooms);
    else params.delete("bedrooms");

    if (querries.bathrooms != "0") params.set("bathrooms", querries.bathrooms);
    else params.delete("bathrooms");

    if (querries.HighPrice != 10000)
      params.set("HighPrice", querries.HighPrice.toString());
    else params.delete("HighPrice");

    if (querries.LowPrice != 100)
      params.set("LowPrice", querries.LowPrice.toString());
    else params.delete("LowPrice");

    replace(`/?${params.toString()}`);

    setStep(undefined);
  };

  const HandleReset = () => {
    setQuerries({
      LowPrice: 100,
      HighPrice: 10000,
      amenties: [],
      wilaya: "0",
      baladia: "0",
      bedrooms: "0",
      bathrooms: "0",
      beds: "0",
    });
    replace(`/`);
    setStep(undefined);
  };

  const HandleClose = () => {
    setStep(undefined);
    setQuerries({
      LowPrice,
      HighPrice,
      amenties,
      wilaya,
      baladia,
      bedrooms,
      bathrooms,
      beds,
    });
  };

  return (
    <div
      onClick={() => {
        if (!Step) setStep(Navs[0]);
      }}
      className={`m-2 md:m-0 border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer ${
        params.size !== 0 ? "border-black" : ""
      }`}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm px-6">
          {wilaya !== "0" ? AlgerianCities[Number(wilaya)][0].name : "Anywhere"}
        </div>

        <div className="hidden sm:block text-losm px-6 border-x-[1px] flex-1 text-center">
          {LowPrice !== 100 && HighPrice !== 10000
            ? `${LowPrice} - ${HighPrice} DZD`
            : LowPrice !== 100
            ? `> ${LowPrice} DZD`
            : HighPrice !== 10000
            ? `< ${HighPrice} DZD`
            : null}
        </div>

        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>

      <Dialog
        open={!!Step}
        onClose={HandleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          <nav className="flex justify-around mb-2 text-sm md:text-base">
            {Navs.map((element) => (
              <div
                onClick={() => setStep(element)}
                key={element}
                className={`p-2 flex-1 text-center font-medium hover:bg-gray-100 hover:cursor-pointer ${
                  Step === element && "border-b border-black"
                }`}
              >
                <div className="flex items-center justify-between">
                  {element}
                  {{
                    Price: LowPrice !== 100 || HighPrice !== 10000,
                    Location: wilaya !== "0",
                    amenties: amenties.length !== 0,
                    Guests:
                      bedrooms !== "0" || bathrooms !== "0" || beds !== "0",
                  }[
                    element as "Price" | "Location" | "amenties" | "Guests"
                  ] && <p>•</p>}
                </div>
              </div>
            ))}
          </nav>
        </DialogTitle>
        <DialogContent>
          {Step === "Price" && (
            <PriceFilter
              HighPrice={querries.HighPrice}
              LowPrice={querries.LowPrice}
              onChange={(HighPrice: number, LowPrice: number) => {
                setQuerries({ ...querries, HighPrice, LowPrice });
              }}
            />
          )}
          {Step === "Location" && (
            <LocationFilter
              wilaya={querries.wilaya}
              baladia={querries.baladia}
              onChange={(wilaya, baladia) => {
                setQuerries({
                  ...querries,
                  wilaya: wilaya,
                  baladia,
                });
              }}
            />
          )}
          {Step === "Amenties" && (
            <AmentiesFilter
              amenties={querries.amenties}
              onChange={(item) =>
                setQuerries({
                  ...querries,
                  amenties: querries.amenties.includes(item)
                    ? querries.amenties.filter((x) => x !== item)
                    : [...querries.amenties, item],
                })
              }
            />
          )}
          {Step === "Guests" && (
            <InfoFilter
              beds={querries.beds}
              bedrooms={querries.bedrooms}
              bathrooms={querries.bathrooms}
              onChange={({
                beds,
                bedrooms,
                bathrooms,
              }: {
                beds?: string;
                bedrooms?: string;
                bathrooms?: string;
              }) => {
                setQuerries((prev) => ({
                  ...prev,
                  beds: beds ?? prev.beds,
                  bedrooms: bedrooms ?? prev.bedrooms,
                  bathrooms: bathrooms ?? prev.bathrooms,
                }));
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleReset}>Reset</Button>
          <Button onClick={HandleFilterChange} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SearchBar;

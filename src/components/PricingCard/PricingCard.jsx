// import styles from "./PricingCard.module.css";
import PropTypes from "prop-types";
import { Button } from "../Button/Button";

export const PricingCard = ({
  label,
  priceLabel,
  image,
  imageAlt,
  benefits,
}) => {
  const themeClasses = {
    "Start-Up": "text-sky-900",
    Pro: "text-rose-500",
    Enterprise: "text-sky-500",
  };

  const themeClass = themeClasses[label];

  return (
    <div
      className={`flex flex-col items-center bg-white p-6  shadow-lg ${themeClass}`}
    >
      <h2 className=" mb-10 text-xl font-bold">{label}</h2>
      <img
        src={image}
        alt={imageAlt}
        className="mb-10 h-24 w-24 object-cover"
      />
      <p className="text-lg font-semibold">{priceLabel}</p>
      <hr className="my-4 w-full border-stone-300" />
      <h4 className="mb-4 text-xs font-semibold uppercase tracking-wide">
        Enjoy All These Features
      </h4>
      <ul className="mb-8 w-4/5 space-y-3 whitespace-nowrap text-left text-[11px] font-semibold tracking-tight text-black lg:w-3/5 xl:w-1/2">
        {benefits.map((benefit) => {
          return (
            <li className="flex w-full items-center gap-x-2" key={benefit}>
              <div className="flex h-4 w-4 place-content-center place-items-center rounded-full bg-sky-900/50">
                <img src="/icons/check.png" alt="check" className="h-3 w-3" />
              </div>
              <p className="grow">{benefit}</p>
            </li>
          );
        })}
      </ul>
      <Button
        type={"button"}
        className={`w-full rounded border-2 border-sky-950 bg-sky-900 text-white`}
      >
        choose
      </Button>
    </div>
  );
};

PricingCard.propTypes = {
  label: PropTypes.string,
  priceLabel: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  benefits: PropTypes.array,
};

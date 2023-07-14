import { useState } from "react";
import { ISelectProps } from "./props";
import "./style.css";

export const Select: React.FC<ISelectProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const [isListShown, setIsListShown] = useState<boolean>(false);
  return (
    <div className="select">
      <button
        className={`select__trigger${isListShown ? " open" : ""}`}
        onClick={() => {
          setIsListShown((shown) => !shown);
        }}
      >
        {selectedOption?.text || "Select Anime"}
      </button>
      {isListShown ? (
        <ul className="select__list">
          {options.map((option) => (
            <li
              key={option.id}
              className={`select__list-option${
                option.value === selectedOption?.value ? " selected" : ""
              }`}
              id={`option-${option.id}`}
              onClick={() => {
                onSelect(option);
                setIsListShown(false);
              }}
            >
              {option.text}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

Select.displayName = "Select";

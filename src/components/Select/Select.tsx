import { useEffect, useRef, useState } from "react";
import { ISelectProps } from "./props";
import { useOutsideClick } from "./hooks";
import "./style.css";

export const Select: React.FC<ISelectProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const [isListShown, setIsListShown] = useState<boolean>(false);
  const listItemRefs = useRef<HTMLLIElement[]>([]);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  useOutsideClick(divRef, () => setIsListShown(false));

  useEffect(() => {
    if (isListShown) {
      listItemRefs.current[0]?.classList.add("focused");
      listRef.current?.focus();
      listRef.current?.setAttribute(
        "aria-activedescendant",
        listItemRefs.current[0]?.id
      );
    }
  }, [isListShown]);

  const closePopup = () => {
    setIsListShown(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e: any) => {
    if (listItemRefs.current.length === 0) return;
    if (!isListShown) return;

    const length = listItemRefs.current.length;
    const currItemIndex = listItemRefs.current.findIndex((listItem) =>
      listItem.classList.contains("focused")
    );
    if (e.key === "ArrowDown") {
      const nextIndex = currItemIndex === length - 1 ? 0 : currItemIndex + 1;
      listItemRefs.current[currItemIndex].classList.remove("focused");
      listItemRefs.current[nextIndex].classList.add("focused");
      listRef.current?.setAttribute(
        "aria-activedescendant",
        listItemRefs.current[nextIndex].id
      );
    } else if (e.key === "ArrowUp") {
      const prevIndex = currItemIndex === 0 ? length - 1 : currItemIndex - 1;
      listItemRefs.current[currItemIndex].classList.remove("focused");
      listItemRefs.current[prevIndex].classList.add("focused");
      listRef.current?.setAttribute(
        "aria-activedescendant",
        listItemRefs.current[prevIndex].id
      );
    } else if (e.key === "Escape" || e.key === "Tab") {
      closePopup();
    } else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      onSelect({
        id: listItemRefs.current[currItemIndex].dataset.id as string,
        text: listItemRefs.current[currItemIndex].dataset.text as string,
        value: listItemRefs.current[currItemIndex].dataset.value as string,
      });
      closePopup();
    }
  };

  return (
    <div className="select">
      <span
        id="select-label"
        style={{ display: "inline-block", marginBottom: 8 }}
      >
        Select your favourite Anime
      </span>
      <div ref={divRef}>
        <button
          aria-haspopup="listbox"
          aria-expanded={isListShown ? "true" : "false"}
          aria-labelledby="select-label"
          className={`select__trigger${isListShown ? " open" : ""}`}
          onClick={() => {
            setIsListShown((shown) => !shown);
          }}
          ref={buttonRef}
        >
          {selectedOption?.text || "Select Anime"}
        </button>
        {isListShown ? (
          <ul
            role="listbox"
            tabIndex={-1}
            className="select__list"
            ref={listRef}
            onKeyDown={handleKeyDown}
          >
            {options.map(({ id, text, value, render }, index) => (
              <li
                role="option"
                aria-selected={
                  value === selectedOption?.value ? "true" : "false"
                }
                key={id}
                className={`select__list-option${
                  value === selectedOption?.value ? " selected" : ""
                }`}
                id={`option-${id}`}
                data-id={id}
                data-text={text}
                data-value={value}
                onClick={() => {
                  onSelect({ id, text, value });
                  setIsListShown(false);
                }}
                ref={(el) => {
                  if (el) listItemRefs.current[index] = el;
                }}
              >
                {typeof render === "function"
                  ? render(
                      { id, text, value },
                      { emoji: index === 2 ? "😎" : "😂" }
                    )
                  : text}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

Select.displayName = "Select";

type OptionData = {
  id: string;
  text: string;
  value: string;
};

export type Option = OptionData & {
  render?: (
    optionData: OptionData,
    restProps?: Record<string, any>
  ) => JSX.Element;
};

export interface ISelectProps {
  options: Option[];
  selectedOption: Option | null;
  onSelect: (option: Option) => void;
}

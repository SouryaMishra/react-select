export type Option = {
  id: string;
  text: string;
  value: string;
};

export interface ISelectProps {
  options: Option[];
  selectedOption: Option | null;
  onSelect: (option: Option) => void;
}

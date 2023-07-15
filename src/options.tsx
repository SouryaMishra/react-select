import type { Option } from "./components/Select";

export const options: Option[] = [
  {
    id: "1",
    text: "Demon Slayer: Kimetsu No Yaiba",
    value: "nezuko",
  },
  {
    id: "2",
    text: "Assassination Classroom",
    value: "koroSensei",
  },
  {
    id: "3",
    text: "Mob Psycho 100",
    value: "mob",
    render: ({ text, value }, restProps) => (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          {text} {restProps?.emoji}
        </span>
        <span>{value}</span>
      </div>
    ),
  },
  {
    id: "4",
    text: "Code Geass",
    value: "lelouch",
    render: ({ text, value }, restProps) => (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>
          {text} {restProps?.emoji}
        </span>
        <span>{value}</span>
      </div>
    ),
  },
  {
    id: "5",
    text: "Attack on Titan",
    value: "zeke",
  },
];

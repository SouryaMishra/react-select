import { useState } from "react";
import { Select } from "./components/Select";
import type { Option } from "./components/Select";
import { options } from "./options";

const App = () => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  return (
    <Select
      options={options}
      selectedOption={selectedOption}
      onSelect={setSelectedOption}
    />
  );
};

export default App;

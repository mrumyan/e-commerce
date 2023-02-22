import { Input } from "@components/Input/Input";

import "./Filter.css";

const Filter = () => {
  return (
    <div>
      <Input
        value=""
        onChange={(value: string) => {}}
        placeholder="Search property"
      />
    </div>
  );
};

export default Filter;

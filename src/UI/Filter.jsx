import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";

function Filter({ placeholder, label, items, paramsLabel }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSelect(val) {
    searchParams.set(paramsLabel, val);
    setSearchParams(searchParams);
  }

  return (
    <Select onValueChange={(value) => handleSelect(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {items?.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Filter;

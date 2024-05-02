import Button from "./Button";
import { BtnLabel, Sizes } from "../../constants";
import type { SetStateAction } from "react";

const btnList = [
  { id: "sm", label: BtnLabel.SM, val: Sizes.SM },
  { id: "md", label: BtnLabel.MD, val: Sizes.MD },
  { id: "lg", label: BtnLabel.LG, val: Sizes.LG },
];

interface Props {
  handler: (
    size: SetStateAction<{
      width: number;
      height: number;
    }>
  ) => void;
}

const Buttons = ({ handler }: Props) => {
  return (
    <div className="flex gap-4"> 
      {btnList.map((item) => (
        <Button
          key={item.id}
          label={item.label}
          handler={() => handler(item.val)}
        />
      ))}
    </div>
  );
};

export default Buttons;

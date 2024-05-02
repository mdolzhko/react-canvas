import { Line } from "../../types";

interface Props {
  list: Line[];
}

function convert(params: number[]): string {
  return params.map((item) => Math.trunc(item)).join(", ");
}

const LineList = ({ list }: Props) => {
  return (
    <ul className="bg-gray-400 px-4 py-4 my-4 rounded-md">
      {list.map((item, index) => {
        const { start, end } = item;
        const print = `Line ${index + 1} - [${convert([
          start.x,
          start.y,
          end.x,
          end.y,
        ])}]`;
        
        return (
          <li key={index} className="py-1">
            {print}
          </li>
        );
      })}
    </ul>
  );
};

export default LineList;

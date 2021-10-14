import { Rate } from "antd";

interface PinPorps extends React.ComponentProps<typeof Rate> {
  checkd: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Pin = (props: PinPorps) => {
  const { checkd, onCheckedChange, ...restPorps } = props;
  return (
    <Rate
      count={1}
      value={checkd ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restPorps}
    />
  );
};

import { Select } from "antd";
import { Raw } from "types";

// React 自带 utility type: React.ComponentProps<type> 获取指定组件的所有 props 属性
type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value?: Raw | null | undefined;
  onChange?: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}

/**
 * IdSelector
 * 由于使用 select 标签后，返回的结果 value 均为 string 类型，而后端提供的 id 一般为 number 类型，因此封装此组件进行转换
 * @param props
 * value 可以传入多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当 isNaN(Number(value)) 为 true 时，代表选择默认类型
 * 当选择默认类型的时候，onChange 会回调 undefined
 * @returns
 */
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;

  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

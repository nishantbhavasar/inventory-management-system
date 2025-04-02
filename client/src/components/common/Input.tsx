import cn from 'classnames';
import { ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

interface InputProps extends  Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled"> {
    label?:string,
    labelClassName?:string,
    labelIcon?:ReactNode,
    labelIconClassName?:string,
    value?:string,
    defaultValue?:string,
    isLoading?:boolean,
    border?:boolean,
    childClassName?:string,
    error?:string|undefined|any,
    register?:any,
    firstIcon?:ReactNode,
    fisrtIconClassName?:string,
    inputClassName?:string,
    lastIcon?:ReactNode,
    lastIconClassName?:string,
    className?:string,
    parentClassName?:string,
    required?:boolean,
    isClearable?:boolean,
    setInputValue?:Function,
    disable?:boolean;
  }

const Input = ({
  label,
  labelClassName,
  labelIcon,
  labelIconClassName,
  value,
  defaultValue,
  type = 'text',
  onChange,
  onInput,
  onKeyDown,
  disable,
  isLoading,
  border = true,
  childClassName,
  placeholder,
  name,
  error,
  register,
  firstIcon,
  fisrtIconClassName,
  inputClassName,
  lastIcon,
  lastIconClassName,
  className,
  parentClassName,
  required = true,
  isClearable = false,
  setInputValue = () => {},
  ...rest
}:InputProps) => {
  const parentClass = cn('w-full flex flex-col gap-1 p-1 relative', parentClassName);
  const labelClass = cn('font-bold font-Roboto flex items-center', labelClassName);
  const labelIconClass = cn('', labelIconClassName);
  const inputClass = cn(
    'w-full font-Roboto font-semibold p-2 rounded-lg h-full outline-none border-none',
    inputClassName
  );
  const childClass = cn(
    'outline-none border-black rounded-lg relative',
    { ['border-[1px]']: border },
    childClassName
  );
  const childDisableClass = cn(
    'absolute inset-0 bg-black/10 cursor-not-allowed',
    childClassName,
    'border-none w-full'
  );
  const fisrtIconClass = cn('', fisrtIconClassName);
  const lastIconClass = cn('', lastIconClassName);

  return (
    <div className={parentClass}>
      {label && (
        <label className={labelClass} htmlFor={`input-${name ?? label}`}>
          {label}:{required && <span className="text-red-500 font-bold">*</span>}
          {lastIcon && <div className={labelIconClass}>{labelIcon}</div>}
        </label>
      )}
      <div className={childClass}>
        {disable && <div className={childDisableClass}></div>}
        {firstIcon && <div className={fisrtIconClass}>{firstIcon}</div>}
        <input
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          type={type}
          // required={required}
          id={`input-${name ?? label}`}
          autoComplete="off"
          className={inputClass}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onInput={onInput}
          name={name}
          disabled={disable}
          {...register}
          {...rest}
        />
        {isClearable && value ? (
          <div onClick={() => setInputValue && setInputValue('')} className={lastIconClass}>
            <IoClose />
          </div>
        ) : lastIcon ? (
          <div className={lastIconClass}>{lastIcon}</div>
        ) : null}
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default Input;

import ReactSelect from 'react-select';
import cn from 'classnames';

const Select = ({
  options,
  defaultValue,
  value,
  isSearchable = false,
  isDisabled = false,
  name,
  isClearable = false,
  isMulti = false,
  onChange = () => {},
  register = {},
  className = '',
  parentClassName = '',
  label,
  labelClassName = '',
  placeholder = 'Select',
  noOptionsMessage = 'No Options',
  error,
  required = true,
  menuHeight,
}:any) => {
  const classname = cn(`w-full`, className);
  const parentClass = cn('flex flex-col gap-1', parentClassName);
  const labelClass = cn('font-bold font-Roboto', labelClassName);
  const customStyles = {
    indicatorSeparator: () => ({ display: 'none' }),
    control: (baseStyles:any) => ({
      ...baseStyles,
      border: '1px solid black',
      borderRadius: '8px',
    }),
    menu: (baseStyles:any) => ({
      ...baseStyles,
      marginBottom: '-4px',
      padding: '10px',
      backgroundColor: '#ffffff',
      borderRadius: '4px',
      border: '1px solid rgba(52, 45, 59, 0.3)',
      boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.07)',
      wordBreak: 'break-all',
      zIndex: 999,
    }),
  };

  return (
    <div className={parentClass}>
      {label && (
        <label className={labelClass} htmlFor={`react-select-${name}`}>
          {label}:{required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}
      <ReactSelect
        {...register}
        styles={customStyles}
        id={`react-select-${name}`}
        className={classname}
        classNamePrefix="select"
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        options={options}
        isMulti={isMulti}
        onChange={onChange}
        menuPlacement="auto"
        maxMenuHeight={menuHeight}
        hideSelectedOptions={true}
        noOptionsMessage={() => noOptionsMessage}
        closeMenuOnSelect={true}
      />
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default Select;

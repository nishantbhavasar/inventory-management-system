import cx from "classnames";
import { ReactNode } from "react";
import { Link } from "react-router";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLink?: boolean;
  href?: string;
  className?: string;
  title?: string;
  icon?: ReactNode;
  iconFirst?: boolean;
  variant?: string;
  size?: string;
  borderSize?: string;
  onClick?: any | Function;
  active?: boolean;
  isSquare?: boolean;
  titleClassName?: string;
  type?: any;
  disabled?: boolean;
  isLoading?: boolean;
  rounded?: boolean;
  text?: string;
  hoverText?: string;
  bg?: string;
  hoverBg?: string;
  hoverBorder?: string;
}

const Button = ({
  isLink = false,
  href,
  className = "",
  title,
  icon,
  iconFirst = false,
  variant,
  size = "md",
  borderSize = "sm",
  onClick = () => {},
  active = false,
  isSquare = false,
  titleClassName,
  type,
  disabled,
  isLoading = false,
  rounded = false,
  text = "white",
  hoverText = "white",
  bg,
  hoverBg = "dark",
  hoverBorder = "dark",
  ...rest
}: ButtonProps) => {
  const classes = cx(
    `group font-Roboto font-bold outline-none flex items-center  justify-center  transit leading-none transition-all cursor-pointer ${
      size === "xs" ? "text-xs gap-1" : "text-sm gap-1.5"
    }`,
    { [`pointer-events-none select-none`]: active || isLoading },
    { [`rounded-full`]: rounded },
    { [`rounded`]: !rounded },
    { [`aspect-square`]: isSquare },
    { [`h-6 px-1.5`]: size === "xs" },
    { [`h-9 px-3`]: size === "sm" },
    { [`h-10`]: size === "md" },
    { [`h-11 px-5`]: size === "lg" },
    { [`border-[1px]`]: borderSize === "xs" },
    { [`border-2`]: borderSize === "sm" },
    { [`border-[3px]`]: borderSize === "md" },
    { [`border-[4px]`]: borderSize === "lg" },
    {
      [`${bg} hover:${hoverBg} ${text} hover:${hoverText} `]:
        variant === "filled",
    },
    {
      [` ${
        borderSize === "md" ? "border-2" : "border"
      } hover:${hoverBorder} ${bg} hover:${hoverBg} ${text} hover:${hoverText} `]:
        variant === "outline",
    },
    className
  );

  return (
    <>
      {isLink && href ? (
        <Link to={disabled ? "#" : href} onClick={onClick} className={classes}>
          {isLoading ? (
            <span className="relative h-4 w-4 border-[2px] border-current border-b-transparent rounded-full block animate-spin-fast" />
          ) : iconFirst && icon ? (
            <span className="text-lg">{icon}</span>
          ) : null}
          {title && <span className={titleClassName}>{title}</span>}
          {!iconFirst && icon ? <span className="text-lg">{icon}</span> : null}
        </Link>
      ) : (
        <button
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }
            onClick(e);
          }}
          type={type}
          className={classes}
          {...rest}
        >
          {isLoading ? (
            <span className="relative h-4 w-4 border-[2px] border-current border-b-transparent rounded-full block animate-spin" />
          ) : iconFirst && icon ? (
            <span className="text-lg">{icon}</span>
          ) : null}
          {title && <span className={titleClassName}>{title}</span>}
          {!iconFirst && icon ? <span className="text-lg">{icon}</span> : null}
        </button>
      )}
    </>
  );
};

export default Button;

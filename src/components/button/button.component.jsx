import styles from './button.module.css';
import clsx from 'clsx';

const Button = ({
  btnType = 'button',
  size = 'normal',
  type = 'primary',
  text = '',
  className = '',
  full = false,
  icon: Icon,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  margin = false,
  onClick = () => {},
  disabled = false,
  ...otherProps
}) => {
  return (
    <button
      onClick={onClick}
      type={btnType}
      disabled={disabled}
      {...otherProps}
      className={clsx(
        styles.btnContainer,
        {
          [styles.btnPrimary]: type === 'primary',
          [styles.btnOutline]: type === 'outline',
          [styles.btnLink]: type === 'link',
          [styles.btnNormal]: size === 'normal' && text,
          [styles.btnSmall]: size === 'small' && text,
          [styles.btnLarge]: size === 'large' && text,
          [styles.btnFull]: full,
          [styles.btnIcon]: Icon,
          [styles.btnMargin]: margin,
        },
        className
      )}
    >
      {LeftIcon && <LeftIcon className="h-5 w-5 mr-2 -ml-1" />}
      <p className="truncate">{text}</p>
      {Icon && <Icon className="w-5 h-5" />}
      {RightIcon && <RightIcon className="w-5 h-5 ml-2 -mr-1" />}
    </button>
  );
};

export default Button;

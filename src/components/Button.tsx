type Props = {
  variant?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'outline';
  size?: 'default' | 'icon';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  name?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  variant = 'default',
  size = undefined,
  children,
  onClick,
  className = undefined,
  name,
  type,
}: Props) {
  const variants = {
    default: 'actionDefault',
    primary: 'actionPrimary',
    success: 'actionSuccess',
    danger: 'actionDanger',
    warning: 'actionWarning',
    outline: 'actionOutline',
  };

  const sizes = {
    default: 'px-4',
    icon: 'p-2 w-10 h-10',
  };

  return (
    <button
      onClick={onClick}
      type={type ? type : 'button'}
      name={size === 'icon' ? name : (children as string)}
      title={size === 'icon' ? name : (children as string)}
      className={`${className} ${variants[variant]} ${
        size ? sizes[size] : 'px-4 w-full'
      } h-10 flex flex-row justify-center flex-nowrap items-center text-nowrap gap-2 rounded-sm font-semibold hover:shadow-md select-none`}>
      {children}
    </button>
  );
}

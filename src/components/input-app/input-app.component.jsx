import clsx from 'clsx';

const InputApp = ({
  placeholder = '',
  label = '',
  error,
  register,
  name,
  disabled = false,
  type = 'text',
  className,
}) => (
  <div className="flex flex-col w-full">
    <label className="mb-2 truncate">{label}</label>
    <input
      type={type}
      className={clsx('md:flex-grow form-input', className)}
      placeholder={placeholder}
      {...register(name)}
      disabled={disabled}
    />
    {error && <div className="text-red-500">{error}</div>}
  </div>
);

export default InputApp;

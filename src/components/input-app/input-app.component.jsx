const InputApp = ({
  placeholder = '',
  label = '',
  error,
  register,
  name,
  disabled = false,
  type = 'text',
}) => (
  <div className="flex flex-col w-full">
    <label className="mb-2 truncate">{label}</label>
    <input
      type={type}
      className="md:flex-grow form-input"
      placeholder={placeholder}
      {...register(name)}
      disabled={disabled}
    />
    {error && <div className="text-red-500">{error}</div>}
  </div>
);

export default InputApp;

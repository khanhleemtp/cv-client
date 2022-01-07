import { UserIcon } from '@heroicons/react/solid';
import Button from './../../button/button.component';

const InputFile = ({ placeholder = '', label = '', onClick, photo }) => (
  <div className="flex items-center space-x-2 w-full my-2">
    <label className="truncate">{label}</label>
    <div className="w-12 h-12 p-0 rounded-full bg-gray-200">
      {photo ? (
        <img
          src={photo}
          alt="abc"
          className="w-full h-full rounded-full object-cover object-left-top"
        />
      ) : (
        <UserIcon className="p-2" />
      )}
    </div>
    <div className="relative">
      <Button text={placeholder} onClick={onClick} />
    </div>
  </div>
);

export default InputFile;

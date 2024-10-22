import { useField } from 'formik';

interface DropdownProps {
  label: string;
  name: string;
  options: string[];
}

const Dropdown = ({ label, name, options }: DropdownProps) => {
  const [field] = useField(name);

  return (
    <div>
      <label className="block text-gray-300 mb-1">{label}</label>
      <select {...field} name={name} className="w-full p-2 rounded-md bg-gray-700 text-gray-300">
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;

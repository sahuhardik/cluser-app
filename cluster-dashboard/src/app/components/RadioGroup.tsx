import { useField } from 'formik';

interface RadioGroupProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}

const RadioGroup = ({ label, name, options }: RadioGroupProps) => {
  const [field] = useField(name);

  return (
    <div>
      <label className="block text-gray-300 mb-1">{label}</label>
      <div className="flex space-x-4">
        {options.map(option => (
          <label key={option.value} className="flex items-center">
            <input type="radio" {...field} value={option.value} className="mr-2" />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;

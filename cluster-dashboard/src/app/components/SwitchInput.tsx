import { useField } from 'formik';

interface SwitchInputProps {
  label: string;
  name: string;
}

const SwitchInput = ({ label, name }: SwitchInputProps) => {
  const [field] = useField(name);

  return (
    <div className="flex items-center">
      <input type="checkbox" {...field} className="mr-2" />
      <label className="text-gray-300">{label}</label>
    </div>
  );
};

export default SwitchInput;

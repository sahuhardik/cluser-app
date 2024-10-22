import { Field } from 'formik';

interface CheckboxGroupProps {
  label: string;
  name: string;
  options: string[];
}

const CheckboxGroup = ({ label, name, options }: CheckboxGroupProps) => {
  return (
    <div>
      <label className="block text-gray-300 mb-1">{label}</label>
      <div className="flex flex-wrap">
        {options.map(option => (
          <label key={option} className="flex items-center mr-4">
            <Field type="checkbox" name={name} value={option} className="mr-2" />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;

import { useField } from 'formik';

interface TextInputProps {
  label: string;
  name: string;
  placeholder?: string;
}

const TextInput = ({ label, ...props }: TextInputProps) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label className="block text-gray-300 mb-1">{label}</label>
      <input {...field} {...props} className="w-full p-2 rounded-md bg-gray-700 text-gray-300" />
      {meta.touched && meta.error ? <div className="text-red-500">{meta.error}</div> : null}
    </div>
  );
};

export default TextInput;

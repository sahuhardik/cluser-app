import { useField } from 'formik';

interface TimePickerProps {
  label: string;
  name: string;
}

const TimePicker = ({ label, name }: TimePickerProps) => {
  const [field, , helpers] = useField(name);

  return (
    <div>
      <label className="block text-gray-300 mb-1">{label}</label>
      <div className="flex space-x-2">
        <input
          type="number"
          value={field.value.hour}
          onChange={(e) => helpers.setValue({ ...field.value, hour: e.target.value })}
          className="w-12 p-2 rounded-md bg-gray-700 text-gray-300"
        />
        <span className="text-gray-300">:</span>
        <input
          type="number"
          value={field.value.minute}
          onChange={(e) => helpers.setValue({ ...field.value, minute: e.target.value })}
          className="w-12 p-2 rounded-md bg-gray-700 text-gray-300"
        />
      </div>
    </div>
  );
};

export default TimePicker;

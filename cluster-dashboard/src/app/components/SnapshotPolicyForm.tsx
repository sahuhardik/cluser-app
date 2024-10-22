"use client";

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import TextInput from './TextInput';
import Dropdown from './Dropdown';
import TimePicker from './TimePicker';
import CheckboxGroup from './CheckboxGroup';
import RadioGroup from './RadioGroup';
import SwitchInput from './SwitchInput';
import {
  useSnapshotPolicy,
  upsertSnapshotPolicy,
  SnapshotPolicy,
} from '../services/snapshotPolicy';
import { useAuth } from '../contexts/AuthContext';

const SnapshotPolicyForm = () => {

  const { userId } = useAuth();
  
  // Fetching existing policy
  const { data: existingPolicy, isLoading, error: isError } = useSnapshotPolicy(userId!);

  // Initializing form values based on existing policy or using default values
  const [initialValues, setInitialValues] = useState({
    policyName: '',
    directory: '',
    scheduleType: 'Daily or Weekly',
    timeZone: 'America/Los Angeles',
    time: { hour: '07', minute: '00' },
    selectedDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    deleteOption: 'never',
    deleteAfterDays: 99,
    enableLockedSnapshots: false,
    enablePolicy: true,
  });

  useEffect(() => {
    if (existingPolicy) {
      setInitialValues({
        policyName: existingPolicy.policyName || '',
        directory: existingPolicy.directory || '',
        scheduleType: existingPolicy.scheduleType || 'Daily or Weekly',
        timeZone: existingPolicy.timeZone || 'America/Los Angeles',
        time: existingPolicy.snapshotTime
          ? {
              hour: existingPolicy.snapshotTime.split(':')[0],
              minute: existingPolicy.snapshotTime.split(':')[1],
            }
          : { hour: '07', minute: '00' },
        selectedDays: existingPolicy.days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        deleteOption: existingPolicy.deleteOption ? 'afterDays' : 'never',
        deleteAfterDays: existingPolicy.deleteAfterDays || 99,
        enableLockedSnapshots: existingPolicy.snapshotLocking || false,
        enablePolicy: existingPolicy.enablePolicy || true,
      });
    }
  }, [existingPolicy]);

  const validationSchema = Yup.object({
    policyName: Yup.string().required('Policy name is required'),
    directory: Yup.string().required('Directory is required'),
  });

  const onSubmit = (policy: SnapshotPolicy) => {
    // Mutation for creating/updating snapshot policy
    upsertSnapshotPolicy(userId!, {
      ...policy,
      days: policy.days
    });
    // Activity to do after updating the form, like showing toast, updating some contexts etc
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to load policy data. Please try again later.</div>;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="bg-gray-800 p-4 rounded-md space-y-4">
          <TextInput label="Policy Name" name="policyName" placeholder="ProjectX_Daily" />
          <TextInput label="Apply to Directory" name="directory" placeholder="/ Production/ProjectX" />

          <Dropdown
            label="Select Schedule Type"
            name="scheduleType"
            options={['Daily or Weekly', 'Monthly']}
          />
          <TextInput label="Set to Time Zone" name="timeZone" placeholder="America/Los Angeles" />
          <TimePicker label="Take a Snapshot at" name="time" />

          <CheckboxGroup
            label="On the Following Day(s)"
            name="selectedDays"
            options={['Every day', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          />

          <RadioGroup
            label="Delete Each Snapshot"
            name="deleteOption"
            options={[
              { value: 'never', label: 'Never' },
              { value: 'afterDays', label: 'Automatically after' },
            ]}
          />
          <TextInput name="deleteAfterDays" placeholder="99 day(s)" label="Delete After Days" />
          <SwitchInput label="Enable Locked Snapshots" name="enableLockedSnapshots" />
          <SwitchInput label="Enable Policy" name="enablePolicy" />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-md mt-4">
            Save Policy
          </button>
          <button type="button" className="text-gray-400 p-2 ml-4">
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SnapshotPolicyForm;

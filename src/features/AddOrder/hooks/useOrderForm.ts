import { useState, useRef } from 'react';
import dayjs from 'dayjs';
import { useRouter } from "next/router";
import { formatDate } from '../dateUtils';

type FormData = {
  [key: string]: string | number | dayjs.Dayjs | null;
};

export const useOrderForm = () => {
  const [formData, setFormData] = useState<FormData>({});
  const formRef = useRef<any>(null);
  const router = useRouter();

  const handleValuesChange = (changedValues: any, allValues: any) => {
    const updatedValues = {...allValues};

    Object.keys(updatedValues).forEach(key => {
      if (key.includes('date') && dayjs.isDayjs(updatedValues[key])) {
        updatedValues[key] = formatDate(updatedValues[key] as dayjs.Dayjs);
      }
    });

    setFormData(updatedValues);
  };

  return { formData, formRef, handleValuesChange };
};

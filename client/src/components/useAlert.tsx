import React, { useState } from 'react';
import Alert from './Alert';

type Toast = {
    text: string;
    variant?: "success" | "danger" | "warning";
}

export default function useAlert() {
    const [list, setAlerts] = useState<Toast[]>([]);


    const createToast = (options: Toast): void => {
      setAlerts([...list, options]);
      setTimeout(() => {
        setAlerts((l) => l.slice(1));
      }, 5000);
    };

    const alerts = (
      <div className='fixed bottom-0 w-full'>
        {list.map((t) => (
          <Alert variant={t.variant}>{t.text}</Alert>
        ))}
      </div>
    );
  return {
      alerts,
      createToast
  };
}


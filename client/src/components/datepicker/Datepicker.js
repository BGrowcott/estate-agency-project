import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import { useStoreContext } from '../../utils/GlobalState';

function Datepicker({date}) {

  const [value, onChange] = useState(new Date(date));

  const [state, dispatch] = useStoreContext();

  return (
      <DatePicker format='dd-MM-y' onChange={onChange} value={value} />
  );
}

export default Datepicker
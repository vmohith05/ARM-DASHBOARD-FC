import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

import  d_report from './CIO_Dashboard';

const ReactPrint = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <d_report ref={componentRef} />
      <button onClick={handlePrint}>Print this out!</button>
    </div>
  );
};

export default ReactPrint;
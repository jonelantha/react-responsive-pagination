import React from 'react';
import Pagination from 'react-responsive-pagination';
import { useFormik } from 'formik';

import './App.css';

function App() {
  const fields = {
    totalJson: 'Total Pages (JSON)',
    maxWidthJson: 'Max Width (JSON)',
    currentJson: 'Current Page (JSON)',
  };

  const formik = useFormik({
    initialValues: {
      totalJson: '1',
      maxWidthJson: '',
      currentJson: '0',
    },
    onSubmit: () => {},
  });

  const total = tryJsonParse(formik.values.totalJson);
  const maxWidth = tryJsonParse(formik.values.maxWidthJson);
  const current = tryJsonParse(formik.values.currentJson);

  return (
    <>
      <div className="container">
        <h1>Browser Test</h1>
        <form>
          {(Object.entries(fields) as Entries<typeof fields>).map(
            ([field, title]) => (
              <div className="form-group row" key={field}>
                <label htmlFor={field} className="col-sm-3 col-form-label">
                  {title}
                </label>
                <div className="col-sm-2">
                  <input
                    type="text"
                    className="form-control"
                    id={field}
                    {...formik.getFieldProps(field)}
                  />
                </div>
              </div>
            ),
          )}
        </form>
      </div>
      <Pagination
        current={current}
        maxWidth={maxWidth}
        total={total}
        onPageChange={page => formik.setFieldValue('currentJson', page)}
      />
    </>
  );
}

export default App;

function tryJsonParse(str: string) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return undefined;
  }
}

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

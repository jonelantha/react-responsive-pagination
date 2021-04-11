import Pagination from 'react-responsive-pagination';
import { useFormik } from 'formik';

import './App.css';

function App() {
  const fields = {
    totalAsJson: 'Total Pages (JSON)',
    maxWidthAsJson: 'Max Width (JSON)',
    currentPageAsJson: 'Current Page (JSON)',
  };

  const formik = useFormik({
    initialValues: {
      totalAsJson: '100',
      maxWidthAsJson: '',
      currentPageAsJson: '0',
    },
    onSubmit: () => {},
  });

  const initialStyle = '.pagination { font-size: inherit; }';

  const total = tryJsonParse(formik.values.totalAsJson);
  const maxWidth = tryJsonParse(formik.values.maxWidthAsJson);
  const current = tryJsonParse(formik.values.currentPageAsJson);

  return (
    <>
      <div className="container">
        <h1>Browser Test</h1>
        <form>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Style</label>
            <div className="col-sm-8">
              <style
                id="editable-style-block"
                className="form-control"
                scoped
                contentEditable
                suppressContentEditableWarning
              >
                {initialStyle}
              </style>
            </div>
          </div>
          {(Object.entries(fields) as Entries<typeof fields>).map(
            ([field, title]) => (
              <div className="form-group row" key={field}>
                <label htmlFor={field} className="col-sm-4 col-form-label">
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
        onPageChange={page => formik.setFieldValue('currentPageAsJson', page)}
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

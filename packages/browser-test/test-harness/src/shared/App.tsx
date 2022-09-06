import Pagination from 'react-responsive-pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import 'bootstrap/dist/css/bootstrap.css';
import './TestStyles.css';
import './App.css';

function App() {
  const fields = {
    totalAsJson: 'Total Pages (JSON)',
    maxWidthAsJson: 'Max Width (JSON)',
    currentPageAsJson: 'Current Page (JSON)',
    narrowStrategyAsJson: 'Narrow Strategy (JSON)',
    classNameAsJson: 'className (JSON)',
    extraClassNameAsJson: 'Extra Class (JSON)',
    pageItemClassNameAsJson: 'Page item className (JSON)',
    pageLinkClassNameAsJson: 'Page link className (JSON)',
    activeItemClassNameAsJson: 'Active className (JSON)',
    disabledItemClassNameAsJson: 'Disabled item className (JSON)',
    srOnlyClassNameAsJson: 'SR Only className (JSON)',
    previousLabelAsJson: 'Previous Label (JSON)',
    nextLabelAsJson: 'Next Label (JSON)',
    a11yActiveLabelAsJson: 'a11y Active Label (JSON)',
    ariaCurrentAttrAsJson: 'ariaCurrent Attr (JSON)',
  };

  const formik = useFormik({
    initialValues: {
      totalAsJson: '100',
      maxWidthAsJson: '',
      currentPageAsJson: '0',
      narrowStrategyAsJson: 'undefined',
      classNameAsJson: 'undefined',
      extraClassNameAsJson: 'undefined',
      pageItemClassNameAsJson: 'undefined',
      pageLinkClassNameAsJson: 'undefined',
      activeItemClassNameAsJson: 'undefined',
      disabledItemClassNameAsJson: 'undefined',
      srOnlyClassNameAsJson: 'undefined',
      previousLabelAsJson: 'undefined',
      nextLabelAsJson: 'undefined',
      a11yActiveLabelAsJson: 'undefined',
      ariaCurrentAttrAsJson: 'undefined',
    },
    onSubmit: () => {},
  });

  const cssExtraClassOptions = ['add-margin-padding', 'content-box', 'demo'];

  const [cssExtraClasses, toggleCssExtraClass] = makeToggles(
    useURLParam('css'),
    cssExtraClassOptions,
  );

  const initialStyle = '.pagination { font-size: inherit; }';

  const total = tryJsonParse(formik.values.totalAsJson);
  const maxWidth = tryJsonParse(formik.values.maxWidthAsJson);
  const current = tryJsonParse(formik.values.currentPageAsJson);
  const narrowStrategy = tryJsonParse(formik.values.narrowStrategyAsJson);
  const className = tryJsonParse(formik.values.classNameAsJson);
  const extraClassName = tryJsonParse(formik.values.extraClassNameAsJson);
  const pageItemClassName = tryJsonParse(formik.values.pageItemClassNameAsJson);
  const pageLinkClassName = tryJsonParse(formik.values.pageLinkClassNameAsJson);
  const activeItemClassName = tryJsonParse(formik.values.activeItemClassNameAsJson);
  const disabledItemClassName = tryJsonParse(
    formik.values.disabledItemClassNameAsJson,
  );
  const srOnlyClassName = tryJsonParse(formik.values.srOnlyClassNameAsJson);
  const previousLabel = tryJsonParse(formik.values.previousLabelAsJson);
  const nextLabel = tryJsonParse(formik.values.nextLabelAsJson);
  const a11yActiveLabel = tryJsonParse(formik.values.a11yActiveLabelAsJson);
  const ariaCurrentAttr = tryJsonParse(formik.values.ariaCurrentAttrAsJson);

  return (
    <>
      <div className={cssExtraClasses.join(' ')}>
        <Pagination
          current={current}
          maxWidth={maxWidth}
          total={total}
          onPageChange={page => formik.setFieldValue('currentPageAsJson', page)}
          narrowStrategy={narrowStrategy}
          className={className}
          extraClassName={extraClassName}
          pageItemClassName={pageItemClassName}
          pageLinkClassName={pageLinkClassName}
          activeItemClassName={activeItemClassName}
          disabledItemClassName={disabledItemClassName}
          srOnlyClassName={srOnlyClassName}
          previousLabel={previousLabel}
          nextLabel={nextLabel}
          a11yActiveLabel={a11yActiveLabel}
          ariaCurrentAttr={ariaCurrentAttr}
        />
      </div>
      <div className="container">
        <form>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Style (non-React)</label>
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
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              Additional Pagination CSS (React)
            </label>
            <div className="col-sm-8">
              {cssExtraClassOptions.map(value => (
                <div className="form-check form-check-inline" key={value}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={value}
                    value={value}
                    checked={cssExtraClasses.includes(value)}
                    onChange={event =>
                      toggleCssExtraClass(value, event.target.checked)
                    }
                  />
                  <label className="form-check-label" htmlFor={value}>
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {Object.entries(fields).map(([field, title]) => (
            <div className="form-group row" key={field}>
              <label htmlFor={field} className="col-sm-4 col-form-label">
                {title}
              </label>
              <div className="col-sm-2">
                <input
                  type="text"
                  className="form-control"
                  id={field}
                  spellCheck="false"
                  {...formik.getFieldProps(field)}
                />
              </div>
            </div>
          ))}
        </form>
      </div>
    </>
  );
}

export default App;

function useURLParam(
  name: string,
): [value: string | undefined, set: (newValue: string) => void] {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);

  return [
    query.get(name) ?? undefined,

    function set(newValue) {
      query.set(name, newValue);
      navigate(`?${query.toString()}`);
    },
  ];
}

function makeToggles(
  [rawState, setState]: [string | undefined, (state: string) => void],
  validValues: string[],
): [activeValues: string[], toggleValue: (value: string, toggle: boolean) => void] {
  let activeValues = (rawState?.split(',') ?? []).filter(value =>
    validValues.includes(value),
  );

  function toggleValue(value: string, toggle: boolean) {
    if (toggle && !activeValues.includes(value)) {
      activeValues = [...activeValues, value];
    } else if (!toggle && activeValues.includes(value)) {
      activeValues = activeValues.filter(existingValue => existingValue !== value);
    }
    setState(activeValues.join(','));
  }

  return [activeValues, toggleValue];
}

function tryJsonParse(str: string) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return undefined;
  }
}

import Pagination from 'react-responsive-pagination';
import { useParams, useSearchParams } from 'react-router-dom';
import { Field, Formik } from 'formik';
import { frameworkIds, getFrameworkStyles } from './frameworkStyles';
import { PresetId, presets } from './presets';

import './TestStyles.css';
import './App.css';

const propFields = {
  total: 'Total Pages',
  maxWidth: 'Max Width',
  current: 'Current Page',
  narrowStrategy: 'Narrow Strategy',
  className: 'className',
  extraClassName: 'Extra Class',
  pageItemClassName: 'Page item className',
  pageLinkClassName: 'Page link className',
  activeItemClassName: 'Active className',
  disabledItemClassName: 'Disabled item className',
  srOnlyClassName: 'SR Only className',
  previousLabel: 'Previous Label',
  nextLabel: 'Next Label',
  ariaPreviousLabel: 'Aria Previous Label',
  ariaNextLabel: 'Aria Next Label',
  renderNav: 'Render Navigation',
  a11yActiveLabel: 'a11y Active Label',
  ariaCurrentAttr: 'ariaCurrent Attr',
  linkHref: 'linkHref',
};

type PropFieldName = keyof typeof propFields;

const initialValues = {
  presetId: 'none' as PresetId,
  propsAsJson: {
    total: '100',
    maxWidth: '',
    current: '0',
    narrowStrategy: 'undefined',
    className: 'undefined',
    extraClassName: 'undefined',
    pageItemClassName: 'undefined',
    pageLinkClassName: 'undefined',
    activeItemClassName: 'undefined',
    disabledItemClassName: 'undefined',
    srOnlyClassName: 'undefined',
    previousLabel: 'undefined',
    nextLabel: 'undefined',
    ariaPreviousLabel: 'undefined',
    ariaNextLabel: 'undefined',
    renderNav: 'undefined',
    a11yActiveLabel: 'undefined',
    ariaCurrentAttr: 'undefined',
    linkHref: 'undefined',
  },
};

const cssExtraClassOptions = ['add-margin-padding', 'content-box', 'demo'];

const initialStyle = '.pagination { font-size: inherit; }';

function App() {
  const { frameworkId: activeFrameworkId } = useParams<'frameworkId'>();

  const FrameworkStyles = getFrameworkStyles(activeFrameworkId);

  const [cssExtraClasses, toggleCssExtraClass] = useUrlQueryToggles(
    'css',
    cssExtraClassOptions,
  );

  return (
    <FrameworkStyles>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {formik => (
          <>
            <div className={cssExtraClasses.join(' ')}>
              <Pagination
                {...presets[formik.values.presetId]}
                onPageChange={page =>
                  formik.setFieldValue('propsAsJson.current', JSON.stringify(page))
                }
                {...getPropsFromJsonFields(formik.values.propsAsJson)}
              />
            </div>
            <div className="container">
              <form>
                <div className="mb-1 row">
                  <label className="col-sm-4 col-form-label">CSS Framework</label>
                  <div className="col-sm-8">
                    {frameworkIds.map(frameworkId => (
                      <div
                        className="form-check form-check-inline align-middle"
                        key={frameworkId}
                      >
                        <input
                          type="radio"
                          className="form-check-input"
                          id={frameworkId}
                          checked={frameworkId === activeFrameworkId}
                          onChange={() => {
                            window.location.href = frameworkId;
                          }}
                        />
                        <label className="form-check-label" htmlFor={frameworkId}>
                          {frameworkId}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-1 row">
                  <label className="col-sm-4 col-form-label">Preset</label>
                  <div className="col-sm-8">
                    {Object.keys(presets).map(presetName => (
                      <div
                        className="form-check form-check-inline align-middle"
                        key={presetName}
                      >
                        <Field
                          type="radio"
                          name="presetId"
                          id={`preset_${presetName}`}
                          className="form-check-input"
                          value={presetName}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`preset_${presetName}`}
                        >
                          {presetName}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-1 row">
                  <label className="col-sm-4 col-form-label">
                    Style (non-React)
                  </label>
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
                <div className="mb-1 row">
                  <label className="col-sm-4 col-form-label">
                    Additional Pagination CSS (React)
                  </label>
                  <div className="col-sm-8">
                    {cssExtraClassOptions.map(value => (
                      <div
                        className="form-check form-check-inline align-middle"
                        key={value}
                      >
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
                {Object.entries(propFields).map(([field, title]) => (
                  <div className="mb-1 row" key={field}>
                    <label
                      htmlFor={`${field}AsJson`}
                      className="col-sm-4 col-form-label"
                    >
                      {title} (JSON)
                    </label>
                    <div className="col-sm-2">
                      <Field
                        name={`propsAsJson.${field}`}
                        type="text"
                        className="form-control"
                        id={`${field}AsJson`}
                        spellCheck="false"
                      />
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </>
        )}
      </Formik>
    </FrameworkStyles>
  );
}

export default App;

function useUrlQueryToggles(
  field: string,
  validValues: string[],
): [activeValues: string[], toggleValue: (value: string, toggle: boolean) => void] {
  const [search, setSearch] = useSearchParams();

  const activeValues =
    search
      .get(field)
      ?.split(',')
      .filter(value => validValues.includes(value)) ?? [];

  function toggleValue(value: string, toggle: boolean) {
    const newActiveValues = new Set(activeValues);
    if (toggle) {
      newActiveValues.add(value);
    } else {
      newActiveValues.delete(value);
    }

    setSearch({ [field]: [...newActiveValues].join(',') });
  }

  return [activeValues, toggleValue];
}

function getPropsFromJsonFields(propFieldJsonValues: {
  [key in PropFieldName]: string;
}) {
  const props = {} as { [key in PropFieldName]: any };

  (Object.keys(propFields) as PropFieldName[]).forEach(field => {
    const value = tryJsonParse(propFieldJsonValues[field]);
    if (value !== undefined) {
      props[field] = value;
    }
  });

  return props;
}

function tryJsonParse(str: string) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return undefined;
  }
}

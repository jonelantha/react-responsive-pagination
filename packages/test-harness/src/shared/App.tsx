import ResponsivePagination from 'react-responsive-pagination';
import { srOnlySpanLabel } from 'react-responsive-pagination/labelBehaviour';
import {
  combine,
  dropEllipsis,
  dropEllipsisThenNav,
  dropNav,
  dropNavThenEllipsis,
  dropFirstAndLast,
} from 'react-responsive-pagination/narrowBehaviour';
import { useParams, useSearchParams } from 'react-router-dom';
import { Field, Formik } from 'formik';
import {
  SubTheme,
  subThemes,
  frameworkIds,
  getFrameworkStyles,
  getThemeVariables,
  getThemeVariableTestValue,
} from './frameworkStyles';
import { PresetId, presets } from './presets';
import { createTestComponent } from './test-components';
import { BodyThemeSetter } from './BodyThemeSetter';

import './TestStyles.css';
import './App.css';

const fields = {
  renderPagination: 'Render Pagination',
  propsAsJson: {
    total: 'Total Pages',
    maxWidth: 'Max Width',
    current: 'Current Page',
    className: 'className',
    extraClassName: 'Extra Class',
    pageItemClassName: 'Page item className',
    pageLinkClassName: 'Page link className',
    activeItemClassName: 'Active className',
    disabledItemClassName: 'Disabled item className',
    navClassName: 'Nav className',
    previousClassName: 'Previous className',
    nextClassName: 'Next className',
    previousLabel: 'Previous Label',
    nextLabel: 'Next Label',
    ariaPreviousLabel: 'Aria Previous Label',
    ariaNextLabel: 'Aria Next Label',
    renderNav: 'Render Navigation',
    ariaCurrentAttr: 'ariaCurrent Attr',
    linkHref: 'linkHref',
  },
  labelBehaviourFieldsAsJson: {
    labelBehaviour: 'Label Behaviour',
    srOnlyClassName: 'SR Only className',
    a11yActiveLabel: 'a11y Active Label',
  },
  narrowBehaviourFieldsAsJson: {
    narrowBehaviourNames: 'Narrow Behaviour',
  },
};

const initialValues = {
  renderPagination: true,
  presetId: 'none' as PresetId,
  subTheme: '' as SubTheme,
  testThemeVariable: '',
  propsAsJson: {
    total: '100',
    maxWidth: '',
    current: '0',
    className: 'undefined',
    extraClassName: 'undefined',
    pageItemClassName: 'undefined',
    pageLinkClassName: 'undefined',
    activeItemClassName: 'undefined',
    disabledItemClassName: 'undefined',
    navClassName: 'undefined',
    previousClassName: 'undefined',
    nextClassName: 'undefined',
    previousLabel: 'undefined',
    nextLabel: 'undefined',
    ariaPreviousLabel: 'undefined',
    ariaNextLabel: 'undefined',
    renderNav: 'undefined',
    ariaCurrentAttr: 'undefined',
    linkHref: 'undefined',
  },
  labelBehaviourFieldsAsJson: {
    labelBehaviour: 'undefined',
    srOnlyClassName: 'undefined',
    a11yActiveLabel: 'undefined',
  },
  narrowBehaviourFieldsAsJson: {
    narrowBehaviourNames: 'undefined',
  },
};

const cssExtraClassOptions = [
  'add-margin-padding',
  'content-box',
  'demo',
  'gh-dark',
];

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
            <BodyThemeSetter theme={formik.values.subTheme} />
            {formik.values.testThemeVariable && (
              <style>
                {`:root { ${formik.values.testThemeVariable}: ${getThemeVariableTestValue(formik.values.testThemeVariable)}; }`}
              </style>
            )}
            <div className={cssExtraClasses.join(' ')} id="paginationParent">
              {formik.values.renderPagination && (
                <ResponsivePagination
                  {...presets[formik.values.presetId]}
                  onPageChange={page =>
                    formik.setFieldValue('propsAsJson.current', JSON.stringify(page))
                  }
                  {...parseJsonFields(formik.values.propsAsJson)}
                  {...getLabelBehaviour(
                    parseJsonFields(formik.values.labelBehaviourFieldsAsJson),
                  )}
                  {...getNarrowBehaviour(
                    parseJsonFields(formik.values.narrowBehaviourFieldsAsJson),
                  )}
                />
              )}
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
                  <label className="col-sm-4 col-form-label">Sub Theme</label>
                  <div className="col-sm-8">
                    {Object.entries(subThemes).map(([label, subTheme]) => (
                      <div
                        className="form-check form-check-inline align-middle"
                        key={subTheme}
                      >
                        <Field
                          type="radio"
                          name="subTheme"
                          id={`subTheme_${subTheme}`}
                          className="form-check-input"
                          value={subTheme}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`subTheme_${subTheme}`}
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-1 row">
                  <label className="col-sm-4 col-form-label">Test css var</label>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      value={formik.values.testThemeVariable}
                      onChange={e =>
                        formik.setFieldValue(
                          'testThemeColorVariable',
                          e.target.value,
                        )
                      }
                    >
                      <option value="">Select</option>
                      {getThemeVariables().map(colorVariable => (
                        <option key={colorVariable} value={colorVariable}>
                          {colorVariable}
                        </option>
                      ))}
                    </select>
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
                <div className="mb-1 row">
                  <label
                    htmlFor="renderPagination"
                    className="col-sm-4 col-form-label"
                  >
                    Render Pagination
                  </label>
                  <div className="col-sm-2 ">
                    <div className="form-check">
                      <Field
                        name="renderPagination"
                        type="checkbox"
                        className="form-check-input"
                        id="renderPagination"
                      />
                    </div>
                  </div>
                </div>
                {(
                  [
                    'propsAsJson',
                    'labelBehaviourFieldsAsJson',
                    'narrowBehaviourFieldsAsJson',
                  ] as const
                ).map(group =>
                  Object.entries(fields[group]).map(([field, title]) => (
                    <div className="mb-1 row" key={field}>
                      <label
                        htmlFor={`${field}AsJson`}
                        className="col-sm-4 col-form-label"
                      >
                        {title} (JSON)
                      </label>
                      <div className="col-sm-2">
                        <Field
                          name={`${group}.${field}`}
                          type="text"
                          className="form-control"
                          id={`${field}AsJson`}
                          spellCheck="false"
                        />
                      </div>
                    </div>
                  )),
                )}
              </form>
            </div>
          </>
        )}
      </Formik>
    </FrameworkStyles>
  );
}

export default App;

function getLabelBehaviour({
  labelBehaviour,
  srOnlyClassName,
  a11yActiveLabel,
}: { [K in keyof (typeof fields)['labelBehaviourFieldsAsJson']]: string }) {
  if (labelBehaviour === 'srOnlySpanLabel') {
    return { labelBehaviour: srOnlySpanLabel({ srOnlyClassName, a11yActiveLabel }) };
  }
}

function getNarrowBehaviour({
  narrowBehaviourNames,
}: {
  narrowBehaviourNames: unknown;
}) {
  const narrowBehaviour = getSingleNarrowBehaviour(narrowBehaviourNames);
  if (narrowBehaviour) {
    return { narrowBehaviour };
  } else if (Array.isArray(narrowBehaviourNames)) {
    const narrowBehaviours = narrowBehaviourNames
      .map(getSingleNarrowBehaviour)
      .filter(notUndefined);

    return { narrowBehaviour: combine(...narrowBehaviours) };
  }
}

function getSingleNarrowBehaviour(narrowBehaviourName: unknown) {
  switch (narrowBehaviourName) {
    case 'dropEllipsis':
      return dropEllipsis;
    case 'dropNav':
      return dropNav;
    case 'dropEllipsisThenNav':
      return dropEllipsisThenNav;
    case 'dropNavThenEllipsis':
      return dropNavThenEllipsis;
    case 'dropFirstAndLast':
      return dropFirstAndLast;
  }
}

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

function parseJsonFields<K extends string>(jsonValues: {
  [key in K]: string;
}) {
  const props = {} as { [key in K]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

  (Object.keys(jsonValues) as K[]).forEach(field => {
    const value = getFieldValue(tryJsonParse(jsonValues[field]));

    if (value !== undefined) {
      props[field] = value;
    }
  });

  return props;
}

function tryJsonParse(str: string) {
  try {
    return JSON.parse(str);
  } catch {
    return undefined;
  }
}

function getFieldValue(value: unknown) {
  const testComponent = createTestComponent(value);
  if (testComponent) return testComponent;

  if (value === 'hrefTestFn()') return (page: number) => `/test-page/${page}`;

  return value;
}

function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

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
import { Formik } from 'formik';
import type { SubTheme, FrameworkId } from './frameworkStyles';
import {
  subThemes,
  frameworkIds,
  getThemeVariables,
  getThemeVariableTestValue,
} from './frameworkStyles';
import type { PresetId } from './presets';
import { presets } from './presets';
import { createTestComponent } from './test-components';
import { BodyThemeSetter } from './BodyThemeSetter';
import { tryJsonParse, useUrlQueryToggles } from './util';
import {
  Container,
  RadioGroupRow,
  SelectRow,
  StyleRow,
  CheckboxGroupRow,
  CheckboxRow,
  TextFieldRow,
} from './components';

import './test-styles.css';
import './main.css';

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
    ariaPageLabel: 'Aria Page Label Fn',
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
  subTheme: 'none' as SubTheme,
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
    ariaPageLabel: 'undefined',
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
  'gap',
  'demo',
  'gh-dark',
];

const initialStyle = '.pagination { font-size: inherit; }';

type TestHarnessUIProps = {
  activeFrameworkId: FrameworkId;
  setActiveFrameworkId: (frameworkId: FrameworkId) => void;
};

function TestHarnessUI({
  activeFrameworkId,
  setActiveFrameworkId,
}: TestHarnessUIProps) {
  const [cssExtraClasses, toggleCssExtraClass] = useUrlQueryToggles(
    'css',
    cssExtraClassOptions,
  );

  return (
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
          <Container>
            <form>
              <RadioGroupRow
                label="CSS Framework"
                radios={frameworkIds.map(value => ({
                  id: `frameworkId_${value}`,
                  name: 'frameworkId',
                  value,
                  checked: activeFrameworkId === value,
                  onChange: () => setActiveFrameworkId(value),
                }))}
              />
              <RadioGroupRow
                label="Sub Theme"
                radios={subThemes.map(value => ({
                  id: `subTheme_${value}`,
                  ...formik.getFieldProps({
                    name: 'subTheme',
                    type: 'radio',
                    value,
                  }),
                }))}
              />
              <SelectRow
                label="Test css var"
                options={getThemeVariables()}
                {...formik.getFieldProps('testThemeVariable')}
              />
              <RadioGroupRow
                label="Preset"
                radios={Object.keys(presets).map(value => ({
                  id: `preset_${value}`,
                  ...formik.getFieldProps({
                    name: 'presetId',
                    type: 'radio',
                    value,
                  }),
                }))}
              />
              <StyleRow label="Style (non-React)">
                <style
                  id="editable-style-block"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {initialStyle}
                </style>
              </StyleRow>
              <CheckboxGroupRow
                label="Additional Pagination CSS (React)"
                checkboxes={cssExtraClassOptions.map(option => ({
                  id: option,
                  value: option,
                  checked: cssExtraClasses.includes(option),
                  onChange: event =>
                    toggleCssExtraClass(option, event.target.checked),
                }))}
              />
              <CheckboxRow
                label="Render Pagination"
                id="renderPagination"
                {...formik.getFieldProps({
                  name: 'renderPagination',
                  type: 'checkbox',
                })}
              />
              {(
                [
                  'propsAsJson',
                  'labelBehaviourFieldsAsJson',
                  'narrowBehaviourFieldsAsJson',
                ] as const
              ).map(group =>
                Object.entries(fields[group]).map(([field, title]) => (
                  <TextFieldRow
                    key={field}
                    label={`${title} (JSON)`}
                    id={`${field}AsJson`}
                    spellCheck={false}
                    {...formik.getFieldProps(`${group}.${field}`)}
                  />
                )),
              )}
            </form>
          </Container>
        </>
      )}
    </Formik>
  );
}

export default TestHarnessUI;

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
      .filter(x => x !== undefined);

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

function getFieldValue(value: unknown) {
  const testComponent = createTestComponent(value);
  if (testComponent) return testComponent;

  if (value === 'hrefTestFn()') return hrefTestFn;

  if (value === 'ariaPageLabelTestFn()') return ariaPageLabelTestFn;

  return value;
}

function hrefTestFn(page: number) {
  return `/test-page/${page}`;
}

function ariaPageLabelTestFn(page: number, active: boolean) {
  return active ? `active ${page}` : `page ${page}`;
}

import ResponsivePagination from 'react-responsive-pagination';
import { Field, Formik } from 'formik';
import type { SubTheme, FrameworkId } from './test-support/framework-styles';
import {
  subThemes,
  frameworkIds,
  getThemeVariables,
} from './test-support/framework-styles';
import { type PresetId, presets } from './test-support/presets';
import { NextLabel, PreviousLabel, TestClass } from './test-support/test-components';
import { useUrlQueryToggles } from './test-support/util';
import { ariaPageLabelTestFn, hrefTestFn } from './test-support/test-functions';
import { getLabelBehaviour } from './test-support/label-behaviour';
import { getNarrowBehaviour } from './test-support/narrow-behaviour';
import { BodyThemeSetter } from './components/BodyThemeSetter';
import { InputRow } from './components/InputRow';
import { Container } from './components/Container';
import { CheckboxRow } from './components/CheckboxRow';
import { GroupRow } from './components/GroupRow';
import { FieldSelect } from './components/FieldSelect';
import { JsonTextField } from './components/JsonTextField';
import { TestThemeVariableSetter } from './components/TestThemeVariableSetter';

import './css/test-styles.css';
import './css/main.css';

const fields = {
  renderPagination: 'Render Pagination',
  props: {
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
  labelBehaviourFields: {
    labelBehaviour: 'Label Behaviour',
    srOnlyClassName: 'SR Only className',
    a11yActiveLabel: 'a11y Active Label',
  },
  narrowBehaviourFields: {
    narrowBehaviourNames: 'Narrow Behaviour',
  },
};

type PropFields = keyof typeof fields.props;
type LabelBehaviourFields = keyof typeof fields.labelBehaviourFields;
type NarrowBehaviourFields = keyof typeof fields.narrowBehaviourFields;

const initialValues = {
  renderPagination: true,
  presetId: 'none' as PresetId,
  subTheme: 'none' as SubTheme,
  testThemeVariable: '',
  props: {
    total: 100,
    current: 0,
  } as { [key in PropFields]: unknown },
  labelBehaviourFields: {} as { [key in LabelBehaviourFields]: unknown },
  narrowBehaviourFields: {} as { [key in NarrowBehaviourFields]: unknown },
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
          <div className={cssExtraClasses.join(' ')} id="paginationParent">
            {formik.values.renderPagination && (
              <ResponsivePagination
                {...presets[formik.values.presetId]}
                onPageChange={page => formik.setFieldValue('props.current', page)}
                {...transformProps(formik.values.props)}
                {...getLabelBehaviour(formik.values.labelBehaviourFields)}
                {...getNarrowBehaviour(
                  formik.values.narrowBehaviourFields.narrowBehaviourNames,
                )}
              />
            )}
          </div>
          <BodyThemeSetter theme={formik.values.subTheme} />
          <TestThemeVariableSetter variable={formik.values.testThemeVariable} />
          <Container>
            <form>
              <GroupRow
                label="CSS Framework"
                name="frameworkId"
                values={frameworkIds}
                input={attrs => (
                  <input
                    type="radio"
                    {...attrs}
                    checked={activeFrameworkId === attrs.value}
                    onChange={() => setActiveFrameworkId(attrs.value)}
                  />
                )}
              />
              <GroupRow
                label="Sub Theme"
                name="subTheme"
                values={Object.values(subThemes)}
                input={props => <Field type="radio" {...props} />}
              />
              <InputRow label="Test css var" id="testThemeVariable">
                {attrs => (
                  <FieldSelect
                    name="testThemeVariable"
                    options={getThemeVariables()}
                    {...attrs}
                  />
                )}
              </InputRow>
              <GroupRow
                label="Preset"
                name="presetId"
                values={Object.keys(presets)}
                input={props => <Field type="radio" {...props} />}
              />
              <InputRow label="Style (non-React)" id="editable-style-block">
                {attrs => (
                  <style {...attrs} contentEditable suppressContentEditableWarning>
                    {initialStyle}
                  </style>
                )}
              </InputRow>
              <GroupRow
                label="Additional Pagination CSS (React)"
                name="cssExtraClasses"
                values={cssExtraClassOptions}
                input={attrs => (
                  <input
                    type="checkbox"
                    {...attrs}
                    checked={cssExtraClasses.includes(attrs.value)}
                    onChange={event =>
                      toggleCssExtraClass(attrs.value, event.target.checked)
                    }
                  />
                )}
              />
              <CheckboxRow label="Render Pagination" id="renderPagination">
                {attrs => (
                  <Field type="checkbox" name="renderPagination" {...attrs} />
                )}
              </CheckboxRow>
              {(
                ['props', 'labelBehaviourFields', 'narrowBehaviourFields'] as const
              ).map(group =>
                Object.entries(fields[group]).map(([field, title]) => (
                  <InputRow
                    key={field}
                    label={`${title} (JSON)`}
                    id={`${field}AsJson`}
                    cellSize="small"
                  >
                    {attrs => (
                      <JsonTextField name={`${group}.${field}`} {...attrs} />
                    )}
                  </InputRow>
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

function transformProps<K extends string>(props: {
  [key in K]: unknown;
}) {
  const transformedProps = {} as { [key in K]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any

  (Object.keys(props) as K[]).forEach(field => {
    const value = transformProp(props[field]);

    if (value !== undefined) {
      transformedProps[field] = value;
    }
  });

  return transformedProps;
}

function transformProp(value: unknown) {
  switch (value) {
    case '<PreviousLabel />':
      return <PreviousLabel />;

    case '<NextLabel />':
      return <NextLabel />;

    case '<Anonymous />':
      return <div>Anonymous</div>;

    case '<AnonymousFragment />':
      return <>Anonymous</>;

    case '<TestClass />':
      return <TestClass />;

    case 'hrefTestFn()':
      return hrefTestFn;

    case 'ariaPageLabelTestFn()':
      return ariaPageLabelTestFn;
  }

  return value;
}

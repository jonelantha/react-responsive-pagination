import type { mdxToMdast } from 'satteri';

type Root = Extract<ReturnType<typeof mdxToMdast>, { type: 'root' }>;

export type MdxNode = Root['children'][number];

export type JsxElement = Extract<MdxNode, { type: 'mdxJsxFlowElement' }>;

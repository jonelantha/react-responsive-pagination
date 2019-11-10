import React, { memo } from 'react';
import { ViewComponent, ViewItem } from '../../../view';

export default memo(ViewDomResolver);

function ViewDomResolver({ view: View, onDomProvidable: viewDomConsumer }: Props) {
  let componentToRender: JSX.Element;

  viewDomConsumer(items => {
    return new Promise(resolveDom => {
      componentToRender = (
        <View items={items} ref={element => element && resolveDom(element)} />
      );
    });
  });

  return componentToRender!;
}

type Props = {
  view: ViewComponent;
  onDomProvidable: (viewDomProvider: ViewDomProvider) => void;
};

export type ViewDomProvider = (items: ViewItem[]) => Promise<HTMLElement>;

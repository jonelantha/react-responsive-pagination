import React from 'react';
import { SkinComponent, SkinItem } from '..';
import Item from './Item';
import Container from './Container';

const BootstrapSkin: SkinComponent = React.forwardRef(({ items }, ref) => (
  <Container ref={ref}>{items.map(createItem)}</Container>
));

function createItem(item: SkinItem) {
  switch (item.type) {
    case 'ellipsis':
      return <Item key={item.key} label={'…'} a11yHidden={true} />;
    case 'page':
      return (
        <Item
          key={item.key}
          onClick={item.onClick}
          isActive={item.active}
          label={item.label}
          a11yLabel={item.active ? '(current)' : undefined}
        />
      );
    case 'previous':
    case 'next':
      return (
        <Item
          key={item.key}
          onClick={item.onClick}
          label={item.type === 'previous' ? '«' : '»'}
          a11yLabel={item.type === 'previous' ? 'Previous' : 'Next'}
        />
      );
  }
}
//
export default BootstrapSkin;

import React, { forwardRef, useMemo, useRef } from 'react';
import { ViewComponent, PageChangeHandler } from '.';
import { viewItemToSkinItem } from './viewItemToSkinItem';
import { SkinComponent } from '../skins';

export function useView(skin: SkinComponent, handlePageChange: PageChangeHandler) {
  const handlePageChangeRef = useRef<PageChangeHandler | null>(null);
  handlePageChangeRef.current = handlePageChange;

  return useMemo(() => createView(skin, handlePageChangeRef), [skin]);
}

function createView(
  Skin: SkinComponent,
  handlePageChangeRef: React.RefObject<PageChangeHandler>,
) {
  const View: ViewComponent = forwardRef(({ items: viewItems }, ref) => {
    const handlePageChange = handlePageChangeRef.current!;

    const skinItems = viewItems.map(viewItemToSkinItem(handlePageChange));

    return <Skin ref={ref} items={skinItems} />;
  });

  return View;
}

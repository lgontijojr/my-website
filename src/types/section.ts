import type { CSSProperties } from 'react';

export type ContentElement =
  | { type: 'text'; tag?: string; value: string; style?: CSSProperties }
  | { type: 'list'; listType?: string; items: { value: string }[] }
  | { type: 'break' }
  | { type: 'horizontalRule' };

export interface SectionContentBlock {
  sectionTitle: string;
  content: ContentElement[];
}

import { ColorValue } from 'react-native';

declare module '@global' {
  export type ReactChildren = React.ReactNode;
  export type ReactJsxOnlyChildren = React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal;
  export interface ISvgProps {
    size?: number;
    color?: ColorValue;
    color2?: string;
  }
  export type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>;
  export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
}

import { Component, JSXElement } from 'solid-js';
import { TypographyComponent } from '@interfaces';
import { Dynamic } from 'solid-js/web';

export interface TypographyProps {
  component?: TypographyComponent;
  children?: JSXElement;
}

export const Typography: Component<TypographyProps> = (props) => {
  const options = {
    p: <p>{props.children}</p>,
    h1: <h1>{props.children}</h1>,
    h2: <h2>{props.children}</h2>,
    h3: <h3>{props.children}</h3>,
    h4: <h4>{props.children}</h4>,
    h5: <h5>{props.children}</h5>,
    h6: <h6>{props.children}</h6>,
    small: <small>{props.children}</small>,
    abbr: <abbr>{props.children}</abbr>,
    mark: <mark>{props.children}</mark>,
    strong: <strong>{props.children}</strong>,
    s: <s>{props.children}</s>,
    em: <em>{props.children}</em>,
    del: <del>{props.children}</del>,
    sub: <sub>{props.children}</sub>,
    ins: <ins>{props.children}</ins>,
    sup: <sup>{props.children}</sup>,
    kbd: <kbd>{props.children}</kbd>,
    u: <u>{props.children}</u>,
  };

  return <Dynamic component={() => options[props.component || 'p']} />;
};

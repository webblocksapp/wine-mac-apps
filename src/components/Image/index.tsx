import { Component, JSX } from 'solid-js';

export interface ImageProps extends JSX.ImgHTMLAttributes<HTMLImageElement> {}

export const Image: Component<ImageProps> = (props) => <img {...props} />;

import { LoadingSpinner, Image } from '@components';
import { ProcessStatus } from '@interfaces';
import { Component, JSXElement } from 'solid-js';
import { Dynamic } from 'solid-js/web';
// import PendingIcon from '@imgs/pending-icon.png';
// import FailedIcon from '@imgs/failed-icon.png';
// import SuccessIcon from '@imgs/success-icon.png';
// import CancelledIcon from '@imgs/cancelled-icon.png';

export interface ProcessStatusIconProps {
  status?: ProcessStatus;
}

// const icons: Record<ProcessStatus, () => JSXElement> = {
//   pending: () => <Image src={PendingIcon} style="width: 20px; height: 20px;" />,
//   inProgress: () => <LoadingSpinner mr={2} />,
//   success: () => <Image src={SuccessIcon} style="width: 20px; height: 20px;" />,
//   error: () => <Image src={FailedIcon} style="width: 20px; height: 20px;" />,
//   cancelled: () => (
//     <Image src={CancelledIcon} style="width: 20px; height: 20px;" />
//   ),
// };

export const ProcessStatusIcon: Component<ProcessStatusIconProps> = (props) => (
  // <Dynamic component={icons[props.status || 'pending']} />
  <></>
);

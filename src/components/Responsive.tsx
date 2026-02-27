type Props = {
  children: React.ReactNode;
};

import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }: Props) => {
  const isDesktop = useMediaQuery({ minWidth: 769 });
  return isDesktop ? children : null;
};
const Mobile = ({ children }: Props) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return isMobile ? children : null;
};
const Default = ({ children }: Props) => {
  const isNotMobile = useMediaQuery({ minWidth: 767 });
  return isNotMobile ? children : null;
};

export { Desktop, Mobile, Default };

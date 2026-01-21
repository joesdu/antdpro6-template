import type { DropDownProps } from 'antd/es/dropdown';
import { Dropdown } from 'antd';
import React from 'react';
import classNames from 'classnames';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    dropdown: {
      [`@media screen and (max-width: ${token.screenXS}px)`]: {
        width: '100%'
      }
    }
  };
});

export type HeaderDropdownProps = DropDownProps;

const HeaderDropdown: React.FC<HeaderDropdownProps> = props => {
  const { styles } = useStyles();
  return <Dropdown className={classNames(styles.dropdown, props.className)} {...props} />;
};

export default HeaderDropdown;

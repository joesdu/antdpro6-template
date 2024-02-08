import '@/extensions';

import { AvatarDropdown, AvatarName, IconFont, Question, SelectLang } from '@/components';
import { DefaultFooter, SettingDrawer } from '@ant-design/pro-components';
import type { ReactElement, ReactNode } from 'react';
import { iconfont, loginPath } from '@/configs';
import { layout01, layout02, layout03 } from '@/assets/app';

import { GithubOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { history } from '@umijs/max';
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true
      });
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }: any) => {
  return {
    actionsRender: () => [<Question key="doc" />, <SelectLang key="SelectLang" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_: any, avatarChildren: ReactNode) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      }
    },
    waterMarkProps: {
      content: initialState?.currentUser?.name
    },
    footerRender: () => (
      <DefaultFooter
        style={{
          background: 'none'
        }}
        copyright="2023 EasilyNET"
        links={[
          {
            key: 'Ant Design Pro',
            title: 'Ant Design Pro',
            href: 'https://pro.ant.design',
            blankTarget: true
          },
          {
            key: 'github',
            title: <GithubOutlined />,
            href: 'https://github.com/ant-design/ant-design-pro',
            blankTarget: true
          },
          {
            key: 'Ant Design',
            title: 'Ant Design',
            href: 'https://ant.design',
            blankTarget: true
          }
        ]}
      />
    ),
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    iconfontUrl: iconfont,
    bgLayoutImgList: [
      {
        src: layout01,
        left: 85,
        bottom: 100,
        height: '303px'
      },
      {
        src: layout02,
        bottom: -68,
        right: -45,
        height: '303px'
      },
      {
        src: layout03,
        bottom: 0,
        left: 0,
        width: '331px'
      }
    ],
    links: [
      <a href="https://github.com/joesdu" key="github" target="_blank" rel="noreferrer">
        <IconFont type="icon-github" />
        <span>我的 Github 主页</span>
      </a>
    ],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: ReactElement) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <div>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            hideHintAlert
            hideCopyButton
            settings={initialState?.settings}
            onSettingChange={(settings: any) => {
              setInitialState((preInitialState: any) => ({
                ...preInitialState,
                settings
              }));
            }}
          />
        </div>
      );
    },
    ...initialState?.settings
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig
};

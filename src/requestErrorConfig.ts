import type { RequestConfig, RequestOptions } from '@umijs/max';
import { message, notification } from 'antd';

import { history } from '@umijs/max';
import { loginPath } from '@/configs';

/**
 * 这里调整为EasilyNET的数据返回方式,仅返回data,请求的成功状态由HTTP状态码表示.所以注释掉一些代码.
 */

// 错误处理方案： 错误类型
// enum ErrorShowType {
//   SILENT = 0,
//   WARN_MESSAGE = 1,
//   ERROR_MESSAGE = 2,
//   NOTIFICATION = 3,
//   REDIRECT = 9
// }
// 与后端约定的响应数据格式
//interface ResponseStructure {
// success: boolean;
// data: any;
// errorCode?: number;
// errorMessage?: string;
// showType?: ErrorShowType;
//}
interface ResponseStructure {
  status?: number;
  title?: string;
  detail?: string;
}

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const errorConfig: RequestConfig = {
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: res => {
      // const { success, data, errorCode, errorMessage, showType } = res as unknown as ResponseStructure;
      // if (!success) {
      //   const error: any = new Error(errorMessage);
      //   error.name = 'BizError';
      //   error.info = { errorCode, errorMessage, showType, data };
      //   throw error; // 抛出自制的错误
      // }
      const { status, title, detail } = res as unknown as ResponseStructure;
      if (status) {
        const error: any = new Error(title);
        error.name = 'BizError';
        error.info = { title, status, detail };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      // if (error.name === 'BizError') {
      //   const errorInfo: ResponseStructure | undefined = error.info;
      //   if (errorInfo) {
      //     const { errorMessage, errorCode } = errorInfo;
      //     switch (errorInfo.showType) {
      //       case ErrorShowType.SILENT:
      //         // do nothing
      //         break;
      //       case ErrorShowType.WARN_MESSAGE:
      //         message.warning(errorMessage);
      //         break;
      //       case ErrorShowType.ERROR_MESSAGE:
      //         message.error(errorMessage);
      //         break;
      //       case ErrorShowType.NOTIFICATION:
      //         notification.open({
      //           description: errorMessage,
      //           title: errorCode
      //         });
      //         break;
      //       case ErrorShowType.REDIRECT:
      //         // TODO: redirect
      //         break;
      //       default:
      //         message.error(errorMessage);
      //     }
      //   }
      // } else
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { status, title, detail } = errorInfo;
          switch (status) {
            case 500:
              notification.open({
                description: detail,
                message: title
              });
              break;
            case 403:
              // TODO: redirect
              const { location } = history;
              // 如果没有登录，重定向到 login
              if (location.pathname !== loginPath) {
                history.push(loginPath);
              }
              break;
            default:
              message.error(title);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    }
  },

  // 请求拦截器
  requestInterceptors: [
    (config: RequestOptions) => {
      // 拦截请求配置，进行个性化处理。
      const url = config?.url?.concat('?token=123');
      return { ...config, url };
    }
  ],

  // 响应拦截器
  responseInterceptors: [
    response => {
      // 拦截响应数据，进行个性化处理,如将包装过的数据进行结构调整,只返回 data 部分到页面
      // const { data } = response as unknown as ResponseStructure;

      // if (data?.success === false) {
      //   message.error('请求失败！');
      // }
      return response;
    }
  ]
};

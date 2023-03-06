import { iconfont } from '@/configs';
import { createFromIconfontCN } from '@ant-design/icons';
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont';

const IconFontScriptUrl: string | string[] = iconfont;
/**
 * 使用IconFont字体图标
 */
const IconFont: React.FC<IconFontProps> = createFromIconfontCN({ scriptUrl: IconFontScriptUrl });

export default IconFont;

import React, { FC } from "react";
import classnames from "classnames";
import { Tabs as ATabs } from "antd";
import { GetFuncPropsType } from "../../constants/interface";
import type { TabNavListProps } from "rc-tabs/lib/TabNavList";

import "./index.less";

type TabsProps = GetFuncPropsType<typeof ATabs>;

type Static = {
  TabPane: typeof ATabs["TabPane"];
};

/** TabBar */
const RenderTabBar = (
  props: any,
  DefaultTabBar: React.ComponentType<TabNavListProps>,
  tabProps: TabsProps
) => {
  return <DefaultTabBar className={tabProps.type} {...props} />;
};

const DEFAULT = {
  RenderTabBar,
  /** tabs 之间的间隙 */
  TABBAR_GUTTER: 4,
};

const Tabs: FC<TabsProps> & Static = props => {
  const { className, renderTabBar = DEFAULT.RenderTabBar, ...tabsProps } = props;
  return (
    <ATabs
      renderTabBar={(props, DefaultTabBar) =>
        renderTabBar(props, DefaultTabBar, { className, ...tabsProps })
      }
      tabBarGutter={DEFAULT.TABBAR_GUTTER}
      className={classnames(["l-tabs", className])}
      {...tabsProps}
    />
  );
};

Tabs.TabPane = ATabs.TabPane;

export default Tabs;

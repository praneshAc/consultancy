import React from "react";
import { Layout, theme } from "antd";

const { Content } = Layout;

const ContentWrapper = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Content style={{ padding: "0 78px" }}>
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
          width: "70%",
          margin: "auto",
        }}
      >
        {children}
      </div>
    </Content>
  );
};

export default ContentWrapper;

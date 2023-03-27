import React from "react";
import Layout from "@/components/common/Layout";
import QuickMemo from "@/components/QuickMemo/MobileMemoContainer";

type Props = {};

const index = (props: Props) => {
  return (
    <Layout>
      <QuickMemo />
    </Layout>
  );
};

export default index;

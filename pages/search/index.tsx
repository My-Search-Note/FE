import React from "react";
import Layout from "@/components/common/Layout";
import SearchContainer from "@/components/Search/SearchContainer";
import QuickMemo from "@/components/Search/QuickMemo/QuickMemo";

type Props = {};

const index = (props: Props) => {
  return (
    <Layout>
      <SearchContainer />
      <QuickMemo />
    </Layout>
  );
};

export default index;

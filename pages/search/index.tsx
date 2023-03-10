import React from "react";
import Layout from "@/components/Search/Layout";
import Search from "@/components/Search/Search";
import QuickMemo from "@/components/Search/QuickMemo/QuickMemo";

type Props = {};

const index = (props: Props) => {
  return (
    <Layout>
      <Search />
      <QuickMemo />
    </Layout>
  );
};

export default index;

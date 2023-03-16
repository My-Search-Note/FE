import React from "react";
import Layout from "@/components/common/Layout";
import QuickMemo from "@/components/Search/QuickMemo/QuickMemo";
import NoteContainer from "@/components/NotePage/NoteContainer";

type Props = {};

const index = (props: Props) => {
  return (
    <Layout>
      <NoteContainer />
      <QuickMemo />
    </Layout>
  );
};

export default index;

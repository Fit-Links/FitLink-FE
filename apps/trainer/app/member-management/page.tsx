import HeaderProvider from "@trainer/components/Providers/BasicHeaderProvider";

import { commonLayoutContents } from "@trainer/constants/styles";

import MemberManagementContainer from "./_components/MemberManagementContainer";

function MemberManagement() {
  return (
    <HeaderProvider>
      <main className={commonLayoutContents}>
        <MemberManagementContainer />
      </main>
    </HeaderProvider>
  );
}

export default MemberManagement;

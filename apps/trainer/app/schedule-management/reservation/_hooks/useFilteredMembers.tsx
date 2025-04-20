import { useMemo } from "react";

import { PtUser } from "@trainer/services/types/userManagement.dto";

function useFilteredMembers(members: PtUser[], searchValue: string) {
  const normalizedSearch = searchValue.trim().toLowerCase();

  const membersWithNormalizedName: PtUser[] = useMemo(
    () =>
      members.map((member) => ({
        ...member,
        name: member.name.toLowerCase(),
      })),
    [members],
  );

  const filteredMembers = useMemo(() => {
    if (!normalizedSearch) return membersWithNormalizedName;

    return membersWithNormalizedName.filter((member) => member.name.includes(normalizedSearch));
  }, [membersWithNormalizedName, normalizedSearch]);

  return filteredMembers;
}

export default useFilteredMembers;

import { getProjectEpics } from "@/features/epic/api/getProjectEpics";
import { getProjectMember } from "@/features/member/api/getProjectMember";

const Epicspage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const { projectId } = await params;

  const res = await getProjectEpics(projectId);

  console.log(res.data);

  return <div>Epicspage</div>;
};

export default Epicspage;

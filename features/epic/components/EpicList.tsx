import { Epic } from "@/constants/constants";
import EpicCard from "./EpicCard";

const EpicList = ({ epics }: { epics: Epic[] }) => {
  return (
    <section className="mt-6 lg:mt-10 grid gird-cols-1 lg:grid-cols-2  gap-6">
      {epics.map((epic) => (
        <EpicCard key={epic.id} epic={epic} />
      ))}
    </section>
  );
};

export default EpicList;

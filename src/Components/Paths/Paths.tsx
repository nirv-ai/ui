import type { PathDataInterface } from "Data";
import { useLoaderData } from "react-router-dom";
import { PathCard } from "./Path/PathCard";

// export interface PathCardListInterface {}
export const Paths = () => {
  const { paths } = useLoaderData() as { paths: PathDataInterface[] };

  console.info("\n\n got paths", paths);

  // TODO: when almost end of list is reached, request more
  return (
    <div>
      {paths.map((path) => (
        <PathCard path={path} key={path.name} />
      ))}
    </div>
  );
};

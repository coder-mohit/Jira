import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

function useGetProjects() {
  const [projects, setProjects] = useState();
  const [recentProject, setRecentProject] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(db, "projects"),
        orderBy("created", "desc"),
        limit(2)
      );
      const res = await getDocs(collection(db, "projects"));
      const response = await getDocs(q);
      const newDatalimit = response.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const newData = res.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProjects(newData);
      setRecentProject(newDatalimit);
      console.log(newDatalimit);
    };
    fetchData();
  }, []);

  return projects;
}

export default useGetProjects;

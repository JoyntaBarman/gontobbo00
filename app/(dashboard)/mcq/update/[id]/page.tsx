'use client'

import MCQEditAndCreate from "@/components/MCQEditAndCreate";
import { useParams, useRouter } from "next/navigation";


const Page = () => {
//   const router = useRouter();
//   const params = useParams();
    const params = useParams<{ id: string }>();
    const { id } = params;

//   const id = params?.id; // dynamic slug

  console.log("iddd : ", id);
  console.log("params : ", params);

  return (
    <div>
      <MCQEditAndCreate id={id} />
    </div>
  );
};

export default Page;
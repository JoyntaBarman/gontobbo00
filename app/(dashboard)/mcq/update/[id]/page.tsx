'use client'

import MCQEditAndCreate from "@/components/MCQEditAndCreate";
import { useParams, useRouter } from "next/navigation";


const Page = () => {
    const params = useParams<{ id: string }>();


  return (
    <div>
      <MCQEditAndCreate id={Number(params?.id || null)} />
    </div>
  );
};

export default Page;
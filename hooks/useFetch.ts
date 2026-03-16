"use client"

import { useEffect, useState } from "react";
import { webinfo } from "@/lib/webinfo";

export const useFetch = (
    endpoint: string,
    dependencies: any[] = [],
    condition: boolean = false,
    id: any = "",
) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [data, setData] = useState<any>([]);
    const [totalData, setTotalData] = useState<number>(0);
    const [notFound, setNotfound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // condition check
            if (condition && !id) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${webinfo?.baseURL}${endpoint}`, {
                    method: "GET",
                    credentials: "include",
                    headers: {},
                });

                if (res.status === 204) {
                    setNotfound(true);
                    setData([]);
                    return;
                }

                const resData = await res.json();

                if (res.ok) {
                    setData(resData?.data || []);

                    if (resData?.pagination?.total) {
                        setTotalData(resData?.pagination.total);
                    }
                } else {
                    setData([]);
                }
            } catch (e: any) {
                setError(e.message);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then();
    }, [endpoint, condition, id, ...dependencies]);

    return { loading, error, data, setData, totalData, notFound };
};
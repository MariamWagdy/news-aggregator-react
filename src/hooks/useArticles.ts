import { useState } from "react";
import { getArticles } from "@api";

const useArticles = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchArticles = async (filters: any) => {
        setLoading(true);
        try {
            const result = await getArticles(filters);
            setArticles(result.data);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    return { articles, loading, fetchArticles };
};

export default useArticles;

import {useState, useEffect} from "react";
import {getArticles} from "@api";

const useArticles = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [filters, setFilters] = useState({});

    const fetchArticles = async (newFilters = filters, reset = false, newPage = page) => {
        setLoading(true);
        try {
            const result = await getArticles({...newFilters, page: newPage});
            if (reset || newPage === 1) {
                setArticles(result.data);
            } else {
                setArticles((prev) => [...prev, ...result.data]);
            }
            setHasMore(result.next_page_url !== null);
        } catch (error) {
            console.error("Error fetching articles:", error);
        } finally {
            setLoading(false);
        }
    };

    // resetting page number on filter changes
    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
        fetchArticles(newFilters, true, 1);
    };

    // apply load more
    useEffect(() => {
        fetchArticles(filters, false);
    }, [page]);

    const loadMore = () => {
        if (hasMore && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    return {articles, loading, fetchArticles: handleFilterChange, loadMore, hasMore};
};

export default useArticles;

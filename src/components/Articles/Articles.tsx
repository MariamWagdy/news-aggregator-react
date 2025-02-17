import React from "react";
import NewsViewer from "../NewsViewer/NewsViewer";
import './css/Articles.scss';

interface ArticlesProps {
    articles: any[];
    loading: boolean;
}

const Articles: React.FC<ArticlesProps> = ({articles, loading}) => {

    if (loading) return <p>Loading articles...</p>;

    if (!articles || articles.length === 0) return <p>No articles found.</p>;
    return (
        <div className="articles-container">
            {articles.map((article, index) => (
                <NewsViewer
                    key={index}
                    title={article.title}
                    content={article.content}
                    imageUrl={article.image_url}
                    author={article.author}
                    source={article.source}
                    platform={article.platform}
                    category={article.category}
                    publishedAt={article.published_at}
                    articleUrl={article.url}
                />
            ))}
        </div>
    );
};

export default Articles;
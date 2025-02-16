import React from "react";
import {useNavigate} from "react-router-dom";
import {formatDate} from "@utils";
import {defaultNewsImage} from "@assets";

import "./Css/NewsViewer.css";

interface NewsViewerProps {
    title: string;
    content: string; // Can contain HTML
    imageUrl?: string;
    author?: string;
    source?: string;
    platform?: { name: string; url: string };
    categories?: string[];
    publishedAt?: string;
    articleUrl?: string;
}

const NewsViewer: React.FC<NewsViewerProps> = ({
                                                   title,
                                                   content,
                                                   imageUrl,
                                                   author,
                                                   source,
                                                   platform,
                                                   categories = [],
                                                   publishedAt,
                                                   articleUrl
                                               }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (articleUrl) {
            window.open(articleUrl, "_blank");
        } else {
            navigate("/article");
        }
    };

    return (
        <div className="news-card" onClick={handleClick}>
            <div className="news-row">
                <div className="news-image-container">
                    <img src={imageUrl || defaultNewsImage} alt={title} className="news-image"/>
                </div>

                <div className="news-content">
                    <h5>
                        <a href={articleUrl || "#"} target="_blank" rel="noopener noreferrer" className="news-title">
                            {title}
                        </a>
                    </h5>

                    <p className="news-description">
                        <span dangerouslySetInnerHTML={{__html: content}}/>
                    </p>

                    <div className="news-meta">
                        <small>📅 {formatDate(publishedAt)}</small>
                        {platform && (
                            <small>
                                🔗 <a href={platform.url} target="_blank" rel="noopener noreferrer"
                                     className="news-platform">
                                {platform.name}
                            </a>
                            </small>
                        )}
                        {source && <small>📢 {source}</small>}
                        {author && <small>✍️ {author}</small>}
                    </div>
                </div>
            </div>

            {categories.length > 0 && (
                <div className="news-categories">
                    {categories.map((category, index) => (
                        <span key={index} className="badge bg-secondary">{category}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewsViewer;

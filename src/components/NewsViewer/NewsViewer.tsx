import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {formatDate} from "@utils";
import {defaultNewsImage} from "@assets";
import DOMPurify from "dompurify";
import {FcAdvertising, FcCalendar, FcGlobe, FcIdea, FcBusinessman} from "react-icons/fc";
import {PiLinkBold} from "react-icons/pi";
import "./css/NewsViewer.scss";

interface NewsViewerProps {
    title: string;
    content: string;
    imageUrl?: string;
    author?: string;
    source?: string;
    platform?: { name: string; url: string };
    category?: { id: number; name: string };
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
                                                   category,
                                                   publishedAt,
                                                   articleUrl
                                               }) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const cleanContent = DOMPurify.sanitize(content);
    const maxWords = 40;
    const words = cleanContent.split(" ");
    const isLong = words.length > maxWords;
    const visibleContent = words.slice(0, maxWords).join(" ") + (isLong ? "..." : "");

    return (
        <div className="news-card">
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
                        <span dangerouslySetInnerHTML={{__html: expanded ? cleanContent : visibleContent}}/>
                    </p>
                    <div className="news-meta">
                        {publishedAt && (
                            <small><FcCalendar size={15}/> {formatDate(publishedAt)}</small>
                        )}
                        {source && (
                            <small><FcAdvertising size={15}/> {source}</small>
                        )}
                        {author && (
                            <small><FcBusinessman size={15}/> {author}</small>
                        )}
                        {category && (
                            <small>
                                <span className="badge category-badge">
                                    {category.name}
                                </span>
                            </small>
                        )}
                    </div>

                    {platform && (
                        <div className="news-platform-badge">
                            <PiLinkBold size={15}/>
                            <a href={platform.url} target="_blank" rel="noopener noreferrer"
                               className="news-platform-link">
                                {platform.name}
                            </a>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default NewsViewer;

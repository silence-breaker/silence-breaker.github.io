import { useState, useMemo } from 'react';

interface Post {
    slug: string;
    title: string;
    date: string;
    categories?: string;
}

interface SearchBoxProps {
    posts: Post[];
}

export default function SearchBox({ posts }: SearchBoxProps) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const lowerQuery = query.toLowerCase();
        return posts.filter(
            (post) =>
                post.title.toLowerCase().includes(lowerQuery) ||
                (post.categories && post.categories.toLowerCase().includes(lowerQuery))
        ).slice(0, 5);
    }, [query, posts]);

    return (
        <div className="search-container">
            <button
                className="search-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="搜索"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
            </button>

            {isOpen && (
                <div className="search-modal">
                    <div className="search-backdrop" onClick={() => setIsOpen(false)}></div>
                    <div className="search-dialog">
                        <input
                            type="text"
                            placeholder="搜索文章..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            autoFocus
                            className="search-input"
                        />
                        {results.length > 0 && (
                            <ul className="search-results">
                                {results.map((post) => (
                                    <li key={post.slug}>
                                        <a
                                            href={`/posts/${post.slug}`}
                                            className="search-result-item"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="search-result-title">{post.title}</span>
                                            {post.categories && (
                                                <span className="search-result-category">{post.categories}</span>
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {query && results.length === 0 && (
                            <p className="search-no-results">未找到相关文章</p>
                        )}
                    </div>
                </div>
            )}

            <style>{`
        .search-container {
          position: relative;
        }
        
        .search-toggle {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          color: var(--color-text);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          transition: background 0.2s;
        }
        
        .search-toggle:hover {
          background: rgba(99, 102, 241, 0.1);
        }
        
        .search-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 100px;
        }
        
        .search-backdrop {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }
        
        .search-dialog {
          position: relative;
          background: white;
          border-radius: 16px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }
        
        @media (prefers-color-scheme: dark) {
          .search-dialog {
            background: #1c2029;
          }
        }
        
        .search-input {
          width: 100%;
          padding: 16px 20px;
          border: none;
          font-size: 1.1rem;
          outline: none;
          background: transparent;
          color: inherit;
        }
        
        .search-results {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid rgba(128, 128, 128, 0.2);
          max-height: 300px;
          overflow-y: auto;
        }
        
        .search-result-item {
          display: flex;
          flex-direction: column;
          padding: 12px 20px;
          text-decoration: none;
          color: inherit;
          transition: background 0.2s;
        }
        
        .search-result-item:hover {
          background: rgba(99, 102, 241, 0.1);
        }
        
        .search-result-title {
          font-weight: 500;
          margin-bottom: 4px;
        }
        
        .search-result-category {
          font-size: 0.8rem;
          color: #6366f1;
        }
        
        .search-no-results {
          padding: 20px;
          text-align: center;
          color: #888;
          margin: 0;
        }
      `}</style>
        </div>
    );
}

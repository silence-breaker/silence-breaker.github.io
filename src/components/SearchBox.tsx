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
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        (post.categories && post.categories.toLowerCase().includes(lowerQuery))
    ).slice(0, 5);
  }, [query, posts]);

  const showResults = isFocused && query.trim().length > 0;

  return (
    <div className="search-container">
      <div className="search-bar">
        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="搜索文章..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="search-input"
        />
      </div>

      {showResults && (
        <div className="search-dropdown">
          {results.length > 0 ? (
            <ul className="search-results">
              {results.map((post) => (
                <li key={post.slug}>
                  <a href={`/posts/${post.slug}`} className="search-result-item">
                    <span className="search-result-title">{post.title}</span>
                    {post.categories && (
                      <span className="search-result-category">{post.categories}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search-no-results">未找到相关文章</p>
          )}
        </div>
      )}

      <style>{`
        .search-container {
          position: relative;
          flex: 1;
          max-width: 400px;
          margin: 0 24px;
        }
        
        .search-bar {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 24px;
          padding: 8px 16px;
          transition: all 0.2s ease;
        }
        
        @media (prefers-color-scheme: dark) {
          .search-bar {
            background: rgba(30, 34, 44, 0.9);
            border-color: rgba(99, 102, 241, 0.3);
          }
        }
        
        .search-bar:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .search-icon {
          color: #9ca3af;
          flex-shrink: 0;
          margin-right: 8px;
        }
        
        .search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          outline: none;
          color: inherit;
          width: 100%;
        }
        
        .search-input::placeholder {
          color: #9ca3af;
        }
        
        .search-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          right: 0;
          background: white;
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 1000;
        }
        
        @media (prefers-color-scheme: dark) {
          .search-dropdown {
            background: #1c2029;
            border-color: rgba(99, 102, 241, 0.3);
          }
        }
        
        .search-results {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .search-result-item {
          display: flex;
          flex-direction: column;
          padding: 12px 16px;
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
          padding: 16px;
          text-align: center;
          color: #888;
          margin: 0;
        }
        
        @media (max-width: 768px) {
          .search-container {
            max-width: 200px;
            margin: 0 12px;
          }
        }
      `}</style>
    </div>
  );
}

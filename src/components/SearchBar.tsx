import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import type { KeyboardEvent } from 'react';
import gsap from 'gsap';
import type { DesktopWindow } from '../types/desktop';
import { AppIcon } from './AppIcon';

type SearchBarProps = {
  query: string;
  onChange: (value: string) => void;
  filteredItems: DesktopWindow[];
  onOpenItem: (id: string) => void;
  onClose: () => void;
};

type SearchDropdownItem = {
  id: string;
  isWeb?: boolean;
  webUrl?: string;
  title: string;
  icon: string;
  summary: string;
};

export function SearchBar({ query, onChange, filteredItems, onOpenItem, onClose }: SearchBarProps) {
  const isOpen = true;
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(true); // Default to true since we auto-focus
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Entrance animation and auto-focus
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    
    // Animate search container sliding down from top
    gsap.fromTo(
      containerRef.current,
      { y: -80, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.25, ease: 'power3.out' }
    );
    
    inputRef.current?.focus();
  }, []);

  // Transform / Translate top with GSAP when focused or when search query has content
  useEffect(() => {
    if (!containerRef.current) return;
    
    const targetY = (isFocused || query) ? -60 : 0;
    
    gsap.to(containerRef.current, {
      y: targetY,
      duration: 0.3,
      ease: 'power3.out',
    });
  }, [isFocused, query]);

  // Map local items and append web search if query is not empty
  const localItems: SearchDropdownItem[] = filteredItems.map((item) => ({
    id: item.id,
    title: item.title,
    icon: item.icon,
    summary: item.summary,
  }));

  const dropdownItems: SearchDropdownItem[] = [
    ...localItems,
    ...(query.trim()
      ? [
          {
            id: '__web_search_google__',
            isWeb: true,
            webUrl: `https://google.com/search?q=${encodeURIComponent(query.trim())}`,
            title: `Search Google for "${query.trim()}"`,
            icon: '🌐',
            summary: 'Search Google in a new tab',
          },
          {
            id: '__web_search_gemini__',
            isWeb: true,
            webUrl: `https://aistudio.google.com/prompts/new_chat?prompt=${encodeURIComponent(query.trim())}`,
            title: `Search Gemini for "${query.trim()}"`,
            icon: '✨',
            summary: 'Ask Gemini (AI Studio) in a new tab',
          },
          {
            id: '__web_search_chatgpt__',
            isWeb: true,
            webUrl: `https://chatgpt.com/?q=${encodeURIComponent(query.trim())}`,
            title: `Search ChatGPT for "${query.trim()}"`,
            icon: '🤖',
            summary: 'Ask ChatGPT in a new tab',
          },
        ]
      : []),
  ];

  // Reset selected index when dropdown items change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [query, filteredItems]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < dropdownItems.length ? prev + 1 : 0));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : dropdownItems.length - 1));
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < dropdownItems.length) {
        handleItemClick(dropdownItems[selectedIndex]);
      } else if (dropdownItems.length > 0) {
        handleItemClick(dropdownItems[0]);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    }
  };

  const handleItemClick = (item: SearchDropdownItem) => {
    if (item.isWeb && item.webUrl) {
      window.open(item.webUrl, '_blank');
    } else {
      onOpenItem(item.id);
    }
    onClose();
  };

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="desktop-search-backdrop" onClick={onClose}>
      <div
        className="desktop-search-container"
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="desktop-search-input-wrapper">
          <svg
            className="search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>

          <input
            ref={inputRef}
            type="text"
            className="desktop-search-input"
            placeholder="Search apps or search web..."
            value={query}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
          />

          {query ? (
            <button
              type="button"
              className="search-clear-button"
              onClick={handleClear}
              aria-label="Clear search"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          ) : null}
        </div>

        {isOpen && query && dropdownItems.length > 0 ? (
          <ul className="desktop-search-dropdown" role="listbox" aria-label="Search results">
            {dropdownItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <li
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  className={`desktop-search-dropdown-item ${
                    isSelected ? 'desktop-search-dropdown-item-selected' : ''
                  }`}
                  onClick={() => handleItemClick(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <span className="dropdown-item-icon" aria-hidden="true">
                    <AppIcon name={item.icon} />
                  </span>
                  <div className="dropdown-item-details">
                    <strong className="dropdown-item-title">{item.title}</strong>
                    <span className="dropdown-item-summary">{item.summary}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

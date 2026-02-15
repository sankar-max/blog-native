app/
├── \_layout.tsx # Root Stack (global)
├── login.tsx
├── signup.tsx
├── (tabs)/ # Group – no /tabs in URL
│ ├── \_layout.tsx # Tabs + Stack wrapper per tab
│ ├── home/ # Home tab with its own stack
│ │ ├── \_layout.tsx # Stack for home tab
│ │ ├── index.tsx # Feed list (/home)
│ │ └── [slug].tsx # Single post (/home/[slug])
│ ├── search/
│ │ ├── \_layout.tsx # Stack for search (if needed)
│ │ └── index.tsx # Search screen (/search)
│ └── profile/
│ ├── \_layout.tsx # Stack for profile (if needed)
│ └── index.tsx # Profile screen (/profile)
└── write.tsx # Standalone write screen (stack push)

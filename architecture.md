blog-mobile/                        # Expo project root
├── app/                            # Expo Router – file-based routing
│   ├── (auth)/                     # Auth group (no tab bar)
│   │   ├── login.tsx
│   │   ├── signup.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/                     # Main tab navigation (bottom tabs)
│   │   ├── _layout.tsx             # Tab navigator config
│   │   ├── home.tsx                # Public feed / latest posts
│   │   ├── search.tsx              # Search screen
│   │   ├── write.tsx               # Create new post (protected)
│   │   └── profile.tsx             # My profile / my posts
│   ├── post/[slug].tsx             # Single post detail
│   ├── _layout.tsx                 # Root layout (global providers)
│   └── index.tsx                   # Splash / redirect to login or home
├── components/                     # Reusable UI pieces (Shadcn-like)
│   ├── ui/                         # Button, Card, Input, Avatar, etc.
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   ├── PostCard.tsx                # Post preview (used in feed)
│   ├── PostContent.tsx             # Markdown renderer for single post
│   ├── CommentThread.tsx           # Nested comments component
│   └── LoadingSpinner.tsx
├── lib/                            # Utilities & shared logic
│   ├── api/
│   │   ├── axios-client.ts         # Axios instance + interceptors
│   │   └── api-types.ts            # Shared ApiResponse<T>, GetPostsResponse, etc.
│   ├── auth.ts                     # Login, logout, token storage
│   └── constants.ts                # API_BASE_URL, colors, etc.
├── hooks/                          # Custom React hooks
│   ├── useAuth.ts                  # Zustand or context auth state
│   └── usePosts.ts                 # React Query wrappers
├── store/                          # Zustand stores
│   └── authStore.ts                # user, token, login/logout
├── types/                          # TypeScript types
│   ├── index.ts
│   └── api.ts                      # Infer from backend APIs
├── assets/                         # Images, fonts
├── tailwind.config.js
├── global.css                      # @tailwind directives + custom resets
├── app.json / app.config.ts
├── babel.config.js                 # NativeWind plugin
└── tsconfig.json
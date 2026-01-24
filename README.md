# ERP System

> **Status: In Development**

Sistem ERP (Enterprise Resource Planning) berbasis web menggunakan Nuxt 4 dan Tailwind CSS.

## Tech Stack

- **Framework**: Nuxt 4
- **UI**: Tailwind CSS
- **Icons**: Lucide Vue

## Setup

```bash
# Install dependencies
yarn install

# Copy environment file
cp .env.example .env

# Run development server
yarn dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Environment Variables

```env
NUXT_PUBLIC_APP_NAME="ERP System"
NUXT_PUBLIC_APP_URL="http://localhost:3000"
NUXT_PUBLIC_API_URL="http://localhost:3001/api"
```

## Struktur Project

```
app/
├── components/     # Reusable components
├── composables/    # Vue composables
├── layouts/        # Layout components
└── pages/          # Route pages
```

## Progress

- [x] Base layout (Sidebar, Navbar, Footer)
- [x] Dark/Light mode
- [x] Responsive design
- [x] Login page
- [x] Dashboard page
- [ ] Authentication
- [ ] Inventory module
- [ ] Sales module
- [ ] Purchasing module
- [ ] Finance module
- [ ] HR module

## License

Private - All rights reserved

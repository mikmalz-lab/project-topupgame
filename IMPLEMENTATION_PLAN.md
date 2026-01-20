# Implementation Plan: Top-Up Game Platform

## Project Overview
Building a production-ready, secure, and responsive Top-Up Game platform. 
**Tech Stack**: Next.js (App Router), TypeScript, PostgreSQL, Prisma ORM, Redis (for Queues/Caching).
**Styling**: Custom CSS (Glassmorphism/Premium Dark Mode) + Framer Motion.

## Phase 1: Foundation & Architecture
- [x] Initialize Next.js Project (TypeScript, App Router).
- [ ] **Design System**: Set up global CSS variables (colors, spacing, typography) for the "Premium" look.
- [ ] **Database**: Define Prisma Schema for Users, Games, Products, Transactions, PaymentMethods.
- [ ] **Infrastructure Setup**: Configure Redis connection (locally) for queues.

## Phase 2: Core Features (Guest/Public)
- [ ] **Landing Page**: 
    - Hero Banner (Carousel/Slider).
    - Popular Games Grid.
    - Search Functionality.
- [ ] **Product Page**:
    - Automatic ID Validation Form (mocked logic first, then API integration).
    - Product/Denom selection.
    - Payment Method selection (Auto-calculated fees).
- [ ] **Transaction Logic**:
    - Order creation.
    - Payment Gateway Integration (Ipaymu/Duitku placeholder).
    - WhatsApp/Email Notification Stub.

## Phase 3: Authentication & Membership
- [ ] **Auth System**: Login/Register (Admin & Member).
- [ ] **Member Dashboard**:
    - History.
    - Profile.
    - Deposit Balance.
    - Upgrade Membership Level.

## Phase 4: Admin Dashboard
- [ ] **Overview**: Stats (Sales, Users).
- [ ] **Product Management**:
    - CRUD Games (Upload Icon/Banner).
    - CRUD Products (Sync from Vendors).
    - Margin/Price settings.
- [ ] **Transaction Management**:
    - View/Edit Status.
    - Manual release if needed.

## Phase 5: Backend Integrations & Automation
- [ ] **DigiFlazz Integration**:
    - Product Sync Service.
    - Transaction execution via API.
- [ ] **Payment Gateways**:
    - Webhook handlers for auto-confirmation.
- [ ] **Background Jobs (Redis + BullMQ)**:
    - Queue for "Pending" transactions to check status against Provider.
    - Cron job for syncing product availability.

## Phase 6: Security & Polish
- [ ] **Security**: Rate limiting, Input Validation (Zod), CSRF protection.
- [ ] **SEO**: Dynamic Metadata, Sitemap.
- [ ] **Performance**: Image optimization, Caching strategies.
